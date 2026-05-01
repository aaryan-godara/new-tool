"use client";
import { useState } from "react";
import { Plus, Search, Edit, Trash2, Eye, ChevronDown, Filter } from "lucide-react";
import Link from "next/link";

const CREATORS = [
  { id: 1, name: "Aisha Kapoor", category: "Lifestyle", followers: "1.2M", engagement: "8.4%", campaigns: 12, earnings: "₹4.8L", status: "Active", verified: true },
  { id: 2, name: "Rahul Verma", category: "Fitness", followers: "890K", engagement: "11.2%", campaigns: 8, earnings: "₹3.2L", status: "Active", verified: true },
  { id: 3, name: "Prachi Singh", category: "Fashion", followers: "2.1M", engagement: "6.8%", campaigns: 18, earnings: "₹7.4L", status: "Active", verified: true },
  { id: 4, name: "Dev Malhotra", category: "Technology", followers: "650K", engagement: "9.3%", campaigns: 6, earnings: "₹2.1L", status: "Active", verified: true },
  { id: 5, name: "Meera Nair", category: "Finance", followers: "480K", engagement: "12.1%", campaigns: 4, earnings: "₹1.8L", status: "Active", verified: true },
  { id: 6, name: "Karan Khanna", category: "Food", followers: "1.5M", engagement: "7.6%", campaigns: 14, earnings: "₹5.6L", status: "Paused", verified: false },
];

export default function AdminCreators() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", category: "", instagram: "", youtube: "", followers: "", engagement: "" });

  const filtered = CREATORS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 800, marginBottom: 4 }}>Creator Management</h1>
          <p style={{ color: "rgba(17,17,17,0.4)", fontSize: "0.875rem" }}>{CREATORS.length} creators in your network</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          <Plus size={16} /> Add Creator
        </button>
      </div>

      {/* Search & Filter */}
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
            placeholder="Search creators..."
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
              <th style={{ paddingLeft: 24 }}>Creator</th>
              <th>Category</th>
              <th>Followers</th>
              <th>Engagement</th>
              <th>Campaigns</th>
              <th>Earnings</th>
              <th>Status</th>
              <th style={{ paddingRight: 24 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id}>
                <td style={{ paddingLeft: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: "50%",
                      background: "linear-gradient(135deg, #dc2626, #7f1d1d)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.875rem", fontWeight: 700, flexShrink: 0,
                    }}>{c.name.charAt(0)}</div>
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111111" }}>{c.name}</div>
                      {c.verified && <div style={{ fontSize: "0.65rem", color: "#3b82f6" }}>✓ Verified</div>}
                    </div>
                  </div>
                </td>
                <td><span className="badge badge-red">{c.category}</span></td>
                <td style={{ color: "#111111", fontWeight: 600 }}>{c.followers}</td>
                <td style={{ color: "#22c55e", fontWeight: 600 }}>{c.engagement}</td>
                <td>{c.campaigns}</td>
                <td style={{ color: "#f59e0b", fontWeight: 600 }}>{c.earnings}</td>
                <td>
                  <span style={{
                    padding: "3px 10px", borderRadius: 100, fontSize: "0.7rem", fontWeight: 700,
                    color: c.status === "Active" ? "#4ade80" : "#f59e0b",
                    background: c.status === "Active" ? "rgba(34,197,94,0.1)" : "rgba(245,158,11,0.1)",
                    border: `1px solid ${c.status === "Active" ? "rgba(34,197,94,0.2)" : "rgba(245,158,11,0.2)"}`,
                  }}>{c.status}</span>
                </td>
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

      {/* Add Creator Modal */}
      {showModal && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 24,
        }}>
          <div style={{
            background: "var(--charcoal)",
            border: "1px solid var(--charcoal-border)",
            borderRadius: 20,
            padding: 32,
            width: "100%",
            maxWidth: 520,
            animation: "scale-in 0.3s ease forwards",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700 }}>Add New Creator</h2>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(17,17,17,0.5)" }}>✕</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label className="label">Creator Name</label>
                <input className="input-field" placeholder="Full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label className="label">Category</label>
                  <select className="input-field" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    <option value="">Select...</option>
                    {["Lifestyle", "Fitness", "Fashion", "Technology", "Finance", "Food"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Followers</label>
                  <input className="input-field" placeholder="e.g. 1.2M" value={form.followers} onChange={e => setForm(f => ({ ...f, followers: e.target.value }))} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label className="label">Instagram Handle</label>
                  <input className="input-field" placeholder="@username" value={form.instagram} onChange={e => setForm(f => ({ ...f, instagram: e.target.value }))} />
                </div>
                <div>
                  <label className="label">YouTube Channel</label>
                  <input className="input-field" placeholder="Channel name" value={form.youtube} onChange={e => setForm(f => ({ ...f, youtube: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="label">Engagement Rate %</label>
                <input className="input-field" placeholder="e.g. 8.4" value={form.engagement} onChange={e => setForm(f => ({ ...f, engagement: e.target.value }))} />
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                <button onClick={() => setShowModal(false)} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button className="btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={() => setShowModal(false)}>
                  Add Creator
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
