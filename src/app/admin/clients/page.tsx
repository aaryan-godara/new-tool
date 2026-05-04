"use client";
import { useState } from "react";
import { Plus, Search, Edit, Trash2, Eye, Filter, ChevronDown } from "lucide-react";
import { useClients } from "@/lib/use-dashboard";

const PLAN_COLOR: Record<string, string> = { Starter: "#3b82f6", Growth: "#f59e0b", Enterprise: "#dc2626" };

export default function AdminClients() {
  const { clients, addClient, deleteClient } = useClients();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", email: "", phone: "", plan: "Growth" as "Starter" | "Growth" | "Enterprise", revenue: "", campaigns: 0, status: "Onboarding" as "Active" | "Onboarding" | "Paused", joined: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }) });

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.contact.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!form.name || !form.contact) return;
    addClient(form);
    setForm({ name: "", contact: "", email: "", phone: "", plan: "Growth", revenue: "", campaigns: 0, status: "Onboarding", joined: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }) });
    setShowModal(false);
  };

  const activeCount = clients.filter(c => c.status === "Active").length;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 800, marginBottom: 4 }}>Client Management</h1>
          <p style={{ color: "rgba(17,17,17,0.4)", fontSize: "0.875rem" }}>{activeCount} active clients · {clients.length} total</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          <Plus size={16} /> Add Client
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Clients", value: String(clients.length), sub: `${activeCount} active` },
          { label: "Active", value: String(activeCount), sub: "currently running" },
          { label: "Onboarding", value: String(clients.filter(c => c.status === "Onboarding").length), sub: "in pipeline" },
          { label: "Total Campaigns", value: String(clients.reduce((s, c) => s + c.campaigns, 0)), sub: "across all clients" },
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
            {filtered.length === 0 ? (
              <tr><td colSpan={8} style={{ textAlign: "center", padding: 40, color: "rgba(17,17,17,0.3)" }}>No clients found</td></tr>
            ) : filtered.map(c => (
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
                <td style={{ color: "#4ade80", fontWeight: 600 }}>{c.revenue || "—"}</td>
                <td>{c.campaigns}</td>
                <td>
                  <span style={{
                    padding: "3px 10px", borderRadius: 100, fontSize: "0.7rem", fontWeight: 700,
                    color: c.status === "Active" ? "#4ade80" : c.status === "Paused" ? "#f87171" : "#f59e0b",
                    background: c.status === "Active" ? "rgba(34,197,94,0.1)" : c.status === "Paused" ? "rgba(220,38,38,0.1)" : "rgba(245,158,11,0.1)",
                    border: `1px solid ${c.status === "Active" ? "rgba(34,197,94,0.2)" : c.status === "Paused" ? "rgba(220,38,38,0.2)" : "rgba(245,158,11,0.2)"}`,
                  }}>{c.status}</span>
                </td>
                <td style={{ fontSize: "0.8rem" }}>{c.joined}</td>
                <td style={{ paddingRight: 24 }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => deleteClient(c.id)} style={{ padding: 6, borderRadius: 6, background: "rgba(220,38,38,0.1)", border: "none", cursor: "pointer", color: "#f87171" }}><Trash2 size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Client Modal */}
      {showModal && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
        }}>
          <div style={{
            background: "#fff", border: "1px solid rgba(17,17,17,0.1)",
            borderRadius: 20, padding: 32, width: "100%", maxWidth: 520,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700 }}>Add New Client</h2>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(17,17,17,0.5)", fontSize: "1.2rem" }}>✕</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><label className="label">Brand Name *</label><input className="input-field" placeholder="Brand name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                <div><label className="label">Contact Person *</label><input className="input-field" placeholder="Full name" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><label className="label">Email</label><input className="input-field" type="email" placeholder="email@brand.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                <div><label className="label">Phone</label><input className="input-field" placeholder="+91..." value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label className="label">Plan</label>
                  <select className="input-field" value={form.plan} onChange={e => setForm({ ...form, plan: e.target.value as "Starter" | "Growth" | "Enterprise" })}>
                    <option>Starter</option><option>Growth</option><option>Enterprise</option>
                  </select>
                </div>
                <div><label className="label">Revenue</label><input className="input-field" placeholder="₹1L/mo" value={form.revenue} onChange={e => setForm({ ...form, revenue: e.target.value })} /></div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                <button onClick={() => setShowModal(false)} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button className="btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={handleAdd}>Add Client</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
