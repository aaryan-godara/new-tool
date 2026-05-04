"use client";
import { useState } from "react";
import { Plus, Search, MessageCircle, Phone, Clock, Trash2 } from "lucide-react";
import { useLeads } from "@/lib/use-dashboard";

const STATUS_COLORS: Record<string, string> = { Hot: "#dc2626", Warm: "#f59e0b", New: "#3b82f6", Closed: "#22c55e" };
const STATUSES = ["All", "Hot", "Warm", "New"];

export default function AdminLeads() {
  const { leads, addLead, updateLead, deleteLead } = useLeads();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", type: "Ecommerce", budget: "", status: "New" as "Hot" | "Warm" | "New", source: "Contact Form", notes: "" });

  const filtered = leads.filter(l =>
    (statusFilter === "All" || l.status === statusFilter) &&
    (l.name.toLowerCase().includes(search.toLowerCase()) || l.company.toLowerCase().includes(search.toLowerCase()))
  );

  const selectedLead = leads.find(l => l.id === selected);

  const handleAdd = () => {
    if (!form.name || !form.company) return;
    addLead(form);
    setForm({ name: "", company: "", email: "", phone: "", type: "Ecommerce", budget: "", status: "New", source: "Contact Form", notes: "" });
    setShowModal(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 800, marginBottom: 4 }}>Lead Management</h1>
          <p style={{ color: "rgba(17,17,17,0.4)", fontSize: "0.875rem" }}>{leads.filter(l => l.status === "Hot").length} hot leads · {leads.length} total</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}><Plus size={16} /> Add Lead</button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Leads", value: String(leads.length), color: "#3b82f6" },
          { label: "Hot Leads", value: String(leads.filter(l => l.status === "Hot").length), color: "#dc2626" },
          { label: "Warm Leads", value: String(leads.filter(l => l.status === "Warm").length), color: "#f59e0b" },
          { label: "New Leads", value: String(leads.filter(l => l.status === "New").length), color: "#22c55e" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: s.color, marginBottom: 2 }}>{s.value}</div>
            <div style={{ fontSize: "0.75rem", color: "rgba(17,17,17,0.4)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 380px" : "1fr", gap: 20 }}>
        {/* Table */}
        <div>
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", background: "rgba(17,17,17,0.04)", border: "1px solid rgba(17,17,17,0.07)", borderRadius: 10, flex: 1, maxWidth: 320 }}>
              <Search size={14} color="rgba(17,17,17,0.3)" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search leads..." style={{ background: "none", border: "none", outline: "none", color: "#111111", fontSize: "0.875rem", flex: 1 }} />
            </div>
            {STATUSES.map(s => (
              <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: "8px 16px", borderRadius: 100, fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", border: "1px solid", borderColor: statusFilter === s ? "rgba(220,38,38,0.5)" : "rgba(17,17,17,0.1)", background: statusFilter === s ? "rgba(220,38,38,0.15)" : "transparent", color: statusFilter === s ? "#111111" : "rgba(17,17,17,0.45)", transition: "all 0.15s" }}>{s}</button>
            ))}
          </div>

          <div className="dashboard-card" style={{ padding: 0, overflow: "hidden" }}>
            <table className="data-table" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ paddingLeft: 20 }}>Lead</th>
                  <th>Type</th>
                  <th>Budget</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} style={{ textAlign: "center", padding: 40, color: "rgba(17,17,17,0.3)" }}>No leads found</td></tr>
                ) : filtered.map(lead => (
                  <tr key={lead.id} style={{ cursor: "pointer", background: selected === lead.id ? "rgba(220,38,38,0.05)" : "transparent" }} onClick={() => setSelected(selected === lead.id ? null : lead.id)}>
                    <td style={{ paddingLeft: 20 }}>
                      <div>
                        <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111111" }}>{lead.name}</div>
                        <div style={{ fontSize: "0.7rem", color: "rgba(17,17,17,0.35)" }}>{lead.company}</div>
                      </div>
                    </td>
                    <td style={{ fontSize: "0.8rem" }}>{lead.type}</td>
                    <td style={{ color: "#4ade80", fontWeight: 600, fontSize: "0.85rem" }}>{lead.budget}</td>
                    <td style={{ fontSize: "0.8rem" }}>{lead.source}</td>
                    <td>
                      <span style={{ padding: "3px 10px", borderRadius: 100, fontSize: "0.7rem", fontWeight: 700, color: STATUS_COLORS[lead.status], background: `${STATUS_COLORS[lead.status]}15`, border: `1px solid ${STATUS_COLORS[lead.status]}25` }}>{lead.status}</span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
                        <select
                          value={lead.status}
                          onClick={e => e.stopPropagation()}
                          onChange={e => { e.stopPropagation(); updateLead(lead.id, { status: e.target.value as "Hot" | "Warm" | "New" | "Closed" }); }}
                          style={{ padding: "4px 8px", borderRadius: 6, background: "rgba(17,17,17,0.05)", border: "1px solid rgba(17,17,17,0.08)", cursor: "pointer", color: "rgba(17,17,17,0.6)", fontSize: "0.7rem" }}
                        >
                          <option value="New">New</option>
                          <option value="Warm">Warm</option>
                          <option value="Hot">Hot</option>
                          <option value="Closed">Closed</option>
                        </select>
                        <button onClick={e => { e.stopPropagation(); deleteLead(lead.id); setSelected(null); }} style={{ padding: 5, borderRadius: 6, background: "rgba(220,38,38,0.1)", border: "none", cursor: "pointer", color: "#f87171" }}><Trash2 size={12} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead Detail Panel */}
        {selectedLead && (
          <div className="dashboard-card" style={{ position: "sticky", top: 84, height: "fit-content" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700 }}>Lead Details</h3>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(17,17,17,0.4)", fontSize: "1.1rem" }}>✕</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, padding: 16, background: "rgba(17,17,17,0.03)", borderRadius: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#dc2626,#7f1d1d)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "1rem", color: "#fff" }}>{selectedLead.name.charAt(0)}</div>
              <div>
                <div style={{ fontWeight: 600, color: "#111111" }}>{selectedLead.name}</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(17,17,17,0.4)" }}>{selectedLead.company}</div>
              </div>
              <span style={{ marginLeft: "auto", padding: "3px 10px", borderRadius: 100, fontSize: "0.7rem", fontWeight: 700, color: STATUS_COLORS[selectedLead.status], background: `${STATUS_COLORS[selectedLead.status]}15`, border: `1px solid ${STATUS_COLORS[selectedLead.status]}25` }}>{selectedLead.status}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {[{ icon: MessageCircle, label: "Email", value: selectedLead.email }, { icon: Phone, label: "Phone", value: selectedLead.phone }].map(item => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "rgba(17,17,17,0.03)", borderRadius: 8 }}>
                  <item.icon size={14} color="rgba(220,38,38,0.7)" />
                  <div>
                    <div style={{ fontSize: "0.65rem", color: "rgba(17,17,17,0.35)", textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>{item.label}</div>
                    <div style={{ fontSize: "0.8rem", color: "#111111" }}>{item.value || "—"}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
              {[{ label: "Budget", value: selectedLead.budget }, { label: "Business Type", value: selectedLead.type }, { label: "Source", value: selectedLead.source }, { label: "Received", value: selectedLead.time }].map(item => (
                <div key={item.label} style={{ padding: "10px 12px", background: "rgba(17,17,17,0.03)", borderRadius: 8 }}>
                  <div style={{ fontSize: "0.65rem", color: "rgba(17,17,17,0.35)", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#111111" }}>{item.value || "—"}</div>
                </div>
              ))}
            </div>

            {selectedLead.notes && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: "0.7rem", color: "rgba(17,17,17,0.35)", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: 6 }}>Notes</div>
                <div style={{ fontSize: "0.85rem", color: "rgba(17,17,17,0.6)", padding: 12, background: "rgba(17,17,17,0.03)", borderRadius: 8, lineHeight: 1.6 }}>{selectedLead.notes}</div>
              </div>
            )}

            <div style={{ display: "flex", gap: 8 }}>
              {selectedLead.phone && (
                <a href={`https://wa.me/${selectedLead.phone.replace(/\s+/g, "")}`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ flex: 1, justifyContent: "center", fontSize: "0.8rem", padding: "10px" }}>
                  WhatsApp
                </a>
              )}
              {selectedLead.email && (
                <a href={`mailto:${selectedLead.email}`} className="btn-secondary" style={{ flex: 1, justifyContent: "center", fontSize: "0.8rem", padding: "10px" }}>
                  Email
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Lead Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: "#fff", border: "1px solid rgba(17,17,17,0.1)", borderRadius: 20, padding: 32, width: "100%", maxWidth: 520 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700 }}>Add New Lead</h2>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(17,17,17,0.5)", fontSize: "1.2rem" }}>✕</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><label className="label">Contact Name *</label><input className="input-field" placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                <div><label className="label">Company *</label><input className="input-field" placeholder="Brand name" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><label className="label">Email</label><input className="input-field" type="email" placeholder="email@brand.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                <div><label className="label">Phone</label><input className="input-field" placeholder="+91..." value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <div>
                  <label className="label">Type</label>
                  <select className="input-field" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    <option>Ecommerce</option><option>D2C Brand</option><option>Healthcare</option><option>Startup</option><option>Beauty</option><option>Fitness</option><option>Tech</option><option>Other</option>
                  </select>
                </div>
                <div><label className="label">Budget</label><input className="input-field" placeholder="₹1L/mo" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} /></div>
                <div>
                  <label className="label">Status</label>
                  <select className="input-field" value={form.status} onChange={e => setForm({ ...form, status: e.target.value as "Hot" | "Warm" | "New" })}>
                    <option value="New">New</option><option value="Warm">Warm</option><option value="Hot">Hot</option>
                  </select>
                </div>
              </div>
              <div><label className="label">Notes</label><textarea className="input-field" placeholder="Any additional notes..." rows={3} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ resize: "vertical" }} /></div>
              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                <button onClick={() => setShowModal(false)} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button className="btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={handleAdd}>Add Lead</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
