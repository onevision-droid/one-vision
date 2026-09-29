"use client"

import { cn } from"@/lib/utils"

import { Button } from"@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from"@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from"@/components/ui/field"
import { Input } from"@/components/ui/input"

interface LoginFormProps extends React.ComponentProps<"div"> {
  email?: string;
  setEmail?: (val: string) => void;
  password?: string;
  setPassword?: (val: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  error?: string | null;
  loading?: boolean;
}

export function LoginForm({
  className,
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  error,
  loading,
  ...props
}: LoginFormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-border shadow-none bg-muted">
        <CardHeader>
          <CardTitle className="font-sans text-heading-lg font-semibold tracking-tight">Coordination Access</CardTitle>
          <CardDescription className="text-body-sm text-muted-foreground mt-2">
            Authorized personnel only. Enter your credentials to proceed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup>
              <div
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                className={error ?"p-3 bg-destructive/10 border border-destructive/30 text-destructive  text-xs font-mono" :"sr-only"}
              >
                {error}
              </div>
              <Field>
                <FieldLabel htmlFor="email" className="font-medium text-foreground">Email address</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={e => setEmail?.(e.target.value)}
                  className="bg-muted border-border focus-visible:ring-1 focus-visible:ring-ring"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password" className="font-medium text-foreground">Passphrase</FieldLabel>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={e => setPassword?.(e.target.value)}
                  className="bg-muted border-border focus-visible:ring-1 focus-visible:ring-ring"
                />
              </Field>
              <Field className="pt-2">
                <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs">
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
