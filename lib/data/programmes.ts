import { Programme } from "./types";

export const programmes: Programme[] = [
  {
    id: "prog-1",
    title: "Mobile Health Clinics",
    slug: "mobile-health-clinics",
    description: "Bringing essential healthcare services to remote communities in and around Imphal.",
    category: "Health",
    status: "Active",
    location: "Imphal East & West",
    metrics: [{ label: "Patients Treated", value: "4,500+" }],
    image: "/new-illustrations/health-access.webp"
  },
  {
    id: "prog-2",
    title: "Youth Tech Literacy",
    slug: "youth-tech-literacy",
    description: "Equipping young people with digital skills for the modern economy.",
    category: "Education",
    status: "Active",
    location: "Imphal City",
    metrics: [{ label: "Students Enrolled", value: 320 }],
    image: "/new-illustrations/youth-learning.webp"
  },
  {
    id: "prog-3",
    title: "Community Resilience Network",
    slug: "community-resilience-network",
    description: "Building local capacity for disaster response and mutual aid.",
    category: "Community",
    status: "Active",
    location: "Manipur (Various)",
    metrics: [{ label: "Communities Reached", value: 45 }],
    image: "/new-illustrations/community-support.webp"
  },
  {
    id: "prog-4",
    title: "Disaster Relief Operations",
    slug: "disaster-relief",
    description: "Rapid deployment of essential supplies and emergency shelter during crises.",
    category: "Emergency Response",
    status: "Active",
    location: "High-risk Zones",
    metrics: [{ label: "Camps Supported", value: 12 }],
    image: "/new-illustrations/imphal-streetscape.webp"
  }
];
