'use client';

import { useState, useEffect } from 'react';
import { fetchTokenInfo, fetchTokenBalance, fetchTokenMetrics } from '../../services/alchemy';

// Définir les types pour les données du token
interface TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
}

interface TokenMetrics {
  totalSupply: string;
  totalHolders: number;
  totalTransfers: number;
}

const TokenDataPage = () => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [address, setAddress] = useState('');
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null); // Utiliser TokenInfo comme type
  const [tokenBalance, setTokenBalance] = useState<string | null>(null);
  const [tokenMetrics, setTokenMetrics] = useState<TokenMetrics | null>(null); // Utiliser TokenMetrics comme type
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (tokenAddress && address) {
      setLoading(true);
      setError(null);

      // Récupérer les informations du token, le solde et les métriques
      Promise.all([
        fetchTokenInfo(tokenAddress),
        fetchTokenBalance(address, tokenAddress),
        fetchTokenMetrics(tokenAddress),
      ])
        .then(([info, balance, metrics]) => {
          setTokenInfo(info);
          setTokenBalance(balance);
          setTokenMetrics(metrics);
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to fetch data');
          setLoading(false);
        });
    }
  }, [tokenAddress, address]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTokenAddress(e.target.value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Token Data</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Token Address"
          className="p-2 border rounded"
          value={tokenAddress}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Your Wallet Address"
          className="ml-4 p-2 border rounded"
          value={address}
          onChange={handleAddressChange}
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {tokenInfo && (
        <div className="mb-4">
          <h2 className="text-xl font-bold">Token Information</h2>
          <p><strong>Name:</strong> {tokenInfo.name}</p>
          <p><strong>Symbol:</strong> {tokenInfo.symbol}</p>
          <p><strong>Decimals:</strong> {tokenInfo.decimals}</p>
          <p><strong>Total Supply:</strong> {tokenInfo.totalSupply}</p>
        </div>
      )}

      {tokenBalance && (
        <div className="mb-4">
          <h2 className="text-xl font-bold">Token Balance</h2>
          <p>{tokenBalance} tokens</p>
        </div>
      )}

      {tokenMetrics && (
        <div className="mb-4">
          <h2 className="text-xl font-bold">Token Metrics</h2>
          <p><strong>Total Supply:</strong> {tokenMetrics.totalSupply}</p>
          <p><strong>Total Holders:</strong> {tokenMetrics.totalHolders}</p>
          <p><strong>Total Transfers:</strong> {tokenMetrics.totalTransfers}</p>
        </div>
      )}
    </div>
  );
};

export default TokenDataPage;
