import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { ArrowRight, Clock, Eye } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creator Marketing Blog",
  description: "Industry insights, trends, and strategies for creator-led marketing.",
};

const POSTS = [
  { id: "influencer-trends-2024", title: "10 Influencer Marketing Trends Dominating 2024", excerpt: "From AI-powered creator matching to micro-influencer strategies, here's what's reshaping the creator economy.", category: "Trends", date: "Apr 28, 2024", readTime: "8 min", views: 4820, featured: true },
  { id: "ugc-roas-ecommerce", title: "How UGC Production Drives 5x ROAS for Ecommerce Brands", excerpt: "We analyzed 100+ campaigns and discovered the exact UGC formula that consistently delivers 5x+ return on ad spend.", category: "Strategy", date: "Apr 22, 2024", readTime: "6 min", views: 3640, featured: false },
  { id: "creator-campaigns-india-guide", title: "The Complete Guide to Creator Campaigns in India", excerpt: "Everything you need to know to launch, manage, and scale creator campaigns in the Indian market.", category: "Guide", date: "Apr 15, 2024", readTime: "12 min", views: 6120, featured: false },
  { id: "instagram-algorithm-2024", title: "Instagram Algorithm 2024: What Brands Need to Know", excerpt: "The algorithm changed again. Here's how it impacts your organic reach and what creator collaborations work best.", category: "Platform", date: "Apr 10, 2024", readTime: "7 min", views: 2890, featured: false },
  { id: "ai-content-systems-brand", title: "Building an AI Content System for Your Brand", excerpt: "How to leverage AI tools to create a scalable, consistent content engine that drives compounding growth.", category: "Technology", date: "Apr 5, 2024", readTime: "10 min", views: 3210, featured: false },
  { id: "micro-influencer-strategy", title: "Why Micro-Influencers Outperform Celebrities 3:1", excerpt: "Data from 200+ campaigns proves that nano and micro-influencers consistently deliver better ROI than mega creators.", category: "Strategy", date: "Mar 28, 2024", readTime: "5 min", views: 5430, featured: false },
];

const CATEGORY_COLOR: Record<string, string> = {
  Trends: "#f59e0b", Strategy: "#22c55e", Guide: "#3b82f6", Platform: "#8b5cf6", Technology: "#ec4899",
};

export default function BlogPage() {
  const featured = POSTS.find(p => p.featured);
  const rest = POSTS.filter(p => !p.featured);
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "var(--nav-height)" }}>
        <section style={{ padding: "80px 0 40px", textAlign: "center", background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(220,38,38,0.15), transparent)" }}>
          <div className="container">
            <div className="section-badge" style={{ margin: "0 auto 20px" }}>TCC Blog</div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,5vw,4rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>
              Insights to grow your brand<br /><span className="text-gradient-red">with creator marketing.</span>
            </h1>
            <p style={{ color: "rgba(17,17,17,0.55)", maxWidth: 500, margin: "0 auto" }}>Strategies, case studies, and industry intelligence from the TCC team.</p>
          </div>
        </section>

        <section style={{ padding: "40px 0 120px" }}>
          <div className="container">
            {featured && (
              <Link href={`/blog/${featured.id}`} style={{ textDecoration: "none", display: "block", marginBottom: 40 }}>
                <div className="card-glass" style={{
                  padding: "40px", borderRadius: 24,
                  background: "linear-gradient(135deg, rgba(220,38,38,0.08), rgba(255,255,255,0.8))",
                  display: "flex", justifyContent: "space-between", alignItems: "center", gap: 32,
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                      <span style={{ padding: "3px 10px", borderRadius: 100, fontSize: "0.65rem", fontWeight: 700, background: "rgba(220,38,38,0.15)", color: "#f87171", border: "1px solid rgba(220,38,38,0.2)", textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>Featured</span>
                      <span style={{ padding: "3px 10px", borderRadius: 100, fontSize: "0.65rem", fontWeight: 700, color: CATEGORY_COLOR[featured.category], background: `${CATEGORY_COLOR[featured.category]}15`, border: `1px solid ${CATEGORY_COLOR[featured.category]}25` }}>{featured.category}</span>
                    </div>
                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 800, color: "#111111", marginBottom: 12, lineHeight: 1.2 }}>{featured.title}</h2>
                    <p style={{ color: "rgba(17,17,17,0.55)", lineHeight: 1.7, marginBottom: 16 }}>{featured.excerpt}</p>
                    <div style={{ display: "flex", gap: 20, fontSize: "0.75rem", color: "rgba(17,17,17,0.35)" }}>
                      <span>{featured.date}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Clock size={11} /> {featured.readTime} read</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Eye size={11} /> {featured.views.toLocaleString()} views</span>
                    </div>
                  </div>
                  <div className="btn-primary" style={{ flexShrink: 0, padding: "12px 24px" }}>Read Article <ArrowRight size={14} /></div>
                </div>
              </Link>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
              {rest.map(post => (
                <Link key={post.id} href={`/blog/${post.id}`} style={{ textDecoration: "none" }}>
                  <div className="card-glass" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                    <span style={{ padding: "3px 10px", borderRadius: 100, fontSize: "0.65rem", fontWeight: 700, color: CATEGORY_COLOR[post.category] || "#f87171", background: `${CATEGORY_COLOR[post.category] || "#dc2626"}15`, border: `1px solid ${CATEGORY_COLOR[post.category] || "#dc2626"}25`, alignSelf: "flex-start", marginBottom: 12 }}>{post.category}</span>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "#111111", marginBottom: 10, lineHeight: 1.3, flex: 1 }}>{post.title}</h3>
                    <p style={{ fontSize: "0.85rem", color: "rgba(17,17,17,0.5)", lineHeight: 1.65, marginBottom: 16 }}>{post.excerpt}</p>
                    <div className="divider" style={{ marginBottom: 14 }} />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "rgba(17,17,17,0.35)" }}>
                      <span style={{ display: "flex", gap: 12 }}><span>{post.date}</span><span style={{ display: "flex", alignItems: "center", gap: 3 }}><Clock size={10} /> {post.readTime}</span></span>
                      <span style={{ color: "#f87171", display: "flex", alignItems: "center", gap: 3 }}>Read <ArrowRight size={11} /></span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div style={{ marginTop: 60, padding: 40, background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.18)", borderRadius: 20, textAlign: "center" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 800, marginBottom: 8 }}>Get weekly creator marketing insights.</h3>
              <p style={{ color: "rgba(17,17,17,0.5)", marginBottom: 24 }}>Join 5,000+ marketers getting our best strategies every week.</p>
              <div style={{ display: "flex", gap: 10, maxWidth: 420, margin: "0 auto" }}>
                <input className="input-field" placeholder="Enter your email..." style={{ flex: 1 }} />
                <button className="btn-primary">Subscribe</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
