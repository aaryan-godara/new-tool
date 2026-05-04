"use client";
import { useCreators } from "@/lib/use-dashboard";
import { CheckCircle, Camera, Video } from "lucide-react";

const CATEGORY_COLORS: Record<string, string> = {
  Lifestyle: "#f59e0b", Fitness: "#22c55e", Fashion: "#ec4899",
  Technology: "#3b82f6", Finance: "#8b5cf6", Food: "#f97316",
};

export default function CreatorGridClient() {
  const { creators } = useCreators();

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
      {creators.map(creator => (
        <div key={creator.id} className="creator-card">
          <div style={{
            height: 220,
            backgroundImage: creator.avatar 
              ? `linear-gradient(to top, rgba(17,17,17,0.95) 0%, rgba(17,17,17,0.2) 50%, rgba(17,17,17,0.1) 100%), url(${creator.avatar})`
              : `linear-gradient(135deg, ${CATEGORY_COLORS[creator.category] || "#dc2626"}60, rgba(0,0,0,0.8))`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative", display: "flex", alignItems: "flex-end", padding: "20px",
            borderTopLeftRadius: "16px", borderTopRightRadius: "16px",
          }}>
            <span style={{
              position: "absolute", top: 16, right: 16, padding: "4px 12px", borderRadius: 100,
              fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em",
              color: "#fff",
              background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}>{creator.category}</span>
            
            <div style={{ width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, color: "#ffffff", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>{creator.name}</span>
                {creator.verified && <CheckCircle size={16} color="#3b82f6" fill="#3b82f6" />}
              </div>
              <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>📍 {creator.location || "India"}</span>
            </div>
          </div>
          <div style={{ padding: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14, padding: 12, background: "rgba(17,17,17,0.03)", borderRadius: 10, border: "1px solid rgba(17,17,17,0.06)" }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "#111111" }}>{creator.followers}</div>
                <div style={{ fontSize: "0.6rem", color: "rgba(17,17,17,0.4)", textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>Followers</div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "#22c55e" }}>{creator.engagement}</div>
                <div style={{ fontSize: "0.6rem", color: "rgba(17,17,17,0.4)", textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>Engagement</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {(creator.platforms || [creator.platform]).map(p => (
                <div key={p} style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 100, background: "rgba(17,17,17,0.05)", border: "1px solid rgba(17,17,17,0.08)" }}>
                  {p === "Instagram" ? <Camera size={11} color="#e1306c" /> : <Video size={11} color="#ff0000" />}
                  <span style={{ fontSize: "0.7rem", color: "rgba(17,17,17,0.5)" }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
