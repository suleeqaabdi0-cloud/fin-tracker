import { useState } from "react";
import Navbar from "../components/Navbar";
import SummaryCards from "../components/SummaryCards";
import AddTransactionModal from "../components/AddTransactionModal";
import EditTransactionModal from "../components/EditTransactionModal";
import {
  useGetTransactions,
  useMonthlySummary,
} from "../hooks/useTransactions";
import TransactionsTable from "../components/TransactionsTable";

const DashboardPage = () => {
  const [editingItem, setEditingItem] = useState(null);

  const {
    data: transactions = [],
    isLoading: txLoading,
    error: txError,
  } = useGetTransactions();

  const {
    data: summary,
    isLoading: summaryLoading,
    error: summaryError,
  } = useMonthlySummary();

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              Dashboard
            </h1>
            <p className="mt-2 text-lg text-slate-500">
              Track your income and expenses
            </p>
          </div>

          <AddTransactionModal />
        </div>

        <div className="mb-8">
          {summaryLoading ? (
            <p>Loading summary...</p>
          ) : summaryError ? (
            <p className="text-red-600">Failed to load summary</p>
          ) : (
            <SummaryCards summary={summary} transactions={transactions} />
          )}
        </div>
        <TransactionsTable
          transactions={transactions}
          onEdit={setEditingItem}
        />
      </section>

      {editingItem && (
        <EditTransactionModal
          transaction={editingItem}
          onClose={() => setEditingItem(null)}
        />
      )}
    </main>
  );
};

export default DashboardPage;
