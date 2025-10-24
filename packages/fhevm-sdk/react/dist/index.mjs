import { createContext, useState, useEffect, useContext } from 'react';
import { encrypt, decrypt, encryptBatch, FHEVMClient } from '@universal-fhevm/core';
export { createConfig } from '@universal-fhevm/core';
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
import { jsx } from 'react/jsx-runtime';

// src/context/FHEVMProvider.tsx
var FHEVMContext = createContext({
  client: null,
  instance: null,
  isReady: false,
  error: null
});
var defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});
function FHEVMProvider({ config, children, queryClient = defaultQueryClient }) {
  const [client, setClient] = useState(null);
  const [instance, setInstance] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    let mounted = true;
    async function initialize() {
      try {
        const fhevmClient = new FHEVMClient(config);
        if (config.autoInit !== false) {
          await fhevmClient.init();
        }
        if (mounted) {
          setClient(fhevmClient);
          if (fhevmClient.isReady()) {
            setInstance(fhevmClient.getInstance());
            setIsReady(true);
          }
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setIsReady(false);
        }
      }
    }
    initialize();
    return () => {
      mounted = false;
    };
  }, [config]);
  const value = {
    client,
    instance,
    isReady,
    error
  };
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(FHEVMContext.Provider, { value, children }) });
}
function useFHEVM() {
  const context = useContext(FHEVMContext);
  if (!context) {
    throw new Error("useFHEVM must be used within FHEVMProvider");
  }
  return context;
}
function useEncrypt(options) {
  const { instance, isReady } = useFHEVM();
  const mutation = useMutation({
    mutationFn: async (params) => {
      if (!instance || !isReady) {
        throw new Error("FHEVM instance is not ready");
      }
      if (!options?.userAddress) {
        throw new Error("userAddress is required for encryption");
      }
      return encrypt(instance, params, options.userAddress);
    },
    ...options
  });
  return {
    encrypt: mutation.mutate,
    encryptAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset
  };
}
function useDecrypt(options) {
  const { instance, isReady } = useFHEVM();
  const mutation = useMutation({
    mutationFn: async (params) => {
      if (!instance || !isReady) {
        throw new Error("FHEVM instance is not ready");
      }
      const { signature, userAddress, privateKey, ...decryptParams } = params;
      return decrypt(instance, decryptParams, userAddress, privateKey, signature);
    },
    ...options
  });
  return {
    decrypt: mutation.mutate,
    decryptAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset
  };
}
function useEncryptBatch(options) {
  const { instance, isReady } = useFHEVM();
  const mutation = useMutation({
    mutationFn: async (params) => {
      if (!instance || !isReady) {
        throw new Error("FHEVM instance is not ready");
      }
      if (!options?.userAddress) {
        throw new Error("userAddress is required for encryption");
      }
      return encryptBatch(instance, params, options.userAddress);
    },
    ...options
  });
  return {
    encryptBatch: mutation.mutate,
    encryptBatchAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset
  };
}

export { FHEVMContext, FHEVMProvider, useDecrypt, useEncrypt, useEncryptBatch, useFHEVM };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map