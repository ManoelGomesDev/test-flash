"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { MetricsSection } from "@/components/metrics-section"
import { CandidatesGrid } from "@/components/candidates-grid"
import { RankingSection } from "@/components/ranking-section"
import { VoteConfirmationModal } from "@/components/vote-confirmation-modal"
import { toast } from "sonner"

export type Candidate = {
  id: number
  name: string
  party: string
  image: string
  votes: number
  proposals: string[]
}

export default function Home() {
  const [account, setAccount] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: 1,
      name: "Ana Silva",
      party: "Partido Progressista",
      image: "/professional-woman-politician.jpg",
      votes: 1247,
      proposals: [
        "Investimento em educação digital e tecnologia nas escolas",
        "Programa de incentivo à energia renovável",
        "Criação de hub de inovação e startups",
        "Transparência total com blockchain em gastos públicos",
        "Modernização do transporte público com veículos elétricos",
      ],
    },
    {
      id: 2,
      name: "Carlos Mendes",
      party: "Partido da Inovação",
      image: "/professional-man-politician.jpg",
      votes: 983,
      proposals: [
        "Implementação de governo digital descentralizado",
        "Programa de renda básica universal via blockchain",
        "Incentivos fiscais para empresas de tecnologia",
        "Criação de universidade pública de tecnologia",
        "Sistema de saúde integrado com IA e telemedicina",
      ],
    },
    {
      id: 3,
      name: "Marina Costa",
      party: "Partido Sustentável",
      image: "/professional-woman-leader.png",
      votes: 1456,
      proposals: [
        "Programa de reflorestamento urbano e áreas verdes",
        "Economia circular e gestão inteligente de resíduos",
        "Agricultura urbana e hortas comunitárias",
        "Mobilidade sustentável com ciclovias e transporte limpo",
        "Educação ambiental obrigatória em todas as escolas",
      ],
    },
    {
      id: 4,
      name: "Roberto Alves",
      party: "Partido Digital",
      image: "/professional-executive-man.png",
      votes: 1089,
      proposals: [
        "Conectividade 5G gratuita em toda a cidade",
        "Plataforma de participação cidadã via blockchain",
        "Digitalização completa de serviços públicos",
        "Programa de capacitação em tecnologia para todos",
        "Smart city com IoT e gestão inteligente de recursos",
      ],
    },
  ])

  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0)
  const totalRaised = totalVotes * 0.025

  const connectWallet = async () => {
    setIsConnecting(true)
    try {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        setAccount(accounts[0])
        toast.success("Carteira conectada com sucesso!", {
          description: `${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
        })
      } else {
        toast.error("MetaMask não encontrada", {
          description: "Por favor, instale a extensão MetaMask",
        })
      }
    } catch (error) {
      toast.error("Erro ao conectar carteira", {
        description: "Tente novamente",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const handleVoteClick = (candidate: Candidate) => {
    if (!account) {
      toast.warning("Conecte sua carteira", {
        description: "Você precisa conectar sua carteira MetaMask para votar",
      })
      return
    }
    setSelectedCandidate(candidate)
    setIsModalOpen(true)
  }

  const handleConfirmVote = async () => {
    if (!selectedCandidate) return

    try {
      // Simular transação blockchain
      toast.loading("Processando voto na blockchain...", { id: "vote-tx" })

      // Simular delay de transação
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Atualizar votos
      setCandidates((prev) => prev.map((c) => (c.id === selectedCandidate.id ? { ...c, votes: c.votes + 1 } : c)))

      toast.success("Voto registrado com sucesso!", {
        id: "vote-tx",
        description: `Você votou em ${selectedCandidate.name}. Transação: 0x${Math.random().toString(16).slice(2, 10)}...`,
      })

      setIsModalOpen(false)
      setSelectedCandidate(null)
    } catch (error) {
      toast.error("Erro ao processar voto", {
        id: "vote-tx",
        description: "Tente novamente",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header account={account} isConnecting={isConnecting} onConnect={connectWallet} />

      <main className="container mx-auto px-4 py-8 space-y-12">
        <MetricsSection totalVotes={totalVotes} totalRaised={totalRaised} />

        <CandidatesGrid candidates={candidates} onVote={handleVoteClick} />

        <RankingSection candidates={candidates} />
      </main>

      <VoteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmVote}
        candidate={selectedCandidate}
      />
    </div>
  )
}
