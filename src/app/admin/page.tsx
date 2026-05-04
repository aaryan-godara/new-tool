"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Users, Megaphone, DollarSign, ArrowUpRight, ArrowDownRight, Star, Eye, Zap, Globe } from "lucide-react";
import Link from "next/link";
import { useDashboardStats, useLeads } from "@/lib/use-dashboard";
import { useEffect, useState } from "react";

const revenueData = [
  { month: "Jan", revenue: 42, campaigns: 8 },
  { month: "Feb", revenue: 58, campaigns: 12 },
  { month: "Mar", revenue: 71, campaigns: 15 },
  { month: "Apr", revenue: 65, campaigns: 11 },
  { month: "May", revenue: 89, campaigns: 18 },
  { month: "Jun", revenue: 102, campaigns: 22 },
  { month: "Jul", revenue: 118, campaigns: 24 },
];

const STATUS_COLOR: Record<string, string> = {
  Hot: "#dc2626", Warm: "#f59e0b", New: "#3b82f6",
};

export default function AdminDashboard() {
  const stats = useDashboardStats();
  const { leads } = useLeads();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const STATS = [
    { icon: DollarSign, label: "Total Revenue", value: stats.totalRevenue, change: "+32%", positive: true, color: "#22c55e" },
    { icon: Users, label: "Active Clients", value: String(stats.activeClients), change: `+${Math.max(1, Math.floor(stats.activeClients * 0.17))}`, positive: true, color: "#3b82f6" },
    { icon: Star, label: "Creator Network", value: String(stats.creatorNetwork), change: `+${Math.max(1, Math.floor(stats.creatorNetwork * 0.05))}`, positive: true, color: "#f59e0b" },
    { icon: Megaphone, label: "Live Campaigns", value: String(stats.liveCampaigns), change: `+${Math.max(1, Math.floor(stats.liveCampaigns * 0.1))}`, positive: true, color: "#dc2626" },
    { icon: Eye, label: "Total Reach", value: stats.totalReach, change: "+18%", positive: true, color: "#8b5cf6" },
    { icon: TrendingUp, label: "Avg. ROAS", value: stats.avgRoas, change: "+1.2x", positive: true, color: "#f97316" },
    { icon: Globe, label: "Total Leads", value: String(stats.totalLeads), change: `+${stats.hotLeads} hot`, positive: true, color: "#06b6d4" },
    { icon: Zap, label: "Conversion Rate", value: stats.conversionRate, change: "+4%", positive: true, color: "#ec4899" },
  ];

  const recentLeads = leads.slice(0, 5);

  if (!mounted) return null;

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 800, marginBottom: 4 }}>
          Dashboard
        </h1>
        <p style={{ color: "rgba(17,17,17,0.4)", fontSize: "0.875rem" }}>
          Welcome back. Here&apos;s what&apos;s happening with TCC today.
        </p>
      </div>

      {/* Live indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "8px 14px", background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)", borderRadius: 10, width: "fit-content" }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", animation: "pulse-glow 2s infinite", boxShadow: "0 0 8px rgba(34,197,94,0.5)" }} />
        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#22c55e" }}>Live — Data synced in real-time</span>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 16,
        marginBottom: 24,
      }}>
        {STATS.map(stat => (
          <div key={stat.label} className="stat-card" style={{ transition: "all 0.3s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: `${stat.color}15`,
                border: `1px solid ${stat.color}25`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <stat.icon size={18} color={stat.color} />
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 3,
                fontSize: "0.75rem", fontWeight: 600,
                color: stat.positive ? "#4ade80" : "#f87171",
              }}>
                {stat.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change}
              </div>
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: "#111111", marginBottom: 2 }}>
              {stat.value}
            </div>
            <div style={{ fontSize: "0.75rem", color: "rgba(17,17,17,0.4)" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 24 }}>
        {/* Revenue Chart */}
        <div className="dashboard-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, marginBottom: 2 }}>Revenue & Campaigns</h3>
              <p style={{ fontSize: "0.75rem", color: "rgba(17,17,17,0.35)" }}>Monthly performance overview</p>
            </div>
            <select style={{
              background: "rgba(17,17,17,0.05)",
              border: "1px solid rgba(17,17,17,0.08)",
              borderRadius: 8,
              padding: "6px 10px",
              color: "rgba(17,17,17,0.6)",
              fontSize: "0.75rem",
              cursor: "pointer",
            }}>
              <option>Last 7 months</option>
              <option>Last 12 months</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc2626" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="campGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(17,17,17,0.04)" />
              <XAxis dataKey="month" tick={{ fill: "rgba(17,17,17,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(17,17,17,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid rgba(17,17,17,0.1)", borderRadius: 10, fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke="#dc2626" strokeWidth={2} fill="url(#revGrad)" name="Revenue (L)" />
              <Area type="monotone" dataKey="campaigns" stroke="#3b82f6" strokeWidth={2} fill="url(#campGrad)" name="Campaigns" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card">
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, marginBottom: 16 }}>Quick Actions</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "Add New Creator", href: "/admin/creators", color: "#f59e0b" },
              { label: "Manage Clients", href: "/admin/clients", color: "#22c55e" },
              { label: "View All Leads", href: "/admin/leads", color: "#dc2626" },
              { label: "Write Blog Post", href: "/admin/blog", color: "#8b5cf6" },
              { label: "Website CMS", href: "/admin/cms", color: "#3b82f6" },
              { label: "SEO Audit", href: "/admin/seo", color: "#f97316" },
            ].map(action => (
              <Link key={action.href} href={action.href} style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                background: "rgba(17,17,17,0.03)",
                border: "1px solid rgba(17,17,17,0.06)",
                borderRadius: 10,
                textDecoration: "none",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(17,17,17,0.06)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(17,17,17,0.03)"}
              >
                <div style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: action.color,
                  flexShrink: 0,
                }} />
                <span style={{ fontSize: "0.85rem", color: "rgba(17,17,17,0.7)", fontWeight: 500 }}>{action.label}</span>
                <ArrowUpRight size={12} color="rgba(17,17,17,0.25)" style={{ marginLeft: "auto" }} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="dashboard-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, marginBottom: 2 }}>Recent Leads</h3>
            <p style={{ fontSize: "0.75rem", color: "rgba(17,17,17,0.35)" }}>Latest inbound inquiries — {stats.hotLeads} hot leads</p>
          </div>
          <Link href="/admin/leads" style={{
            fontSize: "0.8rem", color: "#f87171", textDecoration: "none", fontWeight: 600,
            display: "flex", alignItems: "center", gap: 4,
          }}>
            View All <ArrowUpRight size={12} />
          </Link>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Brand Name</th>
              <th>Type</th>
              <th>Estimated Value</th>
              <th>Status</th>
              <th>Source</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recentLeads.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: "center", padding: 40, color: "rgba(17,17,17,0.3)" }}>No leads yet. They&apos;ll appear here in real-time.</td></tr>
            ) : (
              recentLeads.map(lead => (
                <tr key={lead.id}>
                  <td style={{ color: "#111111", fontWeight: 500 }}>
                    <div>{lead.company}</div>
                    <div style={{ fontSize: "0.7rem", color: "rgba(17,17,17,0.35)" }}>{lead.name}</div>
                  </td>
                  <td>{lead.type}</td>
                  <td style={{ color: "#4ade80", fontWeight: 600 }}>{lead.budget}</td>
                  <td>
                    <span style={{
                      padding: "3px 10px",
                      borderRadius: 100,
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: STATUS_COLOR[lead.status] || "#3b82f6",
                      background: `${STATUS_COLOR[lead.status] || "#3b82f6"}15`,
                      border: `1px solid ${STATUS_COLOR[lead.status] || "#3b82f6"}25`,
                    }}>
                      {lead.status}
                    </span>
                  </td>
                  <td style={{ fontSize: "0.75rem" }}>{lead.source}</td>
                  <td>
                    <Link href="/admin/leads" style={{
                      fontSize: "0.75rem", color: "#f87171",
                      textDecoration: "none", fontWeight: 600,
                    }}>
                      View →
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
