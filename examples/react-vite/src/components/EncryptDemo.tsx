import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useFHEVM, useEncrypt } from '@universal-fhevm/react'
import type { EncryptType } from '@universal-fhevm/core'

export function EncryptDemo() {
  const { address } = useAccount()
  const { isReady, error: fhevmError } = useFHEVM()
  const { encrypt, isPending, data, error } = useEncrypt({ userAddress: address })

  const [value, setValue] = useState('')
  const [encType, setEncType] = useState<EncryptType>('uint32')
  const [contractAddress, setContractAddress] = useState('0x0000000000000000000000000000000000000000')

  const handleEncrypt = () => {
    if (!address || !isReady) return

    let numValue: number | bigint | boolean

    if (encType === 'bool') {
      numValue = value.toLowerCase() === 'true'
    } else if (encType === 'uint128' || encType === 'uint256') {
      numValue = BigInt(value)
    } else {
      numValue = parseInt(value, 10)
    }

    encrypt({
      value: numValue,
      type: encType,
      contractAddress,
    })
  }

  if (fhevmError) {
    return (
      <div className="error-box">
        <h3>FHEVM Error</h3>
        <p>{fhevmError.message}</p>
      </div>
    )
  }

  if (!address) {
    return (
      <div className="info-box">
        <p>Please connect your wallet to use encryption features</p>
      </div>
    )
  }

  if (!isReady) {
    return (
      <div className="loading-box">
        <p>Initializing FHEVM...</p>
      </div>
    )
  }

  return (
    <div className="encrypt-demo">
      <h2>Encrypt Data</h2>

      <div className="form-group">
        <label htmlFor="encType">Data Type:</label>
        <select
          id="encType"
          value={encType}
          onChange={(e) => setEncType(e.target.value as EncryptType)}
          className="input"
        >
          <option value="bool">Boolean</option>
          <option value="uint8">Uint8</option>
          <option value="uint16">Uint16</option>
          <option value="uint32">Uint32</option>
          <option value="uint64">Uint64</option>
          <option value="uint128">Uint128</option>
          <option value="uint256">Uint256</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="value">
          Value {encType === 'bool' ? '(true/false)' : ''}:
        </label>
        <input
          id="value"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={
            encType === 'bool' ? 'true or false' : 'Enter a number'
          }
          className="input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="contract">Contract Address:</label>
        <input
          id="contract"
          type="text"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          placeholder="0x..."
          className="input"
        />
      </div>

      <button
        onClick={handleEncrypt}
        disabled={isPending || !value}
        className="btn btn-primary"
      >
        {isPending ? 'Encrypting...' : 'Encrypt'}
      </button>

      {error && (
        <div className="error-box">
          <h4>Encryption Error:</h4>
          <p>{error.message}</p>
        </div>
      )}

      {data && (
        <div className="success-box">
          <h4>Encryption Successful!</h4>
          <div className="result">
            <p>
              <strong>Handles:</strong>
            </p>
            <ul>
              {data.handles.map((handle, idx) => (
                <li key={idx} className="handle">
                  {handle}
                </li>
              ))}
            </ul>
            <p>
              <strong>Input Proof Length:</strong> {data.inputProof.length} bytes
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
