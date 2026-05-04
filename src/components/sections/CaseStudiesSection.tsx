"use client";
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Zap } from 'lucide-react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const CARDS = [
  {
    id: "luxebeauty",
    category: "Beauty & Skincare",
    brand: "LuxeBeauty",
    metric: "+312% Revenue",
    summary: "Scaled from 5K to 85K followers in 90 days. Comprehensive creator campaign combining nano-influencers, UGC production, and paid amplification.",
    accent: "from-pink-500 to-rose-500",
    icon: TrendingUp
  },
  {
    id: "alphafit",
    category: "Fitness Brand",
    brand: "AlphaFit",
    metric: "8.4x ROAS",
    summary: "Generated 12M reach using creator networks. Long-form creator partnership strategy with authentic fitness content and performance tracking.",
    accent: "from-red-500 to-orange-500",
    icon: Zap
  },
  {
    id: "urbanmuse",
    category: "Fashion Label",
    brand: "Urban Muse",
    metric: "+1.2M Engage",
    summary: "Creator-driven viral growth strategy. Connected brand with top-tier fashion influencers to launch their summer collection globally.",
    accent: "from-purple-500 to-fuchsia-500",
    icon: Users
  },
  {
    id: "novaai",
    category: "Tech Startup",
    brand: "Nova AI",
    metric: "+540% Conv.",
    summary: "Built category dominance through influencer storytelling. High-intensity product launch with tier-1 tech creators and coordinated content drops.",
    accent: "from-blue-500 to-cyan-500",
    icon: BarChart3
  },
  {
    id: "velora",
    category: "Lifestyle Brand",
    brand: "Velora",
    metric: "92% Retention",
    summary: "Turned audience attention into long-term retention. Strategic brand-to-creator partnerships that built long-term equity and sustained growth.",
    accent: "from-emerald-500 to-teal-500",
    icon: TrendingUp
  }
];

function CinematicLightBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#f8f8f7]">
      {init && (
        <Particles
          id="tsparticles-light"
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 60,
            particles: {
              color: { value: "#111111" },
              links: {
                color: "#111111",
                distance: 150,
                enable: true,
                opacity: 0.05,
                width: 1,
              },
              move: { enable: true, speed: 0.3 },
              number: { density: { enable: true, width: 800, height: 800 }, value: 30 },
              opacity: { value: 0.1 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 2 } },
            },
            detectRetina: true,
          }}
          className="absolute inset-0 z-0"
        />
      )}
    </div>
  );
}

function TimelineProgress({ scrollYProgress }: { scrollYProgress: any }) {
  const rawLineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  // Add physics spring to the progress line for that premium Apple-like momentum
  const lineWidth = useSpring(rawLineWidth, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  // Mapped number from 1 to 100+
  const counterValue = useTransform(scrollYProgress, (v: number) => `${Math.round(v * 99) + 1}+`);

  const numberOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [0.4, 0.8, 1]);
  const numberScale = useTransform(scrollYProgress, [0.8, 1], [1, 1.1]);
  const numberColor = useTransform(scrollYProgress, [0.8, 1], ["rgba(17,17,17,0.4)", "rgba(255,45,45,1)"]);

  return (
    <div className="w-full max-w-2xl mx-auto flex items-center justify-center gap-4 relative z-30">
      <div className="text-lg md:text-xl font-bold text-[#111]/30 w-8 text-right">1</div>
      <div className="flex-1 h-1 md:h-1.5 bg-[#111]/10 rounded-full relative overflow-visible">
        {/* Animated Progress Line */}
        <motion.div 
          style={{ width: lineWidth }} 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#ff2d2d] to-red-400 rounded-full"
        />
        {/* Traveling light particle on the edge */}
        <motion.div
          style={{ left: lineWidth }}
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 bg-white rounded-full shadow-[0_0_15px_rgba(255,45,45,0.6)] border-2 border-[#ff2d2d] -ml-2 md:-ml-2.5 z-10 flex items-center justify-center"
        >
          <div className="w-1.5 h-1.5 bg-[#ff2d2d] rounded-full animate-ping" />
        </motion.div>
      </div>
      <motion.div 
        style={{ 
          opacity: numberOpacity, 
          scale: numberScale, 
          color: numberColor,
        }} 
        className="text-2xl md:text-3xl font-black w-16 text-left leading-none"
      >
        {counterValue}
      </motion.div>
    </div>
  );
}

function TimelineCard({ card, index, scrollYProgress }: { card: any, index: number, scrollYProgress: any }) {
  // Mapping logic for 5 cards: each takes 0.2 of the scroll space
  const getMappings = (i: number) => {
    if (i === 0) {
      return {
        op: [[0, 0.15, 0.2, 1], [1, 1, 0, 0]],
        y:  [[0, 0.15, 0.2, 1], [0, 0, -100, -100]],
        s:  [[0, 0.15, 0.2, 1], [1, 1, 0.95, 0.95]]
      };
    }
    if (i === 4) {
      return {
        op: [[0, 0.75, 0.8, 1], [0, 0, 1, 1]],
        y:  [[0, 0.75, 0.8, 1], [100, 100, 0, 0]],
        s:  [[0, 0.75, 0.8, 1], [0.95, 0.95, 1, 1]]
      };
    }
    
    // Middle cards (1, 2, 3)
    const start = i * 0.2;
    const fadeStart = start - 0.05;
    const end = start + 0.2;
    const fadeEnd = end + 0.05; // 0.2 - 0.05 = 0.15? Wait, end is e.g. 0.4.
    
    return {
      op: [[0, start - 0.05, start, end - 0.05, end, 1], [0, 0, 1, 1, 0, 0]],
      y:  [[0, start - 0.05, start, end - 0.05, end, 1], [100, 100, 0, 0, -100, -100]],
      s:  [[0, start - 0.05, start, end - 0.05, end, 1], [0.95, 0.95, 1, 1, 0.95, 0.95]]
    };
  };

  const map = getMappings(index);
  const opacity = useTransform(scrollYProgress, map.op[0], map.op[1]);
  const y = useTransform(scrollYProgress, map.y[0], map.y[1]);
  const scale = useTransform(scrollYProgress, map.s[0], map.s[1]);

  return (
    <motion.div 
      style={{ opacity, y, scale }}
      className="absolute inset-0 flex items-center justify-center p-4 md:p-8 pointer-events-none"
    >
       <div className="w-full max-w-6xl bg-white/70 backdrop-blur-3xl border border-white/80 shadow-[0_30px_80px_rgba(0,0,0,0.06)] rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col-reverse md:flex-row relative pointer-events-auto group hover:shadow-[0_40px_100px_rgba(255,45,45,0.12)] transition-shadow duration-700" style={{ maxHeight: 'calc(100% - 1rem)' }}>
           {/* Cinematic Reflection Sweep */}
           <div className="absolute inset-0 bg-gradient-to-tr from-white/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20" />
           
           {/* Left side: Content */}
           <div className="flex-1 min-w-0 p-6 py-5 md:p-10 lg:p-14 flex flex-col justify-center relative z-10 bg-white/30 overflow-hidden">
              <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-[#ff2d2d]/20 bg-[#ff2d2d]/5 text-[#ff2d2d] text-[10px] md:text-xs font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase mb-3 md:mb-5 w-fit shadow-sm flex-shrink-0">
                 {card.category}
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#111] tracking-tighter mb-2 md:mb-3 truncate flex-shrink-0">{card.brand}</h3>
              <p className="text-[#111]/60 text-xs md:text-sm lg:text-base mb-4 md:mb-6 max-w-md font-light leading-relaxed line-clamp-3 flex-shrink-0">{card.summary}</p>
              
              <div className="mb-4 md:mb-8 flex-shrink-0">
                 <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-[#111]/40 mb-1 md:mb-2 font-bold">Primary Growth Metric</div>
                 <div className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff2d2d] to-rose-500 pb-1">
                   {card.metric}
                 </div>
              </div>
           </div>

           {/* Right side: Abstract Mockup Visuals */}
           <div className="flex-1 relative bg-gradient-to-br from-[#f8f8f7] to-[#ebebeb] overflow-hidden border-b md:border-b-0 md:border-l border-white/60 min-h-[200px] md:min-h-[320px]">
              {/* Abstract glowing aura */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-br ${card.accent} opacity-10 blur-[80px] pointer-events-none`} />
              
              <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
                 <div className="relative w-full max-w-xs md:max-w-sm aspect-square">
                    {/* Floating Element 1 */}
                    <motion.div 
                      animate={{ y: [-15, 15, -15], rotate: [-2, 2, -2] }}
                      transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-4 left-4 md:top-10 md:left-0 w-24 h-24 md:w-36 md:h-36 rounded-3xl bg-white/70 backdrop-blur-2xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex items-center justify-center p-3 md:p-4 z-10"
                    >
                       <div className="w-full space-y-2 md:space-y-3">
                          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br ${card.accent} opacity-20 mb-2 md:mb-4 flex items-center justify-center`}>
                             <card.icon size={14} className="text-[#111] md:w-4 md:h-4" />
                          </div>
                          <div className="w-full h-1.5 md:h-2 bg-[#111]/10 rounded-full" />
                          <div className="w-2/3 h-1.5 md:h-2 bg-[#111]/10 rounded-full" />
                       </div>
                    </motion.div>

                    {/* Floating Element 2 - Big Stat */}
                    <motion.div 
                      animate={{ y: [15, -15, 15], rotate: [2, -2, 2] }}
                      transition={{ duration: 7 + index, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute bottom-4 right-4 md:bottom-10 md:right-0 w-32 h-32 md:w-48 md:h-48 rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-white/90 to-white/40 backdrop-blur-2xl border border-white shadow-[0_30px_60px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center p-4 md:p-6 z-20"
                    >
                       <div className="text-[9px] md:text-[10px] font-bold text-[#111]/40 uppercase tracking-widest mb-1 md:mb-2">Campaign Result</div>
                       <div className={`text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br ${card.accent} text-center truncate max-w-full`}>
                          {card.metric.split(" ")[0]}
                       </div>
                    </motion.div>
                 </div>
              </div>
           </div>
       </div>
    </motion.div>
  );
}

export default function CaseStudiesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress purely using Framer Motion (native, smooth, reliable)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    // 600vh height to allow ample scrolling time for the 5 cards
    <section ref={containerRef} className="relative w-full h-[600vh] bg-[#f8f8f7]" id="case-studies">
      
      {/* Sticky viewport container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col pt-12 md:pt-24 pb-8">
        <CinematicLightBackground />
        
        {/* Top Area: Title & Timeline */}
        <div className="relative z-30 w-full max-w-7xl px-6 md:px-12 mx-auto flex flex-col items-center shrink-0 mb-4 md:mb-8">
           <div className="text-center mb-6">
             <h2 className="text-3xl md:text-4xl font-black text-[#111] tracking-tighter mb-2">
               Infinite Brand Scaling
             </h2>
             <p className="text-[#111]/50 text-xs md:text-sm font-light max-w-xl mx-auto">
               We build continuous growth systems. Experience how TCC scales influence.
             </p>
           </div>
           
           {/* Timeline component mapping strictly to scroll */}
           <TimelineProgress scrollYProgress={scrollYProgress} />
        </div>

        {/* Center Area: Stacking Cards */}
        <div className="relative flex-1 w-full max-w-7xl px-4 md:px-12 mx-auto z-20 flex items-center justify-center">
           {CARDS.map((card, index) => (
             <TimelineCard 
               key={card.id} 
               card={card} 
               index={index} 
               scrollYProgress={scrollYProgress} 
             />
           ))}
        </div>
      </div>
    </section>
  );
}
