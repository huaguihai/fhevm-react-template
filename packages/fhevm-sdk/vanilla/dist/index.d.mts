import { FHEVMClient as FHEVMClient$1, EncryptParams, EncryptedData, EncryptBatchParams, DecryptParams, TokenParams } from '@universal-fhevm/core';
export { DecryptParams, EncryptBatchParams, EncryptParams, EncryptedData, FHEVMConfig, TokenParams, createConfig } from '@universal-fhevm/core';

declare class FHEVMClient extends FHEVMClient$1 {
    private userAddress;
    private privateKey;
    setUserAddress(address: string): void;
    getUserAddress(): string;
    setPrivateKey(key: string): void;
    encrypt(params: EncryptParams): Promise<EncryptedData>;
    encryptBatch(params: EncryptBatchParams): Promise<EncryptedData>;
    decrypt(params: DecryptParams, signature: string): Promise<bigint>;
    reencrypt(handle: string, contractAddress: string, signature: string): Promise<bigint>;
    generateToken(params: TokenParams & {
        userAddress?: string;
    }): Promise<any>;
}

export { FHEVMClient };
