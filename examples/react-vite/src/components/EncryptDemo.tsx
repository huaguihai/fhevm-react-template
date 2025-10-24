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
      <div className="encrypt-demo">
        <h2>Encrypt Data</h2>
        <div className="warning-box">
          <div className="warning-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <div>
            <h4>FHEVM Network Unavailable</h4>
            <p>Unable to connect to the Zama devnet. This is likely a temporary network issue.</p>
            <p className="warning-note">
              <strong>Note:</strong> The encryption demo requires connection to Zama's devnet.
              The SDK itself is fully functional and can work with any FHEVM-compatible network.
            </p>
          </div>
        </div>
        <div className="info-box" style={{ marginTop: '1.5rem' }}>
          <p><strong>Technical Details:</strong></p>
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.8 }}>{fhevmError.message}</p>
        </div>
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
