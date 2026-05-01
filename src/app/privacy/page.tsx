import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy", description: "TCC privacy policy and data handling practices." };

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "var(--nav-height)" }}>
        <section style={{ padding: "80px 0 120px" }}>
          <div className="container" style={{ maxWidth: 800 }}>
            <div className="section-badge" style={{ marginBottom: 20 }}>Legal</div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, marginBottom: 8 }}>Privacy Policy</h1>
            <p style={{ color: "rgba(17,17,17,0.4)", fontSize: "0.85rem", marginBottom: 48 }}>Last updated: May 1, 2024</p>

            {[
              { title: "Information We Collect", body: "We collect information you provide directly to us when you fill out forms, book strategy calls, or create accounts. This includes name, email, phone number, company details, and campaign information. We also collect usage data automatically through analytics tools." },
              { title: "How We Use Your Information", body: "We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, respond to your comments and questions, and send you marketing communications (with your consent)." },
              { title: "Information Sharing", body: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except to provide our services (e.g., payment processors, analytics providers). We may share information if required by law or to protect our rights." },
              { title: "Data Security", body: "We implement industry-standard security measures to protect your information. All data is encrypted in transit and at rest. We regularly audit our security practices and update them to address new threats." },
              { title: "Cookies", body: "We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent." },
              { title: "Your Rights", body: "You have the right to access, correct, or delete your personal information at any time. You can opt out of marketing communications by clicking the unsubscribe link in our emails. Contact us at hello@thecreatorconnect.com to exercise your rights." },
              { title: "Contact Us", body: "If you have any questions about this Privacy Policy, please contact us at hello@thecreatorconnect.com or write to us at TCC — The Creator Connect, Mumbai, Maharashtra, India." },
            ].map(section => (
              <div key={section.title} style={{ marginBottom: 36 }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, marginBottom: 12, color: "#111111" }}>{section.title}</h2>
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
