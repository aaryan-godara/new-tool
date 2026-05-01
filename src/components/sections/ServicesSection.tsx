"use client";
import { useState } from "react";
import { SERVICES } from "@/lib/constants";
import { Users, Zap, Video, TrendingUp, Brain, Handshake, Target, Star, BarChart3, Layers, ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";

const ICON_MAP: Record<string, LucideIcon> = {
  Users, Zap, Video, TrendingUp, Brain, Handshake, Target, Star, BarChart3, Layers,
};

export default function ServicesSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="section" id="services">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="section-badge" style={{ margin: "0 auto 20px" }}>Our Services</div>
          <h2 className="section-title">
            Everything you need to<br />
            <span className="text-gradient-red">dominate your niche.</span>
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            From nano-influencer campaigns to enterprise creator ecosystems — TCC handles it all with precision and intelligence.
          </p>
        </div>

        {/* Services Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 20,
          marginBottom: 48,
        }}>
          {SERVICES.map((service) => {
            const Icon = ICON_MAP[service.icon] || Zap;
            const isHovered = hovered === service.id;

            return (
              <div
                key={service.id}
                className="card-service"
                onMouseEnter={() => setHovered(service.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Glow blob */}
                <div style={{
                  position: "absolute",
                  top: -20,
                  right: -20,
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(220,38,38,0.15), transparent 70%)",
                  opacity: isHovered ? 1 : 0,
                  transition: "opacity 0.4s",
                  pointerEvents: "none",
                }} />

                {/* Icon */}
                <div style={{
                  width: 52, height: 52,
                  borderRadius: 12,
                  background: isHovered ? "rgba(220,38,38,0.2)" : "rgba(220,38,38,0.08)",
                  border: `1px solid ${isHovered ? "rgba(220,38,38,0.4)" : "rgba(220,38,38,0.15)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 20,
                  transition: "all 0.3s",
                  boxShadow: isHovered ? "0 0 20px rgba(220,38,38,0.3)" : "none",
                }}>
                  <Icon size={22} color="#dc2626" />
                </div>

                {/* Content */}
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#111111",
                  marginBottom: 10,
                }}>
                  {service.title}
                </h3>
                <p style={{
                  fontSize: "0.875rem",
                  color: "rgba(17,17,17,0.55)",
                  lineHeight: 1.7,
                  marginBottom: 20,
                }}>
                  {service.description}
                </p>

                {/* Feature Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                  {service.features.map(f => (
                    <span key={f} style={{
                      padding: "3px 10px",
                      borderRadius: 100,
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      color: "rgba(17,17,17,0.5)",
                      background: "rgba(17,17,17,0.05)",
                      border: "1px solid rgba(17,17,17,0.08)",
                    }}>
                      {f}
                    </span>
                  ))}
                </div>

                {/* CTA Arrow */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: isHovered ? "#f87171" : "rgba(17,17,17,0.3)",
                  transition: "all 0.3s",
                }}>
                  Learn more
                  <ArrowRight size={14} style={{
                    transform: isHovered ? "translateX(4px)" : "none",
                    transition: "transform 0.3s",
                  }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center" }}>
          <Link href="/services" className="btn-secondary">
            View All Services <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
