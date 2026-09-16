import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useRegister } from "../../hooks/useAuth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useRegister();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(formData, {
      onSuccess: () => {
        navigate("/login");
      },
    });
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="mx-auto flex max-w-7xl justify-center px-6 py-20">
        <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
          <h1 className="mb-2 text-3xl font-bold">Create Account</h1>
          <p className="mb-6 text-slate-500">Start your finance journey</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full rounded-xl border px-4 py-3"
            />

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
              placeholder="Create password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full rounded-xl border px-4 py-3"
            />

            {error && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {error?.response?.data?.message || "Registration failed"}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-white"
            >
              {isPending ? "Creating..." : "Get Started"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-emerald-600">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
