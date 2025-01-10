import { createAlchemyWeb3 } from '@alch/alchemy-web3';

const ALCHEMY_API_URL = 'https://eth-mainnet.g.alchemy.com/v2/RBzdESDykkFeMEbqN4vgnSjI9xlj-Rcx'; // Votre clé API Alchemy

const web3 = createAlchemyWeb3(ALCHEMY_API_URL);

// Fonction pour récupérer les informations du token
export const fetchTokenInfo = async (tokenAddress: string) => {
  try {
    const tokenContract = new web3.eth.Contract(
      [
        {
          constant: true,
          inputs: [],
          name: 'name',
          outputs: [{ name: '', type: 'string' }],
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'symbol',
          outputs: [{ name: '', type: 'string' }],
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'decimals',
          outputs: [{ name: '', type: 'uint8' }],
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'totalSupply',
          outputs: [{ name: '', type: 'uint256' }],
          type: 'function',
        },
      ],
      tokenAddress
    );

    const name = await tokenContract.methods.name().call();
    const symbol = await tokenContract.methods.symbol().call();
    const decimals = await tokenContract.methods.decimals().call();
    const totalSupply = await tokenContract.methods.totalSupply().call();

    return { name, symbol, decimals, totalSupply };
  } catch (error) {
    console.error('Error fetching token info:', error);
    throw error;
  }
};

// Fonction pour récupérer le solde d'un utilisateur pour un token spécifique
export const fetchTokenBalance = async (address: string, tokenAddress: string) => {
  try {
    const tokenContract = new web3.eth.Contract(
      [
        {
          constant: true,
          inputs: [{ name: 'account', type: 'address' }],
          name: 'balanceOf',
          outputs: [{ name: '', type: 'uint256' }],
          type: 'function',
        },
      ],
      tokenAddress
    );

    const balance = await tokenContract.methods.balanceOf(address).call();
    return balance;
  } catch (error) {
    console.error('Error fetching token balance:', error);
    throw error;
  }
};

// Fonction pour récupérer les métriques du token
export const fetchTokenMetrics = async (tokenAddress: string) => {
  try {
    const tokenContract = new web3.eth.Contract(
      [
        {
          constant: true,
          inputs: [],
          name: 'totalSupply',
          outputs: [{ name: '', type: 'uint256' }],
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'totalHolders',
          outputs: [{ name: '', type: 'uint256' }],
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'totalTransfers',
          outputs: [{ name: '', type: 'uint256' }],
          type: 'function',
        },
      ],
      tokenAddress
    );

    const totalSupply = await tokenContract.methods.totalSupply().call();
    const totalHolders = await tokenContract.methods.totalHolders().call();
    const totalTransfers = await tokenContract.methods.totalTransfers().call();

    return { totalSupply, totalHolders, totalTransfers };
  } catch (error) {
    console.error('Error fetching token metrics:', error);
    throw error;
  }
};
