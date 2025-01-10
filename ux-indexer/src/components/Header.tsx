import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useAccount, useConnect, useDisconnect, useBalance, useSwitchChain } from 'wagmi';
import { injected } from 'wagmi/connectors';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
    </QueryClientProvider>
  );
}

function Header() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address,
  });

  const { chains, switchChain } = useSwitchChain(); // Get available chains and the switchChain function

  const targetChainId = 11155111; // Sepolia testnet chain ID (replace with your target testnet if needed)
  const mainnetChainId = 1; // Ethereum Mainnet chain ID

  // Error message if not connected to the correct chain
  const invalidChain = chains.some(chain => chain.id !== mainnetChainId && chain.id !== targetChainId);

  const handleSwitchChain = (chainId: number) => {
    switchChain({ chainId });
  };

  return (
    <header className="p-4 flex justify-between items-center border-b">
      <h1 className="text-xl font-bold">Blockchain Info</h1>
      {isConnected ? (
        <div className="flex items-center gap-4">
          <p>Connected: {address}</p>
          <span>{balance?.formatted} ETH</span>

          {invalidChain && (
            <div className="text-red-500">
              <p>Error: You are connected to an unsupported network.</p>
              {chains.map((chain) => (
                <button
                  key={chain.id}
                  onClick={() => handleSwitchChain(chain.id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Switch to {chain.name}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => disconnect()}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={() => connect({ connector: injected() })}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Connect Wallet
        </button>
      )}
    </header>
  );
}
