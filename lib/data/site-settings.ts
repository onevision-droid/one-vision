import { SiteSettings } from "./types";
import orgData from "../../content/org.json";

export const siteSettings: SiteSettings = {
  emergencyMode: true,
  emergencyMessage: "Polycrisis active across Manipur. 12,400+ people reached. Secure contact via Signal or ProtonMail only.",
  contactEmail: orgData.contact.email,
  contactPhone: orgData.contact.phone,
  address: orgData.org.location,
  registrationNumber: orgData.org.regNo,
  registrationBody: "Manipur Societies Registration Act, 1989 (Amended 2026)"
};
