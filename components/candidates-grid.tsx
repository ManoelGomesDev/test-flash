"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Vote, CheckCircle2, Check } from "lucide-react"
import type { Candidate } from "@/app/page"
import { useUserVotingStatus } from '@/hooks/use-contract'
import Image from "next/image"

interface CandidatesGridProps {
  candidates: Candidate[]
  onVote: (candidate: Candidate) => void
}

export function CandidatesGrid({ candidates, onVote }: CandidatesGridProps) {
  const { hasVoted, votedFor } = useUserVotingStatus()
  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-balance">Candidatos</h2>
        <p className="text-muted-foreground text-pretty">Conheça as propostas e vote no seu candidato preferido</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {candidates.map((candidate) => {
          const isVotedFor = hasVoted && Number(votedFor) === candidate.id
          
          return (
            <Card
              key={candidate.id}
              className={`overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/50 ${
                isVotedFor ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10">
                <Image src={candidate.image || "/placeholder.svg"} alt={candidate.name} fill className="object-cover" />
                <div className="absolute top-3 right-3 flex gap-2">
                  {isVotedFor && (
                    <Badge className="bg-primary text-primary-foreground">
                      <Check className="w-3 h-3 mr-1" />
                      Seu voto
                    </Badge>
                  )}
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                    {candidate.votes} votos
                  </Badge>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{candidate.name}</h3>
                  <p className="text-sm text-muted-foreground">{candidate.party}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">Propostas:</p>
                  <ul className="space-y-2">
                    {candidate.proposals.map((proposal, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{proposal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  onClick={() => onVote(candidate)} 
                  className="w-full gap-2" 
                  size="lg"
                  disabled={hasVoted}
                  variant={isVotedFor ? "secondary" : "default"}
                >
                  {isVotedFor ? (
                    <>
                      <Check className="w-4 h-4" />
                      Votado
                    </>
                  ) : hasVoted ? (
                    <>
                      <Vote className="w-4 h-4" />
                      Já votou
                    </>
                  ) : (
                    <>
                      <Vote className="w-4 h-4" />
                      Votar
                    </>
                  )}
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
