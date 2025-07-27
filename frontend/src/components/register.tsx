import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { AppDispatch, RootState } from "@/store";
import { registerUser, clearAuthState } from "@/store/authSlice";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
const RegisterForm = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "",confirmPassword:"" });
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [localError, setLocalError] = useState("");

  const authState = useSelector((state: RootState) => state.auth) as {
    loading: boolean;
    error: string | null;
    success: boolean;
  };
  const { loading, error, success } = authState;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
        setLocalError("Passwords do not match");
        return;
      }
    dispatch(registerUser(form));
  };

  useEffect(() => {
    if (success) {
      alert("Registered successfully!");
      dispatch(clearAuthState());
    }
  }, [success]);

  return (
    <div className="min-h-screen flex items-center justify-center ">
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="Full Name"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          placeholder="Email Address"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

<div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-2.5 right-3 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              placeholder="Confirm Password"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((prev) => !prev)}
              className="absolute top-2.5 right-3 text-gray-500"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg font-semibold text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-lime-600 hover:bg-blue-700"
          } transition duration-200`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Registering...
            </span>
          ) : (
            "Register"
          )}
        </button>
        <div className="">Already Have an Account? <Link className="text-lime-600" href="/login">Login</Link></div>
        {localError && <p className="text-red-600 text-sm text-center">{localError}</p>}
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
      </form>
    </div>
  </div>
  );
};

export default RegisterForm;
