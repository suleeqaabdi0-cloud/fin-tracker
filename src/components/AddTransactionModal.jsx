import { useState } from "react";
import { Plus } from "lucide-react";
import { useAddTransaction } from "../hooks/useTransactions";

const CATEGORIES = {
  income: ["Salary", "Freelance", "Investment", "Gift", "Other"],
  expense: [
    "Food",
    "Transport",
    "Housing",
    "Entertainment",
    "Shopping",
    "Health",
    "Education",
    "Bills",
    "Other",
  ],
};

const AddTransactionModal = () => {
  const { mutate, isPending } = useAddTransaction();
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "income",
    category: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "type") {
      setFormData((prev) => ({
        ...prev,
        type: value,
        category: "",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      amount: "",
      type: "income",
      category: "",
      date: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(
      {
        ...formData,
        amount: Number(formData.amount),
      },
      {
        onSuccess: () => {
          setOpen(false);
          resetForm();
        },
      },
    );
  };

  const categoryOptions = CATEGORIES[formData.type] || [];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-600"
      >
        <Plus className="h-5 w-5" />
        Add Transaction
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
                Add Transaction
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
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

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="rounded-xl border border-slate-200 px-4 py-3"
              >
                <option value="">Select Category</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

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
                {isPending ? "Saving..." : "Save Transaction"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTransactionModal;
