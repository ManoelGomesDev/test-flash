"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Coins } from "lucide-react"
import type { Candidate } from "@/app/page"
import Image from "next/image"

interface VoteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  candidate: Candidate | null
}

export function VoteConfirmationModal({ isOpen, onClose, onConfirm, candidate }: VoteConfirmationModalProps) {
  if (!candidate) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Confirmar Voto</DialogTitle>
          <DialogDescription>Revise sua escolha antes de confirmar o voto na blockchain</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border border-border">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
              <Image src={candidate.image || "/placeholder.svg"} alt={candidate.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground">{candidate.name}</h3>
              <Badge variant="secondary" className="mt-1">
                {candidate.party}
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">Custo do voto</span>
              </div>
              <span className="text-lg font-bold text-primary">0.025 ETH</span>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/30">
              <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Seu voto será registrado permanentemente na blockchain Ethereum. Esta ação não pode ser desfeita após a
                confirmação.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onConfirm} className="gap-2">
            Confirmar Voto
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
