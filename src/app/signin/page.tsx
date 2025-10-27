"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { z } from "zod";
import toast from "react-hot-toast";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export default function SignInPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false); // ✅ add loading state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = signInSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      await login(form.email, form.password);
    } catch (err) {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Sign in to Object & Clarify
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* email input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none disabled:bg-gray-100"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          {/* password input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none disabled:bg-gray-100"
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>

          {/* submit button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-md py-2 text-white font-medium transition ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <div className="mt-3 text-center">
            <a href="/forgot-password" className="text-blue-600 hover:underline text-sm">
              Forgot password?
            </a>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}
