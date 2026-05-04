"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Users, Star, BarChart3, FileText, Settings,
  Megaphone, MessageSquare, Globe, ShoppingBag, LogOut, Zap,
  ChevronRight, Bell, Search, Menu, X, Lock
} from "lucide-react";
import { getAuth, login, logout, onAuthUpdate } from "@/lib/auth-store";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
      { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
    ],
  },
  {
    label: "Management",
    items: [
      { icon: Users, label: "Clients", href: "/admin/clients" },
      { icon: Star, label: "Creators", href: "/admin/creators" },
      { icon: Megaphone, label: "Campaigns", href: "/admin/campaigns" },
      { icon: MessageSquare, label: "Leads", href: "/admin/leads" },
    ],
  },
  {
    label: "Content",
    items: [
      { icon: FileText, label: "Blog CMS", href: "/admin/blog" },
      { icon: Globe, label: "Website CMS", href: "/admin/cms" },
      { icon: ShoppingBag, label: "Services CMS", href: "/admin/services" },
    ],
  },
  {
    label: "System",
    items: [
      { icon: Globe, label: "SEO Manager", href: "/admin/seo" },
      { icon: Settings, label: "Settings", href: "/admin/settings" },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  // Auth state
  const [isAuth, setIsAuth] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
    setIsAuth(getAuth().isLoggedIn);
    const cleanup = onAuthUpdate(() => {
      setIsAuth(getAuth().isLoggedIn);
    });
    return cleanup;
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = login(email, password);
    if (!result.success) {
      setError(result.error || "Login failed");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!mounted) return null;

  // Render Login Screen if not authenticated
  if (!isAuth) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f9fa", padding: 20 }}>
        <div style={{ width: "100%", maxWidth: 420, background: "#fff", padding: 40, borderRadius: 24, boxShadow: "0 20px 40px rgba(0,0,0,0.08)", border: "1px solid rgba(17,17,17,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg, #dc2626, #7f1d1d)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(220,38,38,0.3)" }}>
              <Lock size={24} color="#fff" />
            </div>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, textAlign: "center", marginBottom: 8 }}>Admin Access</h1>
          <p style={{ textAlign: "center", color: "rgba(17,17,17,0.5)", fontSize: "0.875rem", marginBottom: 32 }}>Please sign in to access the dashboard.</p>
          
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {error && (
              <div style={{ padding: 12, background: "rgba(220,38,38,0.1)", color: "#dc2626", borderRadius: 8, fontSize: "0.85rem", fontWeight: 600, textAlign: "center" }}>
                {error}
              </div>
            )}
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "rgba(17,17,17,0.7)", marginBottom: 8 }}>Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@tcc.com"
                style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(17,17,17,0.1)", background: "rgba(17,17,17,0.02)", fontSize: "0.9rem", outline: "none" }}
                required
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "rgba(17,17,17,0.7)", marginBottom: 8 }}>Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(17,17,17,0.1)", background: "rgba(17,17,17,0.02)", fontSize: "0.9rem", outline: "none" }}
                required
              />
            </div>
            <button type="submit" style={{ width: "100%", padding: "14px", background: "#dc2626", color: "#fff", borderRadius: 10, border: "none", fontWeight: 600, fontSize: "0.95rem", cursor: "pointer", marginTop: 8, boxShadow: "0 4px 12px rgba(220,38,38,0.2)" }}>
              Sign In
            </button>
          </form>
          
          <div style={{ marginTop: 24, textAlign: "center" }}>
            <Link href="/" style={{ color: "rgba(17,17,17,0.4)", fontSize: "0.8rem", textDecoration: "none" }}>← Back to Website</Link>
          </div>
        </div>
      </div>
    );
  }

  // Render Dashboard
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--black-rich)" }}>
      {/* Sidebar */}
      <aside style={{
        width: "var(--sidebar-width)",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        background: "rgba(248,249,250,0.97)",
        borderRight: "1px solid var(--charcoal-border)",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        transition: "transform 0.3s ease",
      }}
        className={sidebarOpen ? "sidebar-visible" : ""}
      >
        {/* Logo */}
        <div style={{
          padding: "20px 16px",
          borderBottom: "1px solid var(--charcoal-border)",
        }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 8,
              background: "linear-gradient(135deg, #dc2626, #7f1d1d)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 16px rgba(220,38,38,0.4)",
            }}>
              <Zap size={16} color="#111111" strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.95rem", color: "#111111" }}>TCC Admin</div>
              <div style={{ fontSize: "0.6rem", color: "rgba(17,17,17,0.3)", letterSpacing: "0.1em" }}>THE CREATOR CONNECT</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 24 }}>
          {NAV_GROUPS.map(group => (
            <div key={group.label}>
              <div style={{
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(17,17,17,0.25)",
                padding: "0 8px",
                marginBottom: 6,
              }}>
                {group.label}
              </div>
              {group.items.map(item => {
                const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`sidebar-link ${active ? "active" : ""}`}
                  >
                    <item.icon size={16} />
                    {item.label}
                    {active && <ChevronRight size={12} style={{ marginLeft: "auto" }} />}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div style={{
          padding: "12px",
          borderTop: "1px solid var(--charcoal-border)",
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 12px",
            borderRadius: 10,
            background: "rgba(17,17,17,0.03)",
            marginBottom: 8,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "linear-gradient(135deg, #dc2626, #7f1d1d)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.875rem", fontWeight: 700,
            }}>A</div>
            <div>
              <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#111111" }}>Admin</div>
              <div style={{ fontSize: "0.65rem", color: "rgba(17,17,17,0.35)" }}>hello@thecreatorconnect.com</div>
            </div>
          </div>
          <button onClick={handleLogout} className="sidebar-link" style={{ width: "100%", border: "none", background: "none", cursor: "pointer", textAlign: "left" }}>
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ marginLeft: "var(--sidebar-width)", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top Bar */}
        <header style={{
          height: 60,
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(248,249,250,0.9)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--charcoal-border)",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          gap: 16,
        }}>
          {/* Search */}
          <div style={{
            flex: 1,
            maxWidth: 400,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 14px",
            background: "rgba(17,17,17,0.04)",
            border: "1px solid rgba(17,17,17,0.07)",
            borderRadius: 10,
          }}>
            <Search size={14} color="rgba(17,17,17,0.3)" />
            <input
              placeholder="Search campaigns, clients, creators..."
              style={{
                background: "none", border: "none", outline: "none",
                color: "#111111", fontSize: "0.85rem", flex: 1,
              }}
            />
            <kbd style={{
              padding: "2px 6px",
              background: "rgba(17,17,17,0.06)",
              border: "1px solid rgba(17,17,17,0.08)",
              borderRadius: 4,
              fontSize: "0.65rem",
              color: "rgba(17,17,17,0.3)",
            }}>⌘K</kbd>
          </div>

          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            <button style={{
              width: 36, height: 36, borderRadius: 8,
              background: "rgba(17,17,17,0.04)",
              border: "1px solid rgba(17,17,17,0.07)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "rgba(17,17,17,0.6)",
              position: "relative",
            }}>
              <Bell size={16} />
              <span style={{
                position: "absolute", top: 6, right: 6,
                width: 6, height: 6, borderRadius: "50%",
                background: "#dc2626",
              }} />
            </button>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "linear-gradient(135deg, #dc2626, #7f1d1d)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.875rem", fontWeight: 700, cursor: "pointer", color: "#fff"
            }}>A</div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: "24px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
