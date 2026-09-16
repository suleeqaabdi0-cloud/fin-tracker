import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useLogin } from "../../hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useLogin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(formData, {
      onSuccess: () => {
        navigate("/dashboard");
      },
    });
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="mx-auto flex max-w-7xl justify-center px-6 py-20">
        <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
          <h1 className="mb-2 text-3xl font-bold">Sign In</h1>
          <p className="mb-6 text-slate-500">Login to your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full rounded-xl border px-4 py-3"
            />

            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full rounded-xl border px-4 py-3"
            />

            {error && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {error?.response?.data?.message || "Login failed"}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-white"
            >
              {isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don’t have an account?{" "}
            <Link to="/register" className="font-semibold text-emerald-600">
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
