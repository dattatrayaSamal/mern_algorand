import { useEffect, useState } from "react";
import { listTransactions } from "../lib/api";
import type { Transaction } from "../lib/api";
import { Card } from "@/components/ui/card";

export default function TransactionList() {
  const [txs, setTxs] = useState<Transaction[]>([]);

  useEffect(() => {
    listTransactions().then(setTxs).catch(console.error);
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-4">
      {txs.map((tx) => (
        <Card key={tx.txId} className="p-4">
          <p><strong>TX ID:</strong> {tx.txId}</p>
          <p><strong>From:</strong> {tx.from}</p>
          <p><strong>To:</strong> {tx.to}</p>
          <p><strong>Amount:</strong> {tx.amount}</p>
          <p><strong>Status:</strong> {tx.status}</p>
        </Card>
      ))}
    </div>
  );
}
