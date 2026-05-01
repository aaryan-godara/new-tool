"use client";
import { TESTIMONIALS } from "@/lib/constants";
import { Star, Quote, TrendingUp, Users, Zap } from "lucide-react";
import { useRef } from "react";

export default function TestimonialsSection() {
  return (
    <section className="section" style={{ overflow: "hidden", background: "rgba(17,17,17,0.01)" }}>
      <div className="container" style={{ marginBottom: 48 }}>
        <div style={{ textAlign: "center" }}>
          <div className="section-badge" style={{ margin: "0 auto 20px" }}>Testimonials</div>
          <h2 className="section-title">
            Trusted by 200+ brands<br />
            <span className="text-gradient-red">across every industry.</span>
          </h2>
        </div>
      </div>

      {/* Scrolling Testimonials — Row 1 */}
      <div style={{ overflow: "hidden", marginBottom: 20 }}>
        <div style={{
          display: "flex",
          gap: 20,
          animation: "ticker 35s linear infinite",
          width: "max-content",
        }}>
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <TestimonialCard key={`r1-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      {/* Scrolling Testimonials — Row 2 (reverse) */}
      <div style={{ overflow: "hidden" }}>
        <div style={{
          display: "flex",
          gap: 20,
          animation: "ticker 40s linear infinite reverse",
          width: "max-content",
        }}>
          {[...TESTIMONIALS.slice().reverse(), ...TESTIMONIALS.slice().reverse()].map((t, i) => (
            <TestimonialCard key={`r2-${i}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof TESTIMONIALS[0] }) {
  return (
    <div style={{
      width: 360,
      flexShrink: 0,
      background: "rgba(17,17,17,0.03)",
      border: "1px solid rgba(17,17,17,0.07)",
      borderRadius: 20,
      padding: "28px",
      position: "relative",
      transition: "border-color 0.3s",
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(220,38,38,0.3)";
        (e.currentTarget as HTMLElement).style.background = "rgba(220,38,38,0.04)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(17,17,17,0.07)";
        (e.currentTarget as HTMLElement).style.background = "rgba(17,17,17,0.03)";
      }}
    >
      {/* Quote Icon */}
      <div style={{ position: "absolute", top: 20, right: 20, opacity: 0.15 }}>
        <Quote size={40} color="#dc2626" />
      </div>

      {/* Stars */}
      <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
        {Array(testimonial.rating).fill(null).map((_, i) => (
          <Star key={i} size={13} color="#f59e0b" fill="#f59e0b" />
        ))}
      </div>

      {/* Text */}
      <p style={{
        fontSize: "0.875rem",
        color: "rgba(17,17,17,0.7)",
        lineHeight: 1.75,
        marginBottom: 20,
      }}>
        "{testimonial.text}"
      </p>

      {/* Metrics */}
      <div style={{
        display: "flex",
        gap: 12,
        marginBottom: 20,
        padding: "10px 14px",
        background: "rgba(17,17,17,0.03)",
        borderRadius: 10,
        border: "1px solid rgba(17,17,17,0.05)",
      }}>
        {[
          { icon: TrendingUp, label: "Revenue", value: testimonial.metrics.revenue, color: "#22c55e" },
          { icon: Users, label: "Followers", value: testimonial.metrics.followers, color: "#3b82f6" },
          { icon: Zap, label: "ROAS", value: testimonial.metrics.roas, color: "#dc2626" },
        ].map(m => (
          <div key={m.label} style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: m.color, fontFamily: "var(--font-display)" }}>{m.value}</div>
            <div style={{ fontSize: "0.6rem", color: "rgba(17,17,17,0.35)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 40, height: 40,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #dc2626, #7f1d1d)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "1rem",
          color: "#111111",
          flexShrink: 0,
        }}>
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111111" }}>{testimonial.name}</div>
          <div style={{ fontSize: "0.75rem", color: "rgba(17,17,17,0.4)" }}>{testimonial.role}</div>
        </div>
      </div>
    </div>
  );
}
