'use client';

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "lucide-react"; // Import for the plus icon

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
        <div className="h-10 w-10 rounded-full bg-slate-300 text-primary-foreground flex items-center justify-center">
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
        <Card className="dark:bg-slate-900 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
          <CardHeader>
            <CardTitle className="text-lg">Posts</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold mb-2">0</span>
              <p className="text-sm text-muted-foreground">published posts</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dark:bg-slate-900 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
          <CardHeader>
            <CardTitle className="text-lg">Drafts</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold mb-2">0</span>
              <p className="text-sm text-muted-foreground">draft posts</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dark:bg-slate-900 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
          <CardHeader>
            <CardTitle className="text-lg">Views</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold mb-2">0</span>
              <p className="text-sm text-muted-foreground">total views</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Button variant="default" className="w-full py-6 mt-4 text-lg font-medium flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-300 transition duration-200">
        <PlusIcon className="h-5 w-5" />
        Create New Blog
      </Button>
    </div>
  );
}
