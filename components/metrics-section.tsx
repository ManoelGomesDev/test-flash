import { Card } from "@/components/ui/card"
import { TrendingUp, Users, Coins } from "lucide-react"

interface MetricsSectionProps {
  totalVotes: number
  totalRaised: number
}

export function MetricsSection({ totalVotes, totalRaised }: MetricsSectionProps) {
  return (
    <section className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-balance">Métricas da Votação</h2>
        <p className="text-muted-foreground text-pretty">Acompanhe em tempo real os dados da eleição na blockchain</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 glass-card border-primary/20">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total de Votos</p>
              <p className="text-4xl font-bold text-foreground">{totalVotes.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Votos registrados</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 glass-card border-accent/20">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total Arrecadado</p>
              <p className="text-4xl font-bold text-foreground">{totalRaised.toFixed(3)}</p>
              <p className="text-xs text-muted-foreground">ETH arrecadados</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Coins className="w-6 h-6 text-accent" />
            </div>
          </div>
        </Card>

      </div>
    </section>
  )
}
