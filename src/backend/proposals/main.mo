import HashMap "mo:base/HashMap";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Buffer "mo:base/Buffer";
import Text "mo:base/Text";

import Types "../shared/types";

actor ProposalsCanister {
    type Result<T, E> = Result.Result<T, E>;
    type Proposal = Types.Proposal;
    type ProposalId = Types.ProposalId;
    type Vote = Types.Vote;

    // Stable storage for upgrades
    private stable var nextProposalId : Nat = 1;
    private stable var proposalsEntries : [(ProposalId, Proposal)] = [];
    private stable var votesEntries : [(Text, Vote)] = []; // Key: proposalId_voter
    private stable var proposalTemplatesEntries : [(Text, ProposalTemplate)] = [];

    // Runtime storage
    private var proposals = HashMap.HashMap<ProposalId, Proposal>(100, Nat.equal, func(n: Nat) : Nat32 { Nat32.fromNat(n) });
    private var votes = HashMap.HashMap<Text, Vote>(500, Text.equal, Text.hash);
    private var proposalTemplates = HashMap.HashMap<Text, ProposalTemplate>(10, Text.equal, Text.hash);

    // Proposal template type
    type ProposalTemplate = {
        id: Text;
        name: Text;
        description: Text;
        category: Text;
        requiredFields: [Text];
        votingPeriod: Nat;
        quorumThreshold: Nat;
        approvalThreshold: Nat;
        isActive: Bool;
    };

    // Proposal categories
    private let proposalCategories = [
        "Treasury",
        "Governance",
        "Technical",
        "Community",
        "Partnership",
        "Marketing",
        "Operations"
    ];

    // System functions for upgrades
    system func preupgrade() {
        proposalsEntries := Iter.toArray(proposals.entries());
        votesEntries := Iter.toArray(votes.entries());
        proposalTemplatesEntries := Iter.toArray(proposalTemplates.entries());
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
        proposalTemplates := HashMap.fromIter<Text, ProposalTemplate>(
            proposalTemplatesEntries.vals(), 
            proposalTemplatesEntries.size(), 
            Text.equal, 
            Text.hash
        );
        
        if (proposalTemplates.size() == 0) {
            initializeTemplates();
        };
    };

    // Helper function to parse Nat from Text
    private func parseNat(text: Text) : ?Nat {
        var result : Nat = 0;
        var multiplier : Nat = 1;
        let chars = Text.toIter(text);
        let charArray = Iter.toArray(chars);
        
        if (charArray.size() == 0) return null;
        
        var i = charArray.size();
        while (i > 0) {
            i -= 1;
            let char = charArray[i];
            switch (char) {
                case ('0') { result += 0 * multiplier; };
                case ('1') { result += 1 * multiplier; };
                case ('2') { result += 2 * multiplier; };
                case ('3') { result += 3 * multiplier; };
                case ('4') { result += 4 * multiplier; };
                case ('5') { result += 5 * multiplier; };
                case ('6') { result += 6 * multiplier; };
                case ('7') { result += 7 * multiplier; };
                case ('8') { result += 8 * multiplier; };
                case ('9') { result += 9 * multiplier; };
                case (_) { return null; };
            };
            multiplier *= 10;
        };
        ?result
    };

    // Initialize default proposal templates
    private func initializeTemplates() {
        let templates = [
            {
                id = "treasury_transfer";
                name = "Treasury Transfer";
                description = "Proposal to transfer funds from treasury";
                category = "Treasury";
                requiredFields = ["recipient", "amount", "reason"];
                votingPeriod = 7 * 24 * 60 * 60 * 1_000_000_000; // 7 days
                quorumThreshold = 1000;
                approvalThreshold = 51;
                isActive = true;
            },
            {
                id = "parameter_change";
                name = "Parameter Change";
                description = "Proposal to change governance parameters";
                category = "Governance";
                requiredFields = ["parameter", "newValue", "justification"];
                votingPeriod = 10 * 24 * 60 * 60 * 1_000_000_000; // 10 days
                quorumThreshold = 1500;
                approvalThreshold = 67;
                isActive = true;
            },
            {
                id = "membership_change";
                name = "Membership Change";
                description = "Proposal to add or remove DAO members";
                category = "Community";
                requiredFields = ["member", "action", "role", "justification"];
                votingPeriod = 5 * 24 * 60 * 60 * 1_000_000_000; // 5 days
                quorumThreshold = 800;
                approvalThreshold = 60;
                isActive = true;
            },
            {
                id = "text_proposal";
                name = "Text Proposal";
                description = "General text proposal for discussion";
                category = "Community";
                requiredFields = ["content"];
                votingPeriod = 7 * 24 * 60 * 60 * 1_000_000_000; // 7 days
                quorumThreshold = 500;
                approvalThreshold = 51;
                isActive = true;
            }
        ];

        for (template in templates.vals()) {
            proposalTemplates.put(template.id, template);
        };
    };

    // Initialize templates on first deployment
    if (proposalTemplates.size() == 0) {
        initializeTemplates();
    };

    // Public functions

    // Create proposal from template
    public shared(msg) func createProposalFromTemplate(
        templateId: Text,
        title: Text,
        description: Text,
        proposalData: [(Text, Text)] // Key-value pairs for template fields
    ) : async Result<ProposalId, Text> {
        let caller = msg.caller;

        let template = switch (proposalTemplates.get(templateId)) {
            case (?t) t;
            case null return #err("Template not found");
        };

        if (not template.isActive) {
            return #err("Template is not active");
        };

        // Validate required fields
        let dataMap = HashMap.fromIter<Text, Text>(
            proposalData.vals(),
            proposalData.size(),
            Text.equal,
            Text.hash
        );

        for (field in template.requiredFields.vals()) {
            switch (dataMap.get(field)) {
                case null return #err("Missing required field: " # field);
                case (?value) {
                    if (Text.size(value) == 0) {
                        return #err("Empty value for required field: " # field);
                    };
                };
            };
        };

        // Create proposal type based on template
        let proposalType = switch (templateId) {
            case ("treasury_transfer") {
                let recipient = switch (dataMap.get("recipient")) {
                    case (?r) switch (Principal.fromText(r)) {
                        case (#ok(p)) p;
                        case (#err(_)) return #err("Invalid recipient principal");
                    };
                    case null return #err("Missing recipient");
                };
                let amount = switch (dataMap.get("amount")) {
                    case (?a) switch (parseNat(a)) {
                        case (?n) n;
                        case null return #err("Invalid amount");
                    };
                    case null return #err("Missing amount");
                };
                let reason = switch (dataMap.get("reason")) {
                    case (?r) r;
                    case null return #err("Missing reason");
                };
                #treasuryTransfer({
                    recipient = recipient;
                    amount = amount;
                    reason = reason;
                })
            };
            case ("parameter_change") {
                let parameter = switch (dataMap.get("parameter")) {
                    case (?p) p;
                    case null return #err("Missing parameter");
                };
                let newValue = switch (dataMap.get("newValue")) {
                    case (?v) v;
                    case null return #err("Missing new value");
                };
                #parameterChange({
                    parameter = parameter;
                    newValue = newValue;
                    oldValue = ""; // Would be fetched from current config
                })
            };
            case ("membership_change") {
                let member = switch (dataMap.get("member")) {
                    case (?m) switch (Principal.fromText(m)) {
                        case (#ok(p)) p;
                        case (#err(_)) return #err("Invalid member principal");
                    };
                    case null return #err("Missing member");
                };
                let action = switch (dataMap.get("action")) {
                    case (?"add") #add;
                    case (?"remove") #remove;
                    case (_) return #err("Invalid action, must be 'add' or 'remove'");
                };
                let role = switch (dataMap.get("role")) {
                    case (?r) r;
                    case null return #err("Missing role");
                };
                #membershipChange({
                    member = member;
                    action = action;
                    role = role;
                })
            };
            case (_) {
                let content = switch (dataMap.get("content")) {
                    case (?c) c;
                    case null description;
                };
                #textProposal(content)
            };
        };

        let proposalId = nextProposalId;
        nextProposalId += 1;

        let proposal : Proposal = {
            id = proposalId;
            proposer = caller;
            title = title;
            description = description;
            proposalType = proposalType;
            status = #active;
            votesFor = 0;
            votesAgainst = 0;
            totalVotingPower = 0;
            createdAt = Time.now();
            votingDeadline = Time.now() + template.votingPeriod;
            executionDeadline = ?(Time.now() + template.votingPeriod + (24 * 60 * 60 * 1_000_000_000));
            quorumThreshold = template.quorumThreshold;
            approvalThreshold = template.approvalThreshold;
        };

        proposals.put(proposalId, proposal);
        #ok(proposalId)
    };

    // Vote on proposal with delegation support - FIXED: Updated to use #inFavor
    public shared(msg) func voteWithDelegation(
        proposalId: ProposalId,
        choice: Types.VoteChoice,
        votingPower: Nat,
        delegatedVotes: ?[(Principal, Nat)], // Optional delegated votes
        reason: ?Text
    ) : async Result<(), Text> {
        let caller = msg.caller;
        let voteKey = Nat.toText(proposalId) # "_" # Principal.toText(caller);

        // Check if already voted
        switch (votes.get(voteKey)) {
            case (?_) return #err("Already voted on this proposal");
            case null {};
        };

        let proposal = switch (proposals.get(proposalId)) {
            case (?p) p;
            case null return #err("Proposal not found");
        };

        if (proposal.status != #active) {
            return #err("Proposal is not active");
        };

        if (Time.now() > proposal.votingDeadline) {
            return #err("Voting period has ended");
        };

        // Calculate total voting power including delegated votes
        var totalPower = votingPower;
        switch (delegatedVotes) {
            case (?delegated) {
                for ((delegator, power) in delegated.vals()) {
                    // In real implementation, verify delegation authorization
                    totalPower += power;
                };
            };
            case null {};
        };

        let vote : Vote = {
            voter = caller;
            proposalId = proposalId;
            choice = choice;
            votingPower = totalPower;
            timestamp = Time.now();
            reason = reason;
        };

        votes.put(voteKey, vote);

        // Update proposal vote counts - FIXED: Updated to use #inFavor
        let updatedProposal = switch (choice) {
            case (#inFavor) {
                proposal with {
                    votesFor = proposal.votesFor + totalPower;
                    totalVotingPower = proposal.totalVotingPower + totalPower;
                }
            };
            case (#against) {
                proposal with {
                    votesAgainst = proposal.votesAgainst + totalPower;
                    totalVotingPower = proposal.totalVotingPower + totalPower;
                }
            };
            case (#abstain) {
                proposal with {
                    totalVotingPower = proposal.totalVotingPower + totalPower;
                }
            };
        };

        proposals.put(proposalId, updatedProposal);
        #ok()
    };

    // Batch vote on multiple proposals
    public shared(msg) func batchVote(
        votesToCast: [(ProposalId, Types.VoteChoice, Nat, ?Text)]
    ) : async Result<[Result<(), Text>], Text> {
        let caller = msg.caller;
        let results = Buffer.Buffer<Result<(), Text>>(votesToCast.size());

        for ((proposalId, choice, votingPower, reason) in votesToCast.vals()) {
            let result = await voteWithDelegation(proposalId, choice, votingPower, null, reason);
            results.add(result);
        };

        #ok(Buffer.toArray(results))
    };

    // Query functions

    // Get proposals by category
    public query func getProposalsByCategory(category: Text) : async [Proposal] {
        let filteredProposals = Buffer.Buffer<Proposal>(0);
        for (proposal in proposals.vals()) {
            // In real implementation, you'd store category with proposal
            // For now, we'll derive it from proposal type
            let proposalCategory = getProposalCategory(proposal.proposalType);
            if (proposalCategory == category) {
                filteredProposals.add(proposal);
            };
        };
        Buffer.toArray(filteredProposals)
    };

    // Get trending proposals (most voted recently)
    public query func getTrendingProposals(limit: Nat) : async [Proposal] {
        let allProposals = Iter.toArray(proposals.vals());
        let sortedProposals = Array.sort(allProposals, func(a: Proposal, b: Proposal) : {#less; #equal; #greater} {
            let aScore = a.totalVotingPower + (if (Time.now() - a.createdAt < 24 * 60 * 60 * 1_000_000_000) 1000 else 0);
            let bScore = b.totalVotingPower + (if (Time.now() - b.createdAt < 24 * 60 * 60 * 1_000_000_000) 1000 else 0);
            
            if (aScore > bScore) #less
            else if (aScore < bScore) #greater
            else #equal
        });
        
        if (sortedProposals.size() <= limit) {
            sortedProposals
        } else {
            Array.tabulate<Proposal>(limit, func(i) = sortedProposals[i])
        }
    };

    // Get proposal templates
    public query func getProposalTemplates() : async [ProposalTemplate] {
        let activeTemplates = Buffer.Buffer<ProposalTemplate>(0);
        for (template in proposalTemplates.vals()) {
            if (template.isActive) {
                activeTemplates.add(template);
            };
        };
        Buffer.toArray(activeTemplates)
    };

    // Get template by ID
    public query func getProposalTemplate(templateId: Text) : async ?ProposalTemplate {
        proposalTemplates.get(templateId)
    };

    // Get proposal categories
    public query func getProposalCategories() : async [Text] {
        proposalCategories
    };

    // Get voting statistics for a proposal
    public query func getProposalVotingStats(proposalId: ProposalId) : async ?{
        totalVotes: Nat;
        votesFor: Nat;
        votesAgainst: Nat;
        abstentions: Nat;
        participationRate: Float;
        approvalRate: Float;
        timeRemaining: Int;
    } {
        switch (proposals.get(proposalId)) {
            case (?proposal) {
                let proposalVotes = getProposalVotesInternal(proposalId);
                var abstentions = 0;
                
                for (vote in proposalVotes.vals()) {
                    if (vote.choice == #abstain) {
                        abstentions += vote.votingPower;
                    };
                };

                let participationRate = if (proposal.totalVotingPower > 0) {
                    Float.fromInt(proposal.totalVotingPower) / Float.fromInt(proposal.quorumThreshold) * 100.0
                } else { 0.0 };

                let approvalRate = if (proposal.totalVotingPower > 0) {
                    Float.fromInt(proposal.votesFor) / Float.fromInt(proposal.totalVotingPower) * 100.0
                } else { 0.0 };

                ?{
                    totalVotes = proposalVotes.size();
                    votesFor = proposal.votesFor;
                    votesAgainst = proposal.votesAgainst;
                    abstentions = abstentions;
                    participationRate = participationRate;
                    approvalRate = approvalRate;
                    timeRemaining = proposal.votingDeadline - Time.now();
                }
            };
            case null null;
        }
    };

    // Administrative functions

    // Add new proposal template
    public shared(msg) func addProposalTemplate(template: ProposalTemplate) : async Result<(), Text> {
        // In real implementation, only governance should be able to do this
        proposalTemplates.put(template.id, template);
        #ok()
    };

    // Update proposal template
    public shared(msg) func updateProposalTemplate(templateId: Text, template: ProposalTemplate) : async Result<(), Text> {
        // In real implementation, only governance should be able to do this
        switch (proposalTemplates.get(templateId)) {
            case (?_) {
                proposalTemplates.put(templateId, template);
                #ok()
            };
            case null #err("Template not found");
        }
    };

    // Deactivate proposal template
    public shared(msg) func deactivateProposalTemplate(templateId: Text) : async Result<(), Text> {
        // In real implementation, only governance should be able to do this
        switch (proposalTemplates.get(templateId)) {
            case (?template) {
                let updatedTemplate = template with { isActive = false };
                proposalTemplates.put(templateId, updatedTemplate);
                #ok()
            };
            case null #err("Template not found");
        }
    };

    // Helper functions
    private func getProposalCategory(proposalType: Types.ProposalType) : Text {
        switch (proposalType) {
            case (#treasuryTransfer(_)) "Treasury";
            case (#parameterChange(_)) "Governance";
            case (#membershipChange(_)) "Community";
            case (#textProposal(_)) "Community";
        }
    };

    private func getProposalVotesInternal(proposalId: ProposalId) : [Vote] {
        let proposalVotes = Buffer.Buffer<Vote>(0);
        for (vote in votes.vals()) {
            if (vote.proposalId == proposalId) {
                proposalVotes.add(vote);
            };
        };
        Buffer.toArray(proposalVotes)
    };
}