import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto grid min-h-[78vh] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
            ✨ Free & Open Finance Tracker
          </div>

          <h1 className="mb-6 text-5xl font-extrabold leading-tight text-slate-900 md:text-6xl lg:text-7xl">
            Take control of your{" "}
            <span className="text-emerald-500">finances</span>
          </h1>

          <p className="mb-8 max-w-xl text-xl leading-9 text-slate-500">
            Track income, expenses, and get monthly summaries — all in one
            beautiful, simple dashboard.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 text-lg font-semibold text-white transition hover:bg-emerald-600"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              to="/login"
              className="rounded-xl border border-slate-200 bg-white px-8 py-4 text-lg font-semibold text-slate-800 transition hover:bg-slate-100"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
          <div className="overflow-hidden rounded-2xl bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop"
              alt="Finance dashboard"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
