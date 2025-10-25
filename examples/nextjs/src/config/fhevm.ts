// FHEVM Configuration (exported as plain object to avoid import-time issues)
export const fhevmConfig = {
  chainId: 11155111, // Sepolia testnet
  networkUrl: 'https://sepolia.public.blastapi.io',
  gatewayUrl: 'https://gateway.sepolia.zama.ai/',
  aclAddress: '0x687820221192C5B662b25367F70076A37bc79b6c',
  cacheEnabled: true,
  autoInit: true,
}

// Contract addresses (example)
export const CONTRACTS = {
  // Add your deployed contract addresses here
  EXAMPLE_CONTRACT: '0x0000000000000000000000000000000000000000',
}
