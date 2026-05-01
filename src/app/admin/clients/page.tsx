"use client";
import { useState } from "react";
import { Plus, Search, Edit, Trash2, Eye, Filter, ChevronDown } from "lucide-react";

const CLIENTS = [
  { id: 1, name: "LuxeBeauty", contact: "Priya Sharma", email: "priya@luxebeauty.com", plan: "Growth", revenue: "₹1.5L/mo", campaigns: 4, status: "Active", joined: "Jan 2024" },
  { id: 2, name: "FitCore India", contact: "Arjun Mehta", email: "arjun@fitcore.in", plan: "Enterprise", revenue: "₹3.2L/mo", campaigns: 8, status: "Active", joined: "Nov 2023" },
  { id: 3, name: "StyleVault", contact: "Kavya Reddy", email: "kavya@stylevault.com", plan: "Growth", revenue: "₹1.2L/mo", campaigns: 3, status: "Active", joined: "Feb 2024" },
  { id: 4, name: "TechGadgetHub", contact: "Rohit Gupta", email: "rohit@techgadgethub.com", plan: "Starter", revenue: "₹55K/mo", campaigns: 2, status: "Active", joined: "Mar 2024" },
  { id: 5, name: "WellnessFirst", contact: "Sneha Patel", email: "sneha@wellnessfirst.com", plan: "Growth", revenue: "₹1L/mo", campaigns: 3, status: "Onboarding", joined: "Apr 2024" },
];

const PLAN_COLOR: Record<string, string> = { Starter: "#3b82f6", Growth: "#f59e0b", Enterprise: "#dc2626" };

export default function AdminClients() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filtered = CLIENTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.contact.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 800, marginBottom: 4 }}>Client Management</h1>
          <p style={{ color: "rgba(17,17,17,0.4)", fontSize: "0.875rem" }}>{CLIENTS.length} active clients</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          <Plus size={16} /> Add Client
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Clients", value: "47", sub: "+8 this month" },
          { label: "MRR", value: "₹28.4L", sub: "+22% growth" },
          { label: "Avg. Plan Value", value: "₹1.2L", sub: "per month" },
          { label: "Retention Rate", value: "98%", sub: "industry leading" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 800, color: "#111111", marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "rgba(17,17,17,0.6)", marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: "0.7rem", color: "#4ade80" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <div style={{
          flex: 1, display: "flex", alignItems: "center", gap: 8,
          padding: "10px 14px",
          background: "rgba(17,17,17,0.04)",
          border: "1px solid rgba(17,17,17,0.07)",
          borderRadius: 10,
        }}>
          <Search size={14} color="rgba(17,17,17,0.3)" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search clients..."
            style={{ background: "none", border: "none", outline: "none", color: "#111111", fontSize: "0.875rem", flex: 1 }}
          />
        </div>
        <button className="btn-secondary" style={{ padding: "10px 16px", gap: 6 }}>
          <Filter size={14} /> Filter <ChevronDown size={12} />
        </button>
      </div>

      {/* Table */}
      <div className="dashboard-card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="data-table" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ paddingLeft: 24 }}>Brand</th>
              <th>Contact</th>
              <th>Plan</th>
              <th>Revenue</th>
              <th>Campaigns</th>
              <th>Status</th>
              <th>Joined</th>
              <th style={{ paddingRight: 24 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id}>
                <td style={{ paddingLeft: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: 8,
                      background: "rgba(220,38,38,0.1)",
                      border: "1px solid rgba(220,38,38,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.8rem", fontWeight: 700, color: "#f87171",
                    }}>{c.name.charAt(0)}</div>
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111111" }}>{c.name}</div>
                      <div style={{ fontSize: "0.7rem", color: "rgba(17,17,17,0.35)" }}>{c.email}</div>
                    </div>
                  </div>
                </td>
                <td>{c.contact}</td>
                <td>
                  <span style={{
                    padding: "3px 10px", borderRadius: 100, fontSize: "0.7rem", fontWeight: 700,
                    color: PLAN_COLOR[c.plan],
                    background: `${PLAN_COLOR[c.plan]}15`,
                    border: `1px solid ${PLAN_COLOR[c.plan]}25`,
                  }}>{c.plan}</span>
                </td>
                <td style={{ color: "#4ade80", fontWeight: 600 }}>{c.revenue}</td>
                <td>{c.campaigns}</td>
                <td>
                  <span style={{
                    padding: "3px 10px", borderRadius: 100, fontSize: "0.7rem", fontWeight: 700,
                    color: c.status === "Active" ? "#4ade80" : "#f59e0b",
                    background: c.status === "Active" ? "rgba(34,197,94,0.1)" : "rgba(245,158,11,0.1)",
                    border: `1px solid ${c.status === "Active" ? "rgba(34,197,94,0.2)" : "rgba(245,158,11,0.2)"}`,
                  }}>{c.status}</span>
                </td>
                <td style={{ fontSize: "0.8rem" }}>{c.joined}</td>
                <td style={{ paddingRight: 24 }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button style={{ padding: 6, borderRadius: 6, background: "rgba(17,17,17,0.05)", border: "none", cursor: "pointer", color: "rgba(17,17,17,0.5)" }}><Eye size={13} /></button>
                    <button style={{ padding: 6, borderRadius: 6, background: "rgba(17,17,17,0.05)", border: "none", cursor: "pointer", color: "rgba(17,17,17,0.5)" }}><Edit size={13} /></button>
                    <button style={{ padding: 6, borderRadius: 6, background: "rgba(220,38,38,0.1)", border: "none", cursor: "pointer", color: "#f87171" }}><Trash2 size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
        }}>
          <div style={{
            background: "var(--charcoal)", border: "1px solid var(--charcoal-border)",
            borderRadius: 20, padding: 32, width: "100%", maxWidth: 520,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700 }}>Add New Client</h2>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(17,17,17,0.5)" }}>✕</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><label className="label">Brand Name</label><input className="input-field" placeholder="Brand name" /></div>
                <div><label className="label">Contact Person</label><input className="input-field" placeholder="Full name" /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><label className="label">Email</label><input className="input-field" type="email" placeholder="email@brand.com" /></div>
                <div><label className="label">Phone</label><input className="input-field" placeholder="+91..." /></div>
              </div>
              <div>
                <label className="label">Plan</label>
                <select className="input-field">
                  <option>Starter</option><option>Growth</option><option>Enterprise</option>
                </select>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                <button onClick={() => setShowModal(false)} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button className="btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={() => setShowModal(false)}>Add Client</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
