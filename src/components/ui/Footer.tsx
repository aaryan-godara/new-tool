"use client";
import Link from "next/link";
import { BRAND, NAV_LINKS } from "@/lib/constants";
import { Zap, Camera, MessageCircle, Briefcase, Video, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const FOOTER_LINKS = {
  Services: [
    { label: "Influencer Marketing", href: "/services/influencer-marketing" },
    { label: "Creator Campaigns", href: "/services/creator-campaigns" },
    { label: "UGC Production", href: "/services/ugc-production" },
    { label: "Instagram Growth", href: "/services/instagram-growth" },
    { label: "AI Content Systems", href: "/services/ai-content-systems" },
    { label: "Paid Ads", href: "/services/paid-ads" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Team", href: "/team" },
    { label: "Pricing", href: "/pricing" },
  ],
  Creators: [
    { label: "Join as Creator", href: "/creators/join" },
    { label: "Creator Showcase", href: "/creators" },
    { label: "Creator Portal", href: "/creators/portal" },
    { label: "Content Guidelines", href: "/creators/guidelines" },
    { label: "Earnings", href: "/creators/earnings" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: "var(--charcoal)",
      borderTop: "1px solid var(--charcoal-border)",
      paddingTop: 80,
    }}>
      {/* Top CTA Strip */}
      <div style={{
        background: "linear-gradient(135deg, rgba(220,38,38,0.15), rgba(153,27,27,0.1))",
        border: "1px solid rgba(220,38,38,0.2)",
        borderRadius: 20,
        padding: "40px 48px",
        margin: "0 32px 80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 24,
      }}>
        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 800, marginBottom: 8 }}>
            Ready to scale your brand?
          </h3>
          <p style={{ color: "rgba(17,17,17,0.6)", fontSize: "1rem" }}>
            Join 200+ brands already growing with TCC.
          </p>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/contact" className="btn-primary">
            Book a Strategy Call <ArrowUpRight size={16} />
          </Link>
          <Link href="/creators/join" className="btn-secondary">
            Join as Creator
          </Link>
        </div>
      </div>

      <div className="container-wide">
        {/* Main Footer Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 48,
          paddingBottom: 60,
          borderBottom: "1px solid var(--charcoal-border)",
        }}>
          {/* Brand Column */}
          <div>
            <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: "linear-gradient(135deg, #dc2626, #7f1d1d)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Zap size={18} color="#111111" strokeWidth={2.5} />
              </div>
              <div>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", color: "#111111" }}>TCC</span>
                <span style={{ display: "block", fontSize: "0.55rem", color: "rgba(17,17,17,0.4)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  The Creator Connect
                </span>
              </div>
            </Link>

            <p style={{ color: "rgba(17,17,17,0.5)", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: 320, marginBottom: 28 }}>
              India's most premium influencer marketing agency. We help brands scale through creator-led campaigns, AI systems, and performance analytics.
            </p>

            {/* Socials */}
            <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
              {[
                { icon: Camera, href: BRAND.socials.instagram },
                { icon: MessageCircle, href: BRAND.socials.twitter },
                { icon: Briefcase, href: BRAND.socials.linkedin },
                { icon: Video, href: BRAND.socials.youtube },
              ].map(({ icon: Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: "rgba(17,17,17,0.05)",
                  border: "1px solid rgba(17,17,17,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(17,17,17,0.5)",
                  transition: "all 0.2s",
                  textDecoration: "none",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(220,38,38,0.15)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(220,38,38,0.3)";
                    (e.currentTarget as HTMLElement).style.color = "#f87171";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(17,17,17,0.05)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(17,17,17,0.08)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(17,17,17,0.5)";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { icon: Mail, text: BRAND.email },
                { icon: Phone, text: BRAND.phone },
                { icon: MapPin, text: BRAND.address },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(17,17,17,0.4)", fontSize: "0.8rem" }}>
                  <Icon size={14} color="rgba(220,38,38,0.7)" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#111111",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}>
                {title}
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {links.map(link => (
                  <Link key={link.href} href={link.href} style={{
                    color: "rgba(17,17,17,0.45)",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#111111"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(17,17,17,0.45)"}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 0",
          flexWrap: "wrap",
          gap: 12,
        }}>
          <p style={{ color: "rgba(17,17,17,0.3)", fontSize: "0.8rem" }}>
            © {year} TCC — The Creator Connect. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms & Conditions", href: "/terms" },
              { label: "Cookie Policy", href: "/cookies" },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{
                color: "rgba(17,17,17,0.3)",
                fontSize: "0.8rem",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgba(17,17,17,0.7)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(17,17,17,0.3)"}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
