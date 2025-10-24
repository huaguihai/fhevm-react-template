'use strict';

// src/utils/errors.ts
var FHEVMError = class _FHEVMError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
    this.name = "FHEVMError";
    Object.setPrototypeOf(this, _FHEVMError.prototype);
  }
};
var InstanceNotReadyError = class extends FHEVMError {
  constructor() {
    super("FHEVM instance is not initialized. Call init() first.", "INSTANCE_NOT_READY");
    this.name = "InstanceNotReadyError";
  }
};
var EncryptionError = class extends FHEVMError {
  constructor(message) {
    super(`Encryption failed: ${message}`, "ENCRYPTION_ERROR");
    this.name = "EncryptionError";
  }
};
var DecryptionError = class extends FHEVMError {
  constructor(message) {
    super(`Decryption failed: ${message}`, "DECRYPTION_ERROR");
    this.name = "DecryptionError";
  }
};
var ConfigError = class extends FHEVMError {
  constructor(message) {
    super(`Invalid configuration: ${message}`, "CONFIG_ERROR");
    this.name = "ConfigError";
  }
};

// src/client/FHEVMClient.ts
var _FHEVMClient = class _FHEVMClient {
  constructor(config) {
    this.instance = null;
    this.isInitialized = false;
    this.config = config;
  }
  /**
   * Initialize the FHEVM instance
   */
  async init() {
    if (this.isInitialized && this.instance) {
      return;
    }
    const cacheKey = this.getCacheKey();
    if (this.config.cacheEnabled && _FHEVMClient.instanceCache.has(cacheKey)) {
      this.instance = _FHEVMClient.instanceCache.get(cacheKey);
      this.isInitialized = true;
      return;
    }
    try {
      const { createInstance, initFhevm } = await import('fhevmjs');
      if (typeof window !== "undefined") {
        await initFhevm();
      }
      const instance = await createInstance({
        chainId: this.config.chainId,
        networkUrl: this.config.networkUrl,
        gatewayUrl: this.config.gatewayUrl,
        aclAddress: this.config.aclAddress
      });
      this.instance = instance;
      this.isInitialized = true;
      if (this.config.cacheEnabled) {
        _FHEVMClient.instanceCache.set(cacheKey, this.instance);
      }
    } catch (error) {
      throw new Error(
        `Failed to initialize FHEVM instance: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
  /**
   * Get the FHEVM instance
   */
  getInstance() {
    if (!this.instance || !this.isInitialized) {
      throw new InstanceNotReadyError();
    }
    return this.instance;
  }
  /**
   * Check if instance is ready
   */
  isReady() {
    return this.isInitialized && this.instance !== null;
  }
  /**
   * Get config
   */
  getConfig() {
    return this.config;
  }
  /**
   * Generate cache key for instance caching
   */
  getCacheKey() {
    return `${this.config.chainId}-${this.config.networkUrl}-${this.config.gatewayUrl}`;
  }
  /**
   * Clear the instance cache
   */
  static clearCache() {
    _FHEVMClient.instanceCache.clear();
  }
};
_FHEVMClient.instanceCache = /* @__PURE__ */ new Map();
var FHEVMClient = _FHEVMClient;

// src/client/createConfig.ts
function createConfig(config) {
  if (!config.chainId) {
    throw new ConfigError("chainId is required");
  }
  if (!config.networkUrl) {
    throw new ConfigError("networkUrl is required");
  }
  if (!config.gatewayUrl) {
    throw new ConfigError("gatewayUrl is required");
  }
  if (!config.aclAddress) {
    throw new ConfigError("aclAddress is required");
  }
  if (typeof config.chainId !== "number" || config.chainId <= 0) {
    throw new ConfigError("chainId must be a positive number");
  }
  try {
    new URL(config.networkUrl);
  } catch {
    throw new ConfigError("networkUrl must be a valid URL");
  }
  try {
    new URL(config.gatewayUrl);
  } catch {
    throw new ConfigError("gatewayUrl must be a valid URL");
  }
  if (!/^0x[a-fA-F0-9]{40}$/.test(config.aclAddress)) {
    throw new ConfigError("aclAddress must be a valid Ethereum address");
  }
  return {
    ...config,
    cacheEnabled: config.cacheEnabled ?? true,
    autoInit: config.autoInit ?? true
  };
}

// src/encryption/index.ts
function convertToEncryptedData(result) {
  return {
    handles: result.handles.map((h) => "0x" + Buffer.from(h).toString("hex")),
    inputProof: result.inputProof
  };
}
function addValueToInput(input, value, type) {
  switch (type) {
    case "bool":
      if (typeof value !== "boolean") {
        throw new EncryptionError(`Value must be boolean for type 'bool'`);
      }
      input.addBool(value);
      break;
    case "uint8":
      if (typeof value !== "number") {
        throw new EncryptionError(`Value must be number for type 'uint8'`);
      }
      input.add8(value);
      break;
    case "uint16":
      if (typeof value !== "number") {
        throw new EncryptionError(`Value must be number for type 'uint16'`);
      }
      input.add16(value);
      break;
    case "uint32":
      if (typeof value !== "number") {
        throw new EncryptionError(`Value must be number for type 'uint32'`);
      }
      input.add32(value);
      break;
    case "uint64":
      input.add64(BigInt(value));
      break;
    case "uint128":
      input.add128(BigInt(value));
      break;
    case "uint256":
      input.add256(BigInt(value));
      break;
    default:
      throw new EncryptionError(`Unsupported encryption type: ${type}`);
  }
}
async function encrypt(instance, params, userAddress) {
  try {
    const input = instance.createEncryptedInput(params.contractAddress, userAddress);
    addValueToInput(input, params.value, params.type);
    const result = input.encrypt();
    return convertToEncryptedData(result);
  } catch (error) {
    throw new EncryptionError(
      `Failed to encrypt value: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
async function encryptBatch(instance, params, userAddress) {
  try {
    const input = instance.createEncryptedInput(params.contractAddress, userAddress);
    for (const item of params.values) {
      addValueToInput(input, item.value, item.type);
    }
    const result = input.encrypt();
    return convertToEncryptedData(result);
  } catch (error) {
    throw new EncryptionError(
      `Failed to batch encrypt: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
function createEncryptedInput(instance, contractAddress, userAddress) {
  return instance.createEncryptedInput(contractAddress, userAddress);
}

// src/decryption/index.ts
async function generateToken(instance, params) {
  try {
    const publicKey = instance.getPublicKey();
    if (!publicKey) {
      throw new DecryptionError("Public key not available");
    }
    const eip712 = instance.createEIP712(
      publicKey,
      params.verifyingContract,
      params.userAddress
    );
    return eip712;
  } catch (error) {
    throw new DecryptionError(
      `Failed to generate token: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
async function decrypt(instance, params, userAddress, privateKey, signature) {
  try {
    const publicKey = instance.getPublicKey();
    if (!publicKey) {
      throw new DecryptionError("Public key not available");
    }
    const decrypted = await instance.reencrypt(
      BigInt(params.handle),
      privateKey,
      publicKey,
      signature,
      params.contractAddress,
      userAddress
    );
    return decrypted;
  } catch (error) {
    throw new DecryptionError(
      `Failed to decrypt: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
async function reencrypt(instance, handle, contractAddress, userAddress, privateKey, signature) {
  try {
    const publicKey = instance.getPublicKey();
    if (!publicKey) {
      throw new DecryptionError("Public key not available");
    }
    const result = await instance.reencrypt(
      BigInt(handle),
      privateKey,
      publicKey,
      signature,
      contractAddress,
      userAddress
    );
    return result;
  } catch (error) {
    throw new DecryptionError(
      `Failed to reencrypt: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

exports.ConfigError = ConfigError;
exports.DecryptionError = DecryptionError;
exports.EncryptionError = EncryptionError;
exports.FHEVMClient = FHEVMClient;
exports.FHEVMError = FHEVMError;
exports.InstanceNotReadyError = InstanceNotReadyError;
exports.createConfig = createConfig;
exports.createEncryptedInput = createEncryptedInput;
exports.decrypt = decrypt;
exports.encrypt = encrypt;
exports.encryptBatch = encryptBatch;
exports.generateToken = generateToken;
exports.reencrypt = reencrypt;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map