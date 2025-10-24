import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { decrypt as coreDecrypt, type DecryptParams } from '@universal-fhevm/core'
import { useFHEVM } from './useFHEVM'

export interface UseDecryptOptions extends Omit<UseMutationOptions<bigint, Error, DecryptParams & { signature: string; userAddress: string; privateKey: string }>, 'mutationFn'> {}

/**
 * Hook for decrypting values
 */
export function useDecrypt(options?: UseDecryptOptions) {
  const { instance, isReady } = useFHEVM()

  const mutation = useMutation<bigint, Error, DecryptParams & { signature: string; userAddress: string; privateKey: string }>({
    mutationFn: async (params) => {
      if (!instance || !isReady) {
        throw new Error('FHEVM instance is not ready')
      }

      const { signature, userAddress, privateKey, ...decryptParams } = params

      return coreDecrypt(instance, decryptParams, userAddress, privateKey, signature)
    },
    ...options,
  })

  return {
    decrypt: mutation.mutate,
    decryptAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  }
}
