"use client";
import { useState, useEffect } from "react";
import { useCreators } from "@/lib/use-dashboard";
import { Camera, Video, CheckCircle, ArrowRight, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const CATEGORIES = ["All", "Lifestyle", "Fitness", "Fashion", "Technology", "Finance", "Food"];

const CATEGORY_COLORS: Record<string, string> = {
  Lifestyle: "#f59e0b", Fitness: "#22c55e", Fashion: "#ec4899",
  Technology: "#3b82f6", Finance: "#8b5cf6", Food: "#f97316",
};

export default function CreatorShowcase() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { creators } = useCreators();
  const [activeIndex, setActiveIndex] = useState(0);
  
  const filtered = activeCategory === "All"
    ? creators
    : creators.filter(c => c.category === activeCategory);

  // Reset index when category changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  // Auto-play carousel
  useEffect(() => {
    if (filtered.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex(current => (current + 1) % filtered.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [filtered.length]);

  const handlePrev = () => {
    setActiveIndex(current => (current - 1 + filtered.length) % filtered.length);
  };

  const handleNext = () => {
    setActiveIndex(current => (current + 1) % filtered.length);
  };

  const renderCardUI = (creator: any, isActive: boolean = true) => (
    <div className="creator-card" style={{ width: "100%", margin: 0, boxShadow: isActive ? "0 30px 60px rgba(220,38,38,0.15)" : "0 10px 30px rgba(0,0,0,0.1)", borderRadius: 16, overflow: "hidden" }}>
      {/* Header Image Area */}
      <div style={{
        height: 220,
        backgroundImage: creator.avatar 
          ? `linear-gradient(to top, rgba(17,17,17,0.95) 0%, rgba(17,17,17,0.2) 50%, rgba(17,17,17,0.1) 100%), url(${creator.avatar})`
          : `linear-gradient(135deg, ${CATEGORY_COLORS[creator.category] || "#dc2626"}60, rgba(0,0,0,0.8))`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative", display: "flex", alignItems: "flex-end", padding: "20px",
      }}>
        {/* Category Badge */}
        <span style={{
          position: "absolute", top: 16, right: 16, padding: "4px 12px", borderRadius: 100, fontSize: "0.65rem", fontWeight: 700,
          color: "#fff", background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.2)", letterSpacing: "0.08em", textTransform: "uppercase",
        }}>
          {creator.category}
        </span>
        
        {/* Title inside Image */}
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, color: "#ffffff", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>{creator.name}</span>
            {creator.verified && <CheckCircle size={16} color="#3b82f6" fill="#3b82f6" />}
          </div>
          <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>📍 {creator.location || "India"}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 20, background: "#fff" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16, padding: "12px", background: "rgba(17,17,17,0.03)", borderRadius: 10, border: "1px solid rgba(17,17,17,0.06)" }}>
          <div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111111", fontFamily: "var(--font-display)" }}>{creator.followers}</div>
            <div style={{ fontSize: "0.65rem", color: "rgba(17,17,17,0.4)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Followers</div>
          </div>
          <div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#22c55e", fontFamily: "var(--font-display)" }}>{creator.engagement}</div>
            <div style={{ fontSize: "0.65rem", color: "rgba(17,17,17,0.4)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Engagement</div>
          </div>
        </div>

        {/* Platforms */}
        <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
          {(creator.platforms || [creator.platform]).map((platform: string) => (
            <div key={platform} style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 100, background: "rgba(17,17,17,0.05)", border: "1px solid rgba(17,17,17,0.08)" }}>
              {platform === "Instagram" ? <Camera size={11} color="#e1306c" /> : <Video size={11} color="#ff0000" />}
              <span style={{ fontSize: "0.7rem", color: "rgba(17,17,17,0.5)", fontWeight: 500 }}>{platform}</span>
            </div>
          ))}
        </div>

        <button style={{
          width: "100%", padding: "10px", borderRadius: 8, background: isActive ? "#dc2626" : "rgba(220,38,38,0.1)", border: isActive ? "none" : "1px solid rgba(220,38,38,0.25)",
          color: isActive ? "#fff" : "#dc2626", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
          opacity: isActive ? 1 : 0.7,
        }}>
          View Profile
        </button>
      </div>
    </div>
  );

  return (
    <section className="section" id="creators" style={{ background: "rgba(17,17,17,0.02)", overflow: "hidden" }}>
      <style>{`
        @media (max-width: 768px) {
          .desktop-carousel { display: none !important; }
          .mobile-carousel { display: flex !important; }
        }
        @media (min-width: 769px) {
          .desktop-carousel { display: flex !important; }
          .mobile-carousel { display: none !important; }
        }
        .mobile-carousel::-webkit-scrollbar {
          display: none;
        }
      `}</style>
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
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 60 }}>
          <Filter size={16} color="rgba(17,17,17,0.4)" style={{ marginTop: 8 }} />
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{
                padding: "6px 16px", borderRadius: 100, fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
                border: "1px solid", borderColor: activeCategory === cat ? "rgba(220,38,38,0.5)" : "rgba(17,17,17,0.1)",
                background: activeCategory === cat ? "rgba(220,38,38,0.15)" : "transparent",
                color: activeCategory === cat ? "#111111" : "rgba(17,17,17,0.45)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <>
            {/* Desktop 3D Coverflow Carousel */}
            <div className="desktop-carousel" style={{
              position: "relative",
              height: 520,
              width: "100%",
              perspective: 1200,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 60,
            }}>
              {filtered.map((creator, index) => {
                let offset = (index - activeIndex) % filtered.length;
                if (offset > filtered.length / 2) offset -= filtered.length;
                if (offset < -filtered.length / 2) offset += filtered.length;
                
                const absOffset = Math.abs(offset);
                const isActive = absOffset === 0;
                const isVisible = absOffset <= 3;

                if (!isVisible && filtered.length > 5) return null;

                const scale = Math.max(1 - absOffset * 0.15, 0.5);
                const rotateY = offset * -20;
                const translateX = offset * 240;
                const translateZ = absOffset * -150;
                const opacity = Math.max(1 - absOffset * 0.25, 0);
                const zIndex = 100 - absOffset;

                return (
                  <div
                    key={creator.id}
                    onClick={() => setActiveIndex(index)}
                    style={{
                      position: "absolute", width: 320, zIndex, opacity,
                      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                      transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                      cursor: isActive ? "default" : "pointer", transformStyle: "preserve-3d",
                      pointerEvents: opacity > 0 ? "auto" : "none",
                    }}
                  >
                    {renderCardUI(creator, isActive)}
                  </div>
                );
              })}

              {/* Desktop Controls */}
              {filtered.length > 1 && (
                <div style={{ position: "absolute", bottom: -20, display: "flex", gap: 16, zIndex: 200 }}>
                  <button onClick={handlePrev} style={{
                    width: 44, height: 44, borderRadius: "50%", background: "#fff", border: "1px solid rgba(17,17,17,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#111", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", transition: "all 0.2s"
                  }} onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")} onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={handleNext} style={{
                    width: 44, height: 44, borderRadius: "50%", background: "#fff", border: "1px solid rgba(17,17,17,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#111", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", transition: "all 0.2s"
                  }} onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")} onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Horizontal Snap Carousel */}
            <div className="mobile-carousel" style={{
              overflowX: "auto", scrollSnapType: "x mandatory", gap: 16, padding: "10px 24px 40px", margin: "0 -24px", scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch"
            }}>
              {filtered.map((creator) => (
                <div key={`mob-${creator.id}`} style={{ scrollSnapAlign: "center", flexShrink: 0, width: "280px" }}>
                  {renderCardUI(creator, true)}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(17,17,17,0.4)" }}>
            No creators found in this category.
          </div>
        )}

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
