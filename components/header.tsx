"use client"

import { Button } from "@/components/ui/button"
import { Wallet, ExternalLink } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface HeaderProps {
  account: string | null
  isConnecting: boolean
  onConnect: () => void
}

export function Header({ account, isConnecting, onConnect }: HeaderProps) {
  const CONTRACT_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
  const ETHERSCAN_URL = `https://etherscan.io/address/${CONTRACT_ADDRESS}`

  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-6 h-6 text-primary-foreground"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">VoteChain</h1>
              <p className="text-xs text-muted-foreground">Votação Transparente</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
              <a href={ETHERSCAN_URL} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">Contrato</span>
              </a>
            </Button>

            {account ? (
              <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-sm font-mono text-primary">
                  {account.slice(0, 6)}...{account.slice(-4)}
                </p>
              </div>
            ) : (
              <Button onClick={onConnect} disabled={isConnecting} className="gap-2">
                <Wallet className="w-4 h-4" />
                {isConnecting ? "Conectando..." : "Conectar Carteira"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
