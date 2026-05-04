"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TrendingUp, Users, Zap, DollarSign } from "lucide-react";

/* ─────────────────────────────────────
   Cinematic Sticky Stacking Cards
   ───────────────────────────────────── */

function StackedCard({ study, index, total, progress }: { study: any, index: number, total: number, progress: any }) {
  // Calculate when this specific card starts sticking
  // The progress ranges from 0 to 1 across the entire container
  // A card reaches the top when progress == index / (total - 1)
  const startPoint = total > 1 ? index / (total - 1) : 0;
  
  // Scale down slightly as user scrolls past this card
  const scale = useTransform(progress, [startPoint, 1], [1, 1 - (total - index - 1) * 0.05]);

  const stats = [
    { icon: DollarSign, label: "Revenue", value: study.results.revenue, color: "text-emerald-500" },
    { icon: Users, label: "Followers", value: study.results.followers, color: "text-blue-500" },
    { icon: TrendingUp, label: "Engagement", value: study.results.engagement, color: "text-amber-500" },
    { icon: Zap, label: "ROAS", value: study.results.roas, color: "text-red-500" },
  ];

  // Dynamic glow colors based on index for a premium aesthetic
  const accents = [
    "from-red-500/20 via-orange-500/10",
    "from-blue-500/20 via-cyan-500/10",
    "from-emerald-500/20 via-teal-500/10",
    "from-purple-500/20 via-fuchsia-500/10",
  ];
  const accent = accents[index % accents.length];

  return (
    <div className="sticky top-0 h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-10">
      <motion.div 
        style={{ scale, top: `calc(${index * 15}px)` }}
        className="relative w-full max-w-[1400px] h-[85vh] md:h-[80vh] rounded-[2rem] md:rounded-[3rem] bg-[#f5f5f5] border border-[#111]/10 overflow-hidden flex flex-col shadow-[0_-10px_50px_rgba(0,0,0,0.05)]"
      >

        {/* Cinematic Lighting/Glow */}
        <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${accent} to-transparent opacity-20 pointer-events-none`} />
        
        {/* Noise overlay for texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay pointer-events-none" />
        
        {/* Card Content - Maximized for no negative space */}
        <div className="relative z-10 flex flex-col lg:flex-row h-full w-full box-border">
           
           {/* Left Half: Brand & Story */}
           <div 
             className="flex-1 flex flex-col justify-center items-start border-b lg:border-b-0 lg:border-r border-[#111]/10 box-border"
             style={{ padding: "clamp(20px, 5vw, 64px)" }}
           >
              <div className="w-full max-w-[520px] flex flex-col gap-6 md:gap-8 box-border">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111]/5 text-[#111]/90 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase w-fit border border-[#111]/10 backdrop-blur-md whitespace-nowrap">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.4)]" />
                    {study.category}
                  </div>

                  {/* Title */}
                  <h2 
                    className="font-black text-[#111] tracking-tighter"
                    style={{ 
                      fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)",
                      lineHeight: "1.05",
                      textWrap: "balance",
                      wordBreak: "break-word",
                      overflow: "hidden"
                    }}
                  >
                    {study.brand}
                  </h2>

                  {/* Short Description */}
                  <p 
                    className="text-[#111]/70 font-light"
                    style={{
                      fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)",
                      lineHeight: "1.6",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textWrap: "pretty"
                    }}
                  >
                    {study.summary}
                  </p>

                   {/* Duration */}
                   <div className="mt-4 shrink-0">
                     <div className="text-[#111]/40 text-xs md:text-sm font-medium tracking-wide whitespace-nowrap shrink-0">
                       {study.duration || "3 months"}
                     </div>
                   </div>
              </div>
           </div>

           {/* Right Half: Giant Stats */}
           <div 
             className="flex-1 flex flex-col justify-center items-start bg-white/40 backdrop-blur-sm box-border"
             style={{ padding: "clamp(20px, 5vw, 64px)" }}
           >
              <div className="w-full max-w-[520px] flex flex-col justify-center box-border h-full max-h-full overflow-y-auto pb-8 scrollbar-hide">
                <div className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[#111]/40 mb-8 md:mb-10 shrink-0 mt-auto">
                  Campaign Results
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:gap-x-10 md:gap-y-12 mb-8 md:mb-12 shrink-0">
                  {stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col gap-2 md:gap-3 overflow-hidden shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#111]/5 flex items-center justify-center border border-[#111]/10 shrink-0">
                          <stat.icon size={14} className={stat.color} />
                        </div>
                        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#111]/50 font-bold truncate">{stat.label}</span>
                      </div>
                      <div 
                        className="font-black text-[#111] tracking-tighter truncate"
                        style={{ fontSize: "clamp(2rem, 4vw, 4rem)", lineHeight: "1" }}
                      >
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Minimalist Progress Bars */}
                <div className="flex flex-col gap-6 md:gap-8 w-full shrink-0 mb-auto">
                  {(study.progressStats || [
                    { label: "ROI Target Hit", value: 92 },
                    { label: "Creator Satisfaction", value: 98 },
                    { label: "Campaign Completion", value: 100 },
                  ]).map((bar: any, idx: number) => (
                    <div key={bar.label} className="w-full flex flex-col gap-3 md:gap-4 shrink-0">
                      <div className="flex justify-between items-end">
                        <span className="text-xs md:text-sm font-medium text-[#111]/70 truncate pr-4">{bar.label}</span>
                        <span className="text-xs md:text-sm font-black text-[#111] shrink-0">{bar.value}%</span>
                      </div>
                      <div className="w-full h-1.5 md:h-2 bg-[#111]/10 rounded-full overflow-hidden shrink-0">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${bar.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: idx * 0.2, ease: "easeOut" }}
                          className={`h-full rounded-full ${idx === 0 ? 'bg-red-500' : idx === 1 ? 'bg-rose-500' : 'bg-orange-500'}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
           </div>

        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────
   Main Export
   ───────────────────────────────────── */
export default function ClientCaseStudies({ caseStudies }: { caseStudies: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative w-full">
      {caseStudies.map((study, i) => (
        <StackedCard 
          key={study.id} 
          study={study} 
          index={i} 
          progress={scrollYProgress} 
          total={caseStudies.length} 
        />
      ))}
    </div>
  );
}
