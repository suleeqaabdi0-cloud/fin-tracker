import { useState } from "react";
import { useUpdateTransaction } from "../hooks/useTransactions";

const EditTransactionModal = ({ transaction, onClose }) => {
  const { mutate: updateTransaction, isPending } = useUpdateTransaction();

  const [formData, setFormData] = useState({
    title: transaction?.title || "",
    amount: transaction?.amount || "",
    type: transaction?.type || "income",
    category: transaction?.category || "",
    date: transaction?.date ? transaction.date.slice(0, 10) : "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateTransaction(
      {
        id: transaction._id || transaction.id,
        payload: {
          ...formData,
          amount: Number(formData.amount),
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">
            Edit Transaction
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="rounded-xl border border-slate-200 px-4 py-3"
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="rounded-xl border border-slate-200 px-4 py-3"
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="rounded-xl border border-slate-200 px-4 py-3"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="rounded-xl border border-slate-200 px-4 py-3"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="rounded-xl border border-slate-200 px-4 py-3 md:col-span-2"
          />

          <button
            type="submit"
            disabled={isPending}
            className="md:col-span-2 rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-white hover:bg-emerald-600 disabled:opacity-70"
          >
            {isPending ? "Updating..." : "Update Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTransactionModal;
