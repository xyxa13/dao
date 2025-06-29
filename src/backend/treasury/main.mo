import HashMap "mo:base/HashMap";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Buffer "mo:base/Buffer";

import Types "../shared/types";

actor TreasuryCanister {
    type Result<T, E> = Result.Result<T, E>;
    type TreasuryBalance = Types.TreasuryBalance;
    type TreasuryTransaction = Types.TreasuryTransaction;
    type TokenAmount = Types.TokenAmount;
    type TreasuryError = Types.TreasuryError;
    type CommonError = Types.CommonError;

    // Stable storage for upgrades
    private stable var totalBalance : TokenAmount = 0;
    private stable var availableBalance : TokenAmount = 0;
    private stable var lockedBalance : TokenAmount = 0;
    private stable var reservedBalance : TokenAmount = 0;
    private stable var nextTransactionId : Nat = 1;
    private stable var transactionsEntries : [(Nat, TreasuryTransaction)] = [];
    private stable var allowancesEntries : [(Principal, TokenAmount)] = [];

    // Runtime storage
    private var transactions = HashMap.HashMap<Nat, TreasuryTransaction>(100, Nat.equal, func(n: Nat) : Nat32 { Nat32.fromNat(n) });
    private var allowances = HashMap.HashMap<Principal, TokenAmount>(10, Principal.equal, Principal.hash);

    // Authorized principals (in real implementation, this would be managed by governance)
    private stable var authorizedPrincipals : [Principal] = [];

    // System functions for upgrades
    system func preupgrade() {
        transactionsEntries := Iter.toArray(transactions.entries());
        allowancesEntries := Iter.toArray(allowances.entries());
    };

    system func postupgrade() {
        transactions := HashMap.fromIter<Nat, TreasuryTransaction>(
            transactionsEntries.vals(), 
            transactionsEntries.size(), 
            Nat.equal, 
            func(n: Nat) : Nat32 { Nat32.fromNat(n) }
        );
        allowances := HashMap.fromIter<Principal, TokenAmount>(
            allowancesEntries.vals(), 
            allowancesEntries.size(), 
            Principal.equal, 
            Principal.hash
        );
    };

    // Public functions

    // Deposit tokens to treasury
    public shared(msg) func deposit(amount: TokenAmount, description: Text) : async Result<Nat, Text> {
        if (amount == 0) {
            return #err("Amount must be greater than 0");
        };

        let transactionId = nextTransactionId;
        nextTransactionId += 1;

        let transaction : TreasuryTransaction = {
            id = transactionId;
            transactionType = #deposit;
            amount = amount;
            from = ?msg.caller;
            to = null;
            timestamp = Time.now();
            proposalId = null;
            description = description;
            status = #completed;
        };

        transactions.put(transactionId, transaction);
        
        // Update balances
        totalBalance += amount;
        availableBalance += amount;

        #ok(transactionId)
    };

    // Withdraw tokens from treasury (requires authorization)
    public shared(msg) func withdraw(
        recipient: Principal,
        amount: TokenAmount,
        description: Text,
        proposalId: ?Types.ProposalId
    ) : async Result<Nat, Text> {
        let caller = msg.caller;

        // Check authorization
        if (not isAuthorized(caller)) {
            return #err("Not authorized to withdraw from treasury");
        };

        // Check available balance
        if (amount > availableBalance) {
            return #err("Insufficient available balance");
        };

        let transactionId = nextTransactionId;
        nextTransactionId += 1;

        let transaction : TreasuryTransaction = {
            id = transactionId;
            transactionType = #withdrawal;
            amount = amount;
            from = null;
            to = ?recipient;
            timestamp = Time.now();
            proposalId = proposalId;
            description = description;
            status = #pending;
        };

        transactions.put(transactionId, transaction);

        // Execute withdrawal
        switch (await executeWithdrawal(transactionId)) {
            case (#ok(_)) {
                // Update balances
                totalBalance -= amount;
                availableBalance -= amount;
                
                let completedTransaction = transaction with { status = #completed };
                transactions.put(transactionId, completedTransaction);
                
                #ok(transactionId)
            };
            case (#err(error)) {
                let failedTransaction = transaction with { status = #failed };
                transactions.put(transactionId, failedTransaction);
                #err(error)
            };
        }
    };

    // Lock tokens for specific purposes (e.g., staking rewards)
    public shared(msg) func lockTokens(amount: TokenAmount, reason: Text) : async Result<(), Text> {
        if (not isAuthorized(msg.caller)) {
            return #err("Not authorized");
        };

        if (amount > availableBalance) {
            return #err("Insufficient available balance");
        };

        availableBalance -= amount;
        lockedBalance += amount;

        let transactionId = nextTransactionId;
        nextTransactionId += 1;

        let transaction : TreasuryTransaction = {
            id = transactionId;
            transactionType = #stakingReward;
            amount = amount;
            from = null;
            to = null;
            timestamp = Time.now();
            proposalId = null;
            description = "Locked tokens: " # reason;
            status = #completed;
        };

        transactions.put(transactionId, transaction);
        #ok()
    };

    // Unlock tokens
    public shared(msg) func unlockTokens(amount: TokenAmount, reason: Text) : async Result<(), Text> {
        if (not isAuthorized(msg.caller)) {
            return #err("Not authorized");
        };

        if (amount > lockedBalance) {
            return #err("Insufficient locked balance");
        };

        lockedBalance -= amount;
        availableBalance += amount;

        let transactionId = nextTransactionId;
        nextTransactionId += 1;

        let transaction : TreasuryTransaction = {
            id = transactionId;
            transactionType = #stakingReward;
            amount = amount;
            from = null;
            to = null;
            timestamp = Time.now();
            proposalId = null;
            description = "Unlocked tokens: " # reason;
            status = #completed;
        };

        transactions.put(transactionId, transaction);
        #ok()
    };

    // Reserve tokens for future use
    public shared(msg) func reserveTokens(amount: TokenAmount, reason: Text) : async Result<(), Text> {
        if (not isAuthorized(msg.caller)) {
            return #err("Not authorized");
        };

        if (amount > availableBalance) {
            return #err("Insufficient available balance");
        };

        availableBalance -= amount;
        reservedBalance += amount;

        let transactionId = nextTransactionId;
        nextTransactionId += 1;

        let transaction : TreasuryTransaction = {
            id = transactionId;
            transactionType = #fee;
            amount = amount;
            from = null;
            to = null;
            timestamp = Time.now();
            proposalId = null;
            description = "Reserved tokens: " # reason;
            status = #completed;
        };

        transactions.put(transactionId, transaction);
        #ok()
    };

    // Release reserved tokens
    public shared(msg) func releaseReservedTokens(amount: TokenAmount, reason: Text) : async Result<(), Text> {
        if (not isAuthorized(msg.caller)) {
            return #err("Not authorized");
        };

        if (amount > reservedBalance) {
            return #err("Insufficient reserved balance");
        };

        reservedBalance -= amount;
        availableBalance += amount;

        let transactionId = nextTransactionId;
        nextTransactionId += 1;

        let transaction : TreasuryTransaction = {
            id = transactionId;
            transactionType = #fee;
            amount = amount;
            from = null;
            to = null;
            timestamp = Time.now();
            proposalId = null;
            description = "Released reserved tokens: " # reason;
            status = #completed;
        };

        transactions.put(transactionId, transaction);
        #ok()
    };

    // Query functions

    // Get treasury balance
    public query func getBalance() : async TreasuryBalance {
        {
            total = totalBalance;
            available = availableBalance;
            locked = lockedBalance;
            reserved = reservedBalance;
        }
    };

    // Get transaction by ID
    public query func getTransaction(transactionId: Nat) : async ?TreasuryTransaction {
        transactions.get(transactionId)
    };

    // Get all transactions
    public query func getAllTransactions() : async [TreasuryTransaction] {
        Iter.toArray(transactions.vals())
    };

    // Get transactions by type
    public query func getTransactionsByType(transactionType: Types.TreasuryTransactionType) : async [TreasuryTransaction] {
        let filteredTransactions = Buffer.Buffer<TreasuryTransaction>(0);
        for (transaction in transactions.vals()) {
            if (transaction.transactionType == transactionType) {
                filteredTransactions.add(transaction);
            };
        };
        Buffer.toArray(filteredTransactions)
    };

    // Get recent transactions
    public query func getRecentTransactions(limit: Nat) : async [TreasuryTransaction] {
        let allTransactions = Iter.toArray(transactions.vals());
        let sortedTransactions = Array.sort(allTransactions, func(a: TreasuryTransaction, b: TreasuryTransaction) : {#less; #equal; #greater} {
            if (a.timestamp > b.timestamp) #less
            else if (a.timestamp < b.timestamp) #greater
            else #equal
        });
        
        if (sortedTransactions.size() <= limit) {
            sortedTransactions
        } else {
            Array.tabulate<TreasuryTransaction>(limit, func(i) = sortedTransactions[i])
        }
    };

    // Get treasury statistics
    public query func getTreasuryStats() : async {
        totalTransactions: Nat;
        totalDeposits: TokenAmount;
        totalWithdrawals: TokenAmount;
        averageTransactionAmount: Float;
        balance: TreasuryBalance;
    } {
        var totalDeposits : TokenAmount = 0;
        var totalWithdrawals : TokenAmount = 0;
        var totalAmount : TokenAmount = 0;

        for (transaction in transactions.vals()) {
            switch (transaction.transactionType) {
                case (#deposit) {
                    totalDeposits += transaction.amount;
                    totalAmount += transaction.amount;
                };
                case (#withdrawal) {
                    totalWithdrawals += transaction.amount;
                    totalAmount += transaction.amount;
                };
                case (_) {
                    totalAmount += transaction.amount;
                };
            };
        };

        let averageAmount = if (transactions.size() > 0) {
            Float.fromInt(totalAmount) / Float.fromInt(transactions.size())
        } else { 0.0 };

        {
            totalTransactions = transactions.size();
            totalDeposits = totalDeposits;
            totalWithdrawals = totalWithdrawals;
            averageTransactionAmount = averageAmount;
            balance = {
                total = totalBalance;
                available = availableBalance;
                locked = lockedBalance;
                reserved = reservedBalance;
            };
        }
    };

    // Administrative functions

    // Add authorized principal
    public shared(msg) func addAuthorizedPrincipal(principal: Principal) : async Result<(), Text> {
        // In real implementation, only governance or admin should be able to do this
        let principals = Buffer.fromArray<Principal>(authorizedPrincipals);
        principals.add(principal);
        authorizedPrincipals := Buffer.toArray(principals);
        #ok()
    };

    // Remove authorized principal
    public shared(msg) func removeAuthorizedPrincipal(principal: Principal) : async Result<(), Text> {
        // In real implementation, only governance or admin should be able to do this
        authorizedPrincipals := Array.filter<Principal>(authorizedPrincipals, func(p) = p != principal);
        #ok()
    };

    // Get authorized principals
    public query func getAuthorizedPrincipals() : async [Principal] {
        authorizedPrincipals
    };

    // Helper functions
    private func isAuthorized(principal: Principal) : Bool {
        Array.find<Principal>(authorizedPrincipals, func(p) = p == principal) != null
    };

    private func executeWithdrawal(transactionId: Nat) : async Result<(), Text> {
        // In a real implementation, this would interact with the ledger canister
        // For now, we'll simulate a successful withdrawal
        #ok()
    };
}