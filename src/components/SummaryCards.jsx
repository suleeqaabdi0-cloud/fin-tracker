import { useMemo } from "react";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

const SummaryCards = ({ transactions = [] }) => {
  const summary = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthly = transactions.filter((t) => {
      const d = new Date(t.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    const income = monthly
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    const expense = monthly
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    return {
      income,
      expense,
      balance: income - expense,
      count: monthly.length,
    };
  }, [transactions]);

  const cards = [
    {
      title: "Income",
      value: summary.income,
      icon: TrendingUp,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      title: "Expenses",
      value: summary.expense,
      icon: TrendingDown,
      color: "text-red-500",
      bg: "bg-red-50",
    },
    {
      title: "Balance",
      value: summary.balance,
      icon: Wallet,
      color: summary.balance >= 0 ? "text-emerald-500" : "text-red-500",
      bg: summary.balance >= 0 ? "bg-emerald-50" : "bg-red-50",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex items-start justify-between">
              <h3 className="text-lg font-semibold text-slate-500">
                {card.title}
              </h3>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.bg}`}
              >
                <Icon className={`h-5 w-5 ${card.color}`} />
              </div>
            </div>

            <h2 className={`text-4xl font-bold ${card.color}`}>
              ${Math.abs(card.value).toFixed(2)}
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              This month • {summary.count} transaction
              {summary.count !== 1 ? "s" : ""}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
