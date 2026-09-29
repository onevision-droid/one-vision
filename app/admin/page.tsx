"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Database } from "@/lib/supabase/database.types";
import { Session } from "@supabase/supabase-js";
import Link from "next/link";
import { LoginForm } from "@/components/login-form";

type VolunteerApp = Database["public"]["Tables"]["volunteer_applications"]["Row"];
type HelpRequest = Database["public"]["Tables"]["help_requests"]["Row"];
type Donation = Database["public"]["Tables"]["donations"]["Row"];

export default function AdminDashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [applications, setApplications] = useState<VolunteerApp[]>([]);
  const [requests, setRequests] = useState<HelpRequest[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      setLoading(true);
      const [appRes, reqRes, donRes] = await Promise.all([
        supabase.from("volunteer_applications").select("*").order("created_at", { ascending: false }),
        supabase.from("help_requests").select("*").order("created_at", { ascending: false }),
        supabase.from("donations").select("*").order("created_at", { ascending: false }),
      ]);
        
      if (!ignore) {
        setApplications(appRes.data || []);
        setRequests(reqRes.data || []);
        setDonations(donRes.data || []);
        setLoading(false);
      }
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (ignore) return;
      setSession(session);
      if (session) {
        fetchData();
      } else {
        setApplications([]);
        setRequests([]);
        setDonations([]);
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (ignore) return;
      setSession(session);
      if (session) {
        fetchData();
      } else {
        setApplications([]);
        setRequests([]);
        setDonations([]);
      }
    });

    return () => {
      ignore = true;
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
      setLoading(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  if (!session) {
    return (
      <div className="bg-paper min-h-dvh flex flex-col px-4 md:px-8">
        <header className="w-full max-w-5xl mx-auto py-6 border-b border-border-default/80 flex items-center justify-between">
          <Link
            href="/"
            aria-label="Go home"
            className="inline-block font-sans text-heading-sm font-bold text-ink-900"
          >
            One Vision
          </Link>
          <span className="font-sans text-xs text-ink-500 uppercase tracking-wider">Secured Node</span>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center pb-24">
          <div className="w-full max-w-sm">
            <LoginForm 
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              onSubmit={handleLogin}
            />
          </div>
        </main>
      </div>
    );
  }

  return (
    <main id="main" className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="font-sans text-heading-xl font-medium">Admin Dashboard</h1>
        <Button variant="secondary" onClick={handleLogout}>Sign Out</Button>
      </div>

      <div>
        <h2 className="text-heading-md font-medium mb-4">Recent Volunteer Applications</h2>
        {applications.length === 0 ? (
          <p className="text-muted-foreground">No applications found.</p>
        ) : (
          <div className="border border-border-default bg-surface shadow-none overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-section-alt border-b border-border-default">
                <tr>
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Skills</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td className="p-4">{app.first_name} {app.last_name}</td>
                    <td className="p-4">{app.email}</td>
                    <td className="p-4">{app.skills?.join(", ")}</td>
                    <td className="p-4 capitalize">
                      <span className={`px-2 py-1 text-xs font-medium ${
                        app.status === 'pending' ? 'bg-hazard-yellow/20 text-ink-900 border border-hazard-yellow/40' : 'bg-status-active/20 text-status-active border border-status-active/40'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-heading-md font-medium mb-4">Help & Contact Requests</h2>
        {requests.length === 0 ? (
          <p className="text-muted-foreground">No requests found.</p>
        ) : (
          <div className="border border-border-default bg-surface shadow-none overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-section-alt border-b border-border-default">
                <tr>
                  <th className="p-4 font-medium">Requester</th>
                  <th className="p-4 font-medium">Contact</th>
                  <th className="p-4 font-medium">Type</th>
                  <th className="p-4 font-medium">Description</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {requests.map((req) => (
                  <tr key={req.id}>
                    <td className="p-4">{req.requester_name}</td>
                    <td className="p-4">{req.phone}</td>
                    <td className="p-4">{req.request_type}</td>
                    <td className="p-4 max-w-xs truncate" title={req.description}>{req.description}</td>
                    <td className="p-4 capitalize">
                      <span className={`px-2 py-1 text-xs font-medium ${
                        req.status === 'open' ? 'bg-alert-red/20 text-alert-red border border-alert-red/40' : 'bg-status-active/20 text-status-active border border-status-active/40'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-heading-md font-medium mb-4">Donation Intents</h2>
        {donations.length === 0 ? (
          <p className="text-muted-foreground">No donations found.</p>
        ) : (
          <div className="border border-border-default bg-surface shadow-none overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-section-alt border-b border-border-default">
                <tr>
                  <th className="p-4 font-medium">Donor</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Type</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {donations.map((don) => (
                  <tr key={don.id}>
                    <td className="p-4">{don.first_name} {don.last_name}</td>
                    <td className="p-4">{don.email}</td>
                    <td className="p-4">{don.amount} {don.currency}</td>
                    <td className="p-4">{don.is_recurring ? "Monthly" : "One-time"}</td>
                    <td className="p-4 capitalize">
                      <span className={`px-2 py-1 text-xs font-medium ${
                        don.status === 'pending' ? 'bg-hazard-yellow/20 text-ink-900 border border-hazard-yellow/40' : 'bg-status-active/20 text-status-active border border-status-active/40'
                      }`}>
                        {don.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
