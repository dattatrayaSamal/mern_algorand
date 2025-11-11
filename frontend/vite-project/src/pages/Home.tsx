import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import StatusChecker from "../components/StatusChecker";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Send ALGO</h1>
      <TransactionForm />
      <StatusChecker />
      <h2 className="text-xl font-semibold mt-8 mb-4">Transaction History</h2>
      <TransactionList />
    </div>
  );
}
