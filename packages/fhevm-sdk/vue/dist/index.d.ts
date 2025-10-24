import * as vue from 'vue';
import { Plugin } from 'vue';
import { FHEVMConfig, FHEVMInstance, EncryptedData, EncryptParams, DecryptParams } from '@universal-fhevm/core';
export { DecryptParams, EncryptBatchParams, EncryptParams, EncryptType, EncryptedData, FHEVMConfig, TokenParams, createConfig } from '@universal-fhevm/core';

interface FHEVMPluginState {
    client: any | null;
    instance: FHEVMInstance | null;
    isReady: boolean;
    error: Error | null;
}
interface FHEVMPluginOptions {
    config: FHEVMConfig;
}
declare const FHEVMPlugin: Plugin;

declare function useFHEVM(): FHEVMPluginState;

interface UseEncryptOptions {
    userAddress?: string;
    onSuccess?: (data: EncryptedData) => void;
    onError?: (error: Error) => void;
}
declare function useEncrypt(options?: UseEncryptOptions): {
    encrypt: (params: EncryptParams) => Promise<EncryptedData>;
    isPending: vue.Ref<boolean, boolean>;
    isSuccess: vue.Ref<boolean, boolean>;
    isError: vue.Ref<boolean, boolean>;
    error: vue.Ref<Error | null, Error | null>;
    data: vue.Ref<{
        handles: string[];
        inputProof: {
            [x: number]: number;
            readonly BYTES_PER_ELEMENT: number;
            readonly buffer: {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => ArrayBuffer;
                readonly [Symbol.toStringTag]: "ArrayBuffer";
            } | {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => SharedArrayBuffer;
                readonly [Symbol.toStringTag]: "SharedArrayBuffer";
            };
            readonly byteLength: number;
            readonly byteOffset: number;
            copyWithin: (target: number, start: number, end?: number) => Uint8Array<ArrayBufferLike>;
            every: (predicate: (value: number, index: number, array: Uint8Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            fill: (value: number, start?: number, end?: number) => Uint8Array<ArrayBufferLike>;
            filter: (predicate: (value: number, index: number, array: Uint8Array<ArrayBufferLike>) => any, thisArg?: any) => Uint8Array<ArrayBuffer>;
            find: (predicate: (value: number, index: number, obj: Uint8Array<ArrayBufferLike>) => boolean, thisArg?: any) => number | undefined;
            findIndex: (predicate: (value: number, index: number, obj: Uint8Array<ArrayBufferLike>) => boolean, thisArg?: any) => number;
            forEach: (callbackfn: (value: number, index: number, array: Uint8Array<ArrayBufferLike>) => void, thisArg?: any) => void;
            indexOf: (searchElement: number, fromIndex?: number) => number;
            join: (separator?: string) => string;
            lastIndexOf: (searchElement: number, fromIndex?: number) => number;
            readonly length: number;
            map: (callbackfn: (value: number, index: number, array: Uint8Array<ArrayBufferLike>) => number, thisArg?: any) => Uint8Array<ArrayBuffer>;
            reduce: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reduceRight: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reverse: () => Uint8Array<ArrayBufferLike>;
            set: (array: ArrayLike<number>, offset?: number) => void;
            slice: (start?: number, end?: number) => Uint8Array<ArrayBuffer>;
            some: (predicate: (value: number, index: number, array: Uint8Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            sort: (compareFn?: ((a: number, b: number) => number) | undefined) => Uint8Array<ArrayBufferLike>;
            subarray: (begin?: number, end?: number) => Uint8Array<ArrayBufferLike>;
            toLocaleString: {
                (): string;
                (locales: string | string[], options?: Intl.NumberFormatOptions): string;
            };
            toString: () => string;
            valueOf: () => Uint8Array<ArrayBufferLike>;
            entries: () => ArrayIterator<[number, number]>;
            keys: () => ArrayIterator<number>;
            values: () => ArrayIterator<number>;
            includes: (searchElement: number, fromIndex?: number) => boolean;
            [Symbol.iterator]: () => ArrayIterator<number>;
            readonly [Symbol.toStringTag]: "Uint8Array";
        };
    } | null, EncryptedData | {
        handles: string[];
        inputProof: {
            [x: number]: number;
            readonly BYTES_PER_ELEMENT: number;
            readonly buffer: {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => ArrayBuffer;
                readonly [Symbol.toStringTag]: "ArrayBuffer";
            } | {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => SharedArrayBuffer;
                readonly [Symbol.toStringTag]: "SharedArrayBuffer";
            };
            readonly byteLength: number;
            readonly byteOffset: number;
            copyWithin: (target: number, start: number, end?: number) => Uint8Array<ArrayBufferLike>;
            every: (predicate: (value: number, index: number, array: Uint8Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            fill: (value: number, start?: number, end?: number) => Uint8Array<ArrayBufferLike>;
            filter: (predicate: (value: number, index: number, array: Uint8Array<ArrayBufferLike>) => any, thisArg?: any) => Uint8Array<ArrayBuffer>;
            find: (predicate: (value: number, index: number, obj: Uint8Array<ArrayBufferLike>) => boolean, thisArg?: any) => number | undefined;
            findIndex: (predicate: (value: number, index: number, obj: Uint8Array<ArrayBufferLike>) => boolean, thisArg?: any) => number;
            forEach: (callbackfn: (value: number, index: number, array: Uint8Array<ArrayBufferLike>) => void, thisArg?: any) => void;
            indexOf: (searchElement: number, fromIndex?: number) => number;
            join: (separator?: string) => string;
            lastIndexOf: (searchElement: number, fromIndex?: number) => number;
            readonly length: number;
            map: (callbackfn: (value: number, index: number, array: Uint8Array<ArrayBufferLike>) => number, thisArg?: any) => Uint8Array<ArrayBuffer>;
            reduce: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reduceRight: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reverse: () => Uint8Array<ArrayBufferLike>;
            set: (array: ArrayLike<number>, offset?: number) => void;
            slice: (start?: number, end?: number) => Uint8Array<ArrayBuffer>;
            some: (predicate: (value: number, index: number, array: Uint8Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            sort: (compareFn?: ((a: number, b: number) => number) | undefined) => Uint8Array<ArrayBufferLike>;
            subarray: (begin?: number, end?: number) => Uint8Array<ArrayBufferLike>;
            toLocaleString: {
                (): string;
                (locales: string | string[], options?: Intl.NumberFormatOptions): string;
            };
            toString: () => string;
            valueOf: () => Uint8Array<ArrayBufferLike>;
            entries: () => ArrayIterator<[number, number]>;
            keys: () => ArrayIterator<number>;
            values: () => ArrayIterator<number>;
            includes: (searchElement: number, fromIndex?: number) => boolean;
            [Symbol.iterator]: () => ArrayIterator<number>;
            readonly [Symbol.toStringTag]: "Uint8Array";
        };
    } | null>;
    reset: () => void;
};

interface UseDecryptOptions {
    onSuccess?: (data: bigint) => void;
    onError?: (error: Error) => void;
}
interface DecryptParamsWithAuth extends DecryptParams {
    userAddress: string;
    privateKey: string;
    signature: string;
}
declare function useDecrypt(options?: UseDecryptOptions): {
    decrypt: (params: DecryptParamsWithAuth) => Promise<bigint>;
    isPending: vue.Ref<boolean, boolean>;
    isSuccess: vue.Ref<boolean, boolean>;
    isError: vue.Ref<boolean, boolean>;
    error: vue.Ref<Error | null, Error | null>;
    data: vue.Ref<bigint | null, bigint | null>;
    reset: () => void;
};

export { type DecryptParamsWithAuth, FHEVMPlugin, type FHEVMPluginOptions, type FHEVMPluginState, type UseDecryptOptions, type UseEncryptOptions, useDecrypt, useEncrypt, useFHEVM };
