"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Star, BarChart3, FileText, Settings,
  Megaphone, MessageSquare, Globe, ShoppingBag, LogOut, Zap,
  ChevronRight, Bell, Search, Menu, X
} from "lucide-react";

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
          <Link href="/" className="sidebar-link">
            <LogOut size={14} />
            Back to Website
          </Link>
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
              fontSize: "0.875rem", fontWeight: 700, cursor: "pointer",
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
