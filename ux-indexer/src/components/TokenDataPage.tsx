// src/components/TokenDataPage.tsx

import React, { useState } from 'react';
import { useTokenInfo, useTokenBalance, useTokenMetrics } from '../hooks/tokenData'; // Import des hooks
import { useAccount } from 'wagmi';

export default function TokenDataPage() {
  const { address } = useAccount();
  const [selectedAddress, setSelectedAddress] = useState(address || '');

  // Récupération des données via les hooks
  const { data: tokenInfo, isLoading: isLoadingTokenInfo, error: tokenInfoError } = useTokenInfo();
  const { data: tokenBalance, isLoading: isLoadingBalance, error: tokenBalanceError } = useTokenBalance(selectedAddress);
  const { data: tokenMetrics, isLoading: isLoadingMetrics, error: tokenMetricsError } = useTokenMetrics();

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAddress(event.target.value);
  };

  // Si l'une des données est en train de charger
  if (isLoadingTokenInfo || isLoadingBalance || isLoadingMetrics) {
    return <div>Loading...</div>;
  }

  // Gestion des erreurs de récupération des données
  if (tokenInfoError || tokenBalanceError || tokenMetricsError) {
    return <div>Error: Failed to fetch data</div>;
  }

  return (
    <div className="container">
      <h1 className="text-xl font-bold">Token Data</h1>

      {/* Informations du token */}
      <div className="token-info">
        <h2 className="text-lg font-semibold">Token Information</h2>
        {tokenInfo ? (
          <>
            <p><strong>Symbol:</strong> {tokenInfo.symbol}</p>
            <p><strong>Name:</strong> {tokenInfo.name}</p>
            <p><strong>Decimals:</strong> {tokenInfo.decimals}</p>
            <p><strong>Total Supply:</strong> {tokenInfo.totalSupply}</p>
          </>
        ) : (
          <p>No token information available</p>
        )}
      </div>

      {/* Solde du token pour l'adresse sélectionnée */}
      <div className="token-balance">
        <h2 className="text-lg font-semibold">Token Balance</h2>
        <input
          type="text"
          value={selectedAddress}
          onChange={handleAddressChange}
          placeholder="Enter address"
          className="mb-4 p-2 border rounded"
        />
        {tokenBalance ? (
          <p>
            Balance of {selectedAddress}: {tokenBalance.balance}
          </p>
        ) : (
          <p>No balance data available</p>
        )}
      </div>

      {/* Métriques du token */}
      <div className="token-metrics">
        <h2 className="text-lg font-semibold">Token Metrics</h2>
        {tokenMetrics ? (
          <>
            <p><strong>Total Transfers:</strong> {tokenMetrics.totalTransfers}</p>
            <p><strong>Number of Holders:</strong> {tokenMetrics.holders}</p>
          </>
        ) : (
          <p>No metrics data available</p>
        )}
      </div>
    </div>
  );
}
