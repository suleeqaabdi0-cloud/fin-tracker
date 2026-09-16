import { DollarSign } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3 text-2xl font-bold text-slate-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
                <DollarSign className="h-5 w-5" />
              </div>
              FinTrack
            </div>
            <p className="text-slate-500">
              Simple, beautiful finance tracking for everyone.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-slate-900">Features</h3>
            <ul className="space-y-3 text-slate-500">
              <li>Income & Expense Tracking</li>
              <li>Monthly Summaries</li>
              <li>Category Management</li>
              <li>Secure & Private</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-slate-900">About</h3>
            <ul className="space-y-3 text-slate-500">
              <li>Built with React & Tailwind</li>
              <li>Powered by your backend API</li>
              <li>Open source friendly</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-slate-500">
          © 2026 FinTrack. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
