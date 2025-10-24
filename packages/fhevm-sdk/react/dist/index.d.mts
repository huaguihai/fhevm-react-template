import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { ReactNode } from 'react';
import { FHEVMConfig, FHEVMClient, FHEVMInstance, EncryptedData, EncryptParams, DecryptParams, EncryptBatchParams } from '@universal-fhevm/core';
export { DecryptParams, EncryptBatchParams, EncryptParams, EncryptType, EncryptedData, FHEVMConfig, TokenParams, createConfig } from '@universal-fhevm/core';
import * as _tanstack_react_query from '@tanstack/react-query';
import { QueryClient, UseMutationOptions } from '@tanstack/react-query';

interface FHEVMProviderProps {
    config: FHEVMConfig;
    children: ReactNode;
    queryClient?: QueryClient;
}
declare function FHEVMProvider({ config, children, queryClient }: FHEVMProviderProps): react_jsx_runtime.JSX.Element;

interface FHEVMContextValue {
    client: FHEVMClient | null;
    instance: FHEVMInstance | null;
    isReady: boolean;
    error: Error | null;
}
declare const FHEVMContext: react.Context<FHEVMContextValue>;

declare function useFHEVM(): FHEVMContextValue;

interface UseEncryptOptions extends Omit<UseMutationOptions<EncryptedData, Error, EncryptParams>, 'mutationFn'> {
    userAddress?: string;
}
declare function useEncrypt(options?: UseEncryptOptions): {
    encrypt: _tanstack_react_query.UseMutateFunction<EncryptedData, Error, EncryptParams, unknown>;
    encryptAsync: _tanstack_react_query.UseMutateAsyncFunction<EncryptedData, Error, EncryptParams, unknown>;
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: Error | null;
    data: EncryptedData | undefined;
    reset: () => void;
};

interface UseDecryptOptions extends Omit<UseMutationOptions<bigint, Error, DecryptParams & {
    signature: string;
    userAddress: string;
    privateKey: string;
}>, 'mutationFn'> {
}
declare function useDecrypt(options?: UseDecryptOptions): {
    decrypt: _tanstack_react_query.UseMutateFunction<bigint, Error, DecryptParams & {
        signature: string;
        userAddress: string;
        privateKey: string;
    }, unknown>;
    decryptAsync: _tanstack_react_query.UseMutateAsyncFunction<bigint, Error, DecryptParams & {
        signature: string;
        userAddress: string;
        privateKey: string;
    }, unknown>;
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: Error | null;
    data: bigint | undefined;
    reset: () => void;
};

interface UseEncryptBatchOptions extends Omit<UseMutationOptions<EncryptedData, Error, EncryptBatchParams>, 'mutationFn'> {
    userAddress?: string;
}
declare function useEncryptBatch(options?: UseEncryptBatchOptions): {
    encryptBatch: _tanstack_react_query.UseMutateFunction<EncryptedData, Error, EncryptBatchParams, unknown>;
    encryptBatchAsync: _tanstack_react_query.UseMutateAsyncFunction<EncryptedData, Error, EncryptBatchParams, unknown>;
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: Error | null;
    data: EncryptedData | undefined;
    reset: () => void;
};

export { FHEVMContext, type FHEVMContextValue, FHEVMProvider, type FHEVMProviderProps, type UseDecryptOptions, type UseEncryptBatchOptions, type UseEncryptOptions, useDecrypt, useEncrypt, useEncryptBatch, useFHEVM };
