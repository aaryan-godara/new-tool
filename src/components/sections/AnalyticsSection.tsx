"use client";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 42, leads: 28 },
  { month: "Feb", revenue: 58, leads: 35 },
  { month: "Mar", revenue: 71, leads: 48 },
  { month: "Apr", revenue: 65, leads: 42 },
  { month: "May", revenue: 89, leads: 62 },
  { month: "Jun", revenue: 102, leads: 75 },
  { month: "Jul", revenue: 118, leads: 88 },
  { month: "Aug", revenue: 134, leads: 95 },
  { month: "Sep", revenue: 156, leads: 112 },
  { month: "Oct", revenue: 178, leads: 130 },
  { month: "Nov", revenue: 195, leads: 148 },
  { month: "Dec", revenue: 224, leads: 172 },
];

const engagementData = [
  { name: "Instagram", value: 42, color: "#e1306c" },
  { name: "YouTube", value: 28, color: "#ff0000" },
  { name: "LinkedIn", value: 15, color: "#0077b5" },
  { name: "Twitter", value: 10, color: "#1da1f2" },
  { name: "TikTok", value: 5, color: "#69c9d0" },
];

const creatorPerformance = [
  { creator: "Aisha K.", reach: 1200, engagement: 8.4, revenue: 48 },
  { creator: "Rahul V.", reach: 890, engagement: 11.2, revenue: 36 },
  { creator: "Prachi S.", reach: 2100, engagement: 6.8, revenue: 72 },
  { creator: "Dev M.", reach: 650, engagement: 9.3, revenue: 28 },
  { creator: "Meera N.", reach: 480, engagement: 12.1, revenue: 22 },
];

const LIVE_METRICS = [
  { label: "Total Revenue", value: "₹2.4Cr", change: "+32%", positive: true },
  { label: "Active Campaigns", value: "24", change: "+8", positive: true },
  { label: "Creator Reach", value: "12.8M", change: "+18%", positive: true },
  { label: "Avg. ROAS", value: "7.8x", change: "+1.2x", positive: true },
];

export default function AnalyticsSection() {
  return (
    <section className="section" id="analytics" style={{ background: "rgba(17,17,17,0.01)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="section-badge" style={{ margin: "0 auto 20px" }}>Live Analytics</div>
          <h2 className="section-title">
            Data-driven marketing.<br />
            <span className="text-gradient-red">Real-time intelligence.</span>
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Our analytics platform gives you unparalleled visibility into every campaign, creator, and conversion.
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="glass" style={{
          borderRadius: 24,
          overflow: "hidden",
          border: "1px solid rgba(17,17,17,0.08)",
        }}>
          {/* Dashboard Header */}
          <div style={{
            padding: "16px 24px",
            borderBottom: "1px solid rgba(17,17,17,0.06)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(17,17,17,0.02)",
          }}>
            {["#ff5f57", "#ffbd2e", "#28c840"].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
            ))}
            <span style={{ marginLeft: 8, fontSize: "0.75rem", color: "rgba(17,17,17,0.3)", fontFamily: "monospace" }}>
              tcc.analytics — Live Dashboard
            </span>
            <div style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "3px 10px",
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.2)",
              borderRadius: 100,
              fontSize: "0.65rem",
              color: "#4ade80",
              fontWeight: 600,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "pulse-glow 2s infinite" }} />
              LIVE
            </div>
          </div>

          <div style={{ padding: 24 }}>
            {/* Metric Cards */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
              marginBottom: 24,
            }}>
              {LIVE_METRICS.map(metric => (
                <div key={metric.label} style={{
                  background: "rgba(17,17,17,0.03)",
                  border: "1px solid rgba(17,17,17,0.06)",
                  borderRadius: 14,
                  padding: "20px",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0, height: 2,
                    background: "linear-gradient(90deg, #dc2626, transparent)",
                  }} />
                  <div style={{ fontSize: "0.7rem", color: "rgba(17,17,17,0.4)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {metric.label}
                  </div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: "#111111", marginBottom: 4 }}>
                    {metric.value}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: metric.positive ? "#4ade80" : "#f87171", fontWeight: 600 }}>
                    ↑ {metric.change} this month
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>
              {/* Revenue Chart */}
              <div style={{
                background: "rgba(17,17,17,0.02)",
                border: "1px solid rgba(17,17,17,0.05)",
                borderRadius: 16,
                padding: "20px",
              }}>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#111111" }}>Revenue Growth</div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(17,17,17,0.35)" }}>12-month performance</div>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="leadsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(17,17,17,0.04)" />
                    <XAxis dataKey="month" tick={{ fill: "rgba(17,17,17,0.35)", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "rgba(17,17,17,0.35)", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        background: "#1a1a1a",
                        border: "1px solid rgba(17,17,17,0.1)",
                        borderRadius: 10,
                        color: "#111111",
                        fontSize: 12,
                      }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#dc2626" strokeWidth={2} fill="url(#revenueGrad)" />
                    <Area type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={2} fill="url(#leadsGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Platform Distribution */}
              <div style={{
                background: "rgba(17,17,17,0.02)",
                border: "1px solid rgba(17,17,17,0.05)",
                borderRadius: 16,
                padding: "20px",
              }}>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#111111" }}>Platform Split</div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(17,17,17,0.35)" }}>Campaign distribution</div>
                </div>
                <ResponsiveContainer width="100%" height={140}>
                  <PieChart>
                    <Pie
                      data={engagementData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={65}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {engagementData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "#1a1a1a",
                        border: "1px solid rgba(17,17,17,0.1)",
                        borderRadius: 10,
                        fontSize: 12,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {engagementData.map(d => (
                    <div key={d.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color }} />
                        <span style={{ fontSize: "0.7rem", color: "rgba(17,17,17,0.5)" }}>{d.name}</span>
                      </div>
                      <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#111111" }}>{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Creator Performance Table */}
            <div style={{
              background: "rgba(17,17,17,0.02)",
              border: "1px solid rgba(17,17,17,0.05)",
              borderRadius: 16,
              padding: "20px",
            }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#111111", marginBottom: 16 }}>Top Creator Performance</div>
              <table className="data-table" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Creator</th>
                    <th>Reach (K)</th>
                    <th>Engagement %</th>
                    <th>Revenue (L)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {creatorPerformance.map(c => (
                    <tr key={c.creator}>
                      <td style={{ color: "#111111", fontWeight: 500 }}>{c.creator}</td>
                      <td>{c.reach}K</td>
                      <td style={{ color: "#22c55e" }}>{c.engagement}%</td>
                      <td style={{ color: "#f59e0b" }}>₹{c.revenue}L</td>
                      <td>
                        <span className="badge badge-green">Active</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
