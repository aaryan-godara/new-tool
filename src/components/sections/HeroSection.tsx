"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { STATS, BRAND } from "@/lib/constants";
import { ArrowRight, Play, TrendingUp, Users, Star, Zap, ChevronDown } from "lucide-react";
import ParticleBackground from "@/components/ui/ParticleBackground";

const FLOATING_CARDS = [
  { icon: TrendingUp, label: "Revenue Growth", value: "+312%", sub: "LuxeBeauty Campaign", color: "#22c55e" },
  { icon: Users, label: "Creator Network", value: "500+", sub: "Verified creators", color: "#dc2626" },
  { icon: Star, label: "Client Rating", value: "4.9/5", sub: "98% retention rate", color: "#f59e0b" },
  { icon: Zap, label: "Campaigns Live", value: "24", sub: "Active right now", color: "#8b5cf6" },
];

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 2000;
          const step = end / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function HeroSection() {

  return (
    <section style={{
      minHeight: "100vh",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      background: "var(--black-rich)",
    }}>
      {/* Particle Background */}
      <ParticleBackground />

      {/* Background Gradient Mesh */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse 80% 50% at 50% -10%, rgba(220,38,38,0.3) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 85% 70%, rgba(153,27,27,0.15) 0%, transparent 60%),
          radial-gradient(ellipse 40% 40% at 10% 85%, rgba(127,29,29,0.1) 0%, transparent 60%)
        `,
      }} />

      {/* Grid Lines */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(17,17,17,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(17,17,17,0.025) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />

      <style>{`
        .hero-floating-card { display: block; }
        @media (max-width: 1024px) {
          .hero-floating-card { display: none !important; }
        }
        
        .stat-item {
          padding: 0 40px;
          border-right: 1px solid rgba(17,17,17,0.1);
        }
        .stat-item:last-child {
          border-right: none;
        }
        @media (max-width: 768px) {
          .stat-item {
            padding: 24px 20px;
            width: 50%;
          }
          .stat-item:nth-child(even) { border-right: none; }
          .stat-item:nth-child(1), .stat-item:nth-child(2) {
            border-bottom: 1px solid rgba(17,17,17,0.1);
          }
        }
      `}</style>

      {/* Floating Cards */}
      {FLOATING_CARDS.map((card, i) => (
        <div key={card.label} className="animate-float hero-floating-card" style={{
          position: "absolute",
          zIndex: 3,
          animationDelay: `${i * 1.2}s`,
          animationDuration: `${5 + i}s`,
          ...getCardPosition(i),
        }}>
          <div className="glass" style={{
            padding: "12px 16px",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            gap: 12,
            minWidth: 180,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: `${card.color}20`,
              border: `1px solid ${card.color}30`,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <card.icon size={16} color={card.color} />
            </div>
            <div>
              <div style={{ fontSize: "0.7rem", color: "rgba(17,17,17,0.5)", fontWeight: 500 }}>{card.label}</div>
              <div style={{ fontSize: "1rem", fontWeight: 700, color: "#111111", fontFamily: "var(--font-display)" }}>{card.value}</div>
              <div style={{ fontSize: "0.65rem", color: "rgba(17,17,17,0.35)" }}>{card.sub}</div>
            </div>
          </div>
        </div>
      ))}

      {/* Main Content */}
      <div className="container" style={{ position: "relative", zIndex: 4, textAlign: "center", paddingTop: 100, paddingBottom: 80 }}>
        {/* Badge */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <div className="section-badge animate-fade-in">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#dc2626", display: "inline-block", animation: "pulse-glow 2s infinite" }} />
            India's #1 Creator Marketing Platform
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-hero" style={{
          marginBottom: 24,
          animation: "slide-in-up 0.8s cubic-bezier(0.19,1,0.22,1) forwards",
        }}>
          <span style={{ display: "block", color: "#111111" }}>WHERE BRANDS</span>
          <span style={{ display: "block" }}>
            <span className="text-gradient-red">MEET</span>
            {" "}
            <span style={{ color: "#111111" }}>INFLUENCE.</span>
          </span>
        </h1>

        {/* Subheading */}
        <p style={{
          fontSize: "clamp(1rem, 2vw, 1.25rem)",
          color: "rgba(17,17,17,0.65)",
          maxWidth: 640,
          margin: "0 auto 40px",
          lineHeight: 1.7,
          animation: "slide-in-up 1s 0.2s cubic-bezier(0.19,1,0.22,1) both",
        }}>
          {BRAND.description}
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
          flexWrap: "wrap",
          animation: "slide-in-up 1s 0.4s cubic-bezier(0.19,1,0.22,1) both",
          marginBottom: 64,
        }}>
          <Link href="/contact" className="btn-primary" style={{ padding: "15px 32px", fontSize: "0.95rem" }}>
            Book a Strategy Call
            <ArrowRight size={16} />
          </Link>
          <Link href="/creators/join" className="btn-secondary" style={{ padding: "15px 32px", fontSize: "0.95rem" }}>
            Join as Creator
          </Link>
          <Link href="/case-studies" className="btn-ghost" style={{
            padding: "15px 24px",
            display: "flex", alignItems: "center", gap: 8,
            fontSize: "0.95rem",
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "rgba(17,17,17,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Play size={12} fill="#111111" />
            </div>
            View Case Studies
          </Link>
        </div>

        {/* Stats Row */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          animation: "slide-in-up 1s 0.6s cubic-bezier(0.19,1,0.22,1) both",
        }}>
          {STATS.map((stat, i) => (
            <div key={stat.label} className="stat-item" style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 800,
                color: "#111111",
                lineHeight: 1,
                marginBottom: 4,
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "0.8rem", color: "rgba(17,17,17,0.45)", fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div style={{
        position: "absolute",
        bottom: 32,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        animation: "float-slow 2s ease-in-out infinite",
      }}>
        <span style={{ fontSize: "0.65rem", color: "rgba(17,17,17,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Scroll</span>
        <ChevronDown size={16} color="rgba(17,17,17,0.3)" />
      </div>
    </section>
  );
}

function getCardPosition(i: number): React.CSSProperties {
  const positions = [
    { top: "18%", left: "4%" },
    { top: "20%", right: "4%" },
    { bottom: "25%", left: "3%" },
    { bottom: "28%", right: "3%" },
  ];
  return positions[i] || {};
}
