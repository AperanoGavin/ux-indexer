import { useQuery } from '@tanstack/react-query';

// Fonction pour récupérer les informations du token depuis l'API (SQD Indexer)
export const fetchTokenInfo = async () => {
  const response = await fetch('https://api.sqd-indexer.com/token/info'); // URL fictive
  if (!response.ok) {
    throw new Error('Error fetching token information');
  }
  return response.json();
};

// Fonction pour récupérer les soldes de token pour une adresse spécifique
export const fetchTokenBalance = async (address: string) => {
  const response = await fetch(`https://api.sqd-indexer.com/token/balance/${address}`); // URL fictive
  if (!response.ok) {
    throw new Error('Error fetching token balance');
  }
  return response.json();
};

// Fonction pour récupérer les métriques du token
export const fetchTokenMetrics = async () => {
  const response = await fetch('https://api.sqd-indexer.com/token/metrics'); // URL fictive
  if (!response.ok) {
    throw new Error('Error fetching token metrics');
  }
  return response.json();
};

// Hook pour récupérer les informations du token
export const useTokenInfo = () => {
  return useQuery(['tokenInfo'], fetchTokenInfo);
};

// Hook pour récupérer le solde de token pour l'adresse connectée
export const useTokenBalance = (address: string) => {
  return useQuery(['tokenBalance', address], () => fetchTokenBalance(address));
};

// Hook pour récupérer les métriques du token
export const useTokenMetrics = () => {
  return useQuery(['tokenMetrics'], fetchTokenMetrics);
};
