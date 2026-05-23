"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="text-white/50 hover:text-white text-xs tracking-widest uppercase border border-white/20 hover:border-white/50 px-4 py-2 rounded-lg transition-all"
    >
      Sign Out
    </button>
  );
}
