import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { encryptBatch as coreEncryptBatch, type EncryptBatchParams, type EncryptedData } from '@universal-fhevm/core'
import { useFHEVM } from './useFHEVM'

export interface UseEncryptBatchOptions extends Omit<UseMutationOptions<EncryptedData, Error, EncryptBatchParams>, 'mutationFn'> {
  userAddress?: string
}

/**
 * Hook for batch encrypting values
 */
export function useEncryptBatch(options?: UseEncryptBatchOptions) {
  const { instance, isReady } = useFHEVM()

  const mutation = useMutation<EncryptedData, Error, EncryptBatchParams>({
    mutationFn: async (params) => {
      if (!instance || !isReady) {
        throw new Error('FHEVM instance is not ready')
      }

      if (!options?.userAddress) {
        throw new Error('userAddress is required for encryption')
      }

      return coreEncryptBatch(instance, params, options.userAddress)
    },
    ...options,
  })

  return {
    encryptBatch: mutation.mutate,
    encryptBatchAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  }
}
