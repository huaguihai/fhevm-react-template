# Universal FHEVM SDK

> A framework-agnostic SDK for building confidential dApps with FHEVM

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Built with Zama](https://img.shields.io/badge/Built%20with-Zama%20FHEVM-blue)](https://www.zama.ai/)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/huaguihai/universal-fhevm-sdk)

[English](./README.md) | [Français](./README.fr.md) | [中文](./README.zh.md)

## 🎯 Overview

Universal FHEVM SDK is a comprehensive, production-ready toolkit that simplifies building privacy-preserving decentralized applications using Zama's Fully Homomorphic Encryption Virtual Machine (FHEVM). Inspired by wagmi's developer experience, this SDK provides a unified, intuitive API across React, Vue, and vanilla JavaScript/Node.js environments.

### Why Universal FHEVM SDK?

- **🎯 Framework-Agnostic Core** - Write once, use anywhere
- **⚛️ React Hooks** - Intuitive hooks with TanStack Query integration
- **💚 Vue 3 Composables** - Reactive composables for Vue applications
- **📦 Vanilla JS/Node.js** - Simple client for any JavaScript environment
- **🔒 Type-Safe** - Full TypeScript support with comprehensive type definitions
- **🚀 Production-Ready** - Built-in caching, request deduplication, error handling
- **📚 Well-Documented** - Extensive docs and working examples
- **🎨 wagmi-Inspired API** - Familiar patterns for web3 developers

## 📦 Packages

| Package | Description | Size | Version |
|---------|-------------|------|---------|
| [@universal-fhevm/core](./packages/core) | Framework-agnostic core | 8.1 KB | `0.1.0` |
| [@universal-fhevm/react](./packages/react) | React hooks + TanStack Query | 4.2 KB | `0.1.0` |
| [@universal-fhevm/vue](./packages/vue) | Vue 3 composables | 3.8 KB | `0.1.0` |
| [@universal-fhevm/vanilla](./packages/vanilla) | Vanilla JS/Node.js client | 1.8 KB | `0.1.0` |

Total: **18 KB** (minified, tree-shakeable)

## 🚀 Quick Start

### Installation

```bash
# For React
npm install @universal-fhevm/react wagmi viem

# For Vue
npm install @universal-fhevm/vue

# For Vanilla JS/Node.js
npm install @universal-fhevm/vanilla
```

### React Example

```tsx
import { FHEVMProvider, useEncrypt, useFHEVM } from '@universal-fhevm/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 1. Create config
const fhevmConfig = {
  chainId: 8009,
  networkUrl: 'https://devnet.zama.ai/',
  gatewayUrl: 'https://gateway.zama.ai/',
  aclAddress: '0xc9990FEfE0c27D31D0C2aa36196b085c0c4d456c',
}

const queryClient = new QueryClient()

// 2. Wrap your app
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FHEVMProvider config={fhevmConfig}>
        <MyComponent />
      </FHEVMProvider>
    </QueryClientProvider>
  )
}

// 3. Use hooks
function MyComponent() {
  const { isReady } = useFHEVM()
  const { encrypt, isPending, data, error } = useEncrypt({
    userAddress: '0x...'
  })

  const handleEncrypt = () => {
    encrypt({
      value: 100,
      type: 'uint64',
      contractAddress: '0x...',
    })
  }

  if (!isReady) return <div>Initializing FHEVM...</div>

  return (
    <div>
      <button onClick={handleEncrypt} disabled={isPending}>
        {isPending ? 'Encrypting...' : 'Encrypt Value'}
      </button>
      {data && <div>Encrypted: {data.handles[0]}</div>}
      {error && <div>Error: {error.message}</div>}
    </div>
  )
}
```

### Vue Example

```vue
<script setup>
import { useFHEVM, useEncrypt } from '@universal-fhevm/vue'

const { isReady } = useFHEVM()
const { encrypt, isPending, data, error } = useEncrypt()

const handleEncrypt = async () => {
  encrypt({
    value: 100,
    type: 'uint64',
    contractAddress: '0x...',
  })
}
</script>

<template>
  <div v-if="!isReady">Initializing FHEVM...</div>
  <div v-else>
    <button @click="handleEncrypt" :disabled="isPending">
      {{ isPending ? 'Encrypting...' : 'Encrypt Value' }}
    </button>
    <div v-if="data">Encrypted: {{ data.handles[0] }}</div>
    <div v-if="error">Error: {{ error.message }}</div>
  </div>
</template>
```

### Vanilla JS/Node.js Example

```typescript
import { FHEVMClient } from '@universal-fhevm/vanilla'

const config = {
  chainId: 8009,
  networkUrl: 'https://devnet.zama.ai/',
  gatewayUrl: 'https://gateway.zama.ai/',
  aclAddress: '0xc9990FEfE0c27D31D0C2aa36196b085c0c4d456c',
}

const client = new FHEVMClient(config)
await client.init()

// Encrypt
const encrypted = await client.encrypt({
  value: 100,
  type: 'uint64',
  contractAddress: '0x...',
  userAddress: '0x...',
})

console.log('Encrypted handles:', encrypted.handles)
console.log('Input proof:', encrypted.inputProof)
```

## 🎬 Live Demo

### Deploy Your Own

#### Quick Deploy (One-Click)

Click the button below to import and deploy this project to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/huaguihai/universal-fhevm-sdk)

> **⚠️ Important**: After clicking the button, you'll need to adjust the settings as described in "Manual Deployment" below, as Vercel may auto-detect this as a Next.js project.

#### Manual Deployment (Recommended)

For a successful deployment, follow these steps:

1. **Visit Vercel Dashboard**
   - Go to [https://vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your `universal-fhevm-sdk` repository

2. **Configure Project Settings** (IMPORTANT!)

   In the "Configure Project" step, override the auto-detected settings:

   | Setting | Value | Note |
   |---------|-------|------|
   | **Framework Preset** | `Other` | ⚠️ Do NOT use "Next.js" even if auto-detected |
   | **Root Directory** | `./` (root) | Leave empty or set to root |
   | **Build Command** | See below ↓ | Use custom command |
   | **Output Directory** | `examples/react-vite/dist` | Static files output |
   | **Install Command** | `pnpm install --no-frozen-lockfile` | Use pnpm |

3. **Build Command** (copy this exactly):
   ```bash
   pnpm install && pnpm --filter @universal-fhevm/core build && pnpm --filter @universal-fhevm/react build && pnpm --filter react-vite build
   ```

4. **Environment Variables** (if needed)
   - No environment variables required for basic deployment
   - Add any custom variables if needed

5. **Click "Deploy"**
   - Vercel will build and deploy your React + Vite demo
   - First deployment takes 2-3 minutes

#### Troubleshooting

**If Vercel auto-detects as Next.js:**
- ✅ Change "Framework Preset" to **Other**
- ✅ Keep "Root Directory" as `./` (repository root)
- ✅ Use the custom Build Command above
- ✅ Set Output Directory to `examples/react-vite/dist`

**Build fails with "vite: command not found":**
- Make sure you're using the full build command that builds SDK packages first
- Verify Install Command is set to use `pnpm`

**Looking for routes-manifest.json:**
- This means Vercel is still detecting as Next.js
- Go back and change Framework Preset to "Other"

### Deployed Demos
- **React + Vite Demo**: [Coming Soon - Add your deployment URL here]
- **Next.js Demo**: [Code Available](./examples/nextjs)

## 💡 Features

### Core Features

- ✅ **Complete FHEVM Workflow**
  - Client initialization with automatic caching
  - Encryption for all FHEVM types: `bool`, `uint8`, `uint16`, `uint32`, `uint64`, `uint128`, `uint256`
  - Batch encryption support
  - Decryption with KMS integration
  - EIP712 token generation

- ✅ **Developer Experience**
  - wagmi-inspired API design
  - Full TypeScript support
  - Comprehensive error handling
  - Built-in loading states
  - Request deduplication

- ✅ **Framework Support**
  - React hooks with TanStack Query
  - Vue 3 composables with reactivity
  - Vanilla JS/Node.js client
  - Server-side rendering compatible

- ✅ **Performance**
  - Tree-shakeable modules
  - Instance caching
  - Optimized bundle sizes
  - Zero unnecessary re-renders

## 📁 Examples

Explore our working example applications:

- **[React + Vite](./examples/react-vite)** - Production-ready React SPA ✅ Working
  - Wallet integration with wagmi
  - Complete encryption demo
  - Modern UI with Tailwind CSS
  - TypeScript + Vite

- **[Next.js](./examples/nextjs)** - Full-stack Next.js application
  - Server components ready
  - Complete code implementation
  - Beautiful UI

## 📚 Documentation

### Getting Started
- [Installation Guide](./docs/installation.md)
- [Quick Start Tutorial](./docs/quick-start.md)
- [Architecture Overview](./ARCHITECTURE.md)

### Framework Guides
- [React Integration](./docs/react-guide.md)
- [Vue Integration](./docs/vue-guide.md)
- [Vanilla JS/Node.js](./docs/vanilla-guide.md)

### API Reference
- [Core API](./packages/core/README.md)
- [React Hooks](./packages/react/README.md)
- [Vue Composables](./packages/vue/README.md)
- [Vanilla Client](./packages/vanilla/README.md)

## 🛠️ Development

This project uses **pnpm workspaces** and **Turbo** for monorepo management.

### Prerequisites

- Node.js >= 18
- pnpm >= 8

### Setup

```bash
# Clone repository
git clone https://github.com/huaguihai/universal-fhevm-sdk.git
cd universal-fhevm-sdk

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run Vite example
cd examples/react-vite
pnpm dev
```

### Project Structure

```
universal-fhevm-sdk/
├── packages/
│   ├── core/           # Framework-agnostic core (8.1 KB)
│   ├── react/          # React hooks (4.2 KB)
│   ├── vue/            # Vue composables (3.8 KB)
│   └── vanilla/        # Vanilla client (1.8 KB)
├── examples/
│   ├── nextjs/         # Next.js example (complete)
│   └── react-vite/     # React + Vite (working ✅)
└── docs/               # Documentation
```

### Build System

- **Bundler**: tsup (fast TypeScript bundler)
- **Formats**: ESM + CommonJS
- **Type Generation**: Automatic .d.ts generation
- **Tree-shaking**: Full ESM support

## 🎯 Supported FHEVM Operations

### Encryption Types
- `bool` - Boolean values
- `uint8` - 8-bit unsigned integers
- `uint16` - 16-bit unsigned integers
- `uint32` - 32-bit unsigned integers
- `uint64` - 64-bit unsigned integers
- `uint128` - 128-bit unsigned integers
- `uint256` - 256-bit unsigned integers

### Operations
- ✅ Single value encryption
- ✅ Batch encryption
- ✅ Decryption with KMS
- ✅ Re-encryption
- ✅ EIP712 token generation
- ✅ Public key management

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

## 🙏 Acknowledgments

- **[Zama](https://www.zama.ai/)** - For FHEVM technology and fhevmjs
- **[wagmi](https://wagmi.sh/)** - For API design inspiration
- **[TanStack Query](https://tanstack.com/query)** - For state management patterns
- **[Vite](https://vitejs.dev/)** - For blazing fast build tooling

## 🏆 About This Project

This SDK was created for the **[Zama Developer Program Bounty Track - October 2025](https://www.zama.ai/post/developer-program-bounty-track-october-2025-build-an-universal-fhevm-sdk)**.

### Key Achievements

- ✅ **Framework-Agnostic Architecture** - True separation of concerns
- ✅ **Complete FHEVM Workflow** - Encryption, decryption, KMS integration
- ✅ **Multi-Framework Support** - React, Vue, Vanilla JS
- ✅ **Production-Ready** - Working examples with proper error handling
- ✅ **Developer Experience** - wagmi-inspired, intuitive API
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **Well-Documented** - Comprehensive docs and examples
- ✅ **Optimized** - Small bundle sizes, tree-shakeable

## 📞 Support

- 🐛 [Report Issues](https://github.com/huaguihai/universal-fhevm-sdk/issues)
- 💬 [Discussions](https://github.com/huaguihai/universal-fhevm-sdk/discussions)
- 📧 Email: your-email@example.com

---

**Built with ❤️ for the FHEVM community**

*Making confidential smart contracts accessible to every developer*
