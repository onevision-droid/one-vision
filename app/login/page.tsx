"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginForm } from "@/components/login-form";
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        setError(signInError.message);
        setLoading(false);
      } else {
        router.push("/admin");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred during authentication.");
      setLoading(false);
    }
  }

  return (
    <main id="main" className="flex min-h-svh w-full flex-col items-center justify-center p-6 md:p-10 bg-paper">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex items-center justify-between border-b border-border-default pb-4">
          <Link
            href="/"
            className="font-sans text-xs font-bold text-ink-900 uppercase tracking-widest hover:text-safety-orange transition-colors"
          >
            &larr; Return Home
          </Link>
          <span className="font-mono text-[10px] text-ink-500 uppercase tracking-widest">Secured Node</span>
        </div>
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={handleLogin}
          error={error}
          loading={loading}
        />
      </div>
    </main>
  );
}
