
import { useAccount, useDisconnect } from 'wagmi'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'
import { toast } from 'sonner'

export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  const handleDisconnect = () => {
    disconnect()
    toast.info("Carteira desconectada", {
      description: "Você foi desconectado com sucesso",
    })
  }

  if (!address) return null

  return (
    <>
      <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm font-mono text-primary">
          {address.slice(0, 6)}...{address.slice(-4)}
        </p>
      </div>
      <Button onClick={handleDisconnect} className="gap-2" variant="outline">
        <LogOut className="w-4 h-4" />
        Desconectar
      </Button>
    </>
  )
}