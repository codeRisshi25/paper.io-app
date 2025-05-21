"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { BackgroundBeams } from "./ui/background-beams";
import Link from "next/link";

interface RegisterFormProps {
  onSubmit?: (e: React.FormEvent) => void;
  name?: string;
  setName?: (name: string) => void;
  email?: string;
  setEmail?: (email: string) => void;
  password?: string;
  setPassword?: (password: string) => void;
  loading?: boolean;
  error?: string | null;
}

export default function RegisterForm({
  onSubmit = () => {},
  name = "",
  setName = () => {},
  email = "",
  setEmail = () => {},
  password = "",
  setPassword = () => {},
  loading = false,
  error = null
}: RegisterFormProps) {
  return (
    <div className="flex flex-col gap-4 w-full min-h-[90vh] items-center justify-center px-4">
      <BackgroundBeams className="fixed inset-0 z-0 opacity-100" />
      
      <Card className="overflow-hidden p-0 z-10 bg-gray-950 w-full max-w-5xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={onSubmit}>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome to Paper io</h1>
                <p className="text-muted-foreground text-balance text-sm">
                  Register with your email address to get started
                </p>
              </div>
              
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div>
                <Label htmlFor="fullName" className="text-sm">Full Name</Label>
                <Input 
                  id="fullName" 
                  placeholder="John Doe" 
                  type="text" 
                  required 
                  className="h-10 mt-1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-sm">Email Address</Label>
                <Input
                  id="email"
                  placeholder="youremail@example.com"
                  type="email"
                  required
                  className="h-10 mt-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="password" className="text-sm">Password</Label>
                <Input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  required
                  className="h-10 mt-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <Button type="submit" className="w-full h-10 mt-2" disabled={loading}>
                {loading ? "Creating Account..." : "Register"}
              </Button>
              
              <div className="after:border-border relative text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <Button variant="outline" type="button" className="w-full h-10">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 mr-2">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                </Button>
              </div>
              
              <div className="text-center text-xs">
                Already have an account?{" "}
                <Link href="/auth/login" className="underline underline-offset-4">
                  Log in
                </Link>
              </div>
            </div>
          </form>
          
          <div className="bg-muted relative hidden md:block">
            <img
              src="/auth.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="text-muted-foreground text-center text-xs text-balance z-10">
        By signing up, you agree to our <Link href="/terms" className="underline underline-offset-4 hover:text-primary">Terms of Service</Link>{" "}
        and <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">Privacy Policy</Link>.
      </div>
    </div>
  );
}
