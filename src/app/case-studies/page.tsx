import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { CASE_STUDIES } from "@/lib/constants";
import { ArrowRight, TrendingUp, Users, Zap, DollarSign } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies — Real Results from TCC Campaigns",
  description: "See how TCC has helped brands generate millions in revenue through creator-led marketing campaigns.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "var(--nav-height)" }}>
        <section style={{ padding: "80px 0 60px", textAlign: "center", background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(220,38,38,0.15), transparent)" }}>
          <div className="container">
            <div className="section-badge" style={{ margin: "0 auto 20px" }}>Case Studies</div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,5vw,4rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>
              Real campaigns.<br /><span className="text-gradient-red">Extraordinary results.</span>
            </h1>
            <p style={{ color: "rgba(17,17,17,0.55)", maxWidth: 520, margin: "0 auto 32px" }}>
              Every brand we work with sees measurable, compounding growth. Here's the proof.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
              {[{ label: "Avg. ROAS", value: "7.8x" }, { label: "Revenue Generated", value: "₹50Cr+" }, { label: "Campaigns Run", value: "200+" }].map(s => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, color: "#111111" }}>{s.value}</div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(17,17,17,0.4)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: "60px 0 120px" }}>
          <div className="container">
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {CASE_STUDIES.map((study, i) => (
                <div key={study.id} className="glass" style={{ borderRadius: 24, overflow: "hidden", display: "grid", gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr" }}>
                  <div style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.18), rgba(255,255,255,0.9))", padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between", order: i % 2 === 0 ? 0 : 1, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(220,38,38,0.18), transparent 70%)", pointerEvents: "none" }} />
                    <div>
                      <div style={{ display: "inline-block", padding: "4px 12px", background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.25)", borderRadius: 100, fontSize: "0.7rem", fontWeight: 600, color: "#f87171", letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 16 }}>{study.category}</div>
                      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 800, color: "#111111", marginBottom: 12, lineHeight: 1.2 }}>{study.brand}</h2>
                      <p style={{ color: "rgba(17,17,17,0.6)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: 16 }}>{study.summary}</p>
                      <p style={{ color: "rgba(17,17,17,0.45)", fontSize: "0.875rem", lineHeight: 1.7 }}>{study.description}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 24 }}>
                      <span style={{ fontSize: "0.8rem", color: "rgba(17,17,17,0.4)" }}>⏱ {study.duration} campaign</span>
                      <Link href={`/case-studies/${study.id}`} className="btn-primary" style={{ padding: "10px 20px", fontSize: "0.8rem" }}>Full Case Study <ArrowRight size={14} /></Link>
                    </div>
                  </div>
                  <div style={{ padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 20, order: i % 2 === 0 ? 1 : 0 }}>
                    <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(17,17,17,0.35)" }}>Campaign Results</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      {[
                        { icon: DollarSign, label: "Revenue", value: study.results.revenue, color: "#22c55e" },
                        { icon: Users, label: "Followers", value: study.results.followers, color: "#3b82f6" },
                        { icon: TrendingUp, label: "Engagement", value: study.results.engagement, color: "#f59e0b" },
                        { icon: Zap, label: "ROAS", value: study.results.roas, color: "#dc2626" },
                      ].map(m => (
                        <div key={m.label} style={{ padding: 16, background: "rgba(17,17,17,0.03)", border: "1px solid rgba(17,17,17,0.06)", borderRadius: 12 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                            <m.icon size={12} color={m.color} />
                            <span style={{ fontSize: "0.65rem", color: "rgba(17,17,17,0.4)", textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>{m.label}</span>
                          </div>
                          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: m.color, lineHeight: 1 }}>{m.value}</div>
                        </div>
                      ))}
                    </div>
                    {[{ label: "ROI Achievement", value: 92 }, { label: "Creator Satisfaction", value: 98 }, { label: "Campaign Completion", value: 100 }].map(bar => (
                      <div key={bar.label}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                          <span style={{ fontSize: "0.75rem", color: "rgba(17,17,17,0.5)" }}>{bar.label}</span>
                          <span style={{ fontSize: "0.75rem", color: "#111111", fontWeight: 600 }}>{bar.value}%</span>
                        </div>
                        <div style={{ height: 4, background: "rgba(17,17,17,0.06)", borderRadius: 2 }}>
                          <div style={{ height: "100%", width: `${bar.value}%`, background: "linear-gradient(90deg,#dc2626,#f87171)", borderRadius: 2 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 60, textAlign: "center", padding: "48px", background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.18)", borderRadius: 24 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 800, marginBottom: 12 }}>Ready to be our next success story?</h3>
              <p style={{ color: "rgba(17,17,17,0.55)", marginBottom: 28 }}>Let's build a campaign that delivers results you'll want to showcase.</p>
              <Link href="/contact" className="btn-primary" style={{ padding: "14px 32px", fontSize: "0.95rem" }}>Book a Free Strategy Call <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
