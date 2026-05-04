import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CreatorGridClient from "@/components/ui/CreatorGridClient";
import { ArrowRight } from "lucide-react";
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
            <CreatorGridClient />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
