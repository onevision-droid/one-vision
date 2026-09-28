import { Programme } from "./types";

/**
 * One Vision — 5 Flagship Programmes (2026 Direction)
 * Focus: Community, Evidence, Innovation, Action, Opportunity, Resilience.
 */
export const programmes: Programme[] = [
  {
    id: "health-connect",
    title: "Community Health Connect",
    slug: "community-health-connect",
    description: "A community-based programme connecting people with reliable health information, preventive services and existing health systems.",
    category: "Healthy Communities",
    status: "Active",
    location: "Manipur",
    metrics: [
      { label: "Community Navigators", value: 45 },
      { label: "People Engaged", value: "2,500+" },
      { label: "Information Campaigns", value: 12 },
    ],
    image: "/donate-hero.jpg",
    sections: [
      {
        id: "health-education",
        title: "Community Health Education",
        content: "We support communities with practical health awareness, prevention, digital access and stronger connections to primary care."
      },
      {
        id: "preventive-care",
        title: "Preventive Campaigns",
        content: "Health should begin before illness. We lead campaigns around women's health, adolescent health awareness, and nutrition education."
      }
    ]
  },
  {
    id: "green-manipur",
    title: "Green Manipur Lab",
    slug: "green-manipur-lab",
    description: "A community environmental programme where residents, students and local organisations identify environmental problems, collect evidence and build practical solutions.",
    category: "Climate & Environment",
    status: "Active",
    location: "Manipur",
    metrics: [
      { label: "Neighbourhoods", value: 10 },
      { label: "Trees Restored", value: "5,000+" },
      { label: "Waste Actions", value: 34 },
    ],
    image: "/about-hero.jpg",
  },
  {
    id: "futureworks",
    title: "FutureWorks",
    slug: "futureworks",
    description: "A practical youth programme built around real projects rather than certificates alone. Young people learn, build, collaborate, and create portfolios.",
    category: "Youth & Future Skills",
    status: "Active",
    location: "Manipur",
    metrics: [
      { label: "Young People Engaged", value: "500+" },
      { label: "Mentors", value: 25 },
      { label: "Portfolios Created", value: 120 },
    ],
    image: "/community-voices.jpg",
  },
  {
    id: "local-enterprise",
    title: "Local Enterprise Lab",
    slug: "local-enterprise-lab",
    description: "A practical accelerator for emerging community businesses. Idea → Prototype → Market → Revenue → Growth.",
    category: "Livelihoods & Enterprise",
    status: "Active",
    location: "Manipur",
    metrics: [
      { label: "Entrepreneurs Supported", value: 42 },
      { label: "Women-Led Enterprises", value: "70%" },
      { label: "Community Partners", value: 15 },
    ],
    image: "/community-voices.jpg",
  },
  {
    id: "community-data",
    title: "Community Data Lab",
    slug: "community-data-lab",
    description: "Young researchers, volunteers and community organisations work together to document local challenges. Observe. Document. Understand. Act. Measure.",
    category: "Innovation & Evidence",
    status: "Active",
    location: "Manipur",
    metrics: [
      { label: "Local Projects", value: 22 },
      { label: "Youth Researchers", value: 30 },
      { label: "Community Maps", value: 8 },
    ],
    image: "/about-hero.jpg",
  },
];
