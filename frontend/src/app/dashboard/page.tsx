'use client';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export  default function Dashboard() {
    const { user , loading , logout} = useAuth();
  return (
    <div>Dashboard
    <Button onClick={logout} className="bg-red-500">
        Logout
    </Button>
    </div>
  )
}
