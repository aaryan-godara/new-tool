import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page Not Found — TCC" };

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--black-rich)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 24, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(220,38,38,0.12), transparent)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(17,17,17,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,17,0.02) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(6rem,20vw,12rem)", fontWeight: 800, lineHeight: 1, background: "linear-gradient(135deg, rgba(220,38,38,0.3), rgba(220,38,38,0.05))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 8 }}>
          404
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem,4vw,2.5rem)", fontWeight: 800, color: "#111111", marginBottom: 16 }}>
          This page went off-grid.
        </h1>
        <p style={{ color: "rgba(17,17,17,0.5)", fontSize: "1rem", maxWidth: 400, margin: "0 auto 36px", lineHeight: 1.7 }}>
          The page you're looking for doesn't exist or was moved. Let's get you back to the action.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn-primary" style={{ padding: "12px 24px" }}>
            <Home size={16} /> Back to Home
          </Link>
          <Link href="/contact" className="btn-secondary" style={{ padding: "12px 24px" }}>
            Contact Us <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
