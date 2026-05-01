const TICKER_ITEMS = [
  "Influencer Marketing", "Creator Campaigns", "UGC Production", "Instagram Growth",
  "AI Content Systems", "Brand Collaborations", "Paid Ads", "Creator Management",
  "Analytics & Tracking", "Social Media Strategy", "500+ Creators", "₹50Cr+ Revenue",
  "200+ Campaigns", "98% Retention",
];

export default function TickerSection() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div style={{
      overflow: "hidden",
      borderTop: "1px solid rgba(17,17,17,0.06)",
      borderBottom: "1px solid rgba(17,17,17,0.06)",
      background: "rgba(220,38,38,0.04)",
      padding: "14px 0",
    }}>
      <div style={{
        display: "flex",
        gap: "0",
        animation: "ticker 28s linear infinite",
        width: "max-content",
      }}>
        {doubled.map((item, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            padding: "0 28px",
            whiteSpace: "nowrap",
          }}>
            <span style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: i % 7 === 0 ? "#f87171" : "rgba(17,17,17,0.4)",
            }}>
              {item}
            </span>
            <span style={{
              margin: "0 0 0 28px",
              color: "rgba(220,38,38,0.4)",
              fontSize: "0.5rem",
            }}>◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}
