"use client";

import { useState } from "react";
import { z } from "zod";
import toast from "react-hot-toast";

const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Enter a valid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match.",
    path: ["confirm"],
  });

export default function SignUpPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = signUpSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0] || "",
        email: fieldErrors.email?.[0] || "",
        password: fieldErrors.password?.[0] || "",
        confirm: fieldErrors.confirm?.[0] || "",
      });
      return;
    }

    setErrors({});
    setLoading(true);

    // Simulate an API delay
    setTimeout(() => {
      toast.success(`Account created for ${form.name}! 🎉`);
      setLoading(false);
    }, 1000);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Create your account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {["name", "email", "password", "confirm"].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-700 capitalize"
              >
                {field === "confirm" ? "Confirm Password" : field}
              </label>
              <input
                id={field}
                name={field}
                type={field.includes("password") ? "password" : "text"}
                value={(form as any)[field]}
                onChange={handleChange}
                disabled={loading}
                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none disabled:bg-gray-100"
              />
              {errors[field] && (
                <p className="mt-1 text-sm text-red-500">{errors[field]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-md py-2 text-white font-medium transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/signin" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}
