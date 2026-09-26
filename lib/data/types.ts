export interface Programme {
  id: string;
  title: string;
  slug: string;
  description: string;
  category:
    | "Health"
    | "Education"
    | "Community"
    | "Emergency Response"
    | "Environment & Education"
    | "Energy"
    | "Ecology"
    | "Economy";
  status: "Active" | "Completed" | "Planning" | "Seeking Funding";
  location: string;
  metrics: { label: string; value: string | number }[];
  image: string;
  sections?: { id: string; title: string; content: string }[];
}

export interface Campaign {
  id: string;
  title: string;
  slug: string;
  goal: number;
  raised: number;
  donors: number;
  description: string;
  endDate: string;
  image: string;
  /** Pillar this campaign belongs to (2026 mandate) */
  pillar?: string;
  /** Display status e.g. "Active" | "Urgent" */
  status?: string;
  /** Legacy category field — kept for backwards compat with search/slug pages */
  category?: string;
  sections?: { id: string; title: string; content: string }[];
}

export interface Story {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  content: string;
  sections?: { id: string; title: string; content: string }[];
}

export interface SiteSettings {
  emergencyMode: boolean;
  emergencyMessage: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  registrationNumber: string;
  registrationBody: string;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  displayDate: string;
  time?: string;
  location: string;
  description: string;
  status: "upcoming" | "past";
  outcome?: string;
  registrationUrl?: string;
  image?: string;
}
