const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer, webpack }) => {
    // Configure fallbacks for Node.js modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    }

    // Add externals
    config.externals.push('pino-pretty', 'lokijs', 'encoding')

    // Configure WASM support with all necessary experiments
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
      topLevelAwait: true,
    }

    // Optimization configuration for WASM
    config.optimization.moduleIds = 'named'

    // Configure output for WASM files
    if (isServer) {
      config.output.webassemblyModuleFilename = './../static/wasm/[modulehash].wasm'
    } else {
      config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm'
    }

    // Add aliases for WASM files
    config.resolve.alias = {
      ...config.resolve.alias,
      'tfhe_bg.wasm': path.resolve(__dirname, '../../node_modules/.pnpm/tfhe@0.6.4/node_modules/tfhe/tfhe_bg.wasm'),
      'kms_lib_bg.wasm': path.resolve(__dirname, '../../node_modules/.pnpm/fhevmjs@0.5.8_encoding@0.1.13/node_modules/fhevmjs/lib/kms_lib_bg.wasm'),
    }

    // Handle .wasm files as assets
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
    })

    // Copy WASM files from dependencies to public folder
    if (!isServer) {
      const wasmPaths = [
        {
          from: path.resolve(__dirname, '../../node_modules/.pnpm/tfhe@0.6.4/node_modules/tfhe/tfhe_bg.wasm'),
          to: path.resolve(__dirname, 'public/tfhe_bg.wasm'),
        },
        {
          from: path.resolve(__dirname, '../../node_modules/.pnpm/fhevmjs@0.5.8_encoding@0.1.13/node_modules/fhevmjs/lib/kms_lib_bg.wasm'),
          to: path.resolve(__dirname, 'public/kms_lib_bg.wasm'),
        },
      ]

      config.plugins.push(
        new CopyPlugin({
          patterns: wasmPaths.map((pattern) => ({
            ...pattern,
            noErrorOnMissing: true,
          })),
        })
      )
    }

    return config
  },
}

module.exports = nextConfig
