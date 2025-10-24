import { useEffect, useState, type ReactNode } from 'react'
import { FHEVMClient, type FHEVMConfig, type FHEVMInstance } from '@universal-fhevm/core'
import { FHEVMContext } from './FHEVMContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export interface FHEVMProviderProps {
  config: FHEVMConfig
  children: ReactNode
  queryClient?: QueryClient
}

const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

export function FHEVMProvider({ config, children, queryClient = defaultQueryClient }: FHEVMProviderProps) {
  const [client, setClient] = useState<FHEVMClient | null>(null)
  const [instance, setInstance] = useState<FHEVMInstance | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true

    async function initialize() {
      try {
        const fhevmClient = new FHEVMClient(config)

        if (config.autoInit !== false) {
          await fhevmClient.init()
        }

        if (mounted) {
          setClient(fhevmClient)

          if (fhevmClient.isReady()) {
            setInstance(fhevmClient.getInstance())
            setIsReady(true)
          }
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error(String(err)))
          setIsReady(false)
        }
      }
    }

    initialize()

    return () => {
      mounted = false
    }
  }, [config])

  const value = {
    client,
    instance,
    isReady,
    error,
  }

  return (
    <QueryClientProvider client={queryClient}>
      <FHEVMContext.Provider value={value}>{children}</FHEVMContext.Provider>
    </QueryClientProvider>
  )
}
