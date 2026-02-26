"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/dictionaries";

interface LoginFormProps {
  dict: Dictionary;
  locale: string;
  next?: string;
}

export function LoginForm({ dict, locale, next }: LoginFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push(next ?? `/${locale}`);
    router.refresh();
  }

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-1 text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 grid-cols-2 grid-rows-2 gap-0.5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-sm bg-primary" />
              ))}
            </div>
            <span className="text-lg font-semibold">StackView</span>
          </div>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {dict.auth.loginTitle}
        </h1>
        <p className="text-sm text-muted-foreground">{dict.auth.loginSubtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">{dict.auth.email}</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-9 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm outline-none focus:border-border focus:ring-1 focus:ring-ring"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">{dict.auth.password}</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-9 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm outline-none focus:border-border focus:ring-1 focus:ring-ring"
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? dict.auth.loggingIn : dict.auth.login}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        {dict.auth.noAccount}{" "}
        <Link
          href={`/${locale}/signup`}
          className="font-medium text-primary hover:underline"
        >
          {dict.auth.signup}
        </Link>
      </p>
    </div>
  );
}
