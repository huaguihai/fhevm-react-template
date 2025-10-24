# Universal FHEVM SDK - Next.js Example

This is a demo application showcasing the Universal FHEVM SDK for building confidential dApps with Fully Homomorphic Encryption.

## Features

- 🔒 **Fully Encrypted Operations** - Encrypt data using FHEVM
- 💼 **Wallet Integration** - Connect with MetaMask and other wallets via wagmi
- ⚡ **Type-Safe** - Full TypeScript support
- 🎨 **Modern UI** - Built with Next.js 14 and Tailwind CSS
- 🚀 **Production Ready** - Optimized and ready to deploy

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm 8+
- MetaMask or another Web3 wallet

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## How It Works

### 1. FHEVM Configuration

The app uses the Universal FHEVM SDK with the following configuration:

```typescript
const fhevmConfig = createConfig({
  chainId: 8009, // Zama Devnet
  networkUrl: 'https://devnet.zama.ai',
  gatewayUrl: 'https://gateway.devnet.zama.ai',
  aclAddress: '0xFEE8407e2f5e3Ee68ad77cAE98c434e637f516e5',
})
```

### 2. Provider Setup

The app wraps components with the `FHEVMProvider`:

```typescript
<FHEVMProvider config={fhevmConfig}>
  <YourApp />
</FHEVMProvider>
```

### 3. Using Hooks

Encrypt data using the `useEncrypt` hook:

```typescript
const { encrypt, isPending, data } = useEncrypt({ userAddress })

await encrypt({
  value: 100,
  type: 'uint64',
  contractAddress: '0x...',
})
```

## Project Structure

```
examples/nextjs/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── Providers.tsx      # wagmi + FHEVM providers
│   │   ├── WalletConnect.tsx  # Wallet connection UI
│   │   └── EncryptDemo.tsx    # Encryption demo component
│   └── config/
│       ├── fhevm.ts           # FHEVM configuration
│       └── wagmi.ts           # wagmi configuration
├── package.json
├── next.config.js
└── tailwind.config.js
```

## Key Components

### WalletConnect

Handles wallet connection using wagmi:
- Displays connected address
- Connect/disconnect functionality
- Supports multiple connectors

### EncryptDemo

Demonstrates FHEVM encryption:
- Input value and contract address
- Real-time encryption status
- Display encrypted results (handles and proof)
- Error handling and validation

## Learn More

- [Universal FHEVM SDK Documentation](../../README.md)
- [FHEVM Official Docs](https://docs.zama.ai/fhevm)
- [Next.js Documentation](https://nextjs.org/docs)
- [wagmi Documentation](https://wagmi.sh)

## Deployment

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

### Environment Variables

No environment variables are required for the demo. For production:

- Update FHEVM configuration in `src/config/fhevm.ts`
- Add your contract addresses
- Configure the appropriate network

## Troubleshooting

### FHEVM Not Ready

If the FHEVM instance shows "Initializing..." for too long:
- Check network connectivity
- Verify the configuration URLs are accessible
- Check browser console for errors

### Wallet Connection Issues

- Ensure MetaMask is installed
- Check that you're on the correct network
- Try refreshing the page

## Contributing

This example is part of the Universal FHEVM SDK project. See the main [README](../../README.md) for contribution guidelines.

## License

MIT
