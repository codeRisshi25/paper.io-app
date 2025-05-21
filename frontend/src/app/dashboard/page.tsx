'use client';

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const { user, logout } = useAuth();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center font-uiserifont">
      <div>
        <h1 className="text-2xl font-bold text-black">Welcome, {user?.name.split(" ")[0]}!</h1>
        <p className="font-mono text-zinc-800 text-sm">Dashboard for all your published and draft blogs <br/>Or start a new blog</p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="border-r border-gray-300 dark:border-gray-700 h-12 mx-2" />
        
        <div className="text-right">
          <h2 className="text-m dark:text-black">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</h2>
          <p className="text-neutral-500 font-mono">{user?.email}</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
          {user?.image ? (
            <img 
              src={user.image} 
              alt={user?.name || "User"} 
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <span className="text-lg font-semibold">{user?.name?.charAt(0)}</span>
          )}
        </div>
        
        <Button onClick={logout} variant="outline" className="h-10 dark:bg-background dark:text-white dark:border-background dark:hover:bg-background/60">
        Logout
        </Button>
      </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You have 0 published posts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You have 0 draft posts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Views</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Your posts have 0 total views</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
