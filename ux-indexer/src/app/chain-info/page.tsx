"use client";

import { useEffect, useState } from "react";
import { useAccount, useBlockNumber, useFeeData } from "wagmi";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function ChainInfo() {
  const { chain } = useAccount(); // useAccount now provides chain info
  const { data: blockNumber } = useBlockNumber();
  const { data: feeData } = useFeeData();
  
  const [burntFees, setBurntFees] = useState<string | null>(null);

  useEffect(() => {
    if (feeData?.gasPrice && blockNumber) {
        const estimatedBurn = (BigInt(feeData.gasPrice) * 21000n) / 1_000_000_000n;
        setBurntFees(estimatedBurn.toString());
    }
  }, [feeData, blockNumber]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Chain Information</h1>
      <ul className="list-disc list-inside">
        <li>Chain ID: {chain?.id || "Not connected"}</li>
        <li>Current Block Number: {blockNumber || "Loading..."}</li>
        <li>Gas Price: {feeData?.gasPrice ? BigInt(feeData.gasPrice).toString() : "Loading..."}</li>
        <li>Burnt Fees (Estimate): {burntFees || "Calculating..."}</li>
      </ul>
    </div>
  );
}

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChainInfo />
    </QueryClientProvider>
  );
}