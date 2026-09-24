export interface Programme {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: "Health" | "Education" | "Community" | "Emergency Response";
  status: "Active" | "Completed" | "Planning";
  location: string;
  metrics: { label: string; value: string | number }[];
  image: string;
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
}

export interface SiteSettings {
  emergencyMode: boolean;
  emergencyMessage: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
}
