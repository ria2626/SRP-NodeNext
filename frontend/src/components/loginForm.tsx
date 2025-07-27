import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/authSlice";
import { AppDispatch, RootState } from "@/store";
import { useRouter } from "next/router";
import Link from "next/link";
export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
const router = useRouter();
  const authState = useSelector((state: RootState) => state.auth) as {
    loading: boolean;
    error: string | null;
    user: null;
  };
  const { loading, error, user } = authState;
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  useEffect(() => {
    if (user) {
      alert(`Welcome ${user?.name}`);
      router.push('/');

    }
  }, [router, user]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold text-white ${
              loading ? "bg-gray-400" : "bg-lime-600 hover:bg-lime-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="bg-white-400">New User ? <Link className="text-lime-600 " href="/register">Register Here</Link></div>
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}
