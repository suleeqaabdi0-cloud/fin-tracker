import { useMemo, useState } from "react";
import {
  Search,
  Calendar,
  Funnel,
  ArrowUpDown,
  MoreVertical,
} from "lucide-react";
import { useDeleteTransaction } from "../hooks/useTransactions";

const TransactionsTable = ({ transactions = [], onEdit }) => {
  const { mutate: deleteTransaction, isPending } = useDeleteTransaction();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const categories = useMemo(() => {
    const unique = [
      ...new Set(transactions.map((t) => t.category).filter(Boolean)),
    ];
    return unique;
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    let data = [...transactions];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (t) =>
          t.title?.toLowerCase().includes(q) ||
          t.category?.toLowerCase().includes(q),
      );
    }

    if (typeFilter !== "all") {
      data = data.filter((t) => t.type === typeFilter);
    }

    if (categoryFilter !== "all") {
      data = data.filter((t) => t.category === categoryFilter);
    }

    data.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      if (sortOrder === "newest") return dateB - dateA;
      if (sortOrder === "oldest") return dateA - dateB;
      return 0;
    });

    return data;
  }, [transactions, search, typeFilter, categoryFilter, sortOrder]);

  const formatDate = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return "-";
    return d.toLocaleDateString();
  };

  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700">
            <Calendar className="h-4 w-4" />
            This Month
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <div className="relative">
            <Funnel className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-xl border border-slate-200 py-2 pl-9 pr-8 text-sm outline-none focus:border-emerald-500"
            >
              <option value="all">Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="rounded-xl border border-slate-200 py-2 pl-9 pr-8 text-sm outline-none focus:border-emerald-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[800px] text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((item) => {
                const id = item._id || item.id;
                const isIncome = item.type === "income";

                return (
                  <tr key={id} className="border-t border-slate-200">
                    <td className="px-4 py-3 text-slate-700">
                      {formatDate(item.date)}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {item.title}
                    </td>
                    <td className="px-4 py-3 capitalize text-slate-700">
                      {item.type}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {item.category || "-"}
                    </td>
                    <td
                      className={`px-4 py-3 font-semibold ${
                        isIncome ? "text-emerald-500" : "text-red-500"
                      }`}
                    >
                      {isIncome ? "+" : "-"}$
                      {Number(item.amount || 0).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onEdit?.(item)}
                          className="rounded-lg px-2 py-1 text-slate-600 hover:bg-slate-100"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteTransaction(id)}
                          disabled={isPending}
                          className="rounded-lg px-2 py-1 text-red-500 hover:bg-red-50 disabled:opacity-50"
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-10 text-center text-slate-500"
                >
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
