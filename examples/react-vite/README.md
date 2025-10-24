# React + Vite Example - Universal FHEVM SDK

这是一个使用 Universal FHEVM SDK 的完整 React + Vite 示例应用。

This is a complete React + Vite example application using the Universal FHEVM SDK.

Ceci est un exemple d'application React + Vite utilisant le SDK Universal FHEVM.

## 🎯 功能特性 / Features / Fonctionnalités

- ✅ **钱包连接** / Wallet Connection / Connexion au Portefeuille
  - 使用 wagmi 集成 / wagmi integration / Intégration wagmi
  - 支持多个钱包连接器 / Multiple wallet connectors / Plusieurs connecteurs de portefeuille

- ✅ **FHEVM 加密演示** / FHEVM Encryption Demo / Démo de Chiffrement FHEVM
  - 所有 FHEVM 类型支持 / All FHEVM types supported / Tous les types FHEVM supportés
  - 实时加密状态 / Real-time encryption status / Statut de chiffrement en temps réel
  - 错误处理 / Error handling / Gestion des erreurs

- ✅ **现代化 UI** / Modern UI / Interface Moderne
  - Tailwind CSS 样式 / Tailwind CSS styling / Styles Tailwind CSS
  - 响应式设计 / Responsive design / Design réactif
  - 暗色主题 / Dark theme / Thème sombre

## 🚀 快速开始 / Quick Start / Démarrage Rapide

### 安装依赖 / Install Dependencies / Installer les Dépendances

```bash
pnpm install
```

### 运行开发服务器 / Run Development Server / Exécuter le Serveur de Développement

```bash
pnpm dev
```

应用将在 http://localhost:5173/ 启动

The app will start at http://localhost:5173/

L'application démarrera sur http://localhost:5173/

### 构建生产版本 / Build for Production / Construire pour la Production

```bash
pnpm build
```

### 预览生产构建 / Preview Production Build / Prévisualiser la Build de Production

```bash
pnpm preview
```

## 📁 项目结构 / Project Structure / Structure du Projet

```
react-vite/
├── src/
│   ├── components/
│   │   ├── Providers.tsx       # wagmi + FHEVM providers
│   │   ├── WalletConnect.tsx   # 钱包连接组件 / Wallet connection / Connexion portefeuille
│   │   └── EncryptDemo.tsx     # 加密演示组件 / Encryption demo / Démo de chiffrement
│   ├── config/
│   │   ├── fhevm.ts            # FHEVM 配置 / FHEVM config / Config FHEVM
│   │   └── wagmi.ts            # wagmi 配置 / wagmi config / Config wagmi
│   ├── App.tsx                 # 主应用组件 / Main app / App principale
│   ├── App.css                 # 样式 / Styles / Styles
│   └── main.tsx                # 入口文件 / Entry point / Point d'entrée
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🔧 配置 / Configuration / Configuration

### FHEVM 配置 / FHEVM Config / Config FHEVM

在 `src/config/fhevm.ts` 中配置 FHEVM：

Configure FHEVM in `src/config/fhevm.ts`:

Configurez FHEVM dans `src/config/fhevm.ts` :

```typescript
export const fhevmConfig = {
  chainId: 8009,
  networkUrl: 'https://devnet.zama.ai/',
  gatewayUrl: 'https://gateway.zama.ai/',
  aclAddress: '0xc9990FEfE0c27D31D0C2aa36196b085c0c4d456c',
  cacheEnabled: true,
  autoInit: true,
}
```

### Wagmi 配置 / Wagmi Config / Config Wagmi

在 `src/config/wagmi.ts` 中配置 wagmi：

Configure wagmi in `src/config/wagmi.ts`:

Configurez wagmi dans `src/config/wagmi.ts` :

```typescript
export const wagmiConfig = createConfig({
  chains: [zama],
  connectors: [
    injected(),
    walletConnect({ projectId: 'YOUR_PROJECT_ID' }),
  ],
  transports: {
    [zama.id]: http('https://devnet.zama.ai/'),
  },
})
```

**注意 / Note / Remarque**: 替换 `YOUR_PROJECT_ID` 为你的 WalletConnect 项目 ID / Replace `YOUR_PROJECT_ID` with your WalletConnect project ID / Remplacez `YOUR_PROJECT_ID` par votre ID de projet WalletConnect。

## 💡 使用方法 / Usage / Utilisation

### 1. 连接钱包 / Connect Wallet / Connecter le Portefeuille

点击 "Connect with ..." 按钮连接你的钱包。

Click "Connect with ..." button to connect your wallet.

Cliquez sur "Connect with ..." pour connecter votre portefeuille.

### 2. 选择加密类型 / Select Encryption Type / Sélectionner le Type de Chiffrement

选择要加密的数据类型：

Select the data type to encrypt:

Sélectionnez le type de données à chiffrer :

- bool
- uint8, uint16, uint32, uint64, uint128, uint256

### 3. 输入值 / Enter Value / Entrer la Valeur

输入要加密的值。

Enter the value to encrypt.

Entrez la valeur à chiffrer.

### 4. 加密 / Encrypt / Chiffrer

点击 "Encrypt" 按钮执行加密。

Click "Encrypt" button to perform encryption.

Cliquez sur "Encrypt" pour effectuer le chiffrement.

### 5. 查看结果 / View Results / Voir les Résultats

加密成功后，将显示：

After successful encryption, it will show:

Après un chiffrement réussi, il affichera :

- 加密句柄 / Encrypted handles / Handles chiffrés
- 输入证明长度 / Input proof length / Longueur de preuve d'entrée

## 🛠️ 技术栈 / Tech Stack / Stack Technique

- **React 19** - UI 库 / UI library / Bibliothèque UI
- **Vite** - 构建工具 / Build tool / Outil de build
- **TypeScript** - 类型安全 / Type safety / Sécurité de type
- **wagmi** - 以太坊钱包连接 / Ethereum wallet connections / Connexions de portefeuille Ethereum
- **viem** - 以太坊工具 / Ethereum utilities / Utilitaires Ethereum
- **@universal-fhevm/react** - FHEVM SDK React hooks
- **@tanstack/react-query** - 状态管理 / State management / Gestion d'état

## 📝 代码示例 / Code Examples / Exemples de Code

### 使用 FHEVM Hook / Using FHEVM Hook / Utiliser le Hook FHEVM

```tsx
import { useFHEVM, useEncrypt } from '@universal-fhevm/react'

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

  return (
    <button onClick={handleEncrypt} disabled={!isReady || isPending}>
      {isPending ? '加密中...' : '加密'}
    </button>
  )
}
```

### 使用钱包连接 / Using Wallet Connection / Utiliser la Connexion au Portefeuille

```tsx
import { useAccount, useConnect, useDisconnect } from 'wagmi'

function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { connectors, connect } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return <button onClick={() => disconnect()}>断开连接</button>
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button key={connector.id} onClick={() => connect({ connector })}>
          连接 {connector.name}
        </button>
      ))}
    </div>
  )
}
```

## 🎨 自定义样式 / Custom Styling / Styles Personnalisés

样式定义在 `src/App.css` 中。你可以修改以下变量来自定义主题：

Styles are defined in `src/App.css`. You can modify the following to customize the theme:

Les styles sont définis dans `src/App.css`. Vous pouvez modifier ce qui suit pour personnaliser le thème :

- 渐变色 / Gradient colors / Couleurs de dégradé
- 按钮样式 / Button styles / Styles de bouton
- 卡片样式 / Card styles / Styles de carte
- 响应式断点 / Responsive breakpoints / Points de rupture réactifs

## 🐛 故障排除 / Troubleshooting / Dépannage

### FHEVM 未初始化 / FHEVM Not Initializing / FHEVM ne s'Initialise Pas

确保 FHEVM 配置正确，并且网络连接正常。

Ensure FHEVM config is correct and network connection is stable.

Assurez-vous que la configuration FHEVM est correcte et que la connexion réseau est stable.

### 钱包连接失败 / Wallet Connection Failed / Échec de Connexion au Portefeuille

检查你的钱包是否安装并解锁。

Check if your wallet is installed and unlocked.

Vérifiez si votre portefeuille est installé et déverrouillé.

### 构建错误 / Build Errors / Erreurs de Build

清除缓存并重新安装依赖：

Clear cache and reinstall dependencies:

Effacez le cache et réinstallez les dépendances :

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

## 📄 许可证 / License / Licence

MIT License - 详见根目录 LICENSE 文件 / See LICENSE file in root directory / Voir le fichier LICENSE dans le répertoire racine

## 🔗 相关链接 / Related Links / Liens Connexes

- [Universal FHEVM SDK 文档](../../README.md)
- [Zama 文档](https://docs.zama.ai/)
- [wagmi 文档](https://wagmi.sh/)
- [Vite 文档](https://vitejs.dev/)
