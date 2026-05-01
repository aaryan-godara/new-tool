import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ContactSection from "@/components/sections/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact TCC — Book a Strategy Call",
  description: "Get in touch with TCC to book a free strategy session and scale your brand with creator marketing.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "var(--nav-height)" }}>
        <div style={{ paddingTop: 40, textAlign: "center", marginBottom: 0 }}>
          <div className="container">
            <div className="section-badge" style={{ margin: "0 auto 16px" }}>Contact Us</div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
              Let's build something<br /><span className="text-gradient-red">extraordinary together.</span>
            </h1>
          </div>
        </div>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
