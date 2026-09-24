import { supabase } from "./client";
import { Programme, Campaign, Story, SiteSettings } from "../data/types";

export async function getProgrammes(): Promise<Programme[]> {
  const { data, error } = await supabase.from("programmes").select("*");
  if (error) {
    console.error("Error fetching programmes:", error);
    return [];
  }
  return data as unknown as Programme[];
}

export async function getCampaigns(): Promise<Campaign[]> {
  const { data, error } = await supabase.from("campaigns").select("*");
  if (error) {
    console.error("Error fetching campaigns:", error);
    return [];
  }
  return data.map((d) => ({
    ...d,
    endDate: d.end_date,
  })) as unknown as Campaign[];
}

export async function getStories(): Promise<Story[]> {
  const { data, error } = await supabase.from("stories").select("*");
  if (error) {
    console.error("Error fetching stories:", error);
    return [];
  }
  return data as unknown as Story[];
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).single();
  if (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
  
  if (!data) return null;
  
  return {
    emergencyMode: data.emergency_mode || false,
    emergencyMessage: data.emergency_message || "",
    contactEmail: data.contact_email || "",
    contactPhone: data.contact_phone || "",
    address: data.address || "",
  } as SiteSettings;
}
