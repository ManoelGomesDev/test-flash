"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { MetricsSection } from "@/components/metrics-section"
import { CandidatesGrid } from "@/components/candidates-grid"
import { RankingSection } from "@/components/ranking-section"
import { VoteConfirmationModal } from "@/components/vote-confirmation-modal"
import { 
  useGetAllCandidates, 
  useGetVoteFee, 
  useVote,
  useUserVotingStatus 
} from '@/hooks/use-contract'
import { toast } from "sonner"
import { formatEther } from 'viem'

export type Candidate = {
  id: number
  name: string
  party: string
  image: string
  votes: number
  proposals: string[]
}

export default function Home() {
  // Hooks do contrato
  const { data: candidatesData, isLoading, error, refetch } = useGetAllCandidates()
  const { data: voteFee } = useGetVoteFee()
  const { vote, isPending, isConfirming, isSuccess, hash } = useVote()
  const { hasVoted, votedFor, refetch: refetchVotingStatus } = useUserVotingStatus()
  
  // Estados locais
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Transformar dados do contrato para o formato esperado
  const candidates: Candidate[] = candidatesData 
    ? (candidatesData as any[]).map((c: any) => ({
        id: Number(c.id),
        name: c.name,
        party: c.party,
        image: c.imageUrl || "/placeholder.svg",
        votes: Number(c.voteCount),
        proposals: [c.proposal1, c.proposal2, c.proposal3].filter(Boolean),
      }))
    : []

  // Calcular métricas
  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0)
  const totalRaised = voteFee ? Number(formatEther(voteFee)) * totalVotes : 0

  // Efeito para monitorar sucesso do voto
  useEffect(() => {
    if (isSuccess && hash) {
      toast.success("Voto registrado com sucesso!", {
        description: `Transação: ${hash.slice(0, 10)}...${hash.slice(-8)}`,
        duration: 5000,
      })
      
      // Atualizar dados
      refetch()
      refetchVotingStatus()
      
      // Fechar modal
      setIsModalOpen(false)
      setSelectedCandidate(null)
    }
  }, [isSuccess, hash, refetch, refetchVotingStatus])

  const handleVoteClick = (candidate: Candidate) => {
    // Verificar se o usuário já votou
    if (hasVoted) {
      toast.warning("Você já votou", {
        description: "Cada endereço pode votar apenas uma vez",
      })
      return
    }
    
    setSelectedCandidate(candidate)
    setIsModalOpen(true)
  }

  const handleConfirmVote = () => {
    if (!selectedCandidate || !voteFee) return

    try {
      toast.loading("Processando voto na blockchain...", { id: "vote-tx" })
      
      // Chamar função de voto do contrato
      vote(selectedCandidate.id, voteFee)
      
    } catch (error) {
      toast.error("Erro ao processar voto", {
        id: "vote-tx",
        description: error instanceof Error ? error.message : "Tente novamente",
      })
    }
  }

  // Estados de loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-lg text-muted-foreground">Carregando candidatos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-lg text-red-500">Erro ao carregar candidatos</p>
          <p className="text-sm text-muted-foreground">Verifique sua conexão com a rede</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-12">
        <MetricsSection totalVotes={totalVotes} totalRaised={totalRaised} />

        <CandidatesGrid candidates={candidates || []} onVote={handleVoteClick} />

        <RankingSection candidates={candidates} />
      </main>

      <VoteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmVote}
        candidate={selectedCandidate}
        voteFee={voteFee}
        isProcessing={isPending || isConfirming}
      />
    </div>
  )
}
