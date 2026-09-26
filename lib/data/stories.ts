import { Story } from "./types";

/**
 * One Vision — Field Reports (2026 Polycrisis)
 * These are field reports from the 4 operational pillars.
 * All individuals are anonymised. No geographic coordinates of communities.
 * Content is evidence-led, not sentimental. Focus on structural gaps.
 */
export const stories: Story[] = [
  {
    id: "field-001",
    title: "ART Continuity Under Blockade: 18 Months Without Interruption",
    slug: "art-continuity-under-blockade",
    excerpt:
      "When supply chains collapsed in May 2023, 340 HIV-positive patients in conflict-affected districts faced treatment interruption. Our decentralised ART node network kept 98% retained in care.",
    author: "Health Equity Operations Team",
    date: "2026-09-15",
    image: "/new-illustrations/health-access.webp",
    content:
      "The May 2023 conflict severed the supply chain connecting Imphal's tertiary hospitals to valley health centres. For 340 documented HIV-positive patients across three districts, this meant a direct threat of viral rebound and drug resistance. One Vision's mobile ART continuity protocol — pre-positioned stock at 12 decentralised health nodes, distributed without central hospital intermediation — retained 98% of patients in care over the following 18 months. The 2% gap was attributable to patients in areas beyond our current node radius. Phase 2 node expansion is now funded and in deployment. Data source: Pillar 1 Health Operations Register, Q3 2026.",
  },
  {
    id: "field-002",
    title: "Solar-Kiran Node Alpha: Power Restored to 400 Households",
    slug: "solar-kiran-node-alpha",
    excerpt:
      "A conflict-affected community site in Bishnupur District had been without reliable electricity for 14 months. A 60kW Solar-Kiran installation restored power to 400 households and our resident health node.",
    author: "Energy Sovereignty Field Lead",
    date: "2026-08-28",
    image: "/new-illustrations/community-support.webp",
    content:
      "Fourteen months of kerosene dependence at this community site (identity protected, Bishnupur District) had produced a respiratory illness rate 3.4× higher than baseline. The 60kW Solar-Kiran installation, completed in August 2026, eliminated kerosene use for lighting and powered the on-site health node's refrigeration for vaccine and medication storage. Power interruptions dropped from 18+ hours/day to zero. The cooperative grid management model means the community itself controls power allocation — the health node draws priority power during clinic hours. Electricity cost per household fell from ₹800/month to ₹0 after installation subsidy. Data source: Energy Sovereignty Pillar Log, August 2026.",
  },
  {
    id: "field-003",
    title: "Ima Keithel Network: 280 Farming Households Enter Agroforestry Cooperative",
    slug: "ima-keithel-agroforestry",
    excerpt:
      "The Ima Keithel women's market network became the foundation for mobilising 280 farming households — whose livelihoods were disrupted by the conflict — into a regenerative agroforestry cooperative.",
    author: "Ecological Restoration Field Team",
    date: "2026-09-01",
    image: "/new-illustrations/women-led.webp",
    content:
      "The Ima Keithel market network — the historic women-led trading cooperative at the centre of Imphal's informal economy — provided the social infrastructure for One Vision's agroforestry enrolment programme. 280 households whose farming livelihoods were disrupted by conflict were enrolled in 48 hectares of regenerative agroforestry plots. The seed bank (340+ indigenous varieties, cryogenically preserved) provides planting stock without market dependency. Monthly food security assessments show a 62% reduction in severe food insecurity among enrolled households since the cooperative began. The women-led cooperative governance model was chosen deliberately: historically, Ima-network structures have proven more resilient to conflict interference than formal government bodies. Data source: Ecological Restoration Pillar, Q3 2026.",
  },
  {
    id: "field-004",
    title: "Cooperative Micro-Economy: ₹4,200 Average Monthly Income Restored",
    slug: "cooperative-micro-economy-q3-2026",
    excerpt:
      "34 self-help cooperatives across conflict-affected areas have restored an average monthly income of ₹4,200 among 890+ enrolled members — operating entirely outside the formal banking system disabled by conflict.",
    author: "Economic Dignity Pillar Lead",
    date: "2026-09-10",
    image: "/new-illustrations/volunteer-scene.webp",
    content:
      "The formal banking system across three affected districts became functionally inaccessible following the May 2023 conflict. ATMs were intermittently out of service, bank branches closed, and digital payment infrastructure unreliable. One Vision's cooperative micro-economy model bypasses this entirely: 34 self-help cooperatives operate on a pooled-savings and mutual-credit model using physical ledgers and community-held cash. 890+ community members are enrolled. Median monthly income within the cooperative network now stands at ₹4,200 — primarily from craft production, agricultural processing, and service exchange. No external payment processor or bank account is required. The model is designed for blockade resilience by design. Data source: Economic Dignity Pillar Register, Q3 2026.",
  },
];
