import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PricingSection from "@/components/sections/PricingSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Influencer Marketing Pricing",
  description: "Transparent pricing for all business sizes. No hidden fees, just results.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "var(--nav-height)" }}>
        <div style={{ paddingTop: 60, textAlign: "center" }}>
          <div className="container">
            <div className="section-badge" style={{ margin: "0 auto 16px" }}>Pricing</div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,5vw,4rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>
              Invest in growth.<br /><span className="text-gradient-red">Get exponential returns.</span>
            </h1>
            <p style={{ color: "rgba(17,17,17,0.55)", maxWidth: 500, margin: "0 auto" }}>
              Every plan includes onboarding, strategy session, and a 30-day satisfaction guarantee.
            </p>
          </div>
        </div>
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
