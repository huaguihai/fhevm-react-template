import { inject } from 'vue'
import { FHEVM_INJECTION_KEY, type FHEVMPluginState } from '../plugin/FHEVMPlugin'

/**
 * Composable to access FHEVM instance and client
 */
export function useFHEVM(): FHEVMPluginState {
  const state = inject(FHEVM_INJECTION_KEY)

  if (!state) {
    throw new Error('useFHEVM must be used after installing FHEVMPlugin')
  }

  return state
}
