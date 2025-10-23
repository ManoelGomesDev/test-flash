"use client"

import { useConnect } from 'wagmi'
import { Button } from './ui/button'
import { Wallet, Loader2 } from 'lucide-react'

export function WalletOptions() {
  const { connectors, connect, isPending } = useConnect()

  return (
    <Button 
      onClick={() => connect({ connector: connectors[0] })} 
      disabled={isPending} 
      className="gap-2"
    >
      <Wallet className="w-4 h-4" />
      {isPending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Conectando...
        </>
      ) : (
        'Conectar Carteira'
      )}
    </Button>
  )
}