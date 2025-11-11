import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { getTxStatus } from "../lib/api";

export default function StatusChecker() {
  const [txId, setTxId] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const checkStatus = async () => {
    if (!txId) return;
    setLoading(true);
    try {
      const res = await getTxStatus(txId);
      setStatus(res.status + (res.confirmedRound ? ` (Confirmed at round ${res.confirmedRound})` : ""));
    } catch (err) {
      console.error(err);
      setStatus("Failed to fetch status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-6 p-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="txId">Transaction ID</Label>
          <Input id="txId" value={txId} onChange={(e) => setTxId(e.target.value)} />
        </div>
        <Button onClick={checkStatus} disabled={loading}>
          {loading ? "Checking..." : "Check Status"}
        </Button>
        {status && <p className="mt-2 text-blue-600">{status}</p>}
      </div>
    </Card>
  );
}
