"use client";
import { useState } from "react";
import { CREATORS } from "@/lib/constants";
import { Camera, Video, CheckCircle, ArrowRight, Filter } from "lucide-react";
import Link from "next/link";

const CATEGORIES = ["All", "Lifestyle", "Fitness", "Fashion", "Technology", "Finance", "Food"];

const CATEGORY_COLORS: Record<string, string> = {
  Lifestyle: "#f59e0b",
  Fitness: "#22c55e",
  Fashion: "#ec4899",
  Technology: "#3b82f6",
  Finance: "#8b5cf6",
  Food: "#f97316",
};

export default function CreatorShowcase() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? CREATORS
    : CREATORS.filter(c => c.category === activeCategory);

  return (
    <section className="section" id="creators" style={{ background: "rgba(17,17,17,0.01)" }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 48 }}>
          <div>
            <div className="section-badge">Creator Network</div>
            <h2 className="section-title">
              500+ creators ready<br />
              <span className="text-gradient-red">to amplify your brand.</span>
            </h2>
            <p className="section-subtitle">
              Our vetted creator network spans every niche with verified engagement metrics and proven campaign ROI.
            </p>
          </div>
          <Link href="/creators" className="btn-secondary" style={{ flexShrink: 0 }}>
            View All Creators <ArrowRight size={16} />
          </Link>
        </div>

        {/* Category Filter */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
          <Filter size={16} color="rgba(17,17,17,0.4)" style={{ marginTop: 8 }} />
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "6px 16px",
                borderRadius: 100,
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                border: "1px solid",
                borderColor: activeCategory === cat ? "rgba(220,38,38,0.5)" : "rgba(17,17,17,0.1)",
                background: activeCategory === cat ? "rgba(220,38,38,0.15)" : "transparent",
                color: activeCategory === cat ? "#111111" : "rgba(17,17,17,0.45)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Creator Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
          marginBottom: 48,
        }}>
          {filtered.map((creator) => (
            <div key={creator.id} className="creator-card">
              {/* Header Image Area */}
              <div style={{
                height: 140,
                background: `linear-gradient(135deg, ${CATEGORY_COLORS[creator.category] || "#dc2626"}20, rgba(0,0,0,0.6))`,
                position: "relative",
                display: "flex",
                alignItems: "flex-end",
                padding: "16px",
              }}>
                {/* Category Badge */}
                <span style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  padding: "3px 10px",
                  borderRadius: 100,
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  color: CATEGORY_COLORS[creator.category] || "#dc2626",
                  background: `${CATEGORY_COLORS[creator.category] || "#dc2626"}20`,
                  border: `1px solid ${CATEGORY_COLORS[creator.category] || "#dc2626"}30`,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}>
                  {creator.category}
                </span>

                {/* Avatar placeholder */}
                <div style={{
                  width: 56, height: 56,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${CATEGORY_COLORS[creator.category] || "#dc2626"}, rgba(0,0,0,0.5))`,
                  border: "2px solid rgba(17,17,17,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.4rem",
                  flexShrink: 0,
                }}>
                  {creator.name.charAt(0)}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "#111111" }}>
                        {creator.name}
                      </span>
                      {creator.verified && (
                        <CheckCircle size={14} color="#3b82f6" fill="#3b82f6" />
                      )}
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "rgba(17,17,17,0.4)" }}>
                      📍 {creator.location}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  marginBottom: 16,
                  padding: "12px",
                  background: "rgba(17,17,17,0.03)",
                  borderRadius: 10,
                  border: "1px solid rgba(17,17,17,0.06)",
                }}>
                  <div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111111", fontFamily: "var(--font-display)" }}>
                      {creator.followers}
                    </div>
                    <div style={{ fontSize: "0.65rem", color: "rgba(17,17,17,0.4)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      Followers
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#22c55e", fontFamily: "var(--font-display)" }}>
                      {creator.engagement}
                    </div>
                    <div style={{ fontSize: "0.65rem", color: "rgba(17,17,17,0.4)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      Engagement
                    </div>
                  </div>
                </div>

                {/* Platforms */}
                <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                  {creator.platforms.map(platform => (
                    <div key={platform} style={{
                      display: "flex", alignItems: "center", gap: 4,
                      padding: "4px 10px",
                      borderRadius: 100,
                      background: "rgba(17,17,17,0.05)",
                      border: "1px solid rgba(17,17,17,0.08)",
                    }}>
                      {platform === "Instagram" ? <Camera size={11} color="#e1306c" /> : <Video size={11} color="#ff0000" />}
                      <span style={{ fontSize: "0.7rem", color: "rgba(17,17,17,0.5)", fontWeight: 500 }}>{platform}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button style={{
                  width: "100%",
                  padding: "9px",
                  borderRadius: 8,
                  background: "rgba(220,38,38,0.1)",
                  border: "1px solid rgba(220,38,38,0.25)",
                  color: "#f87171",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(220,38,38,0.2)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(220,38,38,0.4)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(220,38,38,0.1)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(220,38,38,0.25)";
                  }}
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Join CTA */}
        <div style={{
          textAlign: "center",
          padding: "40px",
          background: "rgba(220,38,38,0.05)",
          border: "1px solid rgba(220,38,38,0.15)",
          borderRadius: 20,
        }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, marginBottom: 8 }}>
            Are you a creator?
          </h3>
          <p style={{ color: "rgba(17,17,17,0.55)", marginBottom: 20, fontSize: "0.95rem" }}>
            Join our network and connect with premium brands. Get exclusive campaign access, fair compensation, and full support.
          </p>
          <Link href="/creators/join" className="btn-primary">
            Apply to Join <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
