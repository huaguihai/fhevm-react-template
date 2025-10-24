'use strict';

var core = require('@universal-fhevm/core');
var vue = require('vue');

// src/plugin/FHEVMPlugin.ts
var FHEVM_INJECTION_KEY = Symbol("fhevm");
var FHEVMPlugin = {
  install(app, options) {
    const state = vue.reactive({
      client: null,
      instance: null,
      isReady: false,
      error: null
    });
    const initializeClient = async () => {
      try {
        const client = new core.FHEVMClient(options.config);
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
  const state = vue.inject(FHEVM_INJECTION_KEY);
  if (!state) {
    throw new Error("useFHEVM must be used after installing FHEVMPlugin");
  }
  return state;
}
function useEncrypt(options) {
  const { instance, isReady } = useFHEVM();
  const isPending = vue.ref(false);
  const isSuccess = vue.ref(false);
  const isError = vue.ref(false);
  const error = vue.ref(null);
  const data = vue.ref(null);
  const encrypt = async (params) => {
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
      const result = await core.encrypt(instance, params, options.userAddress);
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
    encrypt,
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
  const isPending = vue.ref(false);
  const isSuccess = vue.ref(false);
  const isError = vue.ref(false);
  const error = vue.ref(null);
  const data = vue.ref(null);
  const decrypt = async (params) => {
    if (!instance || !isReady) {
      throw new Error("FHEVM instance is not ready");
    }
    isPending.value = true;
    isError.value = false;
    error.value = null;
    try {
      const { userAddress, privateKey, signature, ...decryptParams } = params;
      const result = await core.decrypt(instance, decryptParams, userAddress, privateKey, signature);
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
    decrypt,
    isPending,
    isSuccess,
    isError,
    error,
    data,
    reset
  };
}

Object.defineProperty(exports, "createConfig", {
  enumerable: true,
  get: function () { return core.createConfig; }
});
exports.FHEVMPlugin = FHEVMPlugin;
exports.useDecrypt = useDecrypt;
exports.useEncrypt = useEncrypt;
exports.useFHEVM = useFHEVM;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map