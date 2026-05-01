"use client";
import { PRICING_PLANS } from "@/lib/constants";
import { Check, ArrowRight, Star, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PricingSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="section" id="pricing">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="section-badge" style={{ margin: "0 auto 20px" }}>Pricing</div>
          <h2 className="section-title">
            Transparent pricing.<br />
            <span className="text-gradient-red">Premium results.</span>
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Every plan is designed to deliver exponential ROI. No hidden fees, no surprises — just results.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 24,
          alignItems: "stretch",
        }}>
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              onMouseEnter={() => setHovered(plan.name)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: plan.featured
                  ? "linear-gradient(135deg, rgba(220,38,38,0.15), rgba(153,27,27,0.08))"
                  : "rgba(17,17,17,0.03)",
                border: `1px solid ${plan.featured
                  ? "rgba(220,38,38,0.4)"
                  : hovered === plan.name
                    ? "rgba(220,38,38,0.25)"
                    : "rgba(17,17,17,0.08)"}`,
                borderRadius: 24,
                padding: "36px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
                transform: plan.featured
                  ? "scale(1.03)"
                  : hovered === plan.name
                    ? "translateY(-6px)"
                    : "none",
                boxShadow: plan.featured
                  ? "0 0 60px rgba(220,38,38,0.2), 0 30px 60px rgba(0,0,0,0.4)"
                  : hovered === plan.name
                    ? "0 20px 60px rgba(0,0,0,0.4)"
                    : "none",
              }}
            >
              {/* Featured Badge */}
              {plan.featured && (
                <div style={{
                  position: "absolute",
                  top: -14,
                  left: "50%",
                  transform: "translateX(-50%)",
                  padding: "4px 16px",
                  background: "linear-gradient(135deg, #dc2626, #991b1b)",
                  borderRadius: 100,
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "#111111",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  boxShadow: "0 4px 20px rgba(220,38,38,0.4)",
                  whiteSpace: "nowrap",
                }}>
                  <Star size={10} fill="#111111" /> Most Popular
                </div>
              )}

              {/* Plan Name */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}>
                <div style={{
                  width: 32, height: 32,
                  borderRadius: 8,
                  background: plan.featured ? "rgba(220,38,38,0.2)" : "rgba(17,17,17,0.05)",
                  border: `1px solid ${plan.featured ? "rgba(220,38,38,0.3)" : "rgba(17,17,17,0.08)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Zap size={14} color={plan.featured ? "#f87171" : "rgba(17,17,17,0.4)"} />
                </div>
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: plan.featured ? "#111111" : "rgba(17,17,17,0.8)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}>
                  {plan.name}
                </h3>
              </div>

              {/* Price */}
              <div style={{ marginBottom: 8 }}>
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.5rem",
                  fontWeight: 800,
                  color: "#111111",
                  letterSpacing: "-0.03em",
                }}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span style={{ fontSize: "0.875rem", color: "rgba(17,17,17,0.4)", marginLeft: 4 }}>
                    {plan.period}
                  </span>
                )}
              </div>

              <p style={{
                fontSize: "0.85rem",
                color: "rgba(17,17,17,0.5)",
                marginBottom: 28,
                lineHeight: 1.6,
              }}>
                {plan.description}
              </p>

              <div className="divider" style={{ marginBottom: 24 }} />

              {/* Features */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                {plan.features.map(feature => (
                  <div key={feature} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{
                      width: 18, height: 18,
                      borderRadius: "50%",
                      background: "rgba(220,38,38,0.15)",
                      border: "1px solid rgba(220,38,38,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 1,
                    }}>
                      <Check size={10} color="#f87171" strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: "0.85rem", color: "rgba(17,17,17,0.65)", lineHeight: 1.5 }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              {plan.name === "Enterprise" ? (
                <Link href="/contact" className="btn-secondary" style={{ justifyContent: "center" }}>
                  {plan.cta} <ArrowRight size={16} />
                </Link>
              ) : (
                <Link href="/contact" className={plan.featured ? "btn-primary" : "btn-secondary"} style={{ justifyContent: "center" }}>
                  {plan.cta} <ArrowRight size={16} />
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Trust Note */}
        <p style={{
          textAlign: "center",
          marginTop: 32,
          fontSize: "0.8rem",
          color: "rgba(17,17,17,0.3)",
        }}>
          All plans include onboarding, strategy session, and 30-day satisfaction guarantee. No lock-in contracts.
        </p>
      </div>
    </section>
  );
}
