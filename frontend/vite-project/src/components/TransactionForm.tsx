import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { sendAlgo } from "../lib/api";

interface Props {
  onTxSent?: (txId: string) => void;
}

export default function TransactionForm({ onTxSent }: Props) {
  const [mnemonic, setMnemonic] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [txId, setTxId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mnemonic || !to || !amount) return;
    setLoading(true);
    try {
      const res = await sendAlgo({ senderMnemonic: mnemonic, to, amount: Number(amount) });
      setTxId(res.txId);
      onTxSent?.(res.txId);
    } catch (err) {
      console.error(err);
      alert("Transaction failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-6 p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="mnemonic">Sender Mnemonic</Label>
          <Input id="mnemonic" value={mnemonic} onChange={(e) => setMnemonic(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="to">Recipient Address</Label>
          <Input id="to" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="amount">Amount (ALGO)</Label>
          <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send ALGO"}
        </Button>
      </form>

      {txId && (
        <p className="mt-4 text-green-600">
          Transaction sent! TX ID: <span className="font-mono">{txId}</span>
        </p>
      )}
    </Card>
  );
}
