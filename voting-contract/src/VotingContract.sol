// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract VotingContract {
    // Estrutura para armazenar dados dos candidatos
    struct Candidate {
        uint256 id;
        string name;
        string description;
        string proposal1;
        string proposal2;
        string proposal3;
        string party;
        string imageUrl;
        uint256 voteCount;
    }

    // Variáveis de estado
    address public owner;
    uint256 public constant VOTE_FEE = 0.025 ether;
    uint256 public totalVotes;
    uint256 public totalFunds;
    uint256 public candidateCount;
    bool public votingActive;

    // Mapeamentos
    mapping(uint256 => Candidate) public candidates;
    mapping(address => bool) public hasVoted;
    mapping(address => uint256) public votedFor;

    // Eventos
    event VoteCast(address indexed voter, uint256 indexed candidateId, uint256 timestamp);
    event VotingStatusChanged(bool active);

    // Modificadores
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier votingIsActive() {
        require(votingActive, "Voting is not active");
        _;
    }

    modifier hasNotVoted() {
        require(!hasVoted[msg.sender], "You have already voted");
        _;
    }

    modifier validCandidate(uint256 candidateId) {
        require(candidateId > 0 && candidateId <= candidateCount, "Invalid candidate ID");
        _;
    }

    constructor() {
        owner = msg.sender;
        votingActive = true;
        
        // Inicializar candidatos padrão
        _addCandidate("Alice Johnson", "Experienced leader with 10 years in public service", "Proposal 1", "Proposal 2", "Proposal 3", "Party 1", "https://images.unsplash.com/photo-1657727534676-cac1bb160d64?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVzc29hJTIwZXNjcml0b3Jpb3xlbnwwfHwwfHx8Mg%3D%3D&auto=format&fit=crop&q=60&w=900");
        _addCandidate("Bob Smith", "Tech entrepreneur focused on innovation", "Proposal 1", "Proposal 2", "Proposal 3", "Party 2", "https://images.unsplash.com/photo-1555097074-b16ec85d6b3e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVzc29hJTIwdGVybm98ZW58MHx8MHx8fDI%3D&auto=format&fit=crop&q=60&w=900");
        _addCandidate("Carol Davis", "Environmental advocate and policy expert", "Proposal 1", "Proposal 2", "Proposal 3", "Party 3", "https://images.unsplash.com/photo-1666867936058-de34bfd5b320?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBlc3NvYSUyMHRlcm5vfGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=900");
        _addCandidate("David Wilson", "Former military officer turned public servant", "Proposal 1", "Proposal 2", "Proposal 3", "Party 4", "https://images.unsplash.com/photo-1751594218875-f1d18f8db54d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlc3NvYSUyMHRlcm5vfGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=900");
    }

    // Função interna para adicionar candidatos
    function _addCandidate(string memory _name, string memory _description, string memory _proposal1, string memory _proposal2, string memory _proposal3, string memory _party, string memory _imageUrl) internal {
        candidateCount++;
        candidates[candidateCount] = Candidate({
            id: candidateCount,
            name: _name,
            description: _description,
            proposal1: _proposal1,
            proposal2: _proposal2,
            proposal3: _proposal3,
            party: _party,
            imageUrl: _imageUrl,
            voteCount: 0
        });
    }

    // Função de votar
    function vote(uint256 candidateId) 
        external 
        payable 
        votingIsActive 
        hasNotVoted 
        validCandidate(candidateId) 
    {
        require(msg.value == VOTE_FEE, "Incorrect vote fee amount");

        hasVoted[msg.sender] = true;
        votedFor[msg.sender] = candidateId;
        candidates[candidateId].voteCount++;
        totalVotes++;
        totalFunds += msg.value;

        emit VoteCast(msg.sender, candidateId, block.timestamp);
    }

    // Função para retornar o total de votos
    function getTotalVotes() external view returns (uint256) {
        return totalVotes;
    }

    // Função para retornar o total de votos de um candidato específico
    function getCandidateVotes(uint256 candidateId) external view validCandidate(candidateId) returns (uint256) {
        return candidates[candidateId].voteCount;
    }

    // Função para retornar informações completas do candidato
    function getCandidate(uint256 candidateId) external view validCandidate(candidateId) returns (Candidate memory) {
        return candidates[candidateId];
    }

    // Função para retornar todos os candidatos
    function getAllCandidates() external view returns (Candidate[] memory) {
        Candidate[] memory allCandidates = new Candidate[](candidateCount);
        for (uint256 i = 1; i <= candidateCount; i++) {
            allCandidates[i - 1] = candidates[i];
        }
        return allCandidates;
    }

    // Função para retornar o candidato com mais votos
    function getWinner() external view returns (Candidate memory winner) {
        require(candidateCount > 0, "No candidates available");
        
        uint256 maxVotes = 0;
        uint256 winnerId = 1;
        
        for (uint256 i = 1; i <= candidateCount; i++) {
            if (candidates[i].voteCount > maxVotes) {
                maxVotes = candidates[i].voteCount;
                winnerId = i;
            }
        }
        
        return candidates[winnerId];
    }

    // Função para retornar o saldo do contrato
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // Função para retornar se um endereço já votou
    function getHasVoted(address voter) external view returns (bool) {
        return hasVoted[voter];
    }

    // Função para retornar em qual candidato um endereço votou
    function getVotedFor(address voter) external view returns (uint256) {
        require(hasVoted[voter], "Address has not voted yet");
        return votedFor[voter];
    }

    // Função para retornar estatísticas gerais da votação
    function getVotingStatistics() external view returns (uint256, uint256, uint256) {
        return (totalVotes, totalFunds, candidateCount);
    }

    // Função para ativar/desativar votação (apenas owner)
    function toggleVoting() external onlyOwner {
        votingActive = !votingActive;
        emit VotingStatusChanged(votingActive);
    }

    // Função para retirar fundos (apenas owner)
    function withdrawFunds() external onlyOwner {
        require(address(this).balance > 0, "No funds to withdraw");
        payable(owner).transfer(address(this).balance);
    }
}
