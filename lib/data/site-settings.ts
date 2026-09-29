import { SiteSettings } from "./types";
import orgData from "../../content/org.json";

export const siteSettings: SiteSettings = {
  emergencyMode: true,
  emergencyMessage: "Active relief and healthcare response across Manipur. Over 12,400 residents supported with medical care, clean power, and emergency supplies.",
  contactEmail: orgData.contact.email,
  contactPhone: orgData.contact.phone,
  address: orgData.org.location,
  registrationNumber: orgData.org.regNo,
  registrationBody: "Manipur Societies Registration Act, 1989 (Amended 2026)"
};
