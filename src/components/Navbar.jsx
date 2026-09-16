import { Link, useNavigate } from "react-router-dom";
import { DollarSign, LogOut, User, LayoutDashboard } from "lucide-react";
import { isAuthenticated } from "../lib/token";
import { useLogout, useProfile } from "../hooks/useAuth";
import { useState } from "react";

const Navbar = () => {
  const loggedIn = isAuthenticated();
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { data: profile } = useProfile();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 text-2xl font-bold">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
            <DollarSign className="h-5 w-5" />
          </div>
          FinTrack
        </Link>

        {/* RIGHT SIDE */}
        {!loggedIn ? (
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Sign In
            </Link>

            <Link
              to="/register"
              className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-600"
            >
              Get Started
            </Link>
          </div>
        ) : (
          <div className="relative flex items-center gap-3">
            {/* USER NAME */}
            <span className="hidden text-sm text-slate-700 md:block">
              {profile?.name || profile?.user?.name || "User"}
            </span>

            {/* USER ICON */}
            <button
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200"
            >
              <User className="h-5 w-5 text-slate-700" />
            </button>

            {/* DROPDOWN */}
            {open && (
              <div className="absolute right-0 top-12 w-48 rounded-xl border border-slate-200 bg-white shadow-lg">
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-3 text-sm hover:bg-slate-50"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
