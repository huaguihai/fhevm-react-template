import { FHEVMClient as FHEVMClient$1, encrypt, encryptBatch, decrypt, reencrypt, generateToken } from '@universal-fhevm/core';
export { createConfig } from '@universal-fhevm/core';

// src/index.ts
var FHEVMClient = class extends FHEVMClient$1 {
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
    return encrypt(instance, params, this.userAddress);
  }
  /**
   * Encrypt multiple values in batch
   */
  async encryptBatch(params) {
    const instance = this.getInstance();
    return encryptBatch(instance, params, this.userAddress);
  }
  /**
   * Decrypt a value
   */
  async decrypt(params, signature) {
    const instance = this.getInstance();
    return decrypt(instance, params, this.userAddress, this.privateKey, signature);
  }
  /**
   * Reencrypt a handle
   */
  async reencrypt(handle, contractAddress, signature) {
    const instance = this.getInstance();
    return reencrypt(
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
    return generateToken(instance, { ...params, userAddress: params.userAddress || this.userAddress });
  }
};

export { FHEVMClient };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map