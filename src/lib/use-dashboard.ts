"use client";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabase";
import type { Lead, Client, Creator } from "./dashboard-store";

function mapLead(db: any): Lead {
  return { ...db, createdAt: new Date(db.created_at).getTime() };
}
function mapClient(db: any): Client {
  return { ...db, createdAt: new Date(db.created_at).getTime() };
}
function mapCreator(db: any): Creator {
  return { ...db, createdAt: new Date(db.created_at).getTime() };
}

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);

  const refresh = useCallback(async () => {
    const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (data) setLeads(data.map(mapLead));
  }, []);

  useEffect(() => {
    refresh();
    const channel = supabase.channel('leads_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, refresh)
      .subscribe();
    return () => { supabase.removeChannel(channel) };
  }, [refresh]);

  return {
    leads,
    addLead: async (lead: Omit<Lead, "id" | "createdAt" | "time">) => { 
      await supabase.from('leads').insert([{...lead, time: "Just now"}]); 
      refresh(); 
    },
    updateLead: async (id: number, updates: Partial<Lead>) => { 
      await supabase.from('leads').update(updates).eq('id', id); 
      refresh(); 
    },
    deleteLead: async (id: number) => { 
      await supabase.from('leads').delete().eq('id', id); 
      refresh(); 
    },
    refresh,
  };
}

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);

  const refresh = useCallback(async () => {
    const { data } = await supabase.from('clients').select('*').order('created_at', { ascending: false });
    if (data) setClients(data.map(mapClient));
  }, []);

  useEffect(() => {
    refresh();
    const channel = supabase.channel('clients_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'clients' }, refresh)
      .subscribe();
    return () => { supabase.removeChannel(channel) };
  }, [refresh]);

  return {
    clients,
    addClient: async (client: Omit<Client, "id" | "createdAt">) => { 
      await supabase.from('clients').insert([client]); 
      refresh(); 
    },
    updateClient: async (id: number, updates: Partial<Client>) => { 
      await supabase.from('clients').update(updates).eq('id', id); 
      refresh(); 
    },
    deleteClient: async (id: number) => { 
      await supabase.from('clients').delete().eq('id', id); 
      refresh(); 
    },
    refresh,
  };
}

export function useCreators() {
  const [creators, setCreators] = useState<Creator[]>([]);

  const refresh = useCallback(async () => {
    const { data } = await supabase.from('creators').select('*').order('created_at', { ascending: false });
    if (data) setCreators(data.map(mapCreator));
  }, []);

  useEffect(() => {
    refresh();
    const channel = supabase.channel('creators_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'creators' }, refresh)
      .subscribe();
    return () => { supabase.removeChannel(channel) };
  }, [refresh]);

  return {
    creators,
    addCreator: async (creator: Omit<Creator, "id" | "createdAt">) => { 
      await supabase.from('creators').insert([creator]); 
      refresh(); 
    },
    deleteCreator: async (id: number) => { 
      await supabase.from('creators').delete().eq('id', id); 
      refresh(); 
    },
    refresh,
  };
}

export function useDashboardStats() {
  const { leads } = useLeads();
  const { clients } = useClients();
  const { creators } = useCreators();

  const [stats, setStats] = useState({
    totalRevenue: "₹0Cr",
    activeClients: 0,
    creatorNetwork: 0,
    liveCampaigns: 0,
    totalReach: "0M",
    avgRoas: "7.8x",
    totalLeads: 0,
    hotLeads: 0,
    warmLeads: 0,
    conversionRate: "0%",
  });

  useEffect(() => {
    setStats({
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
    });
  }, [leads, clients, creators]);

  return stats;
}
