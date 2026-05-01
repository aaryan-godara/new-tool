"use client";
import { useState } from "react";
import { BRAND } from "@/lib/constants";
import { ArrowRight, CheckCircle, MessageCircle, Calendar, Mail, Phone, MapPin, Send, ChevronRight } from "lucide-react";

const STEPS = [
  { id: 1, title: "About You", desc: "Tell us about yourself" },
  { id: 2, title: "Your Goals", desc: "What do you want to achieve?" },
  { id: 3, title: "Budget & Timeline", desc: "Let's plan together" },
];

type FormData = {
  name: string; email: string; phone: string; company: string; website: string;
  businessType: string; goals: string[]; budget: string; timeline: string; message: string;
};

const BUSINESS_TYPES = ["Ecommerce Brand", "Startup", "Clinic / Healthcare", "Local Business", "Personal Brand", "D2C Brand", "Coach / Trainer", "Content Creator", "Other"];
const GOALS = ["Instagram Growth", "Creator Campaigns", "UGC Production", "Paid Ads", "Brand Awareness", "Lead Generation", "Product Launch", "AI Content System"];
const BUDGETS = ["₹25K–50K/month", "₹50K–1L/month", "₹1L–3L/month", "₹3L+/month", "Custom Enterprise"];
const TIMELINES = ["Immediately", "Within 1 month", "1–3 months", "3+ months"];

export default function ContactSection() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "", email: "", phone: "", company: "", website: "",
    businessType: "", goals: [], budget: "", timeline: "", message: "",
  });

  const toggleGoal = (g: string) => {
    setForm(f => ({
      ...f,
      goals: f.goals.includes(g) ? f.goals.filter(x => x !== g) : [...f.goals, g],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="section" id="contact">
        <div className="container" style={{ maxWidth: 600, textAlign: "center" }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "rgba(34,197,94,0.15)", border: "2px solid rgba(34,197,94,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 24px",
          }}>
            <CheckCircle size={36} color="#4ade80" />
          </div>
          <h2 className="section-title">We'll be in touch!</h2>
          <p style={{ color: "rgba(17,17,17,0.6)", marginTop: 12 }}>
            Our team will contact you within 2 business hours to schedule your strategy session.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 60, alignItems: "start" }}>
          {/* Left Info */}
          <div>
            <div className="section-badge">Get in Touch</div>
            <h2 className="section-title" style={{ marginTop: 16 }}>
              Let's scale your<br />
              <span className="text-gradient-red">brand together.</span>
            </h2>
            <p className="section-subtitle" style={{ marginBottom: 40 }}>
              Book a free strategy call and discover how TCC can generate 3-10x ROI through creator-led marketing.
            </p>

            {/* Contact Methods */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
              {[
                { icon: MessageCircle, label: "WhatsApp", value: BRAND.whatsapp, href: `https://wa.me/${BRAND.whatsapp}`, color: "#25d366" },
                { icon: Calendar, label: "Schedule Call", value: "Book on Calendly", href: "https://calendly.com/tcc", color: "#dc2626" },
                { icon: Mail, label: "Email Us", value: BRAND.email, href: `mailto:${BRAND.email}`, color: "#3b82f6" },
                { icon: Phone, label: "Call Us", value: BRAND.phone, href: `tel:${BRAND.phone}`, color: "#f59e0b" },
              ].map(item => (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "16px 20px",
                  background: "rgba(17,17,17,0.03)",
                  border: "1px solid rgba(17,17,17,0.07)",
                  borderRadius: 14,
                  textDecoration: "none",
                  transition: "all 0.2s",
                  cursor: "pointer",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = `${item.color}10`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${item.color}30`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(17,17,17,0.03)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(17,17,17,0.07)";
                  }}
                >
                  <div style={{
                    width: 40, height: 40,
                    borderRadius: 10,
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}25`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <item.icon size={18} color={item.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.7rem", color: "rgba(17,17,17,0.4)", marginBottom: 2, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#111111", fontWeight: 500 }}>{item.value}</div>
                  </div>
                  <ChevronRight size={16} color="rgba(17,17,17,0.2)" style={{ marginLeft: "auto" }} />
                </a>
              ))}
            </div>

            {/* Address */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(17,17,17,0.4)", fontSize: "0.85rem" }}>
              <MapPin size={16} color="#dc2626" />
              {BRAND.address}
            </div>
          </div>

          {/* Right Form */}
          <div className="glass" style={{ borderRadius: 24, padding: 36 }}>
            {/* Step Indicator */}
            <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
              {STEPS.map(s => (
                <div key={s.id} style={{ flex: 1 }}>
                  <div style={{
                    height: 3,
                    borderRadius: 2,
                    background: s.id <= step ? "linear-gradient(90deg, #dc2626, #f87171)" : "rgba(17,17,17,0.08)",
                    marginBottom: 6,
                    transition: "background 0.3s",
                  }} />
                  <div style={{ fontSize: "0.65rem", color: s.id === step ? "rgba(17,17,17,0.7)" : "rgba(17,17,17,0.3)", fontWeight: 600 }}>
                    Step {s.id}: {s.title}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1 */}
              {step === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, marginBottom: 4 }}>Tell us about you</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label className="label">Full Name *</label>
                      <input className="input-field" placeholder="Your name" value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                    </div>
                    <div>
                      <label className="label">Email *</label>
                      <input className="input-field" type="email" placeholder="you@company.com" value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label className="label">Phone</label>
                      <input className="input-field" placeholder="+91 98765 43210" value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                    </div>
                    <div>
                      <label className="label">Company</label>
                      <input className="input-field" placeholder="Your brand name" value={form.company}
                        onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <label className="label">Business Type *</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                      {BUSINESS_TYPES.map(type => (
                        <button type="button" key={type} onClick={() => setForm(f => ({ ...f, businessType: type }))}
                          style={{
                            padding: "6px 14px",
                            borderRadius: 100,
                            fontSize: "0.78rem",
                            fontWeight: 500,
                            cursor: "pointer",
                            border: "1px solid",
                            borderColor: form.businessType === type ? "rgba(220,38,38,0.5)" : "rgba(17,17,17,0.1)",
                            background: form.businessType === type ? "rgba(220,38,38,0.15)" : "transparent",
                            color: form.businessType === type ? "#111111" : "rgba(17,17,17,0.45)",
                            transition: "all 0.15s",
                          }}>
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, marginBottom: 4 }}>What are your goals?</h3>
                  <div>
                    <label className="label">Services Needed (select all that apply)</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                      {GOALS.map(g => (
                        <button type="button" key={g} onClick={() => toggleGoal(g)}
                          style={{
                            padding: "7px 14px",
                            borderRadius: 100,
                            fontSize: "0.78rem",
                            fontWeight: 500,
                            cursor: "pointer",
                            border: "1px solid",
                            borderColor: form.goals.includes(g) ? "rgba(220,38,38,0.5)" : "rgba(17,17,17,0.1)",
                            background: form.goals.includes(g) ? "rgba(220,38,38,0.15)" : "transparent",
                            color: form.goals.includes(g) ? "#f87171" : "rgba(17,17,17,0.45)",
                            transition: "all 0.15s",
                          }}>
                          {form.goals.includes(g) ? "✓ " : ""}{g}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="label">Additional Message</label>
                    <textarea className="input-field" rows={4} placeholder="Tell us more about your brand, challenges, and what you're looking to achieve..."
                      value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      style={{ resize: "vertical" }} />
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, marginBottom: 4 }}>Budget & Timeline</h3>
                  <div>
                    <label className="label">Monthly Budget</label>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                      {BUDGETS.map(b => (
                        <button type="button" key={b} onClick={() => setForm(f => ({ ...f, budget: b }))}
                          style={{
                            padding: "10px 16px",
                            borderRadius: 10,
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            cursor: "pointer",
                            border: "1px solid",
                            textAlign: "left",
                            borderColor: form.budget === b ? "rgba(220,38,38,0.5)" : "rgba(17,17,17,0.08)",
                            background: form.budget === b ? "rgba(220,38,38,0.12)" : "rgba(17,17,17,0.02)",
                            color: form.budget === b ? "#111111" : "rgba(17,17,17,0.5)",
                            transition: "all 0.15s",
                          }}>
                          {form.budget === b ? "● " : "○ "}{b}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="label">When to start?</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                      {TIMELINES.map(t => (
                        <button type="button" key={t} onClick={() => setForm(f => ({ ...f, timeline: t }))}
                          style={{
                            padding: "7px 16px",
                            borderRadius: 100,
                            fontSize: "0.8rem",
                            fontWeight: 500,
                            cursor: "pointer",
                            border: "1px solid",
                            borderColor: form.timeline === t ? "rgba(220,38,38,0.5)" : "rgba(17,17,17,0.1)",
                            background: form.timeline === t ? "rgba(220,38,38,0.15)" : "transparent",
                            color: form.timeline === t ? "#111111" : "rgba(17,17,17,0.45)",
                            transition: "all 0.15s",
                          }}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28 }}>
                {step > 1 ? (
                  <button type="button" onClick={() => setStep(s => s - 1)} className="btn-ghost">
                    ← Back
                  </button>
                ) : <div />}

                {step < 3 ? (
                  <button type="button" onClick={() => setStep(s => s + 1)} className="btn-primary">
                    Continue <ArrowRight size={16} />
                  </button>
                ) : (
                  <button type="submit" className="btn-primary">
                    Send Message <Send size={16} />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
