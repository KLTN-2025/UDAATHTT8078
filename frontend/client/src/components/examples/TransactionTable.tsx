import TransactionTable from "../TransactionTable";
import { mockTransactions } from "@/lib/mockData";

export default function TransactionTableExample() {
  return <TransactionTable transactions={mockTransactions} />;
}
