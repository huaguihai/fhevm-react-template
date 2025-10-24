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

    // Configure WASM support
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    }

    // Handle .wasm files
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/wasm/[name][ext]',
      },
    })

    // Copy WASM files from fhevmjs
    if (!isServer) {
      const wasmPaths = [
        path.resolve(__dirname, '../../node_modules/.pnpm/tfhe@0.6.4/node_modules/tfhe/tfhe_bg.wasm'),
        path.resolve(__dirname, '../../node_modules/.pnpm/fhevmjs@0.5.8/node_modules/fhevmjs/lib/kms_lib_bg.wasm'),
      ]

      config.plugins.push(
        new CopyPlugin({
          patterns: wasmPaths.map((from) => ({
            from,
            to: path.resolve(__dirname, 'public'),
            noErrorOnMissing: true,
          })),
        })
      )

      // Provide public path for WASM files
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.WASM_PATH': JSON.stringify('/'),
        })
      )
    }

    return config
  },
}

module.exports = nextConfig
