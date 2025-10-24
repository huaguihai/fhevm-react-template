# Universal FHEVM SDK

> 用于构建机密 dApp 的框架无关 SDK

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Built with Zama](https://img.shields.io/badge/Built%20with-Zama%20FHEVM-blue)](https://www.zama.ai/)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhuaguihai%2Ffhevm-react-template&project-name=universal-fhevm-sdk-demo&repository-name=universal-fhevm-sdk-demo&root-directory=examples/react-vite)

[English](./README.md) | [Français](./README.fr.md) | [中文](./README.zh.md)

## 🎯 概述

Universal FHEVM SDK 是一个全面的、生产就绪的工具包，简化了使用 Zama 的全同态加密虚拟机（FHEVM）构建隐私保护去中心化应用的过程。受 wagmi 开发体验的启发，这个 SDK 为 React、Vue 和原生 JavaScript/Node.js 环境提供了统一、直观的 API。

### 为什么选择 Universal FHEVM SDK？

- **🎯 框架无关的核心** - 一次编写，到处使用
- **⚛️ React Hooks** - 集成 TanStack Query 的直观 hooks
- **💚 Vue 3 组合式 API** - 为 Vue 应用提供响应式组合函数
- **📦 原生 JS/Node.js** - 适用于任何 JavaScript 环境的简单客户端
- **🔒 类型安全** - 完整的 TypeScript 支持和全面的类型定义
- **🚀 生产就绪** - 内置缓存、请求去重、错误处理
- **📚 文档完善** - 详尽的文档和可运行的示例
- **🎨 wagmi 风格 API** - Web3 开发者熟悉的模式

## 📦 包

| 包 | 描述 | 大小 | 版本 |
|---------|-------------|------|---------|
| [@universal-fhevm/core](./packages/core) | 框架无关的核心 | 8.1 KB | `0.1.0` |
| [@universal-fhevm/react](./packages/react) | React hooks + TanStack Query | 4.2 KB | `0.1.0` |
| [@universal-fhevm/vue](./packages/vue) | Vue 3 组合式函数 | 3.8 KB | `0.1.0` |
| [@universal-fhevm/vanilla](./packages/vanilla) | 原生 JS/Node.js 客户端 | 1.8 KB | `0.1.0` |

总计：**18 KB**（压缩后，支持 tree-shaking）

## 🚀 快速开始

### 安装

```bash
# React 项目
npm install @universal-fhevm/react wagmi viem

# Vue 项目
npm install @universal-fhevm/vue

# 原生 JS/Node.js 项目
npm install @universal-fhevm/vanilla
```

### React 示例

```tsx
import { FHEVMProvider, useEncrypt, useFHEVM } from '@universal-fhevm/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 1. 创建配置
const fhevmConfig = {
  chainId: 8009,
  networkUrl: 'https://devnet.zama.ai/',
  gatewayUrl: 'https://gateway.zama.ai/',
  aclAddress: '0xc9990FEfE0c27D31D0C2aa36196b085c0c4d456c',
}

const queryClient = new QueryClient()

// 2. 包装你的应用
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FHEVMProvider config={fhevmConfig}>
        <MyComponent />
      </FHEVMProvider>
    </QueryClientProvider>
  )
}

// 3. 使用 hooks
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

  if (!isReady) return <div>正在初始化 FHEVM...</div>

  return (
    <div>
      <button onClick={handleEncrypt} disabled={isPending}>
        {isPending ? '加密中...' : '加密数值'}
      </button>
      {data && <div>已加密：{data.handles[0]}</div>}
      {error && <div>错误：{error.message}</div>}
    </div>
  )
}
```

### Vue 示例

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
  <div v-if="!isReady">正在初始化 FHEVM...</div>
  <div v-else>
    <button @click="handleEncrypt" :disabled="isPending">
      {{ isPending ? '加密中...' : '加密数值' }}
    </button>
    <div v-if="data">已加密：{{ data.handles[0] }}</div>
    <div v-if="error">错误：{{ error.message }}</div>
  </div>
</template>
```

### 原生 JS/Node.js 示例

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

// 加密
const encrypted = await client.encrypt({
  value: 100,
  type: 'uint64',
  contractAddress: '0x...',
  userAddress: '0x...',
})

console.log('加密句柄:', encrypted.handles)
console.log('输入证明:', encrypted.inputProof)
```

## 🎬 在线演示

一键部署尝试：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhuaguihai%2Ffhevm-react-template&project-name=universal-fhevm-sdk-demo&repository-name=universal-fhevm-sdk-demo&root-directory=examples/react-vite)

或访问我们的在线演示：
- **React + Vite 演示**：[即将推出 - 在此添加您的部署 URL]
- **Next.js 演示**：[代码可用](./examples/nextjs)

## 💡 特性

### 核心特性

- ✅ **完整的 FHEVM 工作流**
  - 自动缓存的客户端初始化
  - 支持所有 FHEVM 类型的加密：`bool`, `uint8`, `uint16`, `uint32`, `uint64`, `uint128`, `uint256`
  - 批量加密支持
  - KMS 集成的解密
  - EIP712 令牌生成

- ✅ **开发者体验**
  - wagmi 风格的 API 设计
  - 完整的 TypeScript 支持
  - 全面的错误处理
  - 内置加载状态
  - 请求去重

- ✅ **框架支持**
  - React hooks 集成 TanStack Query
  - Vue 3 响应式组合函数
  - 原生 JS/Node.js 客户端
  - 支持服务端渲染

- ✅ **性能**
  - 可 tree-shake 的模块
  - 实例缓存
  - 优化的包大小
  - 零不必要的重新渲染

## 📁 示例

探索我们的可运行示例应用：

- **[React + Vite](./examples/react-vite)** - 生产就绪的 React 单页应用 ✅ 可运行
  - wagmi 钱包集成
  - 完整的加密演示
  - 使用 Tailwind CSS 的现代 UI
  - TypeScript + Vite

- **[Next.js](./examples/nextjs)** - 全栈 Next.js 应用
  - 支持服务器组件
  - 完整的代码实现
  - 精美的 UI

## 📚 文档

### 入门指南
- [安装指南](./docs/installation.md)
- [快速开始教程](./docs/quick-start.md)
- [架构概述](./ARCHITECTURE.md)

### 框架指南
- [React 集成](./docs/react-guide.md)
- [Vue 集成](./docs/vue-guide.md)
- [原生 JS/Node.js](./docs/vanilla-guide.md)

### API 参考
- [核心 API](./packages/core/README.md)
- [React Hooks](./packages/react/README.md)
- [Vue 组合函数](./packages/vue/README.md)
- [原生客户端](./packages/vanilla/README.md)

## 🛠️ 开发

本项目使用 **pnpm workspaces** 和 **Turbo** 进行 monorepo 管理。

### 前置要求

- Node.js >= 18
- pnpm >= 8

### 设置

```bash
# 克隆仓库
git clone https://github.com/huaguihai/universal-fhevm-sdk.git
cd universal-fhevm-sdk

# 安装依赖
pnpm install

# 构建所有包
pnpm build

# 运行 Vite 示例
cd examples/react-vite
pnpm dev
```

### 项目结构

```
universal-fhevm-sdk/
├── packages/
│   ├── core/           # 框架无关的核心 (8.1 KB)
│   ├── react/          # React hooks (4.2 KB)
│   ├── vue/            # Vue 组合函数 (3.8 KB)
│   └── vanilla/        # 原生客户端 (1.8 KB)
├── examples/
│   ├── nextjs/         # Next.js 示例（完整）
│   └── react-vite/     # React + Vite（可运行 ✅）
└── docs/               # 文档
```

### 构建系统

- **打包工具**：tsup（快速的 TypeScript 打包器）
- **格式**：ESM + CommonJS
- **类型生成**：自动生成 .d.ts
- **Tree-shaking**：完整的 ESM 支持

## 🎯 支持的 FHEVM 操作

### 加密类型
- `bool` - 布尔值
- `uint8` - 8 位无符号整数
- `uint16` - 16 位无符号整数
- `uint32` - 32 位无符号整数
- `uint64` - 64 位无符号整数
- `uint128` - 128 位无符号整数
- `uint256` - 256 位无符号整数

### 操作
- ✅ 单值加密
- ✅ 批量加密
- ✅ KMS 解密
- ✅ 重新加密
- ✅ EIP712 令牌生成
- ✅ 公钥管理

## 🤝 贡献

欢迎贡献！请阅读我们的[贡献指南](./CONTRIBUTING.md)了解详情。

### 开发工作流

1. Fork 仓库
2. 创建你的功能分支（`git checkout -b feature/amazing-feature`）
3. 提交你的更改（`git commit -m '添加某个功能'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 开启一个 Pull Request

## 📄 许可证

MIT 许可证 - 详见 [LICENSE](./LICENSE) 文件。

## 🙏 致谢

- **[Zama](https://www.zama.ai/)** - 提供 FHEVM 技术和 fhevmjs
- **[wagmi](https://wagmi.sh/)** - API 设计灵感
- **[TanStack Query](https://tanstack.com/query)** - 状态管理模式
- **[Vite](https://vitejs.dev/)** - 极速的构建工具

## 🏆 关于本项目

本 SDK 是为 **[Zama 开发者计划赏金任务 - 2025年10月](https://www.zama.ai/post/developer-program-bounty-track-october-2025-build-an-universal-fhevm-sdk)** 创建的。

### 主要成就

- ✅ **框架无关架构** - 真正的关注点分离
- ✅ **完整的 FHEVM 工作流** - 加密、解密、KMS 集成
- ✅ **多框架支持** - React、Vue、原生 JS
- ✅ **生产就绪** - 带有适当错误处理的可运行示例
- ✅ **开发者体验** - wagmi 风格、直观的 API
- ✅ **类型安全** - 完整的 TypeScript 支持
- ✅ **文档完善** - 全面的文档和示例
- ✅ **优化** - 小包大小、可 tree-shake

## 📞 支持

- 🐛 [报告问题](https://github.com/huaguihai/universal-fhevm-sdk/issues)
- 💬 [讨论](https://github.com/huaguihai/universal-fhevm-sdk/discussions)
- 📧 邮箱：your-email@example.com

---

**用 ❤️ 为 FHEVM 社区构建**

*让每个开发者都能轻松使用机密智能合约*
