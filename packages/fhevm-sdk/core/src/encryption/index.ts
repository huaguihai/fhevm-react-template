import type { EncryptParams, EncryptBatchParams, EncryptedData, EncryptType } from '../types'
import type { FHEVMInstance, EncryptedInputBuilder } from '../client/FHEVMClient'
import { EncryptionError } from '../utils/errors'

/**
 * Convert encrypted input result to our EncryptedData format
 */
function convertToEncryptedData(result: {
  handles: Uint8Array[]
  inputProof: Uint8Array
}): EncryptedData {
  return {
    handles: result.handles.map((h) => '0x' + Buffer.from(h).toString('hex')),
    inputProof: result.inputProof,
  }
}

/**
 * Add value to encrypted input based on type
 */
function addValueToInput(
  input: EncryptedInputBuilder,
  value: number | bigint | boolean,
  type: EncryptType
): void {
  switch (type) {
    case 'bool':
      if (typeof value !== 'boolean') {
        throw new EncryptionError(`Value must be boolean for type 'bool'`)
      }
      input.addBool(value)
      break
    case 'uint8':
      if (typeof value !== 'number') {
        throw new EncryptionError(`Value must be number for type 'uint8'`)
      }
      input.add8(value)
      break
    case 'uint16':
      if (typeof value !== 'number') {
        throw new EncryptionError(`Value must be number for type 'uint16'`)
      }
      input.add16(value)
      break
    case 'uint32':
      if (typeof value !== 'number') {
        throw new EncryptionError(`Value must be number for type 'uint32'`)
      }
      input.add32(value)
      break
    case 'uint64':
      input.add64(BigInt(value))
      break
    case 'uint128':
      input.add128(BigInt(value))
      break
    case 'uint256':
      input.add256(BigInt(value))
      break
    default:
      throw new EncryptionError(`Unsupported encryption type: ${type}`)
  }
}

/**
 * Encrypt a single value
 */
export async function encrypt(
  instance: FHEVMInstance,
  params: EncryptParams,
  userAddress: string
): Promise<EncryptedData> {
  try {
    const input = instance.createEncryptedInput(params.contractAddress, userAddress)
    addValueToInput(input, params.value, params.type)
    const result = input.encrypt()
    return convertToEncryptedData(result)
  } catch (error) {
    throw new EncryptionError(
      `Failed to encrypt value: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

/**
 * Encrypt multiple values in batch
 */
export async function encryptBatch(
  instance: FHEVMInstance,
  params: EncryptBatchParams,
  userAddress: string
): Promise<EncryptedData> {
  try {
    const input = instance.createEncryptedInput(params.contractAddress, userAddress)

    for (const item of params.values) {
      addValueToInput(input, item.value, item.type)
    }

    const result = input.encrypt()
    return convertToEncryptedData(result)
  } catch (error) {
    throw new EncryptionError(
      `Failed to batch encrypt: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

/**
 * Create an encrypted input builder
 */
export function createEncryptedInput(
  instance: FHEVMInstance,
  contractAddress: string,
  userAddress: string
): EncryptedInputBuilder {
  return instance.createEncryptedInput(contractAddress, userAddress)
}
