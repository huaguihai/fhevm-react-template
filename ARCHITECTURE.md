# Universal FHEVM SDK - Architecture Documentation

## Table of Contents

1. [Overview](#overview)
2. [Design Principles](#design-principles)
3. [System Architecture](#system-architecture)
4. [Package Structure](#package-structure)
5. [Core Components](#core-components)
6. [Data Flow](#data-flow)
7. [API Design](#api-design)
8. [Type System](#type-system)

---

## Overview

The Universal FHEVM SDK is a framework-agnostic toolkit for building confidential dApps using Zama's FHEVM technology. It provides a unified, intuitive API across React, Vue, and vanilla JavaScript/Node.js environments.

### Goals

- **Framework Independence**: Core logic works without any framework dependency
- **Developer Experience**: Intuitive API inspired by wagmi
- **Type Safety**: Full TypeScript support with type inference
- **Performance**: Optimized with caching and request deduplication
- **Modularity**: Clean separation of concerns

---

## Design Principles

### 1. Separation of Concerns

```
┌─────────────────────────────────────────┐
│         Framework Adapters              │
│  (React, Vue, Vanilla JS)               │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         Core Package                    │
│  (Framework-agnostic logic)             │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         @zama-fhe/relayer-sdk           │
│  (Official FHEVM SDK)                   │
└─────────────────────────────────────────┘
```

### 2. Composition Over Inheritance

- Small, focused modules
- Composable utilities
- Hook-based architecture (React)
- Composable-based architecture (Vue)

### 3. Type-First Design

- TypeScript throughout
- Comprehensive type definitions
- Type inference where possible
- Generic types for flexibility

### 4. Performance Optimization

- **Instance caching**: Reuse FHEVM instance
- **Request deduplication**: Prevent duplicate operations
- **Lazy initialization**: Load resources only when needed
- **Tree shaking**: Optimal bundle size

---

## System Architecture

### High-Level Architecture

```
┌────────────────────────────────────────────────────────────┐
│                    Application Layer                       │
│  (User's React/Vue/Vanilla JS Application)                │
└────────────────────────┬───────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
┌────────▼─────┐ ┌──────▼──────┐ ┌─────▼────────┐
│   React      │ │    Vue      │ │   Vanilla    │
│   Adapter    │ │   Adapter   │ │   Adapter    │
│              │ │             │ │              │
│  - Hooks     │ │ - Composables│ │  - Client   │
│  - Provider  │ │ - Plugin    │ │  - Methods  │
└────────┬─────┘ └──────┬──────┘ └─────┬────────┘
         │               │               │
         └───────────────┼───────────────┘
                         │
┌────────────────────────▼───────────────────────────────────┐
│                    Core Package                            │
│                                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   Client     │  │  Encryption  │  │  Decryption  │   │
│  │  Management  │  │   Utilities  │  │  Utilities   │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │    Types     │  │    Utils     │  │    Cache     │   │
│  │              │  │              │  │              │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
└────────────────────────┬───────────────────────────────────┘
                         │
┌────────────────────────▼───────────────────────────────────┐
│              @zama-fhe/relayer-sdk                         │
│  (Official FHEVM SDK - TFHE Operations)                    │
└────────────────────────────────────────────────────────────┘
```

### Data Flow

```
┌─────────────┐
│    User     │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  UI Component       │
│  (React/Vue)        │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Hook/Composable    │
│  (useEncrypt)       │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Core Client        │
│  (FHEVMClient)      │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Encryption Util    │
│  (encrypt())        │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  FHEVM Instance     │
│  (relayer-sdk)      │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Encrypted Data     │
│  (handles + proof)  │
└─────────────────────┘
```

---

## Package Structure

### Monorepo Layout

```
universal-fhevm-sdk/
├── packages/
│   ├── core/                    # @universal-fhevm/core
│   │   ├── src/
│   │   │   ├── client/
│   │   │   │   ├── FHEVMClient.ts
│   │   │   │   ├── createConfig.ts
│   │   │   │   └── index.ts
│   │   │   ├── encryption/
│   │   │   │   ├── encrypt.ts
│   │   │   │   ├── encryptBatch.ts
│   │   │   │   ├── createEncryptedInput.ts
│   │   │   │   └── index.ts
│   │   │   ├── decryption/
│   │   │   │   ├── decrypt.ts
│   │   │   │   ├── reencrypt.ts
│   │   │   │   ├── generateToken.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── config.ts
│   │   │   │   ├── encryption.ts
│   │   │   │   ├── decryption.ts
│   │   │   │   └── index.ts
│   │   │   ├── utils/
│   │   │   │   ├── cache.ts
│   │   │   │   ├── errors.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── tsup.config.ts
│   │
│   ├── react/                   # @universal-fhevm/react
│   │   ├── src/
│   │   │   ├── hooks/
│   │   │   │   ├── useFHEVM.ts
│   │   │   │   ├── useEncrypt.ts
│   │   │   │   ├── useDecrypt.ts
│   │   │   │   ├── useEncryptedInput.ts
│   │   │   │   └── index.ts
│   │   │   ├── context/
│   │   │   │   ├── FHEVMContext.tsx
│   │   │   │   ├── FHEVMProvider.tsx
│   │   │   │   └── index.ts
│   │   │   ├── query/
│   │   │   │   ├── queryClient.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── tsup.config.ts
│   │
│   ├── vue/                     # @universal-fhevm/vue
│   │   ├── src/
│   │   │   ├── composables/
│   │   │   │   ├── useFHEVM.ts
│   │   │   │   ├── useEncrypt.ts
│   │   │   │   ├── useDecrypt.ts
│   │   │   │   └── index.ts
│   │   │   ├── plugin/
│   │   │   │   ├── FHEVMPlugin.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── tsup.config.ts
│   │
│   └── vanilla/                 # @universal-fhevm/vanilla
│       ├── src/
│       │   ├── client.ts
│       │   └── index.ts
│       ├── package.json
│       ├── tsconfig.json
│       └── tsup.config.ts
│
├── examples/
│   ├── nextjs/
│   ├── react-vite/
│   ├── vue-vite/
│   └── nodejs/
│
├── docs/
│   ├── getting-started.md
│   ├── api-reference.md
│   ├── react-guide.md
│   ├── vue-guide.md
│   └── vanilla-guide.md
│
├── pnpm-workspace.yaml
├── turbo.json
├── package.json
└── README.md
```

---

## Core Components

### 1. FHEVMClient (Core Package)

**Responsibility**: Manage FHEVM instance lifecycle and provide core functionality

```typescript
class FHEVMClient {
  private instance: FHEVMInstance | null = null
  private config: FHEVMConfig
  private isInitialized: boolean = false

  constructor(config: FHEVMConfig)

  async init(): Promise<void>
  getInstance(): FHEVMInstance | null
  isReady(): boolean

  async encrypt(params: EncryptParams): Promise<EncryptedData>
  async encryptBatch(params: EncryptBatchParams): Promise<EncryptedData[]>
  async createEncryptedInput(contractAddress: string): Promise<EncryptedInput>

  async decrypt(params: DecryptParams): Promise<bigint | boolean>
  async generateToken(params: TokenParams): Promise<string>
}
```

### 2. Configuration System

**Responsibility**: Type-safe configuration management

```typescript
interface FHEVMConfig {
  chainId: number
  networkUrl: string
  gatewayUrl: string
  aclAddress: string
  // Optional settings
  cacheEnabled?: boolean
  autoInit?: boolean
}

function createConfig(config: FHEVMConfig): FHEVMConfig
```

### 3. Encryption Module

**Responsibility**: Handle all encryption operations

```typescript
// Single value encryption
async function encrypt(
  instance: FHEVMInstance,
  params: EncryptParams
): Promise<EncryptedData>

// Batch encryption
async function encryptBatch(
  instance: FHEVMInstance,
  params: EncryptBatchParams
): Promise<EncryptedData[]>

// Encrypted input builder
async function createEncryptedInput(
  instance: FHEVMInstance,
  contractAddress: string,
  signer: Signer
): Promise<EncryptedInput>
```

### 4. Decryption Module

**Responsibility**: Handle decryption and reencryption

```typescript
// Decrypt value
async function decrypt(
  instance: FHEVMInstance,
  params: DecryptParams
): Promise<bigint | boolean>

// Reencryption flow
async function reencrypt(
  instance: FHEVMInstance,
  params: ReencryptParams
): Promise<EncryptedData>

// Generate decryption token
async function generateToken(
  instance: FHEVMInstance,
  params: TokenParams
): Promise<string>
```

### 5. React Hooks

**Responsibility**: Provide React-friendly API

```typescript
// Core instance hook
function useFHEVM(): {
  instance: FHEVMInstance | null
  isReady: boolean
  error: Error | null
}

// Encryption hook
function useEncrypt(options?: EncryptOptions): {
  encrypt: (params: EncryptParams) => Promise<EncryptedData>
  isPending: boolean
  error: Error | null
  data: EncryptedData | null
}

// Decryption hook
function useDecrypt(options?: DecryptOptions): {
  decrypt: (params: DecryptParams) => Promise<bigint | boolean>
  isPending: boolean
  error: Error | null
  data: bigint | boolean | null
}

// Encrypted input hook
function useEncryptedInput(contractAddress: string): {
  createInput: () => EncryptedInputBuilder
  isPending: boolean
  error: Error | null
}
```

### 6. Vue Composables

**Responsibility**: Provide Vue-friendly API

```typescript
// Core instance composable
function useFHEVM(): {
  instance: Ref<FHEVMInstance | null>
  isReady: Ref<boolean>
  error: Ref<Error | null>
}

// Encryption composable
function useEncrypt(options?: EncryptOptions): {
  encrypt: (params: EncryptParams) => Promise<EncryptedData>
  isPending: Ref<boolean>
  error: Ref<Error | null>
  data: Ref<EncryptedData | null>
}

// Decryption composable
function useDecrypt(options?: DecryptOptions): {
  decrypt: (params: DecryptParams) => Promise<bigint | boolean>
  isPending: Ref<boolean>
  error: Ref<Error | null>
  data: Ref<bigint | boolean | null>
}
```

---

## Data Flow

### Encryption Flow

```
User Action
    │
    ▼
Component calls encrypt()
    │
    ▼
Hook/Composable validates params
    │
    ▼
Get FHEVM instance from context
    │
    ▼
Core encrypt() function
    │
    ▼
createEncryptedInput()
    │
    ▼
Add value with appropriate type (add8, add16, etc.)
    │
    ▼
Call encrypt() on input
    │
    ▼
Return { handles, inputProof }
    │
    ▼
Update hook/composable state
    │
    ▼
Re-render component with result
```

### Decryption Flow

```
User requests decryption
    │
    ▼
Component calls decrypt()
    │
    ▼
Hook/Composable validates params
    │
    ▼
Generate decryption token
    │
    ▼
Sign token with user's wallet
    │
    ▼
Request KMS reencryption
    │
    ▼
KMS decrypts and returns value
    │
    ▼
Return decrypted value
    │
    ▼
Update hook/composable state
    │
    ▼
Re-render component with result
```

### Instance Initialization Flow

```
Application starts
    │
    ▼
FHEVMProvider/Plugin mounts
    │
    ▼
Create FHEVMClient with config
    │
    ▼
Browser: Load WASM with initFhevm()
Node.js: Skip WASM loading
    │
    ▼
Call createInstance() from relayer-sdk
    │
    ▼
Cache instance in context/plugin
    │
    ▼
Set isReady = true
    │
    ▼
Children components can use hooks/composables
```

---

## API Design

### Core API (Framework-Agnostic)

```typescript
// Configuration
import { createConfig } from '@universal-fhevm/core'

const config = createConfig({
  chainId: 21097,
  networkUrl: 'https://validator.rivest.inco.org/',
  gatewayUrl: 'https://gateway.rivest.inco.org/',
  aclAddress: '0x...',
})

// Client
import { FHEVMClient } from '@universal-fhevm/core'

const client = new FHEVMClient(config)
await client.init()

// Encryption
const encrypted = await client.encrypt({
  value: 100,
  type: 'uint64',
  contractAddress: '0x...',
})

// Decryption
const decrypted = await client.decrypt({
  handle: '0x...',
  contractAddress: '0x...',
})
```

### React API

```typescript
// Setup
import { FHEVMProvider } from '@universal-fhevm/react'

function App() {
  return (
    <FHEVMProvider config={config}>
      <MyApp />
    </FHEVMProvider>
  )
}

// Usage
import { useEncrypt, useDecrypt, useFHEVM } from '@universal-fhevm/react'

function MyComponent() {
  const { instance, isReady } = useFHEVM()
  const { encrypt, isPending, data, error } = useEncrypt()

  const handleEncrypt = async () => {
    await encrypt({
      value: 100,
      type: 'uint64',
      contractAddress: '0x...',
    })
  }

  return (
    <button onClick={handleEncrypt} disabled={!isReady || isPending}>
      Encrypt
    </button>
  )
}
```

### Vue API

```typescript
// Setup
import { createApp } from 'vue'
import { FHEVMPlugin } from '@universal-fhevm/vue'

createApp(App)
  .use(FHEVMPlugin, { config })
  .mount('#app')

// Usage
import { useEncrypt, useFHEVM } from '@universal-fhevm/vue'

export default {
  setup() {
    const { instance, isReady } = useFHEVM()
    const { encrypt, isPending, data, error } = useEncrypt()

    const handleEncrypt = async () => {
      await encrypt({
        value: 100,
        type: 'uint64',
        contractAddress: '0x...',
      })
    }

    return { handleEncrypt, isPending, isReady }
  }
}
```

---

## Type System

### Core Types

```typescript
// Encryption types
type EncryptType = 'bool' | 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'uint128' | 'uint256'

// Config
interface FHEVMConfig {
  chainId: number
  networkUrl: string
  gatewayUrl: string
  aclAddress: string
  cacheEnabled?: boolean
  autoInit?: boolean
}

// Encryption params
interface EncryptParams {
  value: number | bigint | boolean
  type: EncryptType
  contractAddress: string
}

// Encrypted data
interface EncryptedData {
  handles: string[]
  inputProof: Uint8Array
}

// Batch encryption
interface EncryptBatchParams {
  values: Array<{
    value: number | bigint | boolean
    type: EncryptType
  }>
  contractAddress: string
}

// Decryption params
interface DecryptParams {
  handle: string
  contractAddress: string
}

// Token params
interface TokenParams {
  verifyingContract: string
}

// FHEVM instance (from relayer-sdk)
interface FHEVMInstance {
  createEncryptedInput(contractAddress: string, signer: Signer): EncryptedInput
  generateToken(params: TokenParams): string
  // ... other methods from relayer-sdk
}

// Encrypted input builder
interface EncryptedInput {
  add8(value: number): EncryptedInput
  add16(value: number): EncryptedInput
  add32(value: number): EncryptedInput
  add64(value: bigint): EncryptedInput
  add128(value: bigint): EncryptedInput
  add256(value: bigint): EncryptedInput
  addBool(value: boolean): EncryptedInput
  encrypt(): EncryptedData
}
```

### Hook/Composable Return Types

```typescript
// Hook options
interface EncryptOptions {
  contractAddress?: string
  onSuccess?: (data: EncryptedData) => void
  onError?: (error: Error) => void
}

interface DecryptOptions {
  contractAddress?: string
  onSuccess?: (data: bigint | boolean) => void
  onError?: (error: Error) => void
}

// Hook return types
interface UseEncryptReturn {
  encrypt: (params: EncryptParams) => Promise<EncryptedData>
  isPending: boolean
  error: Error | null
  data: EncryptedData | null
  reset: () => void
}

interface UseDecryptReturn {
  decrypt: (params: DecryptParams) => Promise<bigint | boolean>
  isPending: boolean
  error: Error | null
  data: bigint | boolean | null
  reset: () => void
}

interface UseFHEVMReturn {
  instance: FHEVMInstance | null
  isReady: boolean
  error: Error | null
}
```

---

## Performance Optimizations

### 1. Instance Caching

```typescript
// Singleton pattern for FHEVM instance
class FHEVMClient {
  private static instanceCache = new Map<string, FHEVMInstance>()

  async init() {
    const cacheKey = this.getCacheKey()

    if (FHEVMClient.instanceCache.has(cacheKey)) {
      this.instance = FHEVMClient.instanceCache.get(cacheKey)!
      return
    }

    // Create new instance
    this.instance = await createInstance(this.config)
    FHEVMClient.instanceCache.set(cacheKey, this.instance)
  }
}
```

### 2. Request Deduplication (React)

```typescript
// Using TanStack Query for automatic deduplication
import { useQuery } from '@tanstack/react-query'

function useEncrypt(options) {
  const { instance } = useFHEVM()

  return useMutation({
    mutationFn: (params) => encrypt(instance, params),
    // Automatic request deduplication
    ...options
  })
}
```

### 3. Lazy WASM Loading

```typescript
// Only load WASM when needed (browser only)
async function initializeInstance(config: FHEVMConfig) {
  if (typeof window !== 'undefined') {
    // Browser: Load WASM first
    await initFhevm()
  }

  return createInstance(config)
}
```

### 4. Tree Shaking Support

```typescript
// Named exports for better tree shaking
export { FHEVMClient } from './client'
export { encrypt, encryptBatch } from './encryption'
export { decrypt, reencrypt } from './decryption'
export type { FHEVMConfig, EncryptParams, DecryptParams } from './types'
```

---

## Error Handling

### Error Types

```typescript
class FHEVMError extends Error {
  code: string

  constructor(message: string, code: string) {
    super(message)
    this.code = code
    this.name = 'FHEVMError'
  }
}

// Specific error types
class InstanceNotReadyError extends FHEVMError {
  constructor() {
    super('FHEVM instance is not ready', 'INSTANCE_NOT_READY')
  }
}

class EncryptionError extends FHEVMError {
  constructor(message: string) {
    super(message, 'ENCRYPTION_ERROR')
  }
}

class DecryptionError extends FHEVMError {
  constructor(message: string) {
    super(message, 'DECRYPTION_ERROR')
  }
}
```

### Error Handling Pattern

```typescript
// In hooks/composables
function useEncrypt(options) {
  const [error, setError] = useState<Error | null>(null)

  const encrypt = async (params) => {
    try {
      setError(null)
      const result = await encryptFn(params)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err))
      setError(error)
      options?.onError?.(error)
      throw error
    }
  }

  return { encrypt, error }
}
```

---

**Last Updated**: October 23, 2025
