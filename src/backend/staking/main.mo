import HashMap "mo:base/HashMap";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Buffer "mo:base/Buffer";

import Types "../shared/types";

actor StakingCanister {
    type Result<T, E> = Result.Result<T, E>;
    type Stake = Types.Stake;
    type StakeId = Types.StakeId;
    type StakingPeriod = Types.StakingPeriod;
    type StakingRewards = Types.StakingRewards;
    type TokenAmount = Types.TokenAmount;
    type StakingError = Types.StakingError;
    type CommonError = Types.CommonError;

    // Stable storage for upgrades
    private stable var nextStakeId : Nat = 1;
    private stable var stakesEntries : [(StakeId, Stake)] = [];
    private stable var userStakesEntries : [(Principal, [StakeId])] = [];
    private stable var totalStakedAmount : TokenAmount = 0;
    private stable var totalRewardsDistributed : TokenAmount = 0;

    // Runtime storage
    private var stakes = HashMap.HashMap<StakeId, Stake>(100, Nat.equal, func(n: Nat) : Nat32 { Nat32.fromNat(n) });
    private var userStakes = HashMap.HashMap<Principal, [StakeId]>(50, Principal.equal, Principal.hash);

    // Staking configuration
    private stable var stakingEnabled : Bool = true;
    private stable var minimumStakeAmount : TokenAmount = 10; // Minimum 10 tokens
    private stable var maximumStakeAmount : TokenAmount = 1000000; // Maximum 1M tokens

    // System functions for upgrades
    system func preupgrade() {
        stakesEntries := Iter.toArray(stakes.entries());
        userStakesEntries := Iter.toArray(userStakes.entries());
    };

    system func postupgrade() {
        stakes := HashMap.fromIter<StakeId, Stake>(
            stakesEntries.vals(), 
            stakesEntries.size(), 
            Nat.equal, 
            func(n: Nat) : Nat32 { Nat32.fromNat(n) }
        );
        userStakes := HashMap.fromIter<Principal, [StakeId]>(
            userStakesEntries.vals(), 
            userStakesEntries.size(), 
            Principal.equal, 
            Principal.hash
        );
    };

    // Public functions

    // Stake tokens
    public shared(msg) func stake(amount: TokenAmount, period: StakingPeriod) : async Result<StakeId, Text> {
        let caller = msg.caller;

        if (not stakingEnabled) {
            return #err("Staking is currently disabled");
        };

        if (amount < minimumStakeAmount) {
            return #err("Amount below minimum stake requirement");
        };

        if (amount > maximumStakeAmount) {
            return #err("Amount exceeds maximum stake limit");
        };

        let stakeId = nextStakeId;
        nextStakeId += 1;

        let now = Time.now();
        let unlockTime = calculateUnlockTime(now, period);

        let newStake : Stake = {
            id = stakeId;
            staker = caller;
            amount = amount;
            stakingPeriod = period;
            stakedAt = now;
            unlocksAt = unlockTime;
            rewards = 0;
            isActive = true;
        };

        stakes.put(stakeId, newStake);
        
        // Update user stakes
        let currentUserStakes = switch (userStakes.get(caller)) {
            case (?stakes) stakes;
            case null [];
        };
        let updatedUserStakes = Array.append<StakeId>(currentUserStakes, [stakeId]);
        userStakes.put(caller, updatedUserStakes);

        // Update total staked amount
        totalStakedAmount += amount;

        #ok(stakeId)
    };

    // Unstake tokens
    public shared(msg) func unstake(stakeId: StakeId) : async Result<TokenAmount, Text> {
        let caller = msg.caller;

        let stake = switch (stakes.get(stakeId)) {
            case (?s) s;
            case null return #err("Stake not found");
        };

        if (stake.staker != caller) {
            return #err("Not authorized to unstake this stake");
        };

        if (not stake.isActive) {
            return #err("Stake is not active");
        };

        // Check if stake is unlocked
        switch (stake.unlocksAt) {
            case (?unlockTime) {
                if (Time.now() < unlockTime) {
                    return #err("Stake is still locked");
                };
            };
            case null {}; // Flexible staking, always unlocked
        };

        // Calculate final rewards
        let finalRewards = calculateRewards(stake);
        let totalAmount = stake.amount + finalRewards;

        // Deactivate stake
        let updatedStake = stake with { 
            isActive = false;
            rewards = finalRewards;
        };
        stakes.put(stakeId, updatedStake);

        // Update total staked amount
        totalStakedAmount -= stake.amount;
        totalRewardsDistributed += finalRewards;

        #ok(totalAmount)
    };

    // Claim rewards without unstaking (for flexible staking)
    public shared(msg) func claimRewards(stakeId: StakeId) : async Result<TokenAmount, Text> {
        let caller = msg.caller;

        let stake = switch (stakes.get(stakeId)) {
            case (?s) s;
            case null return #err("Stake not found");
        };

        if (stake.staker != caller) {
            return #err("Not authorized to claim rewards for this stake");
        };

        if (not stake.isActive) {
            return #err("Stake is not active");
        };

        // Only flexible staking allows reward claiming
        if (stake.stakingPeriod != #flexible) {
            return #err("Rewards can only be claimed for flexible staking");
        };

        let currentRewards = calculateRewards(stake);
        let claimableRewards = currentRewards - stake.rewards;

        if (claimableRewards == 0) {
            return #err("No rewards available to claim");
        };

        // Update stake with claimed rewards
        let updatedStake = stake with { rewards = currentRewards };
        stakes.put(stakeId, updatedStake);

        totalRewardsDistributed += claimableRewards;

        #ok(claimableRewards)
    };

    // Extend staking period
    public shared(msg) func extendStakingPeriod(stakeId: StakeId, newPeriod: StakingPeriod) : async Result<(), Text> {
        let caller = msg.caller;

        let stake = switch (stakes.get(stakeId)) {
            case (?s) s;
            case null return #err("Stake not found");
        };

        if (stake.staker != caller) {
            return #err("Not authorized to modify this stake");
        };

        if (not stake.isActive) {
            return #err("Stake is not active");
        };

        // Check if new period is longer than current
        if (not isLongerPeriod(stake.stakingPeriod, newPeriod)) {
            return #err("New period must be longer than current period");
        };

        let newUnlockTime = calculateUnlockTime(Time.now(), newPeriod);
        let updatedStake = stake with { 
            stakingPeriod = newPeriod;
            unlocksAt = newUnlockTime;
        };
        stakes.put(stakeId, updatedStake);

        #ok()
    };

    // Query functions

    // Get stake by ID
    public query func getStake(stakeId: StakeId) : async ?Stake {
        stakes.get(stakeId)
    };

    // Get user's stakes
    public query func getUserStakes(user: Principal) : async [Stake] {
        let stakeIds = switch (userStakes.get(user)) {
            case (?ids) ids;
            case null return [];
        };

        let userStakesList = Buffer.Buffer<Stake>(0);
        for (stakeId in stakeIds.vals()) {
            switch (stakes.get(stakeId)) {
                case (?stake) userStakesList.add(stake);
                case null {};
            };
        };
        Buffer.toArray(userStakesList)
    };

    // Get user's active stakes
    public query func getUserActiveStakes(user: Principal) : async [Stake] {
        let allUserStakes = await getUserStakes(user);
        Array.filter<Stake>(allUserStakes, func(stake) = stake.isActive)
    };

    // Get staking rewards for a stake
    public query func getStakingRewards(stakeId: StakeId) : async ?StakingRewards {
        switch (stakes.get(stakeId)) {
            case (?stake) {
                let totalRewards = calculateRewards(stake);
                let claimableRewards = if (stake.stakingPeriod == #flexible) {
                    totalRewards - stake.rewards
                } else { 0 };

                ?{
                    totalRewards = totalRewards;
                    claimableRewards = claimableRewards;
                    lastClaimedAt = if (stake.rewards > 0) ?stake.stakedAt else null;
                    apr = getAPRForPeriod(stake.stakingPeriod);
                }
            };
            case null null;
        }
    };

    // Get user's total staking summary
    public query func getUserStakingSummary(user: Principal) : async {
        totalStaked: TokenAmount;
        totalRewards: TokenAmount;
        activeStakes: Nat;
        totalVotingPower: Nat;
    } {
        let userStakesList = await getUserStakes(user);
        var totalStaked : TokenAmount = 0;
        var totalRewards : TokenAmount = 0;
        var activeStakes : Nat = 0;
        var totalVotingPower : Nat = 0;

        for (stake in userStakesList.vals()) {
            if (stake.isActive) {
                totalStaked += stake.amount;
                totalRewards += calculateRewards(stake);
                activeStakes += 1;
                totalVotingPower += Types.calculateVotingPower(stake.amount, stake.stakingPeriod);
            };
        };

        {
            totalStaked = totalStaked;
            totalRewards = totalRewards;
            activeStakes = activeStakes;
            totalVotingPower = totalVotingPower;
        }
    };

    // Get staking statistics
    public query func getStakingStats() : async {
        totalStakes: Nat;
        activeStakes: Nat;
        totalStakedAmount: TokenAmount;
        totalRewardsDistributed: TokenAmount;
        averageStakeAmount: Float;
        stakingPeriodDistribution: [(StakingPeriod, Nat)];
    } {
        var activeStakes : Nat = 0;
        var flexibleCount : Nat = 0;
        var locked30Count : Nat = 0;
        var locked90Count : Nat = 0;
        var locked180Count : Nat = 0;
        var locked365Count : Nat = 0;

        for (stake in stakes.vals()) {
            if (stake.isActive) {
                activeStakes += 1;
                switch (stake.stakingPeriod) {
                    case (#flexible) flexibleCount += 1;
                    case (#locked30) locked30Count += 1;
                    case (#locked90) locked90Count += 1;
                    case (#locked180) locked180Count += 1;
                    case (#locked365) locked365Count += 1;
                };
            };
        };

        let averageAmount = if (activeStakes > 0) {
            Float.fromInt(totalStakedAmount) / Float.fromInt(activeStakes)
        } else { 0.0 };

        {
            totalStakes = stakes.size();
            activeStakes = activeStakes;
            totalStakedAmount = totalStakedAmount;
            totalRewardsDistributed = totalRewardsDistributed;
            averageStakeAmount = averageAmount;
            stakingPeriodDistribution = [
                (#flexible, flexibleCount),
                (#locked30, locked30Count),
                (#locked90, locked90Count),
                (#locked180, locked180Count),
                (#locked365, locked365Count)
            ];
        }
    };

    // Administrative functions

    // Enable/disable staking
    public shared(msg) func setStakingEnabled(enabled: Bool) : async Result<(), Text> {
        // In real implementation, only governance should be able to do this
        stakingEnabled := enabled;
        #ok()
    };

    // Update minimum stake amount
    public shared(msg) func setMinimumStakeAmount(amount: TokenAmount) : async Result<(), Text> {
        // In real implementation, only governance should be able to do this
        minimumStakeAmount := amount;
        #ok()
    };

    // Update maximum stake amount
    public shared(msg) func setMaximumStakeAmount(amount: TokenAmount) : async Result<(), Text> {
        // In real implementation, only governance should be able to do this
        maximumStakeAmount := amount;
        #ok()
    };

    // Helper functions
    private func calculateUnlockTime(stakedAt: Time.Time, period: StakingPeriod) : ?Time.Time {
        switch (period) {
            case (#flexible) null;
            case (#locked30) ?(stakedAt + 30 * 24 * 60 * 60 * 1_000_000_000);
            case (#locked90) ?(stakedAt + 90 * 24 * 60 * 60 * 1_000_000_000);
            case (#locked180) ?(stakedAt + 180 * 24 * 60 * 60 * 1_000_000_000);
            case (#locked365) ?(stakedAt + 365 * 24 * 60 * 60 * 1_000_000_000);
        }
    };

    private func calculateRewards(stake: Stake) : TokenAmount {
        let stakingDuration = Time.now() - stake.stakedAt;
        Types.calculateStakingRewards(stake.amount, stake.stakingPeriod, Int.abs(stakingDuration))
    };

    private func getAPRForPeriod(period: StakingPeriod) : Float {
        switch (period) {
            case (#flexible) 0.05; // 5% APR
            case (#locked30) 0.08; // 8% APR
            case (#locked90) 0.12; // 12% APR
            case (#locked180) 0.18; // 18% APR
            case (#locked365) 0.25; // 25% APR
        }
    };

    private func isLongerPeriod(current: StakingPeriod, new: StakingPeriod) : Bool {
        let currentValue = switch (current) {
            case (#flexible) 0;
            case (#locked30) 30;
            case (#locked90) 90;
            case (#locked180) 180;
            case (#locked365) 365;
        };

        let newValue = switch (new) {
            case (#flexible) 0;
            case (#locked30) 30;
            case (#locked90) 90;
            case (#locked180) 180;
            case (#locked365) 365;
        };

        newValue > currentValue
    };
}