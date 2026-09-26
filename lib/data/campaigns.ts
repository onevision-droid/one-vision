import { Campaign } from "./types";

/**
 * One Vision — Active Funding Campaigns (2026 Polycrisis)
 * Campaigns target structural gaps in conflict-affected communities —
 * not IDP welfare (covered by government and established NGOs).
 */
export const campaigns: (Campaign & { status?: string; pillar?: string })[] = [
  {
    id: "camp-1",
    title: "Solar-Kiran Phase 2: 3 More Community Sites",
    slug: "solar-kiran-phase-2",
    goal: 1800000,
    raised: 620000,
    donors: 214,
    description:
      "Funding the next phase of Solar-Kiran microgrid installation across 3 additional conflict-affected community sites to power health nodes, safe water pumps, and emergency lighting during blockades.",
    endDate: "2026-12-31",
    image: "/new-illustrations/community-support.webp",
    status: "Urgent",
    pillar: "energy-sovereignty",
  },
  {
    id: "camp-2",
    title: "Mobile Tele-Health Expansion",
    slug: "tele-health-expansion",
    goal: 900000,
    raised: 380000,
    donors: 176,
    description:
      "Deploying 6 additional mobile tele-health units to reach underserved valley communities cut off from Imphal during active conflict. Each unit serves ~200 patients/month.",
    endDate: "2027-03-31",
    image: "/new-illustrations/health-access.webp",
    status: "Active",
    pillar: "health-equity",
  },
  {
    id: "camp-3",
    title: "Loktak Seed Bank Emergency Preservation",
    slug: "seed-bank-preservation",
    goal: 450000,
    raised: 90000,
    donors: 68,
    description:
      "Emergency cryogenic preservation of 180 indigenous seed varieties at risk of loss due to conflict-driven ecological disruption. A foundational act of agrarian sovereignty for Manipur's farming communities.",
    endDate: "2026-11-15",
    image: "/new-illustrations/imphal-streetscape.webp",
    status: "Urgent",
    pillar: "ecological-restoration",
  },
];
