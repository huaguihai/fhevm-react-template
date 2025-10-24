'use strict';

var react = require('react');
var core = require('@universal-fhevm/core');
var reactQuery = require('@tanstack/react-query');
var jsxRuntime = require('react/jsx-runtime');

// src/context/FHEVMProvider.tsx
var FHEVMContext = react.createContext({
  client: null,
  instance: null,
  isReady: false,
  error: null
});
var defaultQueryClient = new reactQuery.QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});
function FHEVMProvider({ config, children, queryClient = defaultQueryClient }) {
  const [client, setClient] = react.useState(null);
  const [instance, setInstance] = react.useState(null);
  const [isReady, setIsReady] = react.useState(false);
  const [error, setError] = react.useState(null);
  react.useEffect(() => {
    let mounted = true;
    async function initialize() {
      try {
        const fhevmClient = new core.FHEVMClient(config);
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
  return /* @__PURE__ */ jsxRuntime.jsx(reactQuery.QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntime.jsx(FHEVMContext.Provider, { value, children }) });
}
function useFHEVM() {
  const context = react.useContext(FHEVMContext);
  if (!context) {
    throw new Error("useFHEVM must be used within FHEVMProvider");
  }
  return context;
}
function useEncrypt(options) {
  const { instance, isReady } = useFHEVM();
  const mutation = reactQuery.useMutation({
    mutationFn: async (params) => {
      if (!instance || !isReady) {
        throw new Error("FHEVM instance is not ready");
      }
      if (!options?.userAddress) {
        throw new Error("userAddress is required for encryption");
      }
      return core.encrypt(instance, params, options.userAddress);
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
  const mutation = reactQuery.useMutation({
    mutationFn: async (params) => {
      if (!instance || !isReady) {
        throw new Error("FHEVM instance is not ready");
      }
      const { signature, userAddress, privateKey, ...decryptParams } = params;
      return core.decrypt(instance, decryptParams, userAddress, privateKey, signature);
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
  const mutation = reactQuery.useMutation({
    mutationFn: async (params) => {
      if (!instance || !isReady) {
        throw new Error("FHEVM instance is not ready");
      }
      if (!options?.userAddress) {
        throw new Error("userAddress is required for encryption");
      }
      return core.encryptBatch(instance, params, options.userAddress);
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

Object.defineProperty(exports, "createConfig", {
  enumerable: true,
  get: function () { return core.createConfig; }
});
exports.FHEVMContext = FHEVMContext;
exports.FHEVMProvider = FHEVMProvider;
exports.useDecrypt = useDecrypt;
exports.useEncrypt = useEncrypt;
exports.useEncryptBatch = useEncryptBatch;
exports.useFHEVM = useFHEVM;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map