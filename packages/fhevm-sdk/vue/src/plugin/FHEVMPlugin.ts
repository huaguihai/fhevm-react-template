import type { App, Plugin, InjectionKey } from 'vue'
import { FHEVMClient, type FHEVMConfig, type FHEVMInstance } from '@universal-fhevm/core'
import { reactive } from 'vue'

export interface FHEVMPluginState {
  client: any | null
  instance: FHEVMInstance | null
  isReady: boolean
  error: Error | null
}

export const FHEVM_INJECTION_KEY: InjectionKey<FHEVMPluginState> = Symbol('fhevm')

export interface FHEVMPluginOptions {
  config: FHEVMConfig
}

export const FHEVMPlugin: Plugin = {
  install(app: App, options: FHEVMPluginOptions) {
    const state = reactive<FHEVMPluginState>({
      client: null,
      instance: null,
      isReady: false,
      error: null,
    })

    // Initialize FHEVM client
    const initializeClient = async () => {
      try {
        const client = new FHEVMClient(options.config)

        if (options.config.autoInit !== false) {
          await client.init()
        }

        state.client = client

        if (client.isReady()) {
          state.instance = client.getInstance()
          state.isReady = true
        }
      } catch (err) {
        state.error = err instanceof Error ? err : new Error(String(err))
        state.isReady = false
      }
    }

    initializeClient()

    // Provide state to the app
    app.provide(FHEVM_INJECTION_KEY, state)
  },
}
