"use client";
import { useState } from "react";

const Signin = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      <form
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
        onSubmit={e => e.preventDefault()}
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-emerald-700 tracking-tight">
          Welcome Back
        </h2>
        <p className="mb-6 text-center text-slate-500 text-sm">
          Sign in to your account to continue
        </p>
        <div className="mb-4">
          <label className="block mb-1 text-slate-700 font-medium">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            placeholder="you@email.com"
            required
            autoComplete="email"
            disabled={loading}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-slate-700 font-medium">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            placeholder="••••••••"
            required
            autoComplete="current-password"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 transition font-semibold"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <div className="mt-6 text-center">
          <a href="#" className="text-emerald-600 hover:underline text-sm">
            Forgot password?
          </a>
        </div>
        <div className="mt-4 text-center text-slate-500 text-xs">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-emerald-600 hover:underline">
            Sign up
          </a>
        </div>
      </form>
    </div>
  );
};

export default Signin;