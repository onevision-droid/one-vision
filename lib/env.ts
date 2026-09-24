import { z } from "zod/v4";

/**
 * Zod-validated environment variables.
 * Build fails loudly on missing required env vars.
 * Feature flags control conditional route rendering.
 */

const envSchema = z.object({
  // Site
  NEXT_PUBLIC_SITE_URL: z.url().optional().default("https://onevision.org"),

  // Feature flags
  DONATE_ENABLED: z
    .enum(["true", "false"])
    .optional()
    .default("false")
    .transform((v) => v === "true"),
  DONATE_RECURRING_ENABLED: z
    .enum(["true", "false"])
    .optional()
    .default("false")
    .transform((v) => v === "true"),

  // Supabase (deferred — optional until Phase 2)
  NEXT_PUBLIC_SUPABASE_URL: z.url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),

  // Analytics (optional)
  NEXT_PUBLIC_ANALYTICS_ID: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error(
      "❌ Invalid environment variables:",
      JSON.stringify(z.treeifyError(parsed.error), null, 2)
    );
    throw new Error("Invalid environment variables. Check .env.example for required values.");
  }

  return parsed.data;
}

export const env = validateEnv();
