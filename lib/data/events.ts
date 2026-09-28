import { EventItem } from "./types";

export const events: EventItem[] = [
  {
    id: "evt-1",
    slug: "community-townhall-oct-2026",
    title: "Community Townhall & Resource Planning",
    date: "2026-10-15T10:00:00Z",
    displayDate: "October 15, 2026",
    time: "10:00 AM – 1:00 PM IST",
    location: "Imphal West Community Hall, Babupara",
    description:
      "Bi-monthly open forum bringing together ward representatives, youth volunteers, and elders to review aid distribution ledgers and prioritize community winter requirements.",
    status: "upcoming",
    registrationUrl: "/contact?subject=Event+Registration:+Townhall",
    image: "/community-voices.jpg",
  },
  {
    id: "evt-2",
    slug: "mobile-health-volunteer-orientation",
    title: "Mobile Health Clinic Volunteer Orientation",
    date: "2026-11-05T09:30:00Z",
    displayDate: "November 5, 2026",
    time: "9:30 AM – 12:30 PM IST",
    location: "One Vision Field Operations Office, Imphal",
    description:
      "Training session for new volunteers joining the Mobile Health Unit. Covers medical triage support protocols, safeguarding standards, and logistics in peripheral districts.",
    status: "upcoming",
    registrationUrl: "/volunteer",
    image: "/volunteer-hero.jpg",
  },
  {
    id: "evt-3",
    slug: "monsoon-disaster-preparedness",
    title: "Monsoon Disaster Preparedness Workshop",
    date: "2026-06-20T10:00:00Z",
    displayDate: "June 20, 2026",
    time: "10:00 AM – 3:30 PM IST",
    location: "Kwakeithel Youth Centre, Imphal",
    description:
      "Intensive simulation workshop on emergency supply routing, water purification kit distribution, and vulnerable household mapping before heavy seasonal rains.",
    status: "past",
    outcome:
      "85 community volunteers across 12 wards certified on emergency supply routing; pre-positioned 400 family relief packages in flood-vulnerable zones.",
    image: "/about-hero.jpg",
  },
  {
    id: "evt-4",
    slug: "youth-digital-skills-showcase",
    title: "Youth Tech Literacy Capstone Showcase",
    date: "2026-04-12T14:00:00Z",
    displayDate: "April 12, 2026",
    time: "2:00 PM – 5:00 PM IST",
    location: "DM College Science Block, Imphal",
    description:
      "Graduation exhibition for cohort 3 of our youth tech literacy program, presenting practical digital solutions built for local small businesses and cooperatives.",
    status: "past",
    outcome:
      "48 students completed digital certification; 14 secured direct apprenticeships with local educational institutes and trading associations.",
    image: "/community-voices.jpg",
  },
];
