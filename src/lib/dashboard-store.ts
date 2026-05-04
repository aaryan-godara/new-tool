// ─── TCC Dashboard Data Store ───
// Uses localStorage for persistence + custom events for real-time cross-tab/component sync

export interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  type: string;
  budget: string;
  status: "Hot" | "Warm" | "New" | "Closed";
  source: string;
  time: string;
  notes: string;
  createdAt: number;
}

export interface Client {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  plan: "Starter" | "Growth" | "Enterprise";
  revenue: string;
  campaigns: number;
  status: "Active" | "Onboarding" | "Paused";
  joined: string;
  createdAt: number;
}

export interface Creator {
  id: number;
  name: string;
  handle: string;
  platform: string; // primary platform
  platforms?: string[]; // all platforms for full card
  followers: string;
  category: string;
  rate: string;
  engagement: string;
  status: "Active" | "Inactive" | "Pending";
  rating: number;
  campaigns: number;
  createdAt: number;
  location?: string;
  avatar?: string;
  verified?: boolean;
}

// ─── Default seed data ───
const DEFAULT_LEADS: Lead[] = [
  { id: 1, name: "Priya Sharma", company: "LuxeBeauty", email: "priya@luxebeauty.com", phone: "+91 98765 43210", type: "Ecommerce", budget: "₹1.5L/mo", status: "Hot", source: "Contact Form", time: "2m ago", notes: "Very interested in Growth plan, wants to start ASAP.", createdAt: Date.now() - 120000 },
  { id: 2, name: "Arjun Seth", company: "FitGlow Nutrition", email: "arjun@fitglow.in", phone: "+91 87654 32109", type: "D2C Brand", budget: "₹75K/mo", status: "Warm", source: "WhatsApp", time: "18m ago", notes: "Looking for UGC production and Instagram growth.", createdAt: Date.now() - 1080000 },
  { id: 3, name: "Dr. Kavya Nair", company: "Nair Wellness Clinic", email: "kavya@nairwellness.com", phone: "+91 76543 21098", type: "Healthcare", budget: "₹50K/mo", status: "New", source: "Google Ads", time: "1h ago", notes: "", createdAt: Date.now() - 3600000 },
  { id: 4, name: "Rohit Agarwal", company: "TechStartup Pro", email: "rohit@techstartup.io", phone: "+91 65432 10987", type: "Startup", budget: "₹2L/mo", status: "Hot", source: "Instagram DM", time: "2h ago", notes: "Enterprise inquiry, needs full campaign management.", createdAt: Date.now() - 7200000 },
  { id: 5, name: "Sneha Kumar", company: "LuxeCosmetics", email: "sneha@luxecosmetics.com", phone: "+91 54321 09876", type: "Beauty", budget: "₹1L/mo", status: "Warm", source: "Referral", time: "3h ago", notes: "Referred by FitCore India. High intent.", createdAt: Date.now() - 10800000 },
];

const DEFAULT_CLIENTS: Client[] = [
  { id: 1, name: "LuxeBeauty", contact: "Priya Sharma", email: "priya@luxebeauty.com", phone: "+91 98765 43210", plan: "Growth", revenue: "₹1.5L/mo", campaigns: 4, status: "Active", joined: "Jan 2024", createdAt: Date.now() - 86400000 * 90 },
  { id: 2, name: "FitCore India", contact: "Arjun Mehta", email: "arjun@fitcore.in", phone: "+91 87654 32109", plan: "Enterprise", revenue: "₹3.2L/mo", campaigns: 8, status: "Active", joined: "Nov 2023", createdAt: Date.now() - 86400000 * 150 },
  { id: 3, name: "StyleVault", contact: "Kavya Reddy", email: "kavya@stylevault.com", phone: "+91 76543 21098", plan: "Growth", revenue: "₹1.2L/mo", campaigns: 3, status: "Active", joined: "Feb 2024", createdAt: Date.now() - 86400000 * 60 },
  { id: 4, name: "TechGadgetHub", contact: "Rohit Gupta", email: "rohit@techgadgethub.com", phone: "+91 65432 10987", plan: "Starter", revenue: "₹55K/mo", campaigns: 2, status: "Active", joined: "Mar 2024", createdAt: Date.now() - 86400000 * 30 },
  { id: 5, name: "WellnessFirst", contact: "Sneha Patel", email: "sneha@wellnessfirst.com", phone: "+91 54321 09876", plan: "Growth", revenue: "₹1L/mo", campaigns: 3, status: "Onboarding", joined: "Apr 2024", createdAt: Date.now() - 86400000 * 15 },
];

const DEFAULT_CREATORS: Creator[] = [
  { id: 1, name: "Ananya Verma", handle: "@ananyaverma", platform: "Instagram", platforms: ["Instagram", "YouTube"], followers: "245K", category: "Beauty", rate: "₹25K/post", engagement: "4.8%", status: "Active", rating: 5, campaigns: 12, createdAt: Date.now(), location: "Mumbai", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80", verified: true },
  { id: 2, name: "Vikram Raj", handle: "@vikramfitness", platform: "YouTube", platforms: ["YouTube", "Instagram"], followers: "1.2M", category: "Fitness", rate: "₹80K/video", engagement: "6.2%", status: "Active", rating: 5, campaigns: 8, createdAt: Date.now(), location: "Delhi", avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=800&q=80", verified: true },
  { id: 3, name: "Meera Joshi", handle: "@meerastyle", platform: "Instagram", platforms: ["Instagram", "TikTok"], followers: "89K", category: "Fashion", rate: "₹12K/post", engagement: "5.1%", status: "Active", rating: 4, campaigns: 6, createdAt: Date.now(), location: "Bangalore", avatar: "https://images.unsplash.com/photo-1583766395091-2eb9994ed094?auto=format&fit=crop&w=800&q=80", verified: true },
  { id: 4, name: "Karan Malhotra", handle: "@karantech", platform: "YouTube", platforms: ["YouTube", "Instagram"], followers: "560K", category: "Tech", rate: "₹45K/video", engagement: "3.9%", status: "Active", rating: 4, campaigns: 4, createdAt: Date.now(), location: "Pune", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80", verified: true },
  { id: 5, name: "Riya Kapoor", handle: "@riyalifestyle", platform: "Instagram", platforms: ["Instagram"], followers: "320K", category: "Lifestyle", rate: "₹30K/post", engagement: "5.5%", status: "Pending", rating: 4, campaigns: 0, createdAt: Date.now(), location: "Mumbai", avatar: "https://images.unsplash.com/photo-1605993439219-9d09d2020fa5?auto=format&fit=crop&w=800&q=80", verified: false },
];

// ─── Storage Keys ───
const KEYS = {
  leads: "tcc_leads",
  clients: "tcc_clients",
  creators: "tcc_creators_v2",
};

// ─── Custom Event for real-time sync ───
const STORE_EVENT = "tcc-store-update";

function emitUpdate(collection: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(STORE_EVENT, { detail: { collection } }));
  }
}

// ─── Generic CRUD helpers ───
function getCollection<T>(key: string, defaults: T[]): T[] {
  if (typeof window === "undefined") return defaults;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaults));
      return defaults;
    }
    return JSON.parse(raw);
  } catch {
    return defaults;
  }
}

function setCollection<T>(key: string, data: T[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
}

// ─── LEADS ───
export function getLeads(): Lead[] {
  return getCollection(KEYS.leads, DEFAULT_LEADS);
}

export function addLead(lead: Omit<Lead, "id" | "createdAt" | "time">): Lead {
  const leads = getLeads();
  const newLead: Lead = { ...lead, id: Date.now(), createdAt: Date.now(), time: "Just now" };
  leads.unshift(newLead);
  setCollection(KEYS.leads, leads);
  emitUpdate("leads");
  return newLead;
}

export function updateLead(id: number, updates: Partial<Lead>) {
  const leads = getLeads();
  const idx = leads.findIndex(l => l.id === id);
  if (idx !== -1) {
    leads[idx] = { ...leads[idx], ...updates };
    setCollection(KEYS.leads, leads);
    emitUpdate("leads");
  }
}

export function deleteLead(id: number) {
  const leads = getLeads().filter(l => l.id !== id);
  setCollection(KEYS.leads, leads);
  emitUpdate("leads");
}

// ─── CLIENTS ───
export function getClients(): Client[] {
  return getCollection(KEYS.clients, DEFAULT_CLIENTS);
}

export function addClient(client: Omit<Client, "id" | "createdAt">): Client {
  const clients = getClients();
  const newClient: Client = { ...client, id: Date.now(), createdAt: Date.now() };
  clients.unshift(newClient);
  setCollection(KEYS.clients, clients);
  emitUpdate("clients");
  return newClient;
}

export function updateClient(id: number, updates: Partial<Client>) {
  const clients = getClients();
  const idx = clients.findIndex(c => c.id === id);
  if (idx !== -1) {
    clients[idx] = { ...clients[idx], ...updates };
    setCollection(KEYS.clients, clients);
    emitUpdate("clients");
  }
}

export function deleteClient(id: number) {
  const clients = getClients().filter(c => c.id !== id);
  setCollection(KEYS.clients, clients);
  emitUpdate("clients");
}

// ─── CREATORS ───
export function getCreators(): Creator[] {
  return getCollection(KEYS.creators, DEFAULT_CREATORS);
}

export function addCreator(creator: Omit<Creator, "id" | "createdAt">): Creator {
  const creators = getCreators();
  const newCreator: Creator = { ...creator, id: Date.now(), createdAt: Date.now() };
  creators.unshift(newCreator);
  setCollection(KEYS.creators, creators);
  emitUpdate("creators");
  return newCreator;
}

export function deleteCreator(id: number) {
  const creators = getCreators().filter(c => c.id !== id);
  setCollection(KEYS.creators, creators);
  emitUpdate("creators");
}

// ─── Dashboard Stats (computed from live data) ───
export function getDashboardStats() {
  const leads = getLeads();
  const clients = getClients();
  const creators = getCreators();

  return {
    totalRevenue: `₹${(clients.length * 1.2).toFixed(1)}Cr`,
    activeClients: clients.filter(c => c.status === "Active").length,
    creatorNetwork: creators.length,
    liveCampaigns: clients.reduce((sum, c) => sum + c.campaigns, 0),
    totalReach: `${(creators.length * 0.8).toFixed(1)}M`,
    avgRoas: "7.8x",
    totalLeads: leads.length,
    hotLeads: leads.filter(l => l.status === "Hot").length,
    warmLeads: leads.filter(l => l.status === "Warm").length,
    conversionRate: clients.length > 0 ? `${Math.round((clients.length / (clients.length + leads.length)) * 100)}%` : "0%",
  };
}

// ─── Hook helper: subscribe to store changes ───
export function onStoreUpdate(callback: (collection: string) => void) {
  if (typeof window === "undefined") return () => {};
  const handler = (e: Event) => {
    const detail = (e as CustomEvent).detail;
    callback(detail.collection);
  };
  window.addEventListener(STORE_EVENT, handler);
  return () => window.removeEventListener(STORE_EVENT, handler);
}
