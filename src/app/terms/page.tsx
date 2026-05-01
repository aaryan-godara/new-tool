import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms & Conditions", description: "TCC terms of service and usage conditions." };

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "var(--nav-height)" }}>
        <section style={{ padding: "80px 0 120px" }}>
          <div className="container" style={{ maxWidth: 800 }}>
            <div className="section-badge" style={{ marginBottom: 20 }}>Legal</div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, marginBottom: 8 }}>Terms & Conditions</h1>
            <p style={{ color: "rgba(17,17,17,0.4)", fontSize: "0.85rem", marginBottom: 48 }}>Last updated: May 1, 2024</p>

            {[
              { title: "Acceptance of Terms", body: "By accessing or using TCC's services, you agree to be bound by these Terms and Conditions. If you do not agree to all the terms, please do not use our services." },
              { title: "Services", body: "TCC provides influencer marketing services, creator management, campaign strategy, analytics, and related digital marketing services. We reserve the right to modify, suspend, or discontinue any service at any time." },
              { title: "Payment Terms", body: "All services require payment in advance unless otherwise agreed in writing. Prices are subject to change with 30 days notice. Refunds are handled on a case-by-case basis at TCC's sole discretion." },
              { title: "Intellectual Property", body: "All content, materials, and deliverables created by TCC remain the intellectual property of TCC until full payment is received. Clients receive a license to use deliverables upon completion of payment." },
              { title: "Confidentiality", body: "Both parties agree to keep confidential all proprietary information shared during the engagement. This obligation survives termination of any agreement between the parties." },
              { title: "Limitation of Liability", body: "TCC's liability for any claims arising under these terms shall not exceed the total fees paid by the client in the three months preceding the claim. We are not liable for indirect or consequential damages." },
              { title: "Governing Law", body: "These terms are governed by the laws of Maharashtra, India. Any disputes shall be resolved through arbitration in Mumbai, India." },
            ].map(section => (
              <div key={section.title} style={{ marginBottom: 36 }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, marginBottom: 12 }}>{section.title}</h2>
                <p style={{ color: "rgba(17,17,17,0.6)", lineHeight: 1.8, fontSize: "0.95rem" }}>{section.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
