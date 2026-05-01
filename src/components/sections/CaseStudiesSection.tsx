"use client";
import { CASE_STUDIES } from "@/lib/constants";
import { ArrowRight, TrendingUp, Users, Zap, DollarSign } from "lucide-react";
import Link from "next/link";

export default function CaseStudiesSection() {
  return (
    <section className="section" id="case-studies">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="section-badge" style={{ margin: "0 auto 20px" }}>Case Studies</div>
          <h2 className="section-title">
            Real results. Real brands.<br />
            <span className="text-gradient-red">Extraordinary growth.</span>
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Every campaign we run is built to deliver measurable, compounding results. Here's proof.
          </p>
        </div>

        {/* Case Study Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 48 }}>
          {CASE_STUDIES.map((study, i) => (
            <div key={study.id} className="glass" style={{
              borderRadius: 20,
              overflow: "hidden",
              display: "grid",
              gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
              transition: "all 0.4s",
            }}>
              {/* Visual Panel */}
              <div style={{
                background: `linear-gradient(135deg, rgba(220,38,38,0.2), rgba(255,255,255,0.9))`,
                padding: "48px 40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                order: i % 2 === 0 ? 0 : 1,
                position: "relative",
                overflow: "hidden",
              }}>
                {/* Background decoration */}
                <div style={{
                  position: "absolute",
                  top: -40,
                  right: -40,
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(220,38,38,0.2), transparent 70%)",
                  pointerEvents: "none",
                }} />

                <div>
                  <div style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    background: "rgba(220,38,38,0.15)",
                    border: "1px solid rgba(220,38,38,0.25)",
                    borderRadius: 100,
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    color: "#f87171",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}>
                    {study.category}
                  </div>
                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                    fontWeight: 800,
                    color: "#111111",
                    marginBottom: 12,
                    lineHeight: 1.2,
                  }}>
                    {study.brand}
                  </h3>
                  <p style={{ color: "rgba(17,17,17,0.6)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                    {study.summary}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 24 }}>
                  <div style={{ fontSize: "0.8rem", color: "rgba(17,17,17,0.4)" }}>
                    ⏱ {study.duration} campaign
                  </div>
                  <Link href={`/case-studies/${study.id}`} className="btn-primary" style={{ padding: "10px 20px", fontSize: "0.8rem" }}>
                    View Full Study <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Metrics Panel */}
              <div style={{
                padding: "48px 40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 24,
                order: i % 2 === 0 ? 1 : 0,
              }}>
                <h4 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(17,17,17,0.4)",
                  marginBottom: 4,
                }}>
                  Campaign Results
                </h4>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {[
                    { icon: DollarSign, label: "Revenue", value: study.results.revenue, color: "#22c55e" },
                    { icon: Users, label: "Followers", value: study.results.followers, color: "#3b82f6" },
                    { icon: TrendingUp, label: "Engagement", value: study.results.engagement, color: "#f59e0b" },
                    { icon: Zap, label: "ROAS", value: study.results.roas, color: "#dc2626" },
                  ].map(metric => (
                    <div key={metric.label} style={{
                      padding: "16px",
                      background: "rgba(17,17,17,0.03)",
                      border: "1px solid rgba(17,17,17,0.06)",
                      borderRadius: 12,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                        <metric.icon size={12} color={metric.color} />
                        <span style={{ fontSize: "0.65rem", color: "rgba(17,17,17,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                          {metric.label}
                        </span>
                      </div>
                      <div style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.6rem",
                        fontWeight: 800,
                        color: metric.color,
                        lineHeight: 1,
                      }}>
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress bars */}
                <div>
                  {[
                    { label: "ROI Achievement", value: 92 },
                    { label: "Creator Satisfaction", value: 98 },
                    { label: "Campaign Completion", value: 100 },
                  ].map(bar => (
                    <div key={bar.label} style={{ marginBottom: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: "0.75rem", color: "rgba(17,17,17,0.5)" }}>{bar.label}</span>
                        <span style={{ fontSize: "0.75rem", color: "#111111", fontWeight: 600 }}>{bar.value}%</span>
                      </div>
                      <div style={{ height: 4, background: "rgba(17,17,17,0.06)", borderRadius: 2, overflow: "hidden" }}>
                        <div style={{
                          height: "100%",
                          width: `${bar.value}%`,
                          background: "linear-gradient(90deg, #dc2626, #f87171)",
                          borderRadius: 2,
                          transition: "width 1s ease",
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link href="/case-studies" className="btn-secondary">
            View All Case Studies <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
