# Universal FHEVM SDK

> Un SDK indépendant du framework pour créer des dApps confidentielles avec FHEVM

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Built with Zama](https://img.shields.io/badge/Built%20with-Zama%20FHEVM-blue)](https://www.zama.ai/)

[English](./README.md) | [Français](./README.fr.md) | [中文](./README.zh.md)

## 🎯 Aperçu

Universal FHEVM SDK est une boîte à outils complète et prête pour la production qui simplifie la création d'applications décentralisées préservant la confidentialité en utilisant la machine virtuelle de chiffrement entièrement homomorphe (FHEVM) de Zama. Inspiré par l'expérience développeur de wagmi, ce SDK fournit une API unifiée et intuitive pour React, Vue et les environnements JavaScript/Node.js natifs.

### Pourquoi Universal FHEVM SDK ?

- **🎯 Noyau Indépendant du Framework** - Écrivez une fois, utilisez partout
- **⚛️ React Hooks** - Hooks intuitifs avec intégration TanStack Query
- **💚 Vue 3 Composables** - Composables réactifs pour les applications Vue
- **📦 JS Natif/Node.js** - Client simple pour tout environnement JavaScript
- **🔒 Type-Safe** - Support complet TypeScript avec définitions de types complètes
- **🚀 Prêt pour la Production** - Mise en cache intégrée, déduplication des requêtes, gestion des erreurs
- **📚 Bien Documenté** - Documentation complète et exemples fonctionnels
- **🎨 API Inspirée de wagmi** - Modèles familiers pour les développeurs web3

## 📦 Packages

| Package | Description | Taille | Version |
|---------|-------------|--------|---------|
| [@universal-fhevm/core](./packages/core) | Noyau indépendant du framework | 8.1 KB | `0.1.0` |
| [@universal-fhevm/react](./packages/react) | React hooks + TanStack Query | 4.2 KB | `0.1.0` |
| [@universal-fhevm/vue](./packages/vue) | Vue 3 composables | 3.8 KB | `0.1.0` |
| [@universal-fhevm/vanilla](./packages/vanilla) | Client JS natif/Node.js | 1.8 KB | `0.1.0` |

Total : **18 KB** (minifié, tree-shakeable)

## 🚀 Démarrage Rapide

### Installation

```bash
# Pour React
npm install @universal-fhevm/react wagmi viem

# Pour Vue
npm install @universal-fhevm/vue

# Pour JS Natif/Node.js
npm install @universal-fhevm/vanilla
```

### Exemple React

```tsx
import { FHEVMProvider, useEncrypt, useFHEVM } from '@universal-fhevm/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 1. Créer la configuration
const fhevmConfig = {
  chainId: 8009,
  networkUrl: 'https://devnet.zama.ai/',
  gatewayUrl: 'https://gateway.zama.ai/',
  aclAddress: '0xc9990FEfE0c27D31D0C2aa36196b085c0c4d456c',
}

const queryClient = new QueryClient()

// 2. Envelopper votre application
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FHEVMProvider config={fhevmConfig}>
        <MyComponent />
      </FHEVMProvider>
    </QueryClientProvider>
  )
}

// 3. Utiliser les hooks
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

  if (!isReady) return <div>Initialisation de FHEVM...</div>

  return (
    <div>
      <button onClick={handleEncrypt} disabled={isPending}>
        {isPending ? 'Chiffrement...' : 'Chiffrer la Valeur'}
      </button>
      {data && <div>Chiffré : {data.handles[0]}</div>}
      {error && <div>Erreur : {error.message}</div>}
    </div>
  )
}
```

### Exemple Vue

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
  <div v-if="!isReady">Initialisation de FHEVM...</div>
  <div v-else>
    <button @click="handleEncrypt" :disabled="isPending">
      {{ isPending ? 'Chiffrement...' : 'Chiffrer la Valeur' }}
    </button>
    <div v-if="data">Chiffré : {{ data.handles[0] }}</div>
    <div v-if="error">Erreur : {{ error.message }}</div>
  </div>
</template>
```

### Exemple JS Natif/Node.js

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

// Chiffrer
const encrypted = await client.encrypt({
  value: 100,
  type: 'uint64',
  contractAddress: '0x...',
  userAddress: '0x...',
})

console.log('Handles chiffrés :', encrypted.handles)
console.log('Preuve d\'entrée :', encrypted.inputProof)
```

## 🎬 Démonstration en Direct

- **Démo React + Vite** : [Bientôt disponible - Ajoutez votre URL de déploiement ici]
- **Démo Next.js** : [Code Disponible](./examples/nextjs)

## 💡 Fonctionnalités

### Fonctionnalités Principales

- ✅ **Workflow FHEVM Complet**
  - Initialisation du client avec mise en cache automatique
  - Chiffrement pour tous les types FHEVM : `bool`, `uint8`, `uint16`, `uint32`, `uint64`, `uint128`, `uint256`
  - Support du chiffrement par lots
  - Déchiffrement avec intégration KMS
  - Génération de jetons EIP712

- ✅ **Expérience Développeur**
  - Conception d'API inspirée de wagmi
  - Support complet TypeScript
  - Gestion complète des erreurs
  - États de chargement intégrés
  - Déduplication des requêtes

- ✅ **Support des Frameworks**
  - React hooks avec TanStack Query
  - Vue 3 composables avec réactivité
  - Client JS natif/Node.js
  - Compatible avec le rendu côté serveur

- ✅ **Performance**
  - Modules tree-shakeable
  - Mise en cache des instances
  - Tailles de bundle optimisées
  - Zéro re-rendu inutile

## 📁 Exemples

Explorez nos applications d'exemple fonctionnelles :

- **[React + Vite](./examples/react-vite)** - SPA React prêt pour la production ✅ Fonctionnel
  - Intégration de portefeuille avec wagmi
  - Démo de chiffrement complète
  - Interface moderne avec Tailwind CSS
  - TypeScript + Vite

- **[Next.js](./examples/nextjs)** - Application Next.js full-stack
  - Composants serveur prêts
  - Implémentation de code complète
  - Belle interface utilisateur

## 📚 Documentation

### Pour Commencer
- [Guide d'Installation](./docs/installation.md)
- [Tutoriel de Démarrage Rapide](./docs/quick-start.md)
- [Aperçu de l'Architecture](./ARCHITECTURE.md)

### Guides des Frameworks
- [Intégration React](./docs/react-guide.md)
- [Intégration Vue](./docs/vue-guide.md)
- [JS Natif/Node.js](./docs/vanilla-guide.md)

### Référence API
- [API Core](./packages/core/README.md)
- [React Hooks](./packages/react/README.md)
- [Vue Composables](./packages/vue/README.md)
- [Client Vanilla](./packages/vanilla/README.md)

## 🛠️ Développement

Ce projet utilise **pnpm workspaces** et **Turbo** pour la gestion du monorepo.

### Prérequis

- Node.js >= 18
- pnpm >= 8

### Configuration

```bash
# Cloner le dépôt
git clone https://github.com/huaguihai/universal-fhevm-sdk.git
cd universal-fhevm-sdk

# Installer les dépendances
pnpm install

# Construire tous les packages
pnpm build

# Exécuter l'exemple Vite
cd examples/react-vite
pnpm dev
```

### Structure du Projet

```
universal-fhevm-sdk/
├── packages/
│   ├── core/           # Noyau indépendant (8.1 KB)
│   ├── react/          # React hooks (4.2 KB)
│   ├── vue/            # Vue composables (3.8 KB)
│   └── vanilla/        # Client vanilla (1.8 KB)
├── examples/
│   ├── nextjs/         # Exemple Next.js (complet)
│   └── react-vite/     # React + Vite (fonctionnel ✅)
└── docs/               # Documentation
```

### Système de Build

- **Bundler** : tsup (bundler TypeScript rapide)
- **Formats** : ESM + CommonJS
- **Génération de Types** : Génération automatique .d.ts
- **Tree-shaking** : Support complet ESM

## 🎯 Opérations FHEVM Supportées

### Types de Chiffrement
- `bool` - Valeurs booléennes
- `uint8` - Entiers non signés 8 bits
- `uint16` - Entiers non signés 16 bits
- `uint32` - Entiers non signés 32 bits
- `uint64` - Entiers non signés 64 bits
- `uint128` - Entiers non signés 128 bits
- `uint256` - Entiers non signés 256 bits

### Opérations
- ✅ Chiffrement de valeur unique
- ✅ Chiffrement par lots
- ✅ Déchiffrement avec KMS
- ✅ Re-chiffrement
- ✅ Génération de jetons EIP712
- ✅ Gestion des clés publiques

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez lire notre [Guide de Contribution](./CONTRIBUTING.md) pour plus de détails.

### Workflow de Développement

1. Fork le dépôt
2. Créez votre branche de fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Ajout d\'une fonctionnalité géniale'`)
4. Poussez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## 📄 Licence

Licence MIT - voir [LICENSE](./LICENSE) pour plus de détails.

## 🙏 Remerciements

- **[Zama](https://www.zama.ai/)** - Pour la technologie FHEVM et fhevmjs
- **[wagmi](https://wagmi.sh/)** - Pour l'inspiration de conception d'API
- **[TanStack Query](https://tanstack.com/query)** - Pour les modèles de gestion d'état
- **[Vite](https://vitejs.dev/)** - Pour les outils de build ultra-rapides

## 🏆 À Propos de Ce Projet

Ce SDK a été créé pour le **[Programme Développeur Zama - Track Bounty Octobre 2025](https://www.zama.ai/post/developer-program-bounty-track-october-2025-build-an-universal-fhevm-sdk)**.

### Réalisations Clés

- ✅ **Architecture Indépendante du Framework** - Vraie séparation des préoccupations
- ✅ **Workflow FHEVM Complet** - Chiffrement, déchiffrement, intégration KMS
- ✅ **Support Multi-Framework** - React, Vue, JS Vanilla
- ✅ **Prêt pour la Production** - Exemples fonctionnels avec gestion d'erreurs appropriée
- ✅ **Expérience Développeur** - API intuitive inspirée de wagmi
- ✅ **Type-Safe** - Support complet TypeScript
- ✅ **Bien Documenté** - Documentation et exemples complets
- ✅ **Optimisé** - Petites tailles de bundle, tree-shakeable

## 📞 Support

- 🐛 [Signaler des Problèmes](https://github.com/huaguihai/universal-fhevm-sdk/issues)
- 💬 [Discussions](https://github.com/huaguihai/universal-fhevm-sdk/discussions)
- 📧 Email : your-email@example.com

---

**Construit avec ❤️ pour la communauté FHEVM**

*Rendre les contrats intelligents confidentiels accessibles à tous les développeurs*
