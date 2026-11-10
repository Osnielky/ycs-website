"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        setError("Invalid username or password. Check both fields and try again.");
      }
    } catch {
      setError("Couldn’t reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-navy-dark flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <p className="text-gold text-xs tracking-[0.35em] uppercase mb-2">Your Cosmetic Surgery & SPA</p>
          <h1 className="font-heading text-white text-3xl font-light">Admin Portal</h1>
          <div className="w-12 h-[1px] bg-gold/40 mx-auto mt-4" />
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4">
          <div>
            <label htmlFor="admin-username" className="text-white/65 text-xs tracking-widest uppercase block mb-1.5">Username</label>
            <input
              id="admin-username"
              name="username"
              type="text"
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/10 border border-white/20 focus:border-gold rounded-lg px-4 py-3 text-white text-sm outline-none focus-visible:ring-2 focus-visible:ring-gold/60 transition-colors"
              required
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="text-white/65 text-xs tracking-widest uppercase block mb-1.5">Password</label>
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 focus:border-gold rounded-lg px-4 py-3 text-white text-sm outline-none focus-visible:ring-2 focus-visible:ring-gold/60 transition-colors"
              required
            />
          </div>

          {error && <p role="alert" className="text-red-400 text-xs">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold hover:bg-gold-dark text-navy-dark font-semibold text-sm tracking-[0.1em] uppercase py-3 rounded-lg transition-colors duration-200 disabled:opacity-60 mt-2"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
