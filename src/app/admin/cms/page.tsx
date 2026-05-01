"use client";
import { useState } from "react";
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight } from "lucide-react";

const INITIAL_CONTENT = {
  hero: { heading: "WHERE BRANDS MEET INFLUENCE.", subheading: "TCC helps brands scale through creator-led marketing powered by AI systems, analytics, and performance-driven campaigns.", ctaText: "Book a Strategy Call" },
  about: { tagline: "India's #1 Creator Marketing Platform", stats: [{ label: "Creators Network", value: "500+" }, { label: "Revenue Generated", value: "₹50Cr+" }, { label: "Brand Campaigns", value: "200+" }, { label: "Client Retention", value: "98%" }] },
  footer: { email: "hello@thecreatorconnect.com", phone: "+91 98765 43210", address: "Mumbai, Maharashtra, India" },
};

export default function AdminCMS() {
  const [activeTab, setActiveTab] = useState<"hero" | "about" | "footer">("hero");
  const [content, setContent] = useState(INITIAL_CONTENT);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 800, marginBottom: 4 }}>Website CMS</h1>
          <p style={{ color: "rgba(17,17,17,0.4)", fontSize: "0.875rem" }}>Edit all website content without touching code</p>
        </div>
        <button onClick={handleSave} className="btn-primary" style={{ gap: 8 }}>
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24, padding: 4, background: "rgba(17,17,17,0.03)", borderRadius: 12, width: "fit-content", border: "1px solid rgba(17,17,17,0.06)" }}>
        {(["hero", "about", "footer"] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: "8px 20px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600, transition: "all 0.2s", textTransform: "capitalize",
            background: activeTab === tab ? "rgba(220,38,38,0.2)" : "transparent",
            color: activeTab === tab ? "#111111" : "rgba(17,17,17,0.45)",
            borderWidth: activeTab === tab ? 1 : 0,
            borderStyle: "solid",
            borderColor: activeTab === tab ? "rgba(220,38,38,0.3)" : "transparent",
          }}>{tab.charAt(0).toUpperCase() + tab.slice(1)} Section</button>
        ))}
      </div>

      {/* Hero Tab */}
      {activeTab === "hero" && (
        <div className="dashboard-card" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700 }}>Hero Section</h3>
          <div>
            <label className="label">Main Heading</label>
            <input className="input-field" value={content.hero.heading}
              onChange={e => setContent(c => ({ ...c, hero: { ...c.hero, heading: e.target.value } }))} />
            <div style={{ fontSize: "0.7rem", color: "rgba(17,17,17,0.3)", marginTop: 4 }}>This is the large hero headline displayed above the fold.</div>
          </div>
          <div>
            <label className="label">Subheading</label>
            <textarea className="input-field" rows={3} value={content.hero.subheading}
              onChange={e => setContent(c => ({ ...c, hero: { ...c.hero, subheading: e.target.value } }))}
              style={{ resize: "vertical" }} />
          </div>
          <div>
            <label className="label">Primary CTA Button Text</label>
            <input className="input-field" value={content.hero.ctaText}
              onChange={e => setContent(c => ({ ...c, hero: { ...c.hero, ctaText: e.target.value } }))} />
          </div>
          <div style={{ padding: 20, background: "rgba(17,17,17,0.02)", border: "1px solid rgba(17,17,17,0.06)", borderRadius: 12 }}>
            <div style={{ fontSize: "0.75rem", color: "rgba(17,17,17,0.4)", marginBottom: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Preview</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 800, color: "#111111", marginBottom: 8 }}>{content.hero.heading}</div>
            <div style={{ fontSize: "0.875rem", color: "rgba(17,17,17,0.55)", marginBottom: 16 }}>{content.hero.subheading}</div>
            <div className="btn-primary" style={{ display: "inline-flex", padding: "8px 16px", fontSize: "0.8rem" }}>{content.hero.ctaText}</div>
          </div>
        </div>
      )}

      {/* About Tab */}
      {activeTab === "about" && (
        <div className="dashboard-card" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700 }}>About / Stats Section</h3>
          <div>
            <label className="label">Brand Tagline</label>
            <input className="input-field" value={content.about.tagline}
              onChange={e => setContent(c => ({ ...c, about: { ...c.about, tagline: e.target.value } }))} />
          </div>
          <div>
            <label className="label" style={{ marginBottom: 12 }}>Statistics</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {content.about.stats.map((stat, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 10, alignItems: "center" }}>
                  <input className="input-field" placeholder="Label" value={stat.label}
                    onChange={e => setContent(c => ({ ...c, about: { ...c.about, stats: c.about.stats.map((s, j) => j === i ? { ...s, label: e.target.value } : s) } }))} />
                  <input className="input-field" placeholder="Value" value={stat.value}
                    onChange={e => setContent(c => ({ ...c, about: { ...c.about, stats: c.about.stats.map((s, j) => j === i ? { ...s, value: e.target.value } : s) } }))} />
                  <button style={{ padding: 8, borderRadius: 8, background: "rgba(220,38,38,0.1)", border: "none", cursor: "pointer", color: "#f87171" }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button onClick={() => setContent(c => ({ ...c, about: { ...c.about, stats: [...c.about.stats, { label: "", value: "" }] } }))}
                className="btn-ghost" style={{ alignSelf: "flex-start", gap: 6, fontSize: "0.8rem" }}>
                <Plus size={14} /> Add Stat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Tab */}
      {activeTab === "footer" && (
        <div className="dashboard-card" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700 }}>Footer Content</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div><label className="label">Contact Email</label><input className="input-field" value={content.footer.email} onChange={e => setContent(c => ({ ...c, footer: { ...c.footer, email: e.target.value } }))} /></div>
            <div><label className="label">Phone Number</label><input className="input-field" value={content.footer.phone} onChange={e => setContent(c => ({ ...c, footer: { ...c.footer, phone: e.target.value } }))} /></div>
          </div>
          <div><label className="label">Office Address</label><input className="input-field" value={content.footer.address} onChange={e => setContent(c => ({ ...c, footer: { ...c.footer, address: e.target.value } }))} /></div>

          <div>
            <label className="label" style={{ marginBottom: 12 }}>Page Visibility</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[{ label: "Show Pricing Section", enabled: true }, { label: "Show Testimonials", enabled: true }, { label: "Show Blog on Homepage", enabled: false }, { label: "Show WhatsApp Widget", enabled: true }].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "rgba(17,17,17,0.03)", borderRadius: 10, border: "1px solid rgba(17,17,17,0.06)" }}>
                  <span style={{ fontSize: "0.875rem", color: "rgba(17,17,17,0.7)" }}>{item.label}</span>
                  <div style={{ color: item.enabled ? "#4ade80" : "rgba(17,17,17,0.3)", cursor: "pointer" }}>
                    {item.enabled ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
