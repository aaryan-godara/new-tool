"use client";
import { useState } from "react";
import { Plus, Search, Trash2, Filter, ChevronDown, CheckCircle } from "lucide-react";
import { useCreators } from "@/lib/use-dashboard";

export default function AdminCreators() {
  const { creators, addCreator, deleteCreator } = useCreators();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ 
    name: "", handle: "", platform: "Instagram", followers: "", 
    category: "Lifestyle", rate: "", engagement: "", 
    status: "Pending" as "Active" | "Inactive" | "Pending", 
    rating: 4, campaigns: 0,
    location: "", avatar: "", verified: false, platforms: ["Instagram"]
  });

  const filtered = creators.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!form.name || !form.handle) return;
    addCreator(form);
    setForm({ 
      name: "", handle: "", platform: "Instagram", followers: "", 
      category: "Lifestyle", rate: "", engagement: "", 
      status: "Pending", rating: 4, campaigns: 0,
      location: "", avatar: "", verified: false, platforms: ["Instagram"]
    });
    setShowModal(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 800, marginBottom: 4 }}>Creator Management</h1>
          <p style={{ color: "rgba(17,17,17,0.4)", fontSize: "0.875rem" }}>{creators.length} creators in your network</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          <Plus size={16} /> Add Creator
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Creators", value: String(creators.length), color: "#3b82f6" },
          { label: "Active", value: String(creators.filter(c => c.status === "Active").length), color: "#22c55e" },
          { label: "Pending", value: String(creators.filter(c => c.status === "Pending").length), color: "#f59e0b" },
          { label: "Total Campaigns", value: String(creators.reduce((s, c) => s + c.campaigns, 0)), color: "#dc2626" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: s.color, marginBottom: 2 }}>{s.value}</div>
            <div style={{ fontSize: "0.75rem", color: "rgba(17,17,17,0.4)" }}>{s.label}</div>
          </div>
        ))}
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
      </div>

      {/* Table */}
      <div className="dashboard-card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="data-table" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ paddingLeft: 24 }}>Creator</th>
              <th>Platform</th>
              <th>Category</th>
              <th>Followers</th>
              <th>Engagement</th>
              <th>Rate</th>
              <th>Status</th>
              <th style={{ paddingRight: 24 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={8} style={{ textAlign: "center", padding: 40, color: "rgba(17,17,17,0.3)" }}>No creators found</td></tr>
            ) : filtered.map(c => (
              <tr key={c.id}>
                <td style={{ paddingLeft: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {c.avatar ? (
                      <img src={c.avatar} alt={c.name} style={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover" }} />
                    ) : (
                      <div style={{
                        width: 34, height: 34, borderRadius: "50%",
                        background: "linear-gradient(135deg, #dc2626, #7f1d1d)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.875rem", fontWeight: 700, flexShrink: 0, color: "#fff",
                      }}>{c.name.charAt(0)}</div>
                    )}
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111111" }}>{c.name}</div>
                        {c.verified && <CheckCircle size={12} color="#3b82f6" fill="#3b82f6" />}
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "rgba(17,17,17,0.4)" }}>{c.handle}</div>
                    </div>
                  </div>
                </td>
                <td style={{ fontSize: "0.8rem" }}>{c.platform}</td>
                <td><span className="badge badge-red">{c.category}</span></td>
                <td style={{ color: "#111111", fontWeight: 600 }}>{c.followers}</td>
                <td style={{ color: "#22c55e", fontWeight: 600 }}>{c.engagement}</td>
                <td style={{ color: "#f59e0b", fontWeight: 600 }}>{c.rate}</td>
                <td>
                  <span style={{
                    padding: "3px 10px", borderRadius: 100, fontSize: "0.7rem", fontWeight: 700,
                    color: c.status === "Active" ? "#4ade80" : c.status === "Pending" ? "#f59e0b" : "#f87171",
                    background: c.status === "Active" ? "rgba(34,197,94,0.1)" : c.status === "Pending" ? "rgba(245,158,11,0.1)" : "rgba(220,38,38,0.1)",
                    border: `1px solid ${c.status === "Active" ? "rgba(34,197,94,0.2)" : c.status === "Pending" ? "rgba(245,158,11,0.2)" : "rgba(220,38,38,0.2)"}`,
                  }}>{c.status}</span>
                </td>
                <td style={{ paddingRight: 24 }}>
                  <button onClick={() => deleteCreator(c.id)} style={{ padding: 6, borderRadius: 6, background: "rgba(220,38,38,0.1)", border: "none", cursor: "pointer", color: "#f87171" }}><Trash2 size={13} /></button>
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
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 24,
        }}>
          <div style={{
            background: "#fff",
            border: "1px solid rgba(17,17,17,0.1)",
            borderRadius: 20,
            padding: 32,
            width: "100%",
            maxWidth: 520,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700 }}>Add New Creator</h2>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(17,17,17,0.5)", fontSize: "1.2rem" }}>✕</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><label className="label">Creator Name *</label><input className="input-field" placeholder="Full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
                <div><label className="label">Handle *</label><input className="input-field" placeholder="@username" value={form.handle} onChange={e => setForm(f => ({ ...f, handle: e.target.value }))} /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label className="label">Platform</label>
                  <select className="input-field" value={form.platform} onChange={e => setForm(f => ({ ...f, platform: e.target.value, platforms: [e.target.value] }))}>
                    <option>Instagram</option><option>YouTube</option><option>Twitter</option><option>LinkedIn</option>
                  </select>
                </div>
                <div>
                  <label className="label">Category</label>
                  <select className="input-field" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {["Lifestyle", "Fitness", "Fashion", "Tech", "Finance", "Food", "Beauty", "Travel"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <div><label className="label">Followers</label><input className="input-field" placeholder="e.g. 245K" value={form.followers} onChange={e => setForm(f => ({ ...f, followers: e.target.value }))} /></div>
                <div><label className="label">Rate</label><input className="input-field" placeholder="₹25K/post" value={form.rate} onChange={e => setForm(f => ({ ...f, rate: e.target.value }))} /></div>
                <div><label className="label">Engagement</label><input className="input-field" placeholder="4.8%" value={form.engagement} onChange={e => setForm(f => ({ ...f, engagement: e.target.value }))} /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><label className="label">Location</label><input className="input-field" placeholder="e.g. Mumbai" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} /></div>
                <div><label className="label">Avatar URL</label><input className="input-field" placeholder="https://..." value={form.avatar} onChange={e => setForm(f => ({ ...f, avatar: e.target.value }))} /></div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                <input type="checkbox" id="verified" checked={form.verified} onChange={e => setForm(f => ({ ...f, verified: e.target.checked }))} style={{ width: 16, height: 16 }} />
                <label htmlFor="verified" style={{ fontSize: "0.85rem", fontWeight: 600, color: "#111111", cursor: "pointer" }}>Verified Creator</label>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                <button onClick={() => setShowModal(false)} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button className="btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={handleAdd}>
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
