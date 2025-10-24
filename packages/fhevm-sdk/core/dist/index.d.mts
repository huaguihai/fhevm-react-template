type EncryptType = 'bool' | 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'uint128' | 'uint256';
interface FHEVMConfig {
    chainId: number;
    networkUrl: string;
    gatewayUrl: string;
    aclAddress: string;
    cacheEnabled?: boolean;
    autoInit?: boolean;
}
interface EncryptParams {
    value: number | bigint | boolean;
    type: EncryptType;
    contractAddress: string;
}
interface EncryptBatchParams {
    values: Array<{
        value: number | bigint | boolean;
        type: EncryptType;
    }>;
    contractAddress: string;
}
interface EncryptedData {
    handles: string[];
    inputProof: Uint8Array;
}
interface DecryptParams {
    handle: string;
    contractAddress: string;
}
interface TokenParams {
    verifyingContract: string;
}
interface Signer {
    getAddress(): Promise<string>;
    signTypedData(...args: any[]): Promise<string>;
}

interface FHEVMInstance {
    createEncryptedInput(contractAddress: string, userAddress: string): EncryptedInputBuilder;
    getPublicKey(): string | null;
    reencrypt(handle: bigint, privateKey: string, publicKey: string, signature: string, contractAddress: string, userAddress: string): Promise<bigint>;
    createEIP712(publicKey: string, contractAddress: string, userAddress?: string): EIP712;
    generateKeypair(): {
        publicKey: string;
        privateKey: string;
    };
}
interface EncryptedInputBuilder {
    add8(value: number): EncryptedInputBuilder;
    add16(value: number): EncryptedInputBuilder;
    add32(value: number): EncryptedInputBuilder;
    add64(value: bigint): EncryptedInputBuilder;
    add128(value: bigint): EncryptedInputBuilder;
    add256(value: bigint): EncryptedInputBuilder;
    addBool(value: boolean): EncryptedInputBuilder;
    encrypt(): {
        handles: Uint8Array[];
        inputProof: Uint8Array;
    };
    getValues(): Uint8Array[];
}
interface EIP712 {
    domain: {
        name: string;
        version: string;
        chainId: number;
        verifyingContract: string;
    };
    types: Record<string, any>;
    message: Record<string, any>;
    primaryType: string;
}
declare class FHEVMClient {
    private instance;
    private config;
    private isInitialized;
    private static instanceCache;
    constructor(config: FHEVMConfig);
    init(): Promise<void>;
    getInstance(): FHEVMInstance;
    isReady(): boolean;
    getConfig(): FHEVMConfig;
    private getCacheKey;
    static clearCache(): void;
}

declare function createConfig(config: FHEVMConfig): FHEVMConfig;

declare function encrypt(instance: FHEVMInstance, params: EncryptParams, userAddress: string): Promise<EncryptedData>;
declare function encryptBatch(instance: FHEVMInstance, params: EncryptBatchParams, userAddress: string): Promise<EncryptedData>;
declare function createEncryptedInput(instance: FHEVMInstance, contractAddress: string, userAddress: string): EncryptedInputBuilder;

declare function generateToken(instance: FHEVMInstance, params: TokenParams & {
    userAddress?: string;
}): Promise<EIP712>;
declare function decrypt(instance: FHEVMInstance, params: DecryptParams, userAddress: string, privateKey: string, signature: string): Promise<bigint>;
declare function reencrypt(instance: FHEVMInstance, handle: string, contractAddress: string, userAddress: string, privateKey: string, signature: string): Promise<bigint>;

declare class FHEVMError extends Error {
    code: string;
    constructor(message: string, code: string);
}
declare class InstanceNotReadyError extends FHEVMError {
    constructor();
}
declare class EncryptionError extends FHEVMError {
    constructor(message: string);
}
declare class DecryptionError extends FHEVMError {
    constructor(message: string);
}
declare class ConfigError extends FHEVMError {
    constructor(message: string);
}

export { ConfigError, type DecryptParams, DecryptionError, type EIP712, type EncryptBatchParams, type EncryptParams, type EncryptType, type EncryptedData, type EncryptedInputBuilder, EncryptionError, FHEVMClient, type FHEVMConfig, FHEVMError, type FHEVMInstance, InstanceNotReadyError, type Signer, type TokenParams, createConfig, createEncryptedInput, decrypt, encrypt, encryptBatch, generateToken, reencrypt };
