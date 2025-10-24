import { FHEVMClient, decrypt, encrypt } from '@universal-fhevm/core';
export { createConfig } from '@universal-fhevm/core';
import { reactive, inject, ref } from 'vue';

// src/plugin/FHEVMPlugin.ts
var FHEVM_INJECTION_KEY = Symbol("fhevm");
var FHEVMPlugin = {
  install(app, options) {
    const state = reactive({
      client: null,
      instance: null,
      isReady: false,
      error: null
    });
    const initializeClient = async () => {
      try {
        const client = new FHEVMClient(options.config);
        if (options.config.autoInit !== false) {
          await client.init();
        }
        state.client = client;
        if (client.isReady()) {
          state.instance = client.getInstance();
          state.isReady = true;
        }
      } catch (err) {
        state.error = err instanceof Error ? err : new Error(String(err));
        state.isReady = false;
      }
    };
    initializeClient();
    app.provide(FHEVM_INJECTION_KEY, state);
  }
};
function useFHEVM() {
  const state = inject(FHEVM_INJECTION_KEY);
  if (!state) {
    throw new Error("useFHEVM must be used after installing FHEVMPlugin");
  }
  return state;
}
function useEncrypt(options) {
  const { instance, isReady } = useFHEVM();
  const isPending = ref(false);
  const isSuccess = ref(false);
  const isError = ref(false);
  const error = ref(null);
  const data = ref(null);
  const encrypt$1 = async (params) => {
    if (!instance || !isReady) {
      throw new Error("FHEVM instance is not ready");
    }
    if (!options?.userAddress) {
      throw new Error("userAddress is required for encryption");
    }
    isPending.value = true;
    isError.value = false;
    error.value = null;
    try {
      const result = await encrypt(instance, params, options.userAddress);
      data.value = result;
      isSuccess.value = true;
      options?.onSuccess?.(result);
      return result;
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      error.value = errorObj;
      isError.value = true;
      options?.onError?.(errorObj);
      throw errorObj;
    } finally {
      isPending.value = false;
    }
  };
  const reset = () => {
    isPending.value = false;
    isSuccess.value = false;
    isError.value = false;
    error.value = null;
    data.value = null;
  };
  return {
    encrypt: encrypt$1,
    isPending,
    isSuccess,
    isError,
    error,
    data,
    reset
  };
}
function useDecrypt(options) {
  const { instance, isReady } = useFHEVM();
  const isPending = ref(false);
  const isSuccess = ref(false);
  const isError = ref(false);
  const error = ref(null);
  const data = ref(null);
  const decrypt$1 = async (params) => {
    if (!instance || !isReady) {
      throw new Error("FHEVM instance is not ready");
    }
    isPending.value = true;
    isError.value = false;
    error.value = null;
    try {
      const { userAddress, privateKey, signature, ...decryptParams } = params;
      const result = await decrypt(instance, decryptParams, userAddress, privateKey, signature);
      data.value = result;
      isSuccess.value = true;
      options?.onSuccess?.(result);
      return result;
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      error.value = errorObj;
      isError.value = true;
      options?.onError?.(errorObj);
      throw errorObj;
    } finally {
      isPending.value = false;
    }
  };
  const reset = () => {
    isPending.value = false;
    isSuccess.value = false;
    isError.value = false;
    error.value = null;
    data.value = null;
  };
  return {
    decrypt: decrypt$1,
    isPending,
    isSuccess,
    isError,
    error,
    data,
    reset
  };
}

export { FHEVMPlugin, useDecrypt, useEncrypt, useFHEVM };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map