"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ParticleBackground from "@/components/ui/ParticleBackground";

const STUDIES = [
  {
    id: "luxebeauty",
    category: "Beauty & Skincare",
    brand: "LuxeBeauty",
    metric: "+312% Rev",
    desc: "Scaled from 5K to 85K followers in 90 days.",
    pos: "tl",
  },
  {
    id: "fitlife",
    category: "Health & Fitness",
    brand: "FitLife",
    metric: "8.4x ROAS",
    desc: "Achieved record ROI through creator networks.",
    pos: "tr",
  },
  {
    id: "stylex",
    category: "Fashion",
    brand: "StyleX",
    metric: "12M Reach",
    desc: "Global brand awareness campaign.",
    pos: "br",
  },
  {
    id: "techgear",
    category: "Tech",
    brand: "TechGear",
    metric: "+85K Subs",
    desc: "Massive subscriber growth via tech reviewers.",
    pos: "bl",
  },
];

export default function CaseStudyOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within this 400vh section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate global fade-in for the center text
  const centerOpacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);
  const centerScale = useTransform(scrollYProgress, [0.75, 0.9], [0.8, 1]);
  const centerBlur = useTransform(scrollYProgress, [0.75, 0.9], ["blur(10px)", "blur(0px)"]);

  return (
    <section 
      ref={containerRef} 
      style={{ height: "400vh", position: "relative", background: "#f8f8f7" }}
    >
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        
        {/* Background Particles - highly subtle */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.5 }}>
           <ParticleBackground />
        </div>

        {/* Central Red Ambient Glow */}
        <motion.div style={{
          position: "absolute",
          width: "50vw",
          height: "50vw",
          background: "radial-gradient(circle, rgba(255,45,45,0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          scale: useTransform(scrollYProgress, [0, 1], [0.5, 1.2]),
          opacity: useTransform(scrollYProgress, [0, 1], [0.2, 0.8]),
          pointerEvents: "none",
        }} />

        {/* Orbit Container */}
        <div style={{
          position: "relative",
          width: 800,
          height: 800,
          // Scale down on smaller screens
          transform: "scale(min(1, calc(100vw / 900)))",
        }}>
          
          {STUDIES.map((study, index) => {
            // Calculate segment-specific animations
            // 0: 0.0 - 0.2
            // 1: 0.2 - 0.4
            // 2: 0.4 - 0.6
            // 3: 0.6 - 0.8
            const start = index * 0.2;
            const end = start + 0.2;

            const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
            const yOffset = study.pos.includes("b") ? 50 : -50;
            const xOffset = study.pos.includes("r") ? 50 : -50;
            
            const y = useTransform(scrollYProgress, [start, end], [yOffset, 0]);
            const x = useTransform(scrollYProgress, [start, end], [xOffset, 0]);
            const rotate = useTransform(scrollYProgress, [start, end], [index % 2 === 0 ? -10 : 10, 0]);

            // Layout styling for quadrant
            const isTop = study.pos.includes("t");
            const isLeft = study.pos.includes("l");

            return (
              <motion.div
                key={study.id}
                style={{
                  position: "absolute",
                  top: isTop ? 0 : "50%",
                  left: isLeft ? 0 : "50%",
                  width: "48%", // Leave 4% gap in middle
                  height: "48%",
                  opacity,
                  y,
                  x,
                  rotate,
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,45,45,0.15)",
                  borderTopLeftRadius: study.pos === "tl" ? 400 : 20,
                  borderTopRightRadius: study.pos === "tr" ? 400 : 20,
                  borderBottomRightRadius: study.pos === "br" ? 400 : 20,
                  borderBottomLeftRadius: study.pos === "bl" ? 400 : 20,
                  padding: "60px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isLeft ? "flex-start" : "flex-end",
                  justifyContent: isTop ? "flex-start" : "flex-end",
                  textAlign: isLeft ? "left" : "right",
                  cursor: "pointer",
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.03), inset 0 0 20px rgba(255,255,255,0.5)",
                }}
                whileHover={{
                  scale: 1.02,
                  borderColor: "rgba(255,45,45,0.4)",
                  boxShadow: "0 30px 60px rgba(255,45,45,0.08), inset 0 0 30px rgba(255,255,255,0.8)",
                  zIndex: 10,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Inner Glow Hover Effect */}
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500" style={{
                  background: `radial-gradient(circle at ${isLeft ? '20%' : '80%'} ${isTop ? '20%' : '80%'}, rgba(255,45,45,0.08) 0%, transparent 60%)`,
                  pointerEvents: "none",
                }} />

                <div style={{ position: "relative", zIndex: 2, marginTop: isTop ? (isLeft ? "40px" : "40px") : 0, marginBottom: !isTop ? (isLeft ? "40px" : "40px") : 0 }}>
                  <span style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    background: "rgba(255,45,45,0.08)",
                    border: "1px solid rgba(255,45,45,0.2)",
                    borderRadius: 100,
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    color: "#ff2d2d",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: 12,
                  }}>
                    {study.category}
                  </span>
                  
                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2rem",
                    fontWeight: 800,
                    color: "#111111",
                    marginBottom: 8,
                    lineHeight: 1.1,
                  }}>
                    {study.brand}
                  </h3>
                  
                  <div style={{
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    color: "#ff2d2d",
                    marginBottom: 8,
                    letterSpacing: "-0.02em",
                  }}>
                    {study.metric}
                  </div>
                  
                  <p style={{
                    fontSize: "0.85rem",
                    color: "rgba(17,17,17,0.5)",
                    maxWidth: 200,
                    lineHeight: 1.5,
                  }}>
                    {study.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {/* Center Hub */}
          <motion.div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 300,
            height: 300,
            x: "-50%",
            y: "-50%",
            borderRadius: "50%",
            background: "#ffffff",
            boxShadow: "0 20px 40px rgba(0,0,0,0.05), 0 0 60px rgba(255,45,45,0.1)",
            border: "1px solid rgba(255,255,255,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
            padding: 32,
            opacity: centerOpacity,
            scale: centerScale,
            filter: centerBlur,
            zIndex: 5,
          }}>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "#111111",
              lineHeight: 1.1,
              marginBottom: 12,
            }}>
              4 Campaigns.<br/>
              <span style={{ color: "#ff2d2d" }}>Millions Reached.</span>
            </h2>
            <p style={{
              fontSize: "0.8rem",
              color: "rgba(17,17,17,0.5)",
              marginBottom: 24,
            }}>
              Scaling Brands Through Creator Intelligence.
            </p>
            <Link href="/case-studies" className="btn-primary" style={{ padding: "12px 24px", fontSize: "0.8rem" }}>
              Explore All <ArrowRight size={14} />
            </Link>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
