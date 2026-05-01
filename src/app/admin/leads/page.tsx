"use client";
import { useState } from "react";
import { Plus, Search, Eye, MessageCircle, Phone, Clock } from "lucide-react";

const LEADS = [
  { id: 1, name: "Priya Sharma", company: "LuxeBeauty", email: "priya@luxebeauty.com", phone: "+91 98765 43210", type: "Ecommerce", budget: "₹1.5L/mo", status: "Hot", source: "Contact Form", time: "2m ago", notes: "Very interested in Growth plan, wants to start ASAP." },
  { id: 2, name: "Arjun Seth", company: "FitGlow Nutrition", email: "arjun@fitglow.in", phone: "+91 87654 32109", type: "D2C Brand", budget: "₹75K/mo", status: "Warm", source: "WhatsApp", time: "18m ago", notes: "Looking for UGC production and Instagram growth." },
  { id: 3, name: "Dr. Kavya Nair", company: "Nair Wellness Clinic", email: "kavya@nairwellness.com", phone: "+91 76543 21098", type: "Healthcare", budget: "₹50K/mo", status: "New", source: "Google Ads", time: "1h ago", notes: "" },
  { id: 4, name: "Rohit Agarwal", company: "TechStartup Pro", email: "rohit@techstartup.io", phone: "+91 65432 10987", type: "Startup", budget: "₹2L/mo", status: "Hot", source: "Instagram DM", time: "2h ago", notes: "Enterprise inquiry, needs full campaign management." },
  { id: 5, name: "Sneha Kumar", company: "LuxeCosmetics", email: "sneha@luxecosmetics.com", phone: "+91 54321 09876", type: "Beauty", budget: "₹1L/mo", status: "Warm", source: "Referral", time: "3h ago", notes: "Referred by FitCore India. High intent." },
];

const STATUS_COLORS: Record<string, string> = { Hot: "#dc2626", Warm: "#f59e0b", New: "#3b82f6", Closed: "#22c55e" };
const STATUSES = ["All", "Hot", "Warm", "New"];

export default function AdminLeads() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = LEADS.filter(l =>
    (statusFilter === "All" || l.status === statusFilter) &&
    (l.name.toLowerCase().includes(search.toLowerCase()) || l.company.toLowerCase().includes(search.toLowerCase()))
  );

  const selectedLead = LEADS.find(l => l.id === selected);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 800, marginBottom: 4 }}>Lead Management</h1>
          <p style={{ color: "rgba(17,17,17,0.4)", fontSize: "0.875rem" }}>{LEADS.filter(l => l.status === "Hot").length} hot leads · {LEADS.length} total</p>
        </div>
        <button className="btn-primary"><Plus size={16} /> Add Lead</button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Leads", value: "47", color: "#3b82f6" },
          { label: "Hot Leads", value: "12", color: "#dc2626" },
          { label: "Warm Leads", value: "19", color: "#f59e0b" },
          { label: "Conversion Rate", value: "24%", color: "#22c55e" },
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
                  <th>Time</th>
                  <th style={{ paddingRight: 20 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(lead => (
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
                    <td style={{ fontSize: "0.75rem", display: "flex", alignItems: "center", gap: 4 }}><Clock size={10} />{lead.time}</td>
                    <td style={{ paddingRight: 20 }}>
                      <button style={{ padding: "5px 12px", borderRadius: 6, background: "rgba(17,17,17,0.05)", border: "1px solid rgba(17,17,17,0.08)", cursor: "pointer", color: "rgba(17,17,17,0.6)", fontSize: "0.75rem" }}>
                        View
                      </button>
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
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#dc2626,#7f1d1d)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "1rem" }}>{selectedLead.name.charAt(0)}</div>
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
                    <div style={{ fontSize: "0.8rem", color: "#111111" }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
              {[{ label: "Budget", value: selectedLead.budget }, { label: "Business Type", value: selectedLead.type }, { label: "Source", value: selectedLead.source }, { label: "Received", value: selectedLead.time }].map(item => (
                <div key={item.label} style={{ padding: "10px 12px", background: "rgba(17,17,17,0.03)", borderRadius: 8 }}>
                  <div style={{ fontSize: "0.65rem", color: "rgba(17,17,17,0.35)", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#111111" }}>{item.value}</div>
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
              <a href={`https://wa.me/${selectedLead.phone.replace(/\s+/g, "")}`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ flex: 1, justifyContent: "center", fontSize: "0.8rem", padding: "10px" }}>
                WhatsApp
              </a>
              <a href={`mailto:${selectedLead.email}`} className="btn-secondary" style={{ flex: 1, justifyContent: "center", fontSize: "0.8rem", padding: "10px" }}>
                Email
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
