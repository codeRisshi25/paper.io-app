'use client';

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  // Don't render dashboard content if not logged in or still loading
  if (loading) return <div>Loading...</div>;
  if (!user) return null;
  
  return (
    <div>Dashboard
      <Button onClick={logout} className="bg-red-500">
        Logout
      </Button>
    </div>
  )
}
