import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { SERVICES } from "@/lib/constants";
import { Users, Zap, Video, TrendingUp, Brain, Handshake, Target, Star, BarChart3, Layers, ArrowRight, LucideIcon, CheckCircle } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creator Marketing Services",
  description: "Full-service creator marketing from influencer campaigns to AI content systems and paid ads.",
};

const ICON_MAP: Record<string, LucideIcon> = { Users, Zap, Video, TrendingUp, Brain, Handshake, Target, Star, BarChart3, Layers };

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "var(--nav-height)" }}>
        {/* Hero */}
        <section style={{ padding: "80px 0 60px", textAlign: "center", background: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(220,38,38,0.2), transparent)" }}>
          <div className="container">
            <div className="section-badge" style={{ margin: "0 auto 20px" }}>Services</div>
            <h1 className="text-hero" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", marginBottom: 20 }}>
              Every service you need<br />
              <span className="text-gradient-red">to scale with confidence.</span>
            </h1>
            <p style={{ fontSize: "1.1rem", color: "rgba(17,17,17,0.6)", maxWidth: 560, margin: "0 auto 36px", lineHeight: 1.7 }}>
              From first campaign to enterprise creator ecosystem — TCC is your growth partner at every stage.
            </p>
            <Link href="/contact" className="btn-primary">Book a Strategy Call <ArrowRight size={16} /></Link>
          </div>
        </section>

        {/* Services Detail */}
        <section className="section">
          <div className="container">
            <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>
              {SERVICES.map((service, i) => {
                const Icon = ICON_MAP[service.icon] || Zap;
                return (
                  <div key={service.id} style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 60,
                    alignItems: "center",
                  }}>
                    {/* Content */}
                    <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                      <div style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        padding: "6px 12px",
                        background: "rgba(220,38,38,0.1)",
                        border: "1px solid rgba(220,38,38,0.2)",
                        borderRadius: 100,
                        marginBottom: 16,
                      }}>
                        <Icon size={14} color="#f87171" />
                        <span style={{ fontSize: "0.75rem", color: "#f87171", fontWeight: 600 }}>{service.title}</span>
                      </div>
                      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, marginBottom: 16, lineHeight: 1.15 }}>
                        {service.title}
                      </h2>
                      <p style={{ color: "rgba(17,17,17,0.6)", fontSize: "1rem", lineHeight: 1.75, marginBottom: 28 }}>
                        {service.description}
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                        {service.features.map(f => (
                          <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <CheckCircle size={16} color="#dc2626" />
                            <span style={{ fontSize: "0.9rem", color: "rgba(17,17,17,0.7)" }}>{f}</span>
                          </div>
                        ))}
                      </div>
                      <Link href="/contact" className="btn-primary">Get Started <ArrowRight size={16} /></Link>
                    </div>

                    {/* Visual */}
                    <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
                      <div className="glass" style={{
                        borderRadius: 24,
                        padding: 40,
                        minHeight: 280,
                        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
                        background: "radial-gradient(circle at 50% 50%, rgba(220,38,38,0.1), transparent 70%)",
                        border: "1px solid rgba(220,38,38,0.15)",
                        gap: 16,
                      }}>
                        <div style={{
                          width: 80, height: 80, borderRadius: 20,
                          background: "rgba(220,38,38,0.15)",
                          border: "1px solid rgba(220,38,38,0.3)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          boxShadow: "0 0 40px rgba(220,38,38,0.25)",
                        }}>
                          <Icon size={36} color="#dc2626" />
                        </div>
                        <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "#111111" }}>{service.title}</div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                          {service.features.map(f => (
                            <span key={f} className="badge badge-red">{f}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
