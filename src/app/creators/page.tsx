import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { CREATORS } from "@/lib/constants";
import { ArrowRight, CheckCircle, Camera, Video } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creator Network — 500+ Verified Creators",
  description: "Browse TCC's vetted creator network across lifestyle, fitness, fashion, tech, and more.",
};

const CATEGORY_COLORS: Record<string, string> = {
  Lifestyle: "#f59e0b", Fitness: "#22c55e", Fashion: "#ec4899",
  Technology: "#3b82f6", Finance: "#8b5cf6", Food: "#f97316",
};

export default function CreatorsPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "var(--nav-height)" }}>
        <section style={{ padding: "80px 0 60px", textAlign: "center", background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(220,38,38,0.15), transparent)" }}>
          <div className="container">
            <div className="section-badge" style={{ margin: "0 auto 20px" }}>Creator Network</div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>
              500+ verified creators.<br /><span className="text-gradient-red">Every niche covered.</span>
            </h1>
            <p style={{ color: "rgba(17,17,17,0.55)", maxWidth: 540, margin: "0 auto 32px" }}>
              Our creator network is the most carefully vetted in India — every creator is verified for authentic engagement and brand alignment.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              <Link href="/creators/join" className="btn-primary">Join as Creator <ArrowRight size={16} /></Link>
              <Link href="/contact" className="btn-secondary">Partner with TCC</Link>
            </div>
          </div>
        </section>

        <section style={{ padding: "40px 0 120px" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
              {CREATORS.map(creator => (
                <div key={creator.id} className="creator-card">
                  <div style={{
                    height: 120,
                    background: `linear-gradient(135deg, ${CATEGORY_COLORS[creator.category] || "#dc2626"}25, rgba(0,0,0,0.5))`,
                    display: "flex", alignItems: "flex-end", padding: 16, position: "relative",
                  }}>
                    <span style={{
                      position: "absolute", top: 12, right: 12, padding: "3px 10px", borderRadius: 100,
                      fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em",
                      color: CATEGORY_COLORS[creator.category] || "#f87171",
                      background: `${CATEGORY_COLORS[creator.category] || "#dc2626"}20`,
                      border: `1px solid ${CATEGORY_COLORS[creator.category] || "#dc2626"}30`,
                    }}>{creator.category}</span>
                    <div style={{
                      width: 56, height: 56, borderRadius: "50%",
                      background: `linear-gradient(135deg, ${CATEGORY_COLORS[creator.category] || "#dc2626"}, #fff)`,
                      border: "2px solid rgba(17,17,17,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.4rem", fontWeight: 700,
                    }}>{creator.name.charAt(0)}</div>
                  </div>
                  <div style={{ padding: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "#111111" }}>{creator.name}</span>
                      {creator.verified && <CheckCircle size={14} color="#3b82f6" fill="#3b82f6" />}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "rgba(17,17,17,0.4)", marginBottom: 14 }}>📍 {creator.location}</div>
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
                    <div style={{ display: "flex", gap: 6 }}>
                      {creator.platforms.map(p => (
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
