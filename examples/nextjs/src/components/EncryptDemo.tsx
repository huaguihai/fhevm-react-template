'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useFHEVM, useEncrypt } from '@universal-fhevm/react'

export function EncryptDemo() {
  const { address } = useAccount()
  const { isReady, error: fhevmError } = useFHEVM()
  const [value, setValue] = useState('')
  const [contractAddress, setContractAddress] = useState('')

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

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Encrypt Data
      </h2>

      {!address && (
        <div className="mb-4 p-4 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-lg">
          Please connect your wallet first
        </div>
      )}

      {fhevmError && (
        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">
          FHEVM Error: {fhevmError.message}
        </div>
      )}

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            FHEVM Status:
          </span>
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              isReady
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            }`}
          >
            {isReady ? 'Ready' : 'Initializing...'}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
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
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
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
          <div className="p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">
            Error: {error.message}
          </div>
        )}

        {data && (
          <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
            <h3 className="font-medium mb-2 text-green-900 dark:text-green-100">
              Encrypted Successfully!
            </h3>
            <div className="text-sm space-y-2">
              <div>
                <span className="font-medium text-green-800 dark:text-green-200">
                  Handles:
                </span>
                <div className="mt-1 p-2 bg-white dark:bg-gray-800 rounded text-xs font-mono break-all">
                  {data.handles.join(', ')}
                </div>
              </div>
              <div>
                <span className="font-medium text-green-800 dark:text-green-200">
                  Input Proof Length:
                </span>
                <div className="mt-1 p-2 bg-white dark:bg-gray-800 rounded text-xs font-mono">
                  {data.inputProof.length} bytes
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
