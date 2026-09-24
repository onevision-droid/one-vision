"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Database } from "@/lib/supabase/database.types";

type VolunteerApp = Database["public"]["Tables"]["volunteer_applications"]["Row"];

export default function AdminDashboard() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [applications, setApplications] = useState<VolunteerApp[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data, error } = await supabase
        .from("volunteer_applications")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (data) setApplications(data);
      setLoading(false);
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchData();
      } else {
        setLoading(false);
        setApplications([]);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchData();
      else setApplications([]);
    });

    return () => subscription.unsubscribe();
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
      <div className="min-h-screen flex items-center justify-center bg-mist p-4">
        <div className="bg-white p-8 border border-ink/10 max-w-md w-full shadow-sm">
          <h1 className="font-fraunces text-2xl mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="text-sm font-medium">Email</label>
              <Input id="admin-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="admin-password" className="text-sm font-medium">Password</label>
              <Input id="admin-password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full">Sign In</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="font-fraunces text-3xl">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>Sign Out</Button>
      </div>

      <div>
        <h2 className="text-xl font-medium mb-4">Recent Volunteer Applications</h2>
        {applications.length === 0 ? (
          <p className="text-muted-foreground">No applications found.</p>
        ) : (
          <div className="border border-ink/10 bg-white shadow-sm overflow-hidden rounded-md">
            <table className="w-full text-left text-sm">
              <thead className="bg-mist/50 border-b border-ink/10">
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
                    <td className="p-4 capitalize">{app.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
