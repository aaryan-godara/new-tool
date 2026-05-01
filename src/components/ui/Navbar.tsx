"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import { Menu, X, ChevronRight, Zap } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          height: "var(--nav-height)",
          transition: "all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
          background: scrolled
            ? "rgba(248,249,250,0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(17,17,17,0.06)"
            : "1px solid transparent",
        }}
      >
        <div className="container-wide" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: "linear-gradient(135deg, #dc2626, #7f1d1d)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 20px rgba(220,38,38,0.4)",
            }}>
              <Zap size={18} color="#111111" strokeWidth={2.5} />
            </div>
            <div>
              <span style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "1.1rem",
                color: "#111111",
                letterSpacing: "-0.02em",
              }}>TCC</span>
              <span style={{
                display: "block",
                fontSize: "0.55rem",
                color: "rgba(17,17,17,0.4)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginTop: -2,
                fontWeight: 600,
              }}>The Creator Connect</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }} className="hidden-mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? "active" : ""}`}
                style={{ padding: "8px 14px", borderRadius: 8 }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }} className="hidden-mobile">
            <Link href="/admin" className="btn-ghost" style={{ fontSize: "0.8rem" }}>
              Dashboard
            </Link>
            <Link href="/contact" className="btn-primary" style={{ padding: "10px 20px", fontSize: "0.85rem" }}>
              Book a Call
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: "none",
              background: "rgba(17,17,17,0.05)",
              border: "1px solid rgba(17,17,17,0.1)",
              borderRadius: 8,
              padding: "8px",
              color: "#111111",
              cursor: "pointer",
            }}
            className="mobile-toggle"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 998,
          background: "rgba(248,249,250,0.98)",
          backdropFilter: "blur(24px)",
          display: "flex",
          flexDirection: "column",
          padding: "100px 24px 40px",
          gap: "8px",
          animation: "fade-in 0.25s ease forwards",
        }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: "1.5rem",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                color: pathname === link.href ? "#111111" : "rgba(17,17,17,0.5)",
                textDecoration: "none",
                padding: "12px 0",
                borderBottom: "1px solid rgba(17,17,17,0.06)",
                transition: "color 0.2s",
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
            <Link href="/contact" className="btn-primary" onClick={() => setMobileOpen(false)}
              style={{ justifyContent: "center" }}>
              Book a Strategy Call
            </Link>
            <Link href="/creators/join" className="btn-secondary" onClick={() => setMobileOpen(false)}
              style={{ justifyContent: "center" }}>
              Join as Creator
            </Link>
          </div>
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}
