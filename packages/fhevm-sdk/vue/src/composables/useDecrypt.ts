import { ref } from 'vue'
import { decrypt as coreDecrypt, type DecryptParams } from '@universal-fhevm/core'
import { useFHEVM } from './useFHEVM'

export interface UseDecryptOptions {
  onSuccess?: (data: bigint) => void
  onError?: (error: Error) => void
}

export interface DecryptParamsWithAuth extends DecryptParams {
  userAddress: string
  privateKey: string
  signature: string
}

/**
 * Composable for decrypting values
 */
export function useDecrypt(options?: UseDecryptOptions) {
  const { instance, isReady } = useFHEVM()
  const isPending = ref(false)
  const isSuccess = ref(false)
  const isError = ref(false)
  const error = ref<Error | null>(null)
  const data = ref<bigint | null>(null)

  const decrypt = async (params: DecryptParamsWithAuth): Promise<bigint> => {
    if (!instance || !isReady) {
      throw new Error('FHEVM instance is not ready')
    }

    isPending.value = true
    isError.value = false
    error.value = null

    try {
      const { userAddress, privateKey, signature, ...decryptParams } = params
      const result = await coreDecrypt(instance, decryptParams, userAddress, privateKey, signature)
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
    decrypt,
    isPending,
    isSuccess,
    isError,
    error,
    data,
    reset,
  }
}
