"use client";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { useState } from "react";
import { ArrowRight, CheckCircle, Send } from "lucide-react";

const NICHES = ["Lifestyle", "Fashion", "Fitness", "Food", "Technology", "Finance", "Travel", "Beauty", "Gaming", "Education", "Motivation", "Business", "Health", "Sports", "Entertainment"];
const PLATFORMS = ["Instagram", "YouTube", "TikTok", "LinkedIn", "Twitter", "Snapchat", "Pinterest"];
const FOLLOWER_RANGES = ["1K–10K (Nano)", "10K–100K (Micro)", "100K–500K (Mid-tier)", "500K–1M (Macro)", "1M+ (Mega)"];

export default function CreatorJoinPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", niche: "", platforms: [] as string[], followers: "", instagram: "", youtube: "", portfolio: "", bio: "" });

  const togglePlatform = (p: string) => setForm(f => ({ ...f, platforms: f.platforms.includes(p) ? f.platforms.filter(x => x !== p) : [...f.platforms, p] }));

  if (submitted) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop: "var(--nav-height)", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", maxWidth: 480, padding: 24 }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(34,197,94,0.15)", border: "2px solid rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <CheckCircle size={36} color="#4ade80" />
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, marginBottom: 12 }}>Application Received!</h2>
            <p style={{ color: "rgba(17,17,17,0.55)", lineHeight: 1.7 }}>We review all applications within 48 hours. If you're a great fit, our creator team will reach out to get you onboarded.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "var(--nav-height)" }}>
        <section style={{ padding: "80px 0 120px" }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="section-badge" style={{ margin: "0 auto 16px" }}>Creator Application</div>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 12 }}>
                Join the TCC<br /><span className="text-gradient-red">Creator Network.</span>
              </h1>
              <p style={{ color: "rgba(17,17,17,0.55)", maxWidth: 500, margin: "0 auto" }}>
                Get access to premium brand deals, fair compensation, and a team that puts creators first.
              </p>
            </div>

            {/* Benefits */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 48 }}>
              {[
                { icon: "💰", title: "Premium Deals", desc: "Access top-tier brand partnerships" },
                { icon: "📊", title: "Analytics", desc: "Real-time campaign performance" },
                { icon: "🤝", title: "Full Support", desc: "Dedicated creator manager" },
              ].map(b => (
                <div key={b.title} style={{ padding: 20, background: "rgba(17,17,17,0.03)", border: "1px solid rgba(17,17,17,0.07)", borderRadius: 14, textAlign: "center" }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{b.icon}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem", marginBottom: 4 }}>{b.title}</div>
                  <div style={{ fontSize: "0.78rem", color: "rgba(17,17,17,0.45)" }}>{b.desc}</div>
                </div>
              ))}
            </div>

            {/* Steps indicator */}
            <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
              {["Your Profile", "Platforms & Stats", "Portfolio"].map((label, i) => (
                <div key={label} style={{ flex: 1 }}>
                  <div style={{ height: 3, borderRadius: 2, background: i + 1 <= step ? "linear-gradient(90deg,#dc2626,#f87171)" : "rgba(17,17,17,0.08)", marginBottom: 6, transition: "background 0.3s" }} />
                  <div style={{ fontSize: "0.65rem", color: i + 1 === step ? "rgba(17,17,17,0.7)" : "rgba(17,17,17,0.3)", fontWeight: 600 }}>Step {i + 1}: {label}</div>
                </div>
              ))}
            </div>

            <div className="glass" style={{ borderRadius: 24, padding: 36 }}>
              {step === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, marginBottom: 4 }}>Tell us about yourself</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div><label className="label">Full Name *</label><input className="input-field" placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
                    <div><label className="label">Email *</label><input className="input-field" type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
                  </div>
                  <div><label className="label">Phone</label><input className="input-field" placeholder="+91..." value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
                  <div>
                    <label className="label">Your Niche *</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                      {NICHES.map(n => (
                        <button type="button" key={n} onClick={() => setForm(f => ({ ...f, niche: n }))} style={{ padding: "6px 14px", borderRadius: 100, fontSize: "0.78rem", fontWeight: 500, cursor: "pointer", border: "1px solid", transition: "all 0.15s", borderColor: form.niche === n ? "rgba(220,38,38,0.5)" : "rgba(17,17,17,0.1)", background: form.niche === n ? "rgba(220,38,38,0.15)" : "transparent", color: form.niche === n ? "#111111" : "rgba(17,17,17,0.45)" }}>{n}</button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, marginBottom: 4 }}>Platforms & Stats</h3>
                  <div>
                    <label className="label">Active Platforms *</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                      {PLATFORMS.map(p => (
                        <button type="button" key={p} onClick={() => togglePlatform(p)} style={{ padding: "7px 14px", borderRadius: 100, fontSize: "0.78rem", fontWeight: 500, cursor: "pointer", border: "1px solid", transition: "all 0.15s", borderColor: form.platforms.includes(p) ? "rgba(220,38,38,0.5)" : "rgba(17,17,17,0.1)", background: form.platforms.includes(p) ? "rgba(220,38,38,0.15)" : "transparent", color: form.platforms.includes(p) ? "#f87171" : "rgba(17,17,17,0.45)" }}>{form.platforms.includes(p) ? "✓ " : ""}{p}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="label">Total Follower Range *</label>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                      {FOLLOWER_RANGES.map(r => (
                        <button type="button" key={r} onClick={() => setForm(f => ({ ...f, followers: r }))} style={{ padding: "10px 16px", borderRadius: 10, fontSize: "0.875rem", fontWeight: 500, cursor: "pointer", border: "1px solid", textAlign: "left" as const, transition: "all 0.15s", borderColor: form.followers === r ? "rgba(220,38,38,0.5)" : "rgba(17,17,17,0.08)", background: form.followers === r ? "rgba(220,38,38,0.12)" : "rgba(17,17,17,0.02)", color: form.followers === r ? "#111111" : "rgba(17,17,17,0.5)" }}>{form.followers === r ? "● " : "○ "}{r}</button>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div><label className="label">Instagram Handle</label><input className="input-field" placeholder="@username" value={form.instagram} onChange={e => setForm(f => ({ ...f, instagram: e.target.value }))} /></div>
                    <div><label className="label">YouTube Channel</label><input className="input-field" placeholder="Channel URL" value={form.youtube} onChange={e => setForm(f => ({ ...f, youtube: e.target.value }))} /></div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, marginBottom: 4 }}>Portfolio & Bio</h3>
                  <div><label className="label">Portfolio / Media Kit URL</label><input className="input-field" placeholder="https://..." value={form.portfolio} onChange={e => setForm(f => ({ ...f, portfolio: e.target.value }))} /></div>
                  <div>
                    <label className="label">Short Bio</label>
                    <textarea className="input-field" rows={4} placeholder="Tell us about your content style, audience, and what makes you unique..." value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} style={{ resize: "vertical" }} />
                  </div>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28 }}>
                {step > 1 ? <button type="button" onClick={() => setStep(s => s - 1)} className="btn-ghost">← Back</button> : <div />}
                {step < 3
                  ? <button type="button" onClick={() => setStep(s => s + 1)} className="btn-primary">Continue <ArrowRight size={16} /></button>
                  : <button type="button" onClick={() => setSubmitted(true)} className="btn-primary">Submit Application <Send size={16} /></button>
                }
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
