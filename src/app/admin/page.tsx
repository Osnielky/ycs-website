import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import LogoutButton from "./LogoutButton";

type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  procedure: string | null;
  message: string | null;
  sms_consent: boolean;
  created_at: string;
};

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_session")?.value !== process.env.ADMIN_TOKEN) {
    redirect("/admin/login");
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );

  const { data: leads = [] } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  const allLeads: Lead[] = leads ?? [];

  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const total = allLeads.length;
  const today = allLeads.filter((l) => l.created_at.slice(0, 10) === todayStr).length;
  const thisWeek = allLeads.filter((l) => new Date(l.created_at) >= weekAgo).length;
  const thisMonth = allLeads.filter((l) => new Date(l.created_at) >= monthStart).length;

  // Leads by procedure
  const byProcedure: Record<string, number> = {};
  allLeads.forEach((l) => {
    const key = l.procedure || "Not specified";
    byProcedure[key] = (byProcedure[key] ?? 0) + 1;
  });
  const procedureList = Object.entries(byProcedure)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  // Last 7 days trend
  const days: { label: string; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dStr = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    const count = allLeads.filter((l) => l.created_at.slice(0, 10) === dStr).length;
    days.push({ label, count });
  }

  const maxDay = Math.max(...days.map((d) => d.count), 1);

  const recent = allLeads.slice(0, 50);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <header className="bg-navy-dark border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div>
          <p className="text-gold text-[10px] tracking-[0.3em] uppercase">Your Cosmetic Surgery & SPA</p>
          <h1 className="text-white font-heading text-xl font-light">Admin Dashboard</h1>
        </div>
        <LogoutButton />
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Leads", value: total, color: "text-navy" },
            { label: "This Month", value: thisMonth, color: "text-blue-600" },
            { label: "This Week", value: thisWeek, color: "text-gold-dark" },
            { label: "Today", value: today, color: "text-green-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-xs tracking-widest uppercase mb-2">{s.label}</p>
              <p className={`font-heading text-4xl font-light ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Leads by procedure */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-navy font-semibold text-sm tracking-wider uppercase mb-5">Leads by Procedure</h2>
            <div className="space-y-3">
              {procedureList.map(([proc, count]) => (
                <div key={proc}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-navy/70">{proc}</span>
                    <span className="text-navy font-semibold">{count}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold rounded-full"
                      style={{ width: `${(count / total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              {procedureList.length === 0 && (
                <p className="text-gray-400 text-sm">No data yet</p>
              )}
            </div>
          </div>

          {/* 7-day trend */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-navy font-semibold text-sm tracking-wider uppercase mb-5">Last 7 Days</h2>
            <div className="flex items-end gap-2 h-32">
              {days.map((d) => (
                <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-navy text-xs font-semibold">{d.count > 0 ? d.count : ""}</span>
                  <div className="w-full bg-gray-100 rounded-t-sm overflow-hidden" style={{ height: "80px" }}>
                    <div
                      className="w-full bg-navy rounded-t-sm transition-all"
                      style={{ height: `${(d.count / maxDay) * 80}px`, marginTop: `${80 - (d.count / maxDay) * 80}px` }}
                    />
                  </div>
                  <span className="text-gray-400 text-[9px] text-center leading-tight">{d.label.split(" ").slice(0, 2).join(" ")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leads table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-navy font-semibold text-sm tracking-wider uppercase">Recent Leads</h2>
            <span className="text-gray-400 text-xs">Showing {recent.length} most recent</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Date", "Name", "Phone", "Email", "Procedure", "SMS Consent"].map((h) => (
                    <th key={h} className="text-left text-xs text-gray-400 tracking-wider uppercase px-6 py-3 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recent.map((l) => (
                  <tr key={l.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-400 text-xs whitespace-nowrap">
                      {new Date(l.created_at).toLocaleDateString("en-US", {
                        month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit"
                      })}
                    </td>
                    <td className="px-6 py-4 text-navy font-medium">{l.name}</td>
                    <td className="px-6 py-4 text-navy">
                      <a href={`tel:${l.phone}`} className="hover:text-gold transition-colors">{l.phone}</a>
                    </td>
                    <td className="px-6 py-4 text-navy/60">{l.email ?? "—"}</td>
                    <td className="px-6 py-4">
                      {l.procedure ? (
                        <span className="bg-gold/10 text-gold-dark text-xs font-medium px-2 py-0.5 rounded-full">
                          {l.procedure}
                        </span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        l.sms_consent
                          ? "bg-green-50 text-green-600"
                          : "bg-gray-100 text-gray-400"
                      }`}>
                        {l.sms_consent ? "Yes" : "No"}
                      </span>
                    </td>
                  </tr>
                ))}
                {recent.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                      No leads yet. They will appear here once visitors submit the form.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Traffic note */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4 items-start">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-blue-600 text-sm">📊</span>
          </div>
          <div>
            <p className="text-blue-900 font-semibold text-sm mb-1">Connect Google Analytics for Traffic Data</p>
            <p className="text-blue-700 text-sm">
              To see page views, sessions, and visitor sources, add your Google Analytics 4 Measurement ID to the site.
              Ask your developer to add <code className="bg-blue-100 px-1 rounded">NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX</code> to the environment variables.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}
