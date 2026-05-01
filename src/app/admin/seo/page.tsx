"use client";
import { useState } from "react";
import { Plus, Search, Edit, Trash2, Eye, Globe, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";

const SEO_PAGES = [
  { id: 1, page: "Homepage", url: "/", title: "TCC — The Creator Connect | Influencer Marketing Agency", description: "India's premium influencer marketing agency...", score: 94, indexed: true },
  { id: 2, page: "Services", url: "/services", title: "Creator Marketing Services | TCC", description: "Full-service creator marketing from UGC to influencer campaigns...", score: 88, indexed: true },
  { id: 3, page: "About", url: "/about", title: "About TCC — The Creator Connect", description: "Learn about TCC's mission, team, and approach...", score: 76, indexed: true },
  { id: 4, page: "Blog", url: "/blog", title: "Creator Marketing Blog | TCC", description: "Industry insights, trends, and strategies...", score: 82, indexed: true },
  { id: 5, page: "Pricing", url: "/pricing", title: "Influencer Marketing Pricing | TCC", description: "Transparent pricing for all business sizes...", score: 71, indexed: false },
  { id: 6, page: "Contact", url: "/contact", title: "Contact TCC — Book a Strategy Call", description: "Get in touch to scale your brand with creator marketing...", score: 65, indexed: true },
];

export default function AdminSEO() {
  const [editing, setEditing] = useState<number | null>(null);
  const [pages, setPages] = useState(SEO_PAGES);
  const [editForm, setEditForm] = useState({ title: "", description: "" });

  const scoreColor = (s: number) => s >= 90 ? "#22c55e" : s >= 75 ? "#f59e0b" : "#f87171";

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 800, marginBottom: 4 }}>SEO Manager</h1>
          <p style={{ color: "rgba(17,17,17,0.4)", fontSize: "0.875rem" }}>Control all page metadata, sitemaps, and technical SEO</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-secondary" style={{ gap: 6, padding: "10px 16px", fontSize: "0.85rem" }}>
            <RefreshCw size={14} /> Regenerate Sitemap
          </button>
          <button className="btn-primary" style={{ fontSize: "0.85rem" }}>
            <Plus size={14} /> Add Page
          </button>
        </div>
      </div>

      {/* SEO Score Overview */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Avg. SEO Score", value: "79/100", color: "#f59e0b" },
          { label: "Pages Indexed", value: `${pages.filter(p => p.indexed).length}/${pages.length}`, color: "#22c55e" },
          { label: "Schema Markup", value: "Active", color: "#22c55e" },
          { label: "Sitemap Status", value: "Live", color: "#3b82f6" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: "0.8rem", color: "rgba(17,17,17,0.5)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Pages Table */}
      <div className="dashboard-card" style={{ padding: 0, overflow: "hidden", marginBottom: 24 }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(17,17,17,0.06)" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 700 }}>Page SEO Settings</h3>
        </div>
        <table className="data-table" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ paddingLeft: 24 }}>Page</th>
              <th>Meta Title</th>
              <th>SEO Score</th>
              <th>Indexed</th>
              <th style={{ paddingRight: 24 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map(p => (
              <tr key={p.id}>
                <td style={{ paddingLeft: 24 }}>
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111111" }}>{p.page}</div>
                    <div style={{ fontSize: "0.7rem", color: "rgba(17,17,17,0.35)", fontFamily: "monospace" }}>{p.url}</div>
                  </div>
                </td>
                <td style={{ maxWidth: 280 }}>
                  <div style={{ fontSize: "0.8rem", color: "rgba(17,17,17,0.7)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(17,17,17,0.35)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {p.description}
                  </div>
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ flex: 1, height: 4, background: "rgba(17,17,17,0.06)", borderRadius: 2, maxWidth: 80 }}>
                      <div style={{ height: "100%", width: `${p.score}%`, background: scoreColor(p.score), borderRadius: 2 }} />
                    </div>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: scoreColor(p.score) }}>{p.score}</span>
                  </div>
                </td>
                <td>
                  {p.indexed
                    ? <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#4ade80", fontSize: "0.8rem" }}><CheckCircle size={12} /> Indexed</span>
                    : <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#f87171", fontSize: "0.8rem" }}><AlertCircle size={12} /> Not Indexed</span>
                  }
                </td>
                <td style={{ paddingRight: 24 }}>
                  <button
                    onClick={() => { setEditing(p.id); setEditForm({ title: p.title, description: p.description }); }}
                    style={{ padding: "5px 12px", borderRadius: 6, background: "rgba(17,17,17,0.05)", border: "1px solid rgba(17,17,17,0.08)", cursor: "pointer", color: "rgba(17,17,17,0.6)", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: 4 }}>
                    <Edit size={12} /> Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Global SEO Settings */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div className="dashboard-card">
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 700, marginBottom: 16 }}>robots.txt</h3>
          <textarea
            style={{
              width: "100%",
              padding: 14,
              background: "rgba(0,0,0,0.4)",
              border: "1px solid rgba(17,17,17,0.08)",
              borderRadius: 10,
              color: "#4ade80",
              fontSize: "0.8rem",
              fontFamily: "monospace",
              lineHeight: 1.6,
              resize: "vertical",
              minHeight: 140,
            }}
            defaultValue={`User-agent: *\nAllow: /\n\nSitemap: https://thecreatorconnect.com/sitemap.xml`}
          />
          <button className="btn-primary" style={{ marginTop: 12, fontSize: "0.8rem", padding: "9px 16px" }}>Save Changes</button>
        </div>
        <div className="dashboard-card">
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 700, marginBottom: 16 }}>Open Graph Defaults</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div><label className="label">Default OG Title</label><input className="input-field" defaultValue="TCC — The Creator Connect" /></div>
            <div><label className="label">Default OG Description</label><textarea className="input-field" rows={2} defaultValue="India's premium influencer marketing agency. Scale your brand with creator-led campaigns." style={{ resize: "none" }} /></div>
            <div><label className="label">OG Image URL</label><input className="input-field" defaultValue="/og-image.jpg" /></div>
            <button className="btn-primary" style={{ fontSize: "0.8rem", padding: "9px 16px" }}>Save OG Settings</button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: "var(--charcoal)", border: "1px solid var(--charcoal-border)", borderRadius: 20, padding: 32, width: "100%", maxWidth: 560 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700 }}>Edit SEO — {pages.find(p => p.id === editing)?.page}</h2>
              <button onClick={() => setEditing(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(17,17,17,0.5)" }}>✕</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label className="label">Meta Title <span style={{ color: "rgba(17,17,17,0.3)", fontSize: "0.7rem" }}>({editForm.title.length}/60)</span></label>
                <input className="input-field" value={editForm.title} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div>
                <label className="label">Meta Description <span style={{ color: "rgba(17,17,17,0.3)", fontSize: "0.7rem" }}>({editForm.description.length}/160)</span></label>
                <textarea className="input-field" rows={3} value={editForm.description} onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))} style={{ resize: "vertical" }} />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setEditing(null)} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button className="btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={() => {
                  setPages(ps => ps.map(p => p.id === editing ? { ...p, title: editForm.title, description: editForm.description } : p));
                  setEditing(null);
                }}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
