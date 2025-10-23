// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {VotingContract} from "../src/VotingContract.sol";

contract VotingContractTest is Test {
    VotingContract public votingContract;
    address public owner;
    address public voter1;
    address public voter2;
    address public voter3;

    uint256 public constant VOTE_FEE = 0.025 ether;

    // Função para receber ether no contrato de teste
    receive() external payable {}

    function setUp() public {
        owner = address(this);
        voter1 = makeAddr("voter1");
        voter2 = makeAddr("voter2");
        voter3 = makeAddr("voter3");

        votingContract = new VotingContract();
        
        // Dar ether para os voters
        vm.deal(voter1, 1 ether);
        vm.deal(voter2, 1 ether);
        vm.deal(voter3, 1 ether);
    }

    // Teste: Inicialização das variáveis de estado
    function test_InitializationOfStateVariables() public {
        assertEq(votingContract.owner(), owner);
        assertEq(votingContract.VOTE_FEE(), VOTE_FEE);
        assertEq(votingContract.totalVotes(), 0);
        assertEq(votingContract.totalFunds(), 0);
        assertEq(votingContract.candidateCount(), 4); // 4 candidatos pré-definidos
        assertTrue(votingContract.votingActive());
    }

    // Teste: Retorno de todos os candidatos
    function test_GetAllCandidates() public {
        VotingContract.Candidate[] memory candidates = votingContract.getAllCandidates();
        
        assertEq(candidates.length, 4);
        assertEq(candidates[0].id, 1);
        assertEq(candidates[0].name, "Alice Johnson");
        assertEq(candidates[0].voteCount, 0);
        
        assertEq(candidates[1].id, 2);
        assertEq(candidates[1].name, "Bob Smith");
        assertEq(candidates[1].voteCount, 0);
        
        assertEq(candidates[2].id, 3);
        assertEq(candidates[2].name, "Carol Davis");
        assertEq(candidates[2].voteCount, 0);
        
        assertEq(candidates[3].id, 4);
        assertEq(candidates[3].name, "David Wilson");
        assertEq(candidates[3].voteCount, 0);
    }

    // Teste: Retorno de dados de um candidato específico
    function test_GetSpecificCandidate() public {
        VotingContract.Candidate memory candidate = votingContract.getCandidate(1);
        
        assertEq(candidate.id, 1);
        assertEq(candidate.name, "Alice Johnson");
        assertEq(candidate.description, "Experienced leader with 10 years in public service");
        assertEq(candidate.imageUrl, "professional-woman-leader.png");
        assertEq(candidate.voteCount, 0);
    }

    // Teste: Sucesso de um voto
    function test_SuccessfulVote() public {
        vm.startPrank(voter1);
        
        // Verificar estado antes do voto
        assertFalse(votingContract.hasVoted(voter1));
        assertEq(votingContract.getCandidateVotes(1), 0);
        assertEq(votingContract.getTotalVotes(), 0);
        
        // Realizar voto
        votingContract.vote{value: VOTE_FEE}(1);
        
        // Verificar estado após o voto
        assertTrue(votingContract.hasVoted(voter1));
        assertEq(votingContract.votedFor(voter1), 1);
        assertEq(votingContract.getCandidateVotes(1), 1);
        assertEq(votingContract.getTotalVotes(), 1);
        assertEq(votingContract.getContractBalance(), VOTE_FEE);
        
        vm.stopPrank();
    }

    // Teste: Voto com valor da taxa incorreto
    function test_VoteWithIncorrectFee() public {
        vm.startPrank(voter1);
        
        // Tentar votar com taxa incorreta (muito baixa)
        vm.expectRevert("Incorrect vote fee amount");
        votingContract.vote{value: 0.01 ether}(1);
        
        // Tentar votar com taxa incorreta (muito alta)
        vm.expectRevert("Incorrect vote fee amount");
        votingContract.vote{value: 0.1 ether}(1);
        
        vm.stopPrank();
    }

    // Teste: Voto duplicado
    function test_DuplicateVote() public {
        vm.startPrank(voter1);
        
        // Primeiro voto (deve funcionar)
        votingContract.vote{value: VOTE_FEE}(1);
        
        // Segundo voto (deve falhar)
        vm.expectRevert("You have already voted");
        votingContract.vote{value: VOTE_FEE}(2);
        
        vm.stopPrank();
    }

    // Teste: Obter candidato vencedor
    function test_GetWinner() public {
        // Votos para diferentes candidatos
        vm.prank(voter1);
        votingContract.vote{value: VOTE_FEE}(1); // Alice: 1 voto
        
        vm.prank(voter2);
        votingContract.vote{value: VOTE_FEE}(2); // Bob: 1 voto
        
        vm.prank(voter3);
        votingContract.vote{value: VOTE_FEE}(1); // Alice: 2 votos total
        
        VotingContract.Candidate memory winner = votingContract.getWinner();
        
        assertEq(winner.id, 1);
        assertEq(winner.name, "Alice Johnson");
        assertEq(winner.voteCount, 2);
    }

    // Teste: Obter estatísticas das votações
    function test_GetVotingStatistics() public {
        // Realizar alguns votos
        vm.prank(voter1);
        votingContract.vote{value: VOTE_FEE}(1);
        
        vm.prank(voter2);
        votingContract.vote{value: VOTE_FEE}(2);
        
        (uint256 totalVotes, uint256 totalFunds, uint256 candidateCount) = votingContract.getVotingStatistics();
        
        assertEq(totalVotes, 2);
        assertEq(totalFunds, VOTE_FEE * 2);
        assertEq(candidateCount, 4);
    }

    // Teste: Validação de candidato inválido
    function test_InvalidCandidateId() public {
        vm.startPrank(voter1);
        
        // Tentar votar em candidato inexistente (ID 0)
        vm.expectRevert("Invalid candidate ID");
        votingContract.vote{value: VOTE_FEE}(0);
        
        // Tentar votar em candidato inexistente (ID muito alto)
        vm.expectRevert("Invalid candidate ID");
        votingContract.vote{value: VOTE_FEE}(10);
        
        vm.stopPrank();
    }

    // Teste: Verificar se endereço votou
    function test_HasVotedFunction() public {
        // Antes do voto
        assertFalse(votingContract.getHasVoted(voter1));
        
        // Após o voto
        vm.prank(voter1);
        votingContract.vote{value: VOTE_FEE}(1);
        
        assertTrue(votingContract.getHasVoted(voter1));
    }

    // Teste: Verificar em qual candidato votou
    function test_VotedForFunction() public {
        vm.prank(voter1);
        votingContract.vote{value: VOTE_FEE}(3);
        
        assertEq(votingContract.getVotedFor(voter1), 3);
    }

    // Teste: Função votedFor para endereço que não votou
    function test_VotedForNotVoted() public {
        vm.expectRevert("Address has not voted yet");
        votingContract.getVotedFor(voter1);
    }

    // Teste: Apenas owner pode alternar votação
    function test_OnlyOwnerCanToggleVoting() public {
        // Owner pode alternar
        assertTrue(votingContract.votingActive());
        votingContract.toggleVoting();
        assertFalse(votingContract.votingActive());
        
        // Não-owner não pode alternar
        vm.prank(voter1);
        vm.expectRevert("Only owner can call this function");
        votingContract.toggleVoting();
    }

    // Teste: Não pode votar quando votação está inativa
    function test_CannotVoteWhenInactive() public {
        // Desativar votação
        votingContract.toggleVoting();
        
        vm.prank(voter1);
        vm.expectRevert("Voting is not active");
        votingContract.vote{value: VOTE_FEE}(1);
    }

    // Teste: Retirada de fundos pelo owner
    function test_WithdrawFunds() public {
        // Realizar alguns votos para gerar fundos
        vm.prank(voter1);
        votingContract.vote{value: VOTE_FEE}(1);
        
        vm.prank(voter2);
        votingContract.vote{value: VOTE_FEE}(2);
        
        uint256 contractBalance = votingContract.getContractBalance();
        assertEq(contractBalance, VOTE_FEE * 2);
        
        uint256 ownerBalanceBefore = owner.balance;
        
        // Owner retira os fundos
        votingContract.withdrawFunds();
        
        assertEq(votingContract.getContractBalance(), 0);
        assertEq(owner.balance, ownerBalanceBefore + contractBalance);
    }

    // Teste: Apenas owner pode retirar fundos
    function test_OnlyOwnerCanWithdraw() public {
        vm.prank(voter1);
        votingContract.vote{value: VOTE_FEE}(1);
        
        vm.prank(voter1);
        vm.expectRevert("Only owner can call this function");
        votingContract.withdrawFunds();
    }

    // Teste: Eventos são emitidos corretamente
    function test_VoteEventEmitted() public {
        vm.expectEmit(true, true, false, true);
        emit VotingContract.VoteCast(voter1, 1, block.timestamp);
        
        vm.prank(voter1);
        votingContract.vote{value: VOTE_FEE}(1);
    }
}
