import type { FHEVMConfig } from '@universal-fhevm/core'

export const fhevmConfig: FHEVMConfig = {
  chainId: 11155111, // Sepolia testnet
  networkUrl: 'https://sepolia.public.blastapi.io',
  gatewayUrl: 'https://gateway.sepolia.zama.ai/',
  aclAddress: '0x687820221192C5B662b25367F70076A37bc79b6c',
  cacheEnabled: true,
  autoInit: true,
}
