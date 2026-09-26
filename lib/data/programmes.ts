import { Programme } from "./types";

/**
 * One Vision — 4 Operational Pillars (2026-2030 Mandate)
 * Focus: conflict-affected communities, underserved rural populations,
 * and communities cut off from health, energy, and economic infrastructure.
 * IDP welfare is covered by government and established NGOs.
 * One Vision fills the structural gaps in decentralised services.
 */
export const programmes: Programme[] = [
  {
    id: "pillar-1",
    title: "Conflict-Resilient Health Equity",
    slug: "health-equity",
    description:
      "Decentralised mobile tele-health, psychiatry, ART continuity, and harm reduction delivered across conflict-affected communities and remote valley districts cut off from Imphal's tertiary health system. 18 active nodes as of Q3 2026.",
    category: "Health",
    status: "Active",
    location: "Imphal East, West & Conflict-Affected Valley Districts",
    metrics: [
      { label: "People Reached (2026)", value: "12,400+" },
      { label: "Active Health Nodes", value: 18 },
      { label: "ART Patients Retained", value: "98%" },
    ],
    image: "/new-illustrations/health-access.webp",
    sections: [
      {
        id: "mobile-tele-health",
        title: "Mobile Tele-Health",
        content: "Our decentralised mobile tele-health units bring essential primary care directly to remote and conflict-affected valley districts. These units bypass tertiary bottlenecks and operate independently."
      },
      {
        id: "psychiatry",
        title: "Psychiatry & Trauma Care",
        content: "Addressing the invisible wounds of conflict, our psychiatric teams deploy to affected zones to offer trauma counseling, PTSD management, and psychological first aid."
      },
      {
        id: "art-continuity",
        title: "ART Continuity",
        content: "We ensure zero interruption in Antiretroviral Therapy (ART) for patients in blockaded zones by pre-positioning stock and using decentralised distribution nodes."
      }
    ]
  },
  {
    id: "pillar-2",
    title: "Energy Sovereignty",
    slug: "energy-sovereignty",
    description:
      "Solar-Kiran renewable microgrid deployment for conflict-affected communities, mobile health units, and community safe-houses cut off from grid infrastructure during blockades.",
    category: "Energy",
    status: "Active",
    location: "Churachandpur & Bishnupur Districts — 3 Community Sites",
    metrics: [
      { label: "Solar Capacity Deployed", value: "240 kW" },
      { label: "Households Powered", value: "1,200+" },
      { label: "Health Nodes on Solar", value: 12 },
    ],
    image: "/new-illustrations/community-support.webp",
  },
  {
    id: "pillar-3",
    title: "Ecological Restoration & Agrarian Resilience",
    slug: "ecological-restoration",
    description:
      "Loktak Lake bio-economy restoration, indigenous seed bank preservation, and regenerative agroforestry with farming communities whose livelihoods have been disrupted by the ongoing conflict.",
    category: "Ecology",
    status: "Active",
    location: "Loktak Lake Basin & Valley Agricultural Districts",
    metrics: [
      { label: "Seed Varieties Banked", value: "340+" },
      { label: "Farming Households Supported", value: 280 },
      { label: "Agroforestry Plots (ha)", value: 48 },
    ],
    image: "/new-illustrations/imphal-streetscape.webp",
  },
  {
    id: "pillar-4",
    title: "Economic Dignity & Livelihood Rehabilitation",
    slug: "economic-dignity",
    description:
      "Circular micro-economies and self-help cooperatives for conflict-affected communities operating outside the formal banking and supply chain systems disrupted by the crisis.",
    category: "Economy",
    status: "Active",
    location: "Imphal City & Conflict-Affected Valley Districts",
    metrics: [
      { label: "Self-Help Cooperatives", value: 34 },
      { label: "Community Members Enrolled", value: "890+" },
      { label: "Avg Monthly Income Restored", value: "₹4,200" },
    ],
    image: "/new-illustrations/volunteer-scene.webp",
  },
];
