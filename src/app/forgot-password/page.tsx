"use client";

import { useState } from "react";
import { z } from "zod";
import toast from "react-hot-toast";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = forgotPasswordSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.errors[0].message);
      setSuccess(false);
      return;
    }

    setError(null);
    setLoading(true);

    // Simulate an API call delay
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      toast.success("If this email exists, a reset link has been sent! 📩");
    }, 1200);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Forgot your password?
        </h1>

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none disabled:bg-gray-100"
              />
              {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-md py-2 text-white font-medium transition ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Sending reset link..." : "Send reset link"}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-green-600 font-medium">
              ✅ If this email exists, a password reset link has been sent.
            </p>
            <a href="/signin" className="inline-block text-blue-600 hover:underline">
              Back to Sign in
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
