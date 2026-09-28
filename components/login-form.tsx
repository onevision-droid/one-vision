"use client"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from "@/components/ui/card"
import {
 Field,
 FieldGroup,
 FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

interface LoginFormProps extends React.ComponentProps<"div"> {
 email?: string;
 setEmail?: (val: string) => void;
 password?: string;
 setPassword?: (val: string) => void;
 onSubmit?: (e: React.FormEvent) => void;
}

export function LoginForm({
 className,
 email,
 setEmail,
 password,
 setPassword,
 onSubmit,
 ...props
}: LoginFormProps) {
 return (
 <div className={cn("flex flex-col gap-6", className)} {...props}>
 <Card className=" border-border-default shadow-none bg-surface">
 <CardHeader>
 <CardTitle className="font-sans text-heading-lg font-semibold tracking-tight">Coordination Access</CardTitle>
 <CardDescription className="text-body-sm text-ink-500 mt-2">
 Authorized personnel only. Enter your credentials to proceed.
 </CardDescription>
 </CardHeader>
 <CardContent>
 <form onSubmit={onSubmit}>
 <FieldGroup>
 <Field>
 <FieldLabel htmlFor="email" className="font-medium text-ink-900">Email address</FieldLabel>
 <Input
 id="email"
 type="email"
 placeholder="name@example.com"
 required
 value={email}
 onChange={e => setEmail?.(e.target.value)}
 className=" bg-surface border-border-default focus-visible:ring-1 focus-visible:ring-ink-900"
 />
 </Field>
 <Field>
 <FieldLabel htmlFor="password" className="font-medium text-ink-900">Passphrase</FieldLabel>
 <Input 
 id="password" 
 type="password" 
 required 
 value={password}
 onChange={e => setPassword?.(e.target.value)}
 className=" bg-surface border-border-default focus-visible:ring-1 focus-visible:ring-ink-900"
 />
 </Field>
 <Field className="pt-2">
 <Button type="submit" className="w-full bg-ink-900 text-paper hover:bg-ink-700 transition-none font-medium text-sm">
 Authenticate
 </Button>
 </Field>
 </FieldGroup>
 </form>
 </CardContent>
 </Card>
 </div>
 )
}
