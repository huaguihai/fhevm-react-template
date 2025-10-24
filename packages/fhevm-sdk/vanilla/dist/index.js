'use strict';

var core = require('@universal-fhevm/core');

// src/index.ts
var FHEVMClient = class extends core.FHEVMClient {
  constructor() {
    super(...arguments);
    this.userAddress = "";
    this.privateKey = "";
  }
  /**
   * Set user address for operations
   */
  setUserAddress(address) {
    this.userAddress = address;
  }
  /**
   * Get user address
   */
  getUserAddress() {
    return this.userAddress;
  }
  /**
   * Set private key for decryption
   */
  setPrivateKey(key) {
    this.privateKey = key;
  }
  /**
   * Encrypt a single value
   */
  async encrypt(params) {
    const instance = this.getInstance();
    return core.encrypt(instance, params, this.userAddress);
  }
  /**
   * Encrypt multiple values in batch
   */
  async encryptBatch(params) {
    const instance = this.getInstance();
    return core.encryptBatch(instance, params, this.userAddress);
  }
  /**
   * Decrypt a value
   */
  async decrypt(params, signature) {
    const instance = this.getInstance();
    return core.decrypt(instance, params, this.userAddress, this.privateKey, signature);
  }
  /**
   * Reencrypt a handle
   */
  async reencrypt(handle, contractAddress, signature) {
    const instance = this.getInstance();
    return core.reencrypt(
      instance,
      handle,
      contractAddress,
      this.userAddress,
      this.privateKey,
      signature
    );
  }
  /**
   * Generate EIP712 for token signing
   */
  async generateToken(params) {
    const instance = this.getInstance();
    return core.generateToken(instance, { ...params, userAddress: params.userAddress || this.userAddress });
  }
};

Object.defineProperty(exports, "createConfig", {
  enumerable: true,
  get: function () { return core.createConfig; }
});
exports.FHEVMClient = FHEVMClient;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map