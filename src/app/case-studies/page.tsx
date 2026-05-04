import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { CASE_STUDIES } from "@/lib/constants";
import { ArrowRight, TrendingUp, Users, Zap, DollarSign } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import ClientCaseStudies from "./ClientCaseStudies";

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

        <section style={{ padding: "0 0 0" }}>
          <div className="w-full">
            <ClientCaseStudies caseStudies={CASE_STUDIES} />

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
