"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { TrendingUp, Users, Eye, MousePointer } from "lucide-react";

const trafficData = [
  { month: "Jan", organic: 8400, paid: 3200, direct: 2100 },
  { month: "Feb", organic: 9800, paid: 4100, direct: 2400 },
  { month: "Mar", organic: 11200, paid: 5200, direct: 2800 },
  { month: "Apr", organic: 10500, paid: 4800, direct: 3100 },
  { month: "May", organic: 14200, paid: 6100, direct: 3600 },
  { month: "Jun", organic: 16800, paid: 7200, direct: 4100 },
  { month: "Jul", organic: 19400, paid: 8400, direct: 4800 },
];

const conversionData = [
  { week: "W1", leads: 42, clients: 8 },
  { week: "W2", leads: 58, clients: 11 },
  { week: "W3", leads: 51, clients: 9 },
  { week: "W4", leads: 67, clients: 14 },
  { week: "W5", leads: 74, clients: 16 },
  { week: "W6", leads: 68, clients: 13 },
  { week: "W7", leads: 82, clients: 18 },
  { week: "W8", leads: 91, clients: 21 },
];

const geoData = [
  { city: "Mumbai", value: 34, color: "#dc2626" },
  { city: "Delhi", value: 22, color: "#f59e0b" },
  { city: "Bangalore", value: 18, color: "#3b82f6" },
  { city: "Chennai", value: 12, color: "#22c55e" },
  { city: "Others", value: 14, color: "#8b5cf6" },
];

const METRICS = [
  { icon: Eye, label: "Total Visitors", value: "84,240", change: "+18%", color: "#3b82f6" },
  { icon: MousePointer, label: "Conversion Rate", value: "4.2%", change: "+0.8%", color: "#22c55e" },
  { icon: Users, label: "New Leads", value: "1,842", change: "+22%", color: "#dc2626" },
  { icon: TrendingUp, label: "Avg. Session", value: "3m 42s", change: "+14s", color: "#f59e0b" },
];

export default function AdminAnalytics() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 800, marginBottom: 4 }}>Analytics</h1>
        <p style={{ color: "rgba(17,17,17,0.4)", fontSize: "0.875rem" }}>Full platform performance overview</p>
      </div>

      {/* Top Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {METRICS.map(m => (
          <div key={m.label} className="stat-card">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: `${m.color}15`, border: `1px solid ${m.color}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <m.icon size={18} color={m.color} />
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#4ade80" }}>↑ {m.change}</span>
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: "#111111", marginBottom: 2 }}>{m.value}</div>
            <div style={{ fontSize: "0.75rem", color: "rgba(17,17,17,0.4)" }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Traffic Chart */}
      <div className="dashboard-card" style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, marginBottom: 2 }}>Website Traffic Sources</h3>
          <p style={{ fontSize: "0.75rem", color: "rgba(17,17,17,0.35)" }}>Organic, paid and direct traffic over 7 months</p>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={trafficData}>
            <defs>
              {[{ id: "org", color: "#dc2626" }, { id: "paid", color: "#3b82f6" }, { id: "dir", color: "#22c55e" }].map(g => (
                <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={g.color} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={g.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(17,17,17,0.04)" />
            <XAxis dataKey="month" tick={{ fill: "rgba(17,17,17,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(17,17,17,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(17,17,17,0.1)", borderRadius: 10, fontSize: 12 }} />
            <Area type="monotone" dataKey="organic" stroke="#dc2626" strokeWidth={2} fill="url(#org)" name="Organic" />
            <Area type="monotone" dataKey="paid" stroke="#3b82f6" strokeWidth={2} fill="url(#paid)" name="Paid" />
            <Area type="monotone" dataKey="direct" stroke="#22c55e" strokeWidth={2} fill="url(#dir)" name="Direct" />
          </AreaChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", gap: 24, marginTop: 12 }}>
          {[{ color: "#dc2626", label: "Organic" }, { color: "#3b82f6", label: "Paid" }, { color: "#22c55e", label: "Direct" }].map(l => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.75rem", color: "rgba(17,17,17,0.5)" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: l.color }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        {/* Conversion Funnel */}
        <div className="dashboard-card">
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, marginBottom: 2 }}>Lead → Client Conversions</h3>
            <p style={{ fontSize: "0.75rem", color: "rgba(17,17,17,0.35)" }}>Weekly conversion performance</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={conversionData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(17,17,17,0.04)" />
              <XAxis dataKey="week" tick={{ fill: "rgba(17,17,17,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(17,17,17,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(17,17,17,0.1)", borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="leads" fill="rgba(220,38,38,0.5)" radius={[4, 4, 0, 0]} name="Leads" />
              <Bar dataKey="clients" fill="#dc2626" radius={[4, 4, 0, 0]} name="Clients" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Geographic */}
        <div className="dashboard-card">
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, marginBottom: 16 }}>Top Cities</h3>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={geoData} cx="50%" cy="50%" innerRadius={35} outerRadius={60} paddingAngle={3} dataKey="value">
                {geoData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(17,17,17,0.1)", borderRadius: 10, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
            {geoData.map(d => (
              <div key={d.city} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color }} />
                  <span style={{ fontSize: "0.8rem", color: "rgba(17,17,17,0.6)" }}>{d.city}</span>
                </div>
                <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#111111" }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
