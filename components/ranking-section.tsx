import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award } from "lucide-react"
import type { Candidate } from "@/app/page"
import Image from "next/image"

interface RankingSectionProps {
  candidates: Candidate[]
}

export function RankingSection({ candidates }: RankingSectionProps) {
  const sortedCandidates = [...candidates].sort((a, b) => b.votes - a.votes)
  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0)

  const getRankIcon = (position: number) => {
    switch (position) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-500" />
      case 1:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 2:
        return <Award className="w-5 h-5 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-muted-foreground">{position + 1}</span>
    }
  }

  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-balance">Ranking de Candidatos</h2>
        <p className="text-muted-foreground text-pretty">Classificação em tempo real baseada nos votos recebidos</p>
      </div>

      <Card className="p-6 glass-card">
        <div className="space-y-4">
          {sortedCandidates.map((candidate, index) => {
            const percentage = ((candidate.votes / totalVotes) * 100).toFixed(1)

            return (
              <div
                key={candidate.id}
                className="flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                  {getRankIcon(index)}
                </div>

                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                  <Image
                    src={candidate.image || "/placeholder.svg"}
                    alt={candidate.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground truncate">{candidate.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {candidate.party}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground min-w-[3rem] text-right">
                      {percentage}%
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">{candidate.votes.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">votos</p>
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </section>
  )
}
