import { contractConfig } from '@/lib/contract-config'
import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'

// ===== READ HOOKS (View Functions) =====

/**
 * Hook to get all candidates from the contract
 */
export function useGetAllCandidates() {
    const { data, isLoading, error, refetch } = useReadContract({
        address: contractConfig.address,
        abi: contractConfig.abi,
        functionName: 'getAllCandidates'
    })

    return { data, isLoading, error, refetch }
}

/**
 * Hook to get a specific candidate by ID
 */
export function useGetCandidate(candidateId: number) {
    const { data, isLoading, error, refetch } = useReadContract({
        address: contractConfig.address,
        abi: contractConfig.abi,
        functionName: 'getCandidate',
        args: [BigInt(candidateId)]
    })

    return { data, isLoading, error, refetch }
}

/**
 * Hook to get vote count for a specific candidate
 */
export function useGetCandidateVotes(candidateId: number) {
    const { data, isLoading, error, refetch } = useReadContract({
        address: contractConfig.address,
        abi: contractConfig.abi,
        functionName: 'getCandidateVotes',
        args: [BigInt(candidateId)]
    })

    return { data, isLoading, error, refetch }
}

/**
 * Hook to get the vote fee amount
 */
export function useGetVoteFee() {
    const { data, isLoading, error } = useReadContract({
        address: contractConfig.address,
        abi: contractConfig.abi,
        functionName: 'VOTE_FEE'
    })

    return { data, isLoading, error }
}

/**
 * Hook to get total votes in the contract
 */
export function useGetTotalVotes() {
    const { data, isLoading, error, refetch } = useReadContract({
        address: contractConfig.address,
        abi: contractConfig.abi,
        functionName: 'getTotalVotes'
    })

    return { data, isLoading, error, refetch }
}

/**
 * Hook to get contract balance
 */
export function useGetContractBalance() {
    const { data, isLoading, error, refetch } = useReadContract({
        address: contractConfig.address,
        abi: contractConfig.abi,
        functionName: 'getContractBalance'
    })

    return { data, isLoading, error, refetch }
}

/**
 * Hook to check if voting is active
 */
export function useIsVotingActive() {
    const { data, isLoading, error, refetch } = useReadContract({
        address: contractConfig.address,
        abi: contractConfig.abi,
        functionName: 'votingActive'
    })

    return { data: data as boolean, isLoading, error, refetch }
}

/**
 * Hook to check if a specific address has voted
 */
export function useHasVoted(address?: `0x${string}`) {
    const { data, isLoading, error, refetch } = useReadContract({
        address: contractConfig.address,
        abi: contractConfig.abi,
        functionName: 'getHasVoted',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address
        }
    })

    return { data: data as boolean, isLoading, error, refetch }
}

/**
 * Hook to get which candidate an address voted for
 */
export function useGetVotedFor(address?: `0x${string}`) {
    const { data, isLoading, error, refetch } = useReadContract({
        address: contractConfig.address,
        abi: contractConfig.abi,
        functionName: 'getVotedFor',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address
        }
    })

    return { data, isLoading, error, refetch }
}

/**
 * Hook to get voting statistics (totalVotes, totalFunds, candidateCount)
 */
export function useGetVotingStatistics() {
    const { data, isLoading, error, refetch } = useReadContract({
        address: contractConfig.address,
        abi: contractConfig.abi,
        functionName: 'getVotingStatistics'
    })

    return { data, isLoading, error, refetch }
}

/**
 * Hook to get the winning candidate
 */
export function useGetWinner() {
    const { data, isLoading, error, refetch } = useReadContract({
        address: contractConfig.address,
        abi: contractConfig.abi,
        functionName: 'getWinner'
    })

    return { data, isLoading, error, refetch }
}

/**
 * Hook to get candidate count
 */
export function useGetCandidateCount() {
    const { data, isLoading, error, refetch } = useReadContract({
        address: contractConfig.address,
        abi: contractConfig.abi,
        functionName: 'candidateCount'
    })

    return { data, isLoading, error, refetch }
}

/**
 * Hook to get contract owner
 */
export function useGetOwner() {
    const { data, isLoading, error } = useReadContract({
        address: contractConfig.address,
        abi: contractConfig.abi,
        functionName: 'owner'
    })

    return { data, isLoading, error }
}

/**
 * Hook to get total funds in contract
 */
export function useGetTotalFunds() {
    const { data, isLoading, error, refetch } = useReadContract({
        address: contractConfig.address,
        abi: contractConfig.abi,
        functionName: 'totalFunds'
    })

    return { data, isLoading, error, refetch }
}

// ===== WRITE HOOKS (Transaction Functions) =====

/**
 * Hook to vote for a candidate
 * @returns writeContract function, transaction data, and loading states
 */
export function useVote() {
    const { writeContract, data: hash, isPending, error } = useWriteContract()
    
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    })

    const vote = (candidateId: number, voteFee: bigint) => {
        writeContract({
            address: contractConfig.address,
            abi: contractConfig.abi,
            functionName: 'vote',
            args: [BigInt(candidateId)],
            value: voteFee
        })
    }

    return {
        vote,
        hash,
        isPending,
        isConfirming,
        isSuccess,
        error
    }
}

/**
 * Hook to toggle voting status (owner only)
 */
export function useToggleVoting() {
    const { writeContract, data: hash, isPending, error } = useWriteContract()
    
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    })

    const toggleVoting = () => {
        writeContract({
            address: contractConfig.address,
            abi: contractConfig.abi,
            functionName: 'toggleVoting'
        })
    }

    return {
        toggleVoting,
        hash,
        isPending,
        isConfirming,
        isSuccess,
        error
    }
}

/**
 * Hook to withdraw funds (owner only)
 */
export function useWithdrawFunds() {
    const { writeContract, data: hash, isPending, error } = useWriteContract()
    
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    })

    const withdrawFunds = () => {
        writeContract({
            address: contractConfig.address,
            abi: contractConfig.abi,
            functionName: 'withdrawFunds'
        })
    }

    return {
        withdrawFunds,
        hash,
        isPending,
        isConfirming,
        isSuccess,
        error
    }
}

// ===== COMBINED HOOKS (Convenience Hooks) =====

/**
 * Hook to get user's voting status
 * Returns whether the user has voted and which candidate they voted for
 */
export function useUserVotingStatus() {
    const { address } = useAccount()
    const { data: hasVoted, isLoading: isLoadingHasVoted, refetch: refetchHasVoted } = useHasVoted(address)
    const { data: votedFor, isLoading: isLoadingVotedFor, refetch: refetchVotedFor } = useGetVotedFor(address)

    return {
        hasVoted,
        votedFor,
        isLoading: isLoadingHasVoted || isLoadingVotedFor,
        refetch: () => {
            refetchHasVoted()
            refetchVotedFor()
        }
    }
}