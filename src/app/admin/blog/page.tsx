"use client";
import { useState } from "react";
import { Plus, Search, Edit, Trash2, Eye, Tag, Clock } from "lucide-react";
import Link from "next/link";

const POSTS = [
  { id: 1, title: "10 Influencer Marketing Trends Dominating 2024", category: "Trends", status: "Published", views: 4820, date: "Apr 28, 2024", readTime: "8 min" },
  { id: 2, title: "How UGC Production Drives 5x ROAS for Ecommerce Brands", category: "Strategy", status: "Published", views: 3640, date: "Apr 22, 2024", readTime: "6 min" },
  { id: 3, title: "The Complete Guide to Creator Campaigns in India", category: "Guide", status: "Published", views: 6120, date: "Apr 15, 2024", readTime: "12 min" },
  { id: 4, title: "Instagram Algorithm 2024: What Brands Need to Know", category: "Platform", status: "Draft", views: 0, date: "May 1, 2024", readTime: "7 min" },
  { id: 5, title: "Building an AI Content System for Your Brand", category: "Technology", status: "Draft", views: 0, date: "May 3, 2024", readTime: "10 min" },
];

const CATEGORIES = ["All", "Trends", "Strategy", "Guide", "Platform", "Technology"];

export default function AdminBlog() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [showNew, setShowNew] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", category: "", content: "", status: "Draft" });

  const filtered = POSTS.filter(p =>
    (cat === "All" || p.category === cat) &&
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 800, marginBottom: 4 }}>Blog CMS</h1>
          <p style={{ color: "rgba(17,17,17,0.4)", fontSize: "0.875rem" }}>{POSTS.filter(p => p.status === "Published").length} published · {POSTS.filter(p => p.status === "Draft").length} drafts</p>
        </div>
        <button onClick={() => setShowNew(true)} className="btn-primary">
          <Plus size={16} /> New Post
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "10px 14px",
          background: "rgba(17,17,17,0.04)",
          border: "1px solid rgba(17,17,17,0.07)",
          borderRadius: 10, flex: 1, maxWidth: 360,
        }}>
          <Search size={14} color="rgba(17,17,17,0.3)" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts..."
            style={{ background: "none", border: "none", outline: "none", color: "#111111", fontSize: "0.875rem", flex: 1 }} />
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              padding: "8px 14px", borderRadius: 100, fontSize: "0.78rem", fontWeight: 600, cursor: "pointer",
              border: "1px solid",
              borderColor: cat === c ? "rgba(220,38,38,0.5)" : "rgba(17,17,17,0.1)",
              background: cat === c ? "rgba(220,38,38,0.15)" : "transparent",
              color: cat === c ? "#111111" : "rgba(17,17,17,0.45)",
              transition: "all 0.15s",
            }}>{c}</button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div style={{ display: "grid", gap: 12 }}>
        {filtered.map(post => (
          <div key={post.id} className="dashboard-card" style={{ padding: "18px 20px", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{
                  padding: "2px 8px", borderRadius: 100, fontSize: "0.65rem", fontWeight: 700,
                  color: post.status === "Published" ? "#4ade80" : "#f59e0b",
                  background: post.status === "Published" ? "rgba(34,197,94,0.1)" : "rgba(245,158,11,0.1)",
                  border: `1px solid ${post.status === "Published" ? "rgba(34,197,94,0.2)" : "rgba(245,158,11,0.2)"}`,
                }}>
                  {post.status}
                </span>
                <span className="badge badge-red">{post.category}</span>
              </div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#111111", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {post.title}
              </h3>
              <div style={{ display: "flex", gap: 16, fontSize: "0.75rem", color: "rgba(17,17,17,0.35)" }}>
                <span>{post.date}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Clock size={10} /> {post.readTime} read</span>
                {post.views > 0 && <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Eye size={10} /> {post.views.toLocaleString()} views</span>}
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
              <button style={{ padding: "6px 12px", borderRadius: 6, background: "rgba(17,17,17,0.05)", border: "1px solid rgba(17,17,17,0.08)", cursor: "pointer", color: "rgba(17,17,17,0.6)", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: 4 }}>
                <Edit size={12} /> Edit
              </button>
              {post.status === "Draft" && (
                <button style={{ padding: "6px 12px", borderRadius: 6, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", cursor: "pointer", color: "#4ade80", fontSize: "0.75rem" }}>
                  Publish
                </button>
              )}
              <button style={{ padding: 6, borderRadius: 6, background: "rgba(220,38,38,0.1)", border: "none", cursor: "pointer", color: "#f87171" }}>
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Post Modal */}
      {showNew && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: "var(--charcoal)", border: "1px solid var(--charcoal-border)", borderRadius: 20, padding: 32, width: "100%", maxWidth: 640 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700 }}>New Blog Post</h2>
              <button onClick={() => setShowNew(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(17,17,17,0.5)" }}>✕</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div><label className="label">Post Title</label><input className="input-field" placeholder="Enter compelling title..." value={newPost.title} onChange={e => setNewPost(p => ({ ...p, title: e.target.value }))} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label className="label">Category</label>
                  <select className="input-field" value={newPost.category} onChange={e => setNewPost(p => ({ ...p, category: e.target.value }))}>
                    <option value="">Select category...</option>
                    {["Trends", "Strategy", "Guide", "Platform", "Technology"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Status</label>
                  <select className="input-field" value={newPost.status} onChange={e => setNewPost(p => ({ ...p, status: e.target.value }))}>
                    <option>Draft</option><option>Published</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="label">Content (Markdown)</label>
                <textarea className="input-field" rows={8} placeholder="Write your blog post content here..." value={newPost.content} onChange={e => setNewPost(p => ({ ...p, content: e.target.value }))} style={{ resize: "vertical", fontFamily: "monospace", fontSize: "0.85rem" }} />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setShowNew(false)} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button className="btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={() => setShowNew(false)}>Save Post</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
