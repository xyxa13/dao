import HashMap "mo:base/HashMap";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Buffer "mo:base/Buffer";

import Types "../shared/types";

actor GovernanceCanister {
    type Result<T, E> = Result.Result<T, E>;
    type Proposal = Types.Proposal;
    type Vote = Types.Vote;
    type ProposalId = Types.ProposalId;
    type GovernanceConfig = Types.GovernanceConfig;
    type GovernanceError = Types.GovernanceError;
    type CommonError = Types.CommonError;

    // Stable storage for upgrades
    private stable var nextProposalId : Nat = 1;
    private stable var proposalsEntries : [(ProposalId, Proposal)] = [];
    private stable var votesEntries : [(Text, Vote)] = []; // Key: proposalId_voter
    private stable var configEntries : [(Text, GovernanceConfig)] = [];

    // Runtime storage
    private var proposals = HashMap.HashMap<ProposalId, Proposal>(10, Nat.equal, func(n: Nat) : Nat32 { Nat32.fromNat(n) });
    private var votes = HashMap.HashMap<Text, Vote>(100, Text.equal, Text.hash);
    private var config = HashMap.HashMap<Text, GovernanceConfig>(1, Text.equal, Text.hash);

    // Initialize default configuration
    private func initializeConfig() {
        let defaultConfig : GovernanceConfig = {
            votingPeriod = 7 * 24 * 60 * 60 * 1_000_000_000; // 7 days in nanoseconds
            quorumThreshold = 1000; // Minimum 1000 voting power
            approvalThreshold = 51; // 51% approval needed
            proposalDeposit = 100; // 100 tokens required
            maxProposalsPerUser = 3; // Max 3 active proposals per user
        };
        config.put("default", defaultConfig);
    };

    // System functions for upgrades
    system func preupgrade() {
        proposalsEntries := Iter.toArray(proposals.entries());
        votesEntries := Iter.toArray(votes.entries());
        configEntries := Iter.toArray(config.entries());
    };

    system func postupgrade() {
        proposals := HashMap.fromIter<ProposalId, Proposal>(
            proposalsEntries.vals(), 
            proposalsEntries.size(), 
            Nat.equal, 
            func(n: Nat) : Nat32 { Nat32.fromNat(n) }
        );
        votes := HashMap.fromIter<Text, Vote>(
            votesEntries.vals(), 
            votesEntries.size(), 
            Text.equal, 
            Text.hash
        );
        config := HashMap.fromIter<Text, GovernanceConfig>(
            configEntries.vals(), 
            configEntries.size(), 
            Text.equal, 
            Text.hash
        );
        
        if (config.size() == 0) {
            initializeConfig();
        };
    };

    // Initialize on first deployment
    if (config.size() == 0) {
        initializeConfig();
    };

    // Public functions

    // Create a new proposal
    public shared(msg) func createProposal(
        title: Text,
        description: Text,
        proposalType: Types.ProposalType,
        votingPeriod: ?Nat
    ) : async Result<ProposalId, Text> {
        let caller = msg.caller;
        
        // Check if user has too many active proposals
        let activeProposals = getActiveProposalsByUser(caller);
        let currentConfig = switch (config.get("default")) {
            case (?c) c;
            case null return #err("Configuration not found");
        };
        
        if (activeProposals.size() >= currentConfig.maxProposalsPerUser) {
            return #err("Maximum active proposals limit reached");
        };

        let proposalId = nextProposalId;
        nextProposalId += 1;

        let period = switch (votingPeriod) {
            case (?p) p;
            case null currentConfig.votingPeriod;
        };

        let proposal : Proposal = {
            id = proposalId;
            proposer = caller;
            title = title;
            description = description;
            proposalType = proposalType;
            status = #active;
            votesInFavor = 0;
            votesAgainst = 0;
            totalVotingPower = 0;
            createdAt = Time.now();
            votingDeadline = Time.now() + period;
            executionDeadline = ?(Time.now() + period + (24 * 60 * 60 * 1_000_000_000)); // 1 day after voting
            quorumThreshold = currentConfig.quorumThreshold;
            approvalThreshold = currentConfig.approvalThreshold;
        };

        proposals.put(proposalId, proposal);
        #ok(proposalId)
    };

    // Cast a vote on a proposal
    public shared(msg) func vote(
        proposalId: ProposalId,
        choice: Types.VoteChoice,
        votingPower: Nat,
        reason: ?Text
    ) : async Result<(), Text> {
        let caller = msg.caller;
        let voteKey = Nat.toText(proposalId) # "_" # Principal.toText(caller);

        // Check if already voted
        switch (votes.get(voteKey)) {
            case (?_) return #err("Already voted on this proposal");
            case null {};
        };

        // Get proposal
        let proposal = switch (proposals.get(proposalId)) {
            case (?p) p;
            case null return #err("Proposal not found");
        };

        // Check if proposal is active and not expired
        if (proposal.status != #active) {
            return #err("Proposal is not active");
        };

        if (Time.now() > proposal.votingDeadline) {
            return #err("Voting period has ended");
        };

        // Create vote record
        let vote : Vote = {
            voter = caller;
            proposalId = proposalId;
            choice = choice;
            votingPower = votingPower;
            timestamp = Time.now();
            reason = reason;
        };

        votes.put(voteKey, vote);

        // Update proposal vote counts - FIXED: Using #inFavor instead of #for
        let updatedProposal = switch (choice) {
            case (#inFavor) {
                proposal with {
                    votesInFavor = proposal.votesInFavor + votingPower;
                    totalVotingPower = proposal.totalVotingPower + votingPower;
                }
            };
            case (#against) {
                proposal with {
                    votesAgainst = proposal.votesAgainst + votingPower;
                    totalVotingPower = proposal.totalVotingPower + votingPower;
                }
            };
            case (#abstain) {
                proposal with {
                    totalVotingPower = proposal.totalVotingPower + votingPower;
                }
            };
        };

        proposals.put(proposalId, updatedProposal);
        #ok()
    };

    // Execute a proposal
    public shared(msg) func executeProposal(proposalId: ProposalId) : async Result<(), Text> {
        let proposal = switch (proposals.get(proposalId)) {
            case (?p) p;
            case null return #err("Proposal not found");
        };

        // Check if proposal can be executed
        if (proposal.status != #active) {
            return #err("Proposal is not active");
        };

        if (Time.now() <= proposal.votingDeadline) {
            return #err("Voting period has not ended");
        };

        // Check quorum
        if (proposal.totalVotingPower < proposal.quorumThreshold) {
            let failedProposal = proposal with { status = #failed };
            proposals.put(proposalId, failedProposal);
            return #err("Quorum not met");
        };

        // Check approval threshold
        let approvalRate = if (proposal.totalVotingPower > 0) {
            (proposal.votesInFavor * 100) / proposal.totalVotingPower
        } else { 0 };

        let newStatus = if (approvalRate >= proposal.approvalThreshold) {
            #succeeded
        } else {
            #failed
        };

        let updatedProposal = proposal with { status = newStatus };
        proposals.put(proposalId, updatedProposal);

        if (newStatus == #succeeded) {
            // Here you would implement the actual execution logic
            // For now, we just mark it as executed
            let executedProposal = updatedProposal with { status = #executed };
            proposals.put(proposalId, executedProposal);
        };

        #ok()
    };

    // Query functions

    // Get proposal by ID
    public query func getProposal(proposalId: ProposalId) : async ?Proposal {
        proposals.get(proposalId)
    };

    // Get all proposals
    public query func getAllProposals() : async [Proposal] {
        Iter.toArray(proposals.vals())
    };

    // Get active proposals
    public query func getActiveProposals() : async [Proposal] {
        let activeProposals = Buffer.Buffer<Proposal>(0);
        for (proposal in proposals.vals()) {
            if (proposal.status == #active and Time.now() <= proposal.votingDeadline) {
                activeProposals.add(proposal);
            };
        };
        Buffer.toArray(activeProposals)
    };

    // Get proposals by status
    public query func getProposalsByStatus(status: Types.ProposalStatus) : async [Proposal] {
        let filteredProposals = Buffer.Buffer<Proposal>(0);
        for (proposal in proposals.vals()) {
            if (proposal.status == status) {
                filteredProposals.add(proposal);
            };
        };
        Buffer.toArray(filteredProposals)
    };

    // Get user's vote on a proposal
    public query func getUserVote(proposalId: ProposalId, user: Principal) : async ?Vote {
        let voteKey = Nat.toText(proposalId) # "_" # Principal.toText(user);
        votes.get(voteKey)
    };

    // Get all votes for a proposal
    public query func getProposalVotes(proposalId: ProposalId) : async [Vote] {
        let proposalVotes = Buffer.Buffer<Vote>(0);
        for (vote in votes.vals()) {
            if (vote.proposalId == proposalId) {
                proposalVotes.add(vote);
            };
        };
        Buffer.toArray(proposalVotes)
    };

    // Get governance configuration
    public query func getConfig() : async ?GovernanceConfig {
        config.get("default")
    };

    // Update governance configuration (admin only)
    public shared(msg) func updateConfig(newConfig: GovernanceConfig) : async Result<(), Text> {
        // In a real implementation, you'd check if the caller is an admin
        config.put("default", newConfig);
        #ok()
    };

    // Helper functions
    private func getActiveProposalsByUser(user: Principal) : [Proposal] {
        let userProposals = Buffer.Buffer<Proposal>(0);
        for (proposal in proposals.vals()) {
            if (proposal.proposer == user and proposal.status == #active) {
                userProposals.add(proposal);
            };
        };
        Buffer.toArray(userProposals)
    };

    // Get governance statistics
    public query func getGovernanceStats() : async {
        totalProposals: Nat;
        activeProposals: Nat;
        succeededProposals: Nat;
        failedProposals: Nat;
        totalVotes: Nat;
    } {
        var activeCount = 0;
        var succeededCount = 0;
        var failedCount = 0;

        for (proposal in proposals.vals()) {
            switch (proposal.status) {
                case (#active) activeCount += 1;
                case (#succeeded or #executed) succeededCount += 1;
                case (#failed) failedCount += 1;
                case (_) {};
            };
        };

        {
            totalProposals = proposals.size();
            activeProposals = activeCount;
            succeededProposals = succeededCount;
            failedProposals = failedCount;
            totalVotes = votes.size();
        }
    };
}