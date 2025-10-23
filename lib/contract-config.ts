export const contractConfig = {
    address: "0xA64386e2D05B826458B3E594FE2D6E77aBC7c191",
    abi: [
        {
            "type": "constructor",
            "inputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "VOTE_FEE",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "candidateCount",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "candidates",
            "inputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [
                {
                    "name": "id",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "name",
                    "type": "string",
                    "internalType": "string"
                },
                {
                    "name": "description",
                    "type": "string",
                    "internalType": "string"
                },
                {
                    "name": "proposal1",
                    "type": "string",
                    "internalType": "string"
                },
                {
                    "name": "proposal2",
                    "type": "string",
                    "internalType": "string"
                },
                {
                    "name": "proposal3",
                    "type": "string",
                    "internalType": "string"
                },
                {
                    "name": "party",
                    "type": "string",
                    "internalType": "string"
                },
                {
                    "name": "imageUrl",
                    "type": "string",
                    "internalType": "string"
                },
                {
                    "name": "voteCount",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getAllCandidates",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "tuple[]",
                    "internalType": "struct VotingContract.Candidate[]",
                    "components": [
                        {
                            "name": "id",
                            "type": "uint256",
                            "internalType": "uint256"
                        },
                        {
                            "name": "name",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "description",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "proposal1",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "proposal2",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "proposal3",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "party",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "imageUrl",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "voteCount",
                            "type": "uint256",
                            "internalType": "uint256"
                        }
                    ]
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getCandidate",
            "inputs": [
                {
                    "name": "candidateId",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "tuple",
                    "internalType": "struct VotingContract.Candidate",
                    "components": [
                        {
                            "name": "id",
                            "type": "uint256",
                            "internalType": "uint256"
                        },
                        {
                            "name": "name",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "description",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "proposal1",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "proposal2",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "proposal3",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "party",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "imageUrl",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "voteCount",
                            "type": "uint256",
                            "internalType": "uint256"
                        }
                    ]
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getCandidateVotes",
            "inputs": [
                {
                    "name": "candidateId",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getContractBalance",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getHasVoted",
            "inputs": [
                {
                    "name": "voter",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "bool",
                    "internalType": "bool"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getTotalVotes",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getVotedFor",
            "inputs": [
                {
                    "name": "voter",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getVotingStatistics",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getWinner",
            "inputs": [],
            "outputs": [
                {
                    "name": "winner",
                    "type": "tuple",
                    "internalType": "struct VotingContract.Candidate",
                    "components": [
                        {
                            "name": "id",
                            "type": "uint256",
                            "internalType": "uint256"
                        },
                        {
                            "name": "name",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "description",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "proposal1",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "proposal2",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "proposal3",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "party",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "imageUrl",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "voteCount",
                            "type": "uint256",
                            "internalType": "uint256"
                        }
                    ]
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "hasVoted",
            "inputs": [
                {
                    "name": "",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "bool",
                    "internalType": "bool"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "owner",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "toggleVoting",
            "inputs": [],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "totalFunds",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "totalVotes",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "vote",
            "inputs": [
                {
                    "name": "candidateId",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [],
            "stateMutability": "payable"
        },
        {
            "type": "function",
            "name": "votedFor",
            "inputs": [
                {
                    "name": "",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "votingActive",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "bool",
                    "internalType": "bool"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "withdrawFunds",
            "inputs": [],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "event",
            "name": "VoteCast",
            "inputs": [
                {
                    "name": "voter",
                    "type": "address",
                    "indexed": true,
                    "internalType": "address"
                },
                {
                    "name": "candidateId",
                    "type": "uint256",
                    "indexed": true,
                    "internalType": "uint256"
                },
                {
                    "name": "timestamp",
                    "type": "uint256",
                    "indexed": false,
                    "internalType": "uint256"
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "VotingStatusChanged",
            "inputs": [
                {
                    "name": "active",
                    "type": "bool",
                    "indexed": false,
                    "internalType": "bool"
                }
            ],
            "anonymous": false
        }
    ],
} as const;