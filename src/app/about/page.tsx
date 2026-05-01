import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { ArrowRight, Target, Zap, Heart, Globe, Award, Users } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About TCC — The Creator Connect",
  description: "Learn about TCC's mission, team, and approach to creator-led marketing.",
};

const TEAM = [
  { name: "Aryan Sharma", role: "Founder & CEO", bio: "10+ years in digital marketing. Built 3 successful agencies.", emoji: "👑" },
  { name: "Priya Kapoor", role: "Head of Creator Relations", bio: "Former talent manager with a network of 1000+ creators.", emoji: "⚡" },
  { name: "Rahul Dev", role: "Head of Analytics & AI", bio: "Data scientist turned marketer. Built TCC's AI content systems.", emoji: "🤖" },
  { name: "Sneha Iyer", role: "Campaign Director", bio: "Managed ₹50Cr+ in creator campaigns across 15+ industries.", emoji: "🎯" },
  { name: "Karan Malhotra", role: "Head of Paid Media", bio: "Certified Meta & Google expert with 7x avg. ROAS track record.", emoji: "📈" },
  { name: "Meera Nambiar", role: "Client Success Manager", bio: "Obsessed with client results. 98% retention rate champion.", emoji: "🏆" },
];

const VALUES = [
  { icon: Target, title: "Results First", desc: "Every decision we make is driven by measurable outcomes for our clients." },
  { icon: Zap, title: "Innovation", desc: "We leverage AI, data, and technology to stay years ahead of the market." },
  { icon: Heart, title: "Creator First", desc: "We treat creators as partners, not vendors. Their success is our success." },
  { icon: Globe, title: "Transparency", desc: "Real-time dashboards, honest reporting, zero hidden fees or surprises." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "var(--nav-height)" }}>
        {/* Hero */}
        <section style={{
          padding: "100px 0 80px",
          background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(220,38,38,0.18), transparent)",
        }}>
          <div className="container" style={{ textAlign: "center" }}>
            <div className="section-badge" style={{ margin: "0 auto 20px" }}>About TCC</div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 20, lineHeight: 1.1 }}>
              We're not an agency.<br />
              <span className="text-gradient-red">We're your growth partner.</span>
            </h1>
            <p style={{ fontSize: "1.1rem", color: "rgba(17,17,17,0.6)", maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.75 }}>
              TCC was built because we saw too many brands waste money on influencer marketing that didn't work.
              We built the systems, the network, and the technology to change that permanently.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary">Work With Us <ArrowRight size={16} /></Link>
              <Link href="/case-studies" className="btn-secondary">See Our Results</Link>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="section">
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
              <div>
                <div className="section-badge" style={{ marginBottom: 20 }}>Our Story</div>
                <h2 className="section-title">Built by marketers,<br /><span className="text-gradient-red">for results-obsessed brands.</span></h2>
                <p style={{ color: "rgba(17,17,17,0.6)", lineHeight: 1.8, marginBottom: 20 }}>
                  TCC was founded in 2022 with a single mission: make influencer marketing predictable, scalable, and genuinely profitable for brands of every size.
                </p>
                <p style={{ color: "rgba(17,17,17,0.6)", lineHeight: 1.8, marginBottom: 20 }}>
                  We've spent years building a proprietary creator network, AI-powered campaign systems, and analytics infrastructure that most agencies can't match.
                </p>
                <p style={{ color: "rgba(17,17,17,0.6)", lineHeight: 1.8 }}>
                  Today, TCC manages 200+ active campaigns, works with 500+ vetted creators, and has generated over ₹50 Crore in measurable revenue for our clients.
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { label: "Founded", value: "2022" },
                  { label: "Team Members", value: "28+" },
                  { label: "Clients Served", value: "200+" },
                  { label: "Creator Network", value: "500+" },
                  { label: "Revenue Generated", value: "₹50Cr+" },
                  { label: "Retention Rate", value: "98%" },
                ].map(s => (
                  <div key={s.label} style={{
                    padding: 24,
                    background: "rgba(17,17,17,0.03)",
                    border: "1px solid rgba(17,17,17,0.07)",
                    borderRadius: 16,
                    textAlign: "center",
                  }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 800, color: "#111111", marginBottom: 4 }}>{s.value}</div>
                    <div style={{ fontSize: "0.75rem", color: "rgba(17,17,17,0.4)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section" style={{ background: "rgba(17,17,17,0.01)" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div className="section-badge" style={{ margin: "0 auto 20px" }}>Our Values</div>
              <h2 className="section-title">The principles behind<br /><span className="text-gradient-red">everything we do.</span></h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
              {VALUES.map(v => (
                <div key={v.title} className="card-glass">
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: "rgba(220,38,38,0.1)",
                    border: "1px solid rgba(220,38,38,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 16,
                  }}>
                    <v.icon size={22} color="#dc2626" />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, marginBottom: 8 }}>{v.title}</h3>
                  <p style={{ fontSize: "0.875rem", color: "rgba(17,17,17,0.55)", lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="section">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div className="section-badge" style={{ margin: "0 auto 20px" }}>Our Team</div>
              <h2 className="section-title">The people building<br /><span className="text-gradient-red">your brand's future.</span></h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
              {TEAM.map(member => (
                <div key={member.name} className="card-glass" style={{ textAlign: "center" }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: "50%",
                    background: "linear-gradient(135deg, rgba(220,38,38,0.3), rgba(127,29,29,0.5))",
                    border: "2px solid rgba(220,38,38,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "2rem",
                    margin: "0 auto 16px",
                  }}>
                    {member.emoji}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, marginBottom: 4 }}>{member.name}</h3>
                  <div style={{ fontSize: "0.75rem", color: "#f87171", fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>{member.role}</div>
                  <p style={{ fontSize: "0.85rem", color: "rgba(17,17,17,0.5)", lineHeight: 1.6 }}>{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-sm">
          <div className="container" style={{ textAlign: "center" }}>
            <h2 className="section-title">Ready to work with the<br /><span className="text-gradient-red">best in the business?</span></h2>
            <p style={{ color: "rgba(17,17,17,0.55)", marginTop: 16, marginBottom: 32 }}>Book a free strategy session. No pressure, no commitments.</p>
            <Link href="/contact" className="btn-primary" style={{ fontSize: "1rem", padding: "16px 36px" }}>
              Book a Strategy Call <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
