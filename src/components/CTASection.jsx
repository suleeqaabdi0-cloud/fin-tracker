import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="mb-5 text-4xl font-bold text-slate-900 md:text-5xl">
          Start tracking today
        </h2>

        <p className="mx-auto mb-8 max-w-2xl text-xl leading-9 text-slate-500">
          Join FinTrack and take the first step toward financial clarity. It's
          free, fast, and secure.
        </p>

        <Link
          to="/register"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 text-lg font-semibold text-white transition hover:bg-emerald-600"
        >
          Create Free Account
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
