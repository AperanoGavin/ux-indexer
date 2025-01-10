import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from "wagmi/connectors";

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

  return (
    <header className="p-4 flex justify-between items-center border-b">
      <h1 className="text-xl font-bold">Blockchain Info</h1>
      {isConnected ? (
        <div className="flex items-center gap-4">
          <p>Connected: {address}</p>
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