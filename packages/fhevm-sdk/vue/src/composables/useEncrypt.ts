import { ref } from 'vue'
import { encrypt as coreEncrypt, type EncryptParams, type EncryptedData } from '@universal-fhevm/core'
import { useFHEVM } from './useFHEVM'

export interface UseEncryptOptions {
  userAddress?: string
  onSuccess?: (data: EncryptedData) => void
  onError?: (error: Error) => void
}

/**
 * Composable for encrypting values
 */
export function useEncrypt(options?: UseEncryptOptions) {
  const { instance, isReady } = useFHEVM()
  const isPending = ref(false)
  const isSuccess = ref(false)
  const isError = ref(false)
  const error = ref<Error | null>(null)
  const data = ref<EncryptedData | null>(null)

  const encrypt = async (params: EncryptParams): Promise<EncryptedData> => {
    if (!instance || !isReady) {
      throw new Error('FHEVM instance is not ready')
    }

    if (!options?.userAddress) {
      throw new Error('userAddress is required for encryption')
    }

    isPending.value = true
    isError.value = false
    error.value = null

    try {
      const result = await coreEncrypt(instance, params, options.userAddress)
      data.value = result
      isSuccess.value = true
      options?.onSuccess?.(result)
      return result
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err))
      error.value = errorObj
      isError.value = true
      options?.onError?.(errorObj)
      throw errorObj
    } finally {
      isPending.value = false
    }
  }

  const reset = () => {
    isPending.value = false
    isSuccess.value = false
    isError.value = false
    error.value = null
    data.value = null
  }

  return {
    encrypt,
    isPending,
    isSuccess,
    isError,
    error,
    data,
    reset,
  }
}
