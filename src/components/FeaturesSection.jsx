import { BarChart3, ShieldCheck, PencilLine, Wallet } from "lucide-react";

const features = [
  {
    title: "Monthly Summaries",
    description:
      "Get clear breakdowns of your income and expenses every month.",
    icon: BarChart3,
  },
  {
    title: "Quick CRUD",
    description:
      "Add, edit, and delete transactions in seconds with a clean interface.",
    icon: PencilLine,
  },
  {
    title: "Secure & Private",
    description:
      "Your data is protected and only you can see your financial data.",
    icon: ShieldCheck,
  },
  {
    title: "Category Tracking",
    description:
      "Organize spending into categories to understand where your money goes.",
    icon: Wallet,
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl">
            Everything you need
          </h2>
          <p className="text-xl text-slate-500">
            Simple tools to manage your money effectively, without complexity.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">
                  <Icon className="h-6 w-6 text-emerald-500" />
                </div>

                <h3 className="mb-3 text-2xl font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="text-lg leading-8 text-slate-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
