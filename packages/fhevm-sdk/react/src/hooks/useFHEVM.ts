import { useContext } from 'react'
import { FHEVMContext, type FHEVMContextValue } from '../context/FHEVMContext'

/**
 * Hook to access FHEVM instance and client
 */
export function useFHEVM(): FHEVMContextValue {
  const context = useContext(FHEVMContext)

  if (!context) {
    throw new Error('useFHEVM must be used within FHEVMProvider')
  }

  return context
}
