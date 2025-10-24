import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { encrypt as coreEncrypt, type EncryptParams, type EncryptedData } from '@universal-fhevm/core'
import { useFHEVM } from './useFHEVM'

export interface UseEncryptOptions extends Omit<UseMutationOptions<EncryptedData, Error, EncryptParams>, 'mutationFn'> {
  userAddress?: string
}

/**
 * Hook for encrypting values
 */
export function useEncrypt(options?: UseEncryptOptions) {
  const { instance, isReady } = useFHEVM()

  const mutation = useMutation<EncryptedData, Error, EncryptParams>({
    mutationFn: async (params) => {
      if (!instance || !isReady) {
        throw new Error('FHEVM instance is not ready')
      }

      if (!options?.userAddress) {
        throw new Error('userAddress is required for encryption')
      }

      return coreEncrypt(instance, params, options.userAddress)
    },
    ...options,
  })

  return {
    encrypt: mutation.mutate,
    encryptAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  }
}
