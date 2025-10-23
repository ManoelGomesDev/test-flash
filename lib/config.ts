import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { metaMask, injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia, mainnet],
  connectors: [
    injected(),
    metaMask()
  ],
  transports: {
    [sepolia.id]: http('https://sepolia.infura.io/v3/a370d097f49d497e8cfe8723c02b2cc5'),
    [mainnet.id]: http('https://cloudflare-eth.com'),
  },
  ssr: true,
})