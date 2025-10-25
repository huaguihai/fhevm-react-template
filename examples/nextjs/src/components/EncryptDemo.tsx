'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useFHEVM, useEncrypt } from '@universal-fhevm/react'

export function EncryptDemo() {
  const { address } = useAccount()
  const { isReady, error: fhevmError } = useFHEVM()
  const [value, setValue] = useState('')
  const [contractAddress, setContractAddress] = useState('0x0000000000000000000000000000000000000000')

  const { encrypt, isPending, error, data } = useEncrypt({
    userAddress: address,
  })

  const handleEncrypt = async () => {
    if (!value || !contractAddress || !address) {
      alert('Please enter a value and contract address')
      return
    }

    try {
      await encrypt({
        value: Number(value),
        type: 'uint64',
        contractAddress,
      })
    } catch (err) {
      console.error('Encryption failed:', err)
    }
  }

  if (fhevmError) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Encrypt Data</h2>

        <div className="warning-box">
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-yellow-500/20 rounded-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-yellow-100 mb-2">FHEVM Network Unavailable</h4>
            <p className="text-yellow-200/90 mb-2">
              Unable to connect to the Zama network. This is likely a temporary network issue.
            </p>
            <p className="text-yellow-200/90 text-sm mt-4 pt-4 border-t border-yellow-500/30">
              <strong>Note:</strong> The encryption demo requires connection to Zama's network.
              The SDK itself is fully functional and can work with any FHEVM-compatible network.
            </p>
          </div>
        </div>

        <div className="info-box">
          <p><strong>Technical Details:</strong></p>
          <p className="text-sm mt-2 opacity-80">{fhevmError.message}</p>
        </div>
      </div>
    )
  }

  if (!address) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Encrypt Data</h2>
        <div className="info-box">
          <p>Please connect your wallet to use encryption features</p>
        </div>
      </div>
    )
  }

  if (!isReady) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Encrypt Data</h2>
        <div className="loading-box">
          <p>Initializing FHEVM...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-white">Encrypt Data</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-white/90">
            Value to Encrypt (uint64)
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter a number"
            className="input"
            disabled={!isReady || isPending}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-white/90">
            Contract Address
          </label>
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="0x..."
            className="input"
            disabled={!isReady || isPending}
          />
        </div>

        <button
          onClick={handleEncrypt}
          disabled={!isReady || isPending || !address}
          className="btn-primary w-full"
        >
          {isPending ? 'Encrypting...' : 'Encrypt'}
        </button>

        {error && (
          <div className="error-box">
            <h4 className="font-semibold text-red-200 mb-2">Encryption Error:</h4>
            <p className="text-red-300/90">{error.message}</p>
          </div>
        )}

        {data && (
          <div className="success-box">
            <h4 className="font-semibold text-green-100 mb-4">Encryption Successful!</h4>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-green-200 mb-2">Handles:</p>
                <div className="space-y-2">
                  {data.handles.map((handle, idx) => (
                    <div
                      key={idx}
                      className="font-mono text-sm bg-white/5 p-3 rounded-lg border border-white/10 break-all hover:bg-white/8 transition-colors"
                    >
                      {handle}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-medium text-green-200">
                  Input Proof Length: <span className="font-mono">{data.inputProof.length}</span> bytes
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
