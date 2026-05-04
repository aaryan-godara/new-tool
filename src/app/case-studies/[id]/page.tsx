import { notFound } from "next/navigation";
import { CASE_STUDIES } from "@/lib/constants";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { ArrowRight, CheckCircle2, Target, Zap } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({
    id: study.id,
  }));
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const study = CASE_STUDIES.find((s) => s.id === id);

  if (!study) {
    notFound();
  }

  // Generate generic professional copy based on category
  const challengeText = `Before partnering with TCC, ${study.brand} was struggling to achieve scalable, authentic growth in the highly competitive ${study.category.toLowerCase()} market. Traditional paid ads were suffering from rising acquisition costs, and their organic efforts weren't breaking through the noise. They needed a holistic creator-led approach that could drive massive awareness without compromising brand equity.`;
  
  const strategyText = `Our approach was to fundamentally shift ${study.brand}'s reliance on traditional channels toward an influencer-first engine. We mapped out a multi-tiered creator matrix—combining high-reach macro creators for top-of-funnel explosive awareness, with micro and nano creators for hyper-targeted, trust-driven conversion.`;
  
  const executionText = `Over the course of ${study.duration || "several months"}, TCC's dedicated campaign managers orchestrated a synchronized content rollout. Using our proprietary AI-matching systems, we deployed hyper-relevant UGC and creator-led ads. The campaign was continuously optimized in real-time based on strict ROAS and engagement KPIs.`;

  // Abstract gradients for the hero block based on category
  const getGradient = (category: string) => {
    if (category.toLowerCase().includes("beauty")) return "from-rose-400 via-pink-500 to-red-500";
    if (category.toLowerCase().includes("health") || category.toLowerCase().includes("fitness")) return "from-orange-400 via-red-500 to-rose-600";
    if (category.toLowerCase().includes("tech")) return "from-blue-500 via-indigo-500 to-purple-600";
    return "from-slate-700 via-gray-900 to-black";
  };

  return (
    <div className="bg-[#f8f8f7] min-h-screen font-sans selection:bg-red-500 selection:text-white">
       <Navbar />
       
       <main className="w-full relative bg-[#fafafa]">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-[60vh] bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none" />
          
          {/* Glowing Orbs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-500/5 blur-[100px] rounded-full pointer-events-none" />

          {/* HERO SECTION */}
          <section className="relative px-6 w-full max-w-5xl mx-auto flex flex-col items-center text-center pt-32 md:pt-48 mb-20 md:mb-28">
             <div className="relative z-10 flex flex-col items-center gap-6">
                 {/* Badge */}
                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#111] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase border border-[#111]/10 shadow-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.4)]" />
                    {study.category} Case Study
                 </div>
                 
                 {/* Title */}
                 <h1 className="text-6xl md:text-8xl lg:text-[6.5rem] font-black tracking-tighter text-balance leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-[#111] to-[#444] pb-2">
                    {study.brand}
                 </h1>
                 
                 {/* Subtitle */}
                 <p className="text-xl md:text-2xl text-[#111]/60 leading-relaxed font-light max-w-3xl text-balance mt-2">
                    {study.summary || study.description}
                 </p>
             </div>

             {/* STATS ROW (Integrated & Elevated) */}
             <div className="relative z-10 w-full mt-16 md:mt-20 flex flex-wrap justify-center gap-4">
                {/* Duration Card */}
                <div className="flex flex-col items-center justify-center py-5 px-8 md:py-6 md:px-10 rounded-[1.5rem] bg-white/80 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 min-w-[150px]">
                  <div className="text-3xl md:text-4xl font-black text-red-600 tracking-tighter mb-1.5">{study.duration || "3 Months"}</div>
                  <div className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#111]/40 font-bold">Duration</div>
                </div>

                {/* Stat Cards */}
                {Object.entries(study.results).map(([key, value]) => (
                  <div key={key} className="flex flex-col items-center justify-center py-5 px-8 md:py-6 md:px-10 rounded-[1.5rem] bg-white/80 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 min-w-[150px]">
                    <div className="text-3xl md:text-4xl font-black text-red-600 tracking-tighter mb-1.5">{value as string}</div>
                    <div className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#111]/40 font-bold">{key}</div>
                  </div>
                ))}
             </div>
          </section>

          {/* THE BREAKDOWN (Structured Cards Layout) */}
          <section className="relative z-10 w-full px-6 max-w-4xl mx-auto mb-24 md:mb-40 flex flex-col items-center text-center">
             {/* Subtle Divider */}
             <div className="w-full max-w-xs h-[1px] bg-gradient-to-r from-transparent via-[#111]/10 to-transparent mb-16 md:mb-24" />
             
             <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#111] mb-12 md:mb-16">
                The Breakdown
             </h2>
             
             <div className="flex flex-col gap-6 md:gap-8 w-full items-center">
                {/* Challenge Card */}
                <div className="w-full bg-white rounded-[2rem] p-10 md:p-14 border border-[#111]/5 shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col items-center relative overflow-hidden group hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] transition-shadow duration-500">
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-red-500/5 blur-[80px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   <div className="w-16 h-16 rounded-[1.5rem] bg-red-500/5 flex items-center justify-center text-red-500 border border-red-500/10 mb-6 relative z-10">
                      <Target size={28} strokeWidth={1.5} />
                   </div>
                   <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#111] mb-4 relative z-10">The Challenge</h3>
                   <p className="text-lg md:text-xl text-[#111]/60 leading-relaxed font-light text-balance max-w-2xl relative z-10">
                      {challengeText}
                   </p>
                </div>

                {/* Strategy Card */}
                <div className="w-full bg-white rounded-[2rem] p-10 md:p-14 border border-[#111]/5 shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col items-center relative overflow-hidden group hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] transition-shadow duration-500">
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-blue-500/5 blur-[80px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   <div className="w-16 h-16 rounded-[1.5rem] bg-blue-500/5 flex items-center justify-center text-blue-500 border border-blue-500/10 mb-6 relative z-10">
                      <Zap size={28} strokeWidth={1.5} />
                   </div>
                   <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#111] mb-4 relative z-10">Our Strategy</h3>
                   <p className="text-lg md:text-xl text-[#111]/60 leading-relaxed font-light text-balance max-w-2xl relative z-10">
                      {strategyText}
                   </p>
                </div>

                {/* Execution Card */}
                <div className="w-full bg-white rounded-[2rem] p-10 md:p-14 border border-[#111]/5 shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col items-center relative overflow-hidden group hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] transition-shadow duration-500">
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-500/5 flex items-center justify-center text-emerald-500 border border-emerald-500/10 mb-6 relative z-10">
                      <CheckCircle2 size={28} strokeWidth={1.5} />
                   </div>
                   <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#111] mb-4 relative z-10">The Execution</h3>
                   <p className="text-lg md:text-xl text-[#111]/60 leading-relaxed font-light text-balance max-w-2xl relative z-10">
                      {executionText}
                   </p>
                </div>
             </div>
          </section>

          {/* CTA SECTION */}
          <section className="relative z-10 w-full px-6 max-w-5xl mx-auto flex justify-center pb-20">
             <div className="w-full bg-[#111] rounded-[2rem] md:rounded-[3rem] p-10 md:p-16 text-center flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 blur-[60px] rounded-full pointer-events-none" />
                
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-5 relative z-10 text-balance">
                   Want results like {study.brand}?
                </h2>
                <p className="text-base md:text-lg text-white/60 font-light mb-10 max-w-xl relative z-10">
                   Stop wasting budget on underperforming ads. Partner with TCC and scale your brand with our premium creator network and AI-driven campaigns.
                </p>
                
                <Link 
                   href="/contact"
                   className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-[#111] text-sm md:text-base font-bold hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)] relative z-10 group"
                >
                   Book a Strategy Call
                   <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
             </div>
          </section>
       </main>
       
       <Footer />
    </div>
  );
}
