"use client";

import { useState } from "react";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = forgotPasswordSchema.safeParse({ email });

    if (!result.success) {
      setError(result.error.errors[0].message);
      setSuccess(false);
      return;
    }

    setError(null);
    setSuccess(true);

    // placeholder for backend integration later
    console.log("Password reset link would be sent to:", email);
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
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
              />
              {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 py-2 text-white font-medium hover:bg-blue-700 transition"
            >
              Send reset link
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-green-600 font-medium">
              ✅ If this email exists, a password reset link has been sent.
            </p>
            <a
              href="/signin"
              className="inline-block text-blue-600 hover:underline"
            >
              Back to Sign in
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
