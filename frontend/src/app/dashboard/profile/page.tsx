"use client";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FileTextIcon, HomeIcon, UserIcon } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neutral-800"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-black dark:text-white">
          User not found. Please log in again.
        </p>
      </div>
    );
  }

  // Format registration date
  const registeredDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center font-uiserifont">
        <div>
          <h1 className="text-2xl font-bold text-black">My Profile</h1>
          <p className="font-mono text-zinc-800">
            Your account information and profile details
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="border-r border-gray-300 dark:border-gray-700 h-12 mx-2" />

          <div className="text-right">
            <h2 className="text-m dark:text-black">
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </h2>
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
              <span className="text-lg font-semibold">
                {user?.name?.charAt(0)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="dark:bg-slate-900 hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6 flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4 bg-slate-300">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback className="text-xl font-semibold bg-slate-200 text-black">
                  {user.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold text-black dark:text-white">
                {user.name}
              </h2>
              <p className="text-muted-foreground dark:text-zinc-400">
                {user.email}
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Member since {registeredDate}
              </p>

              <div className="w-full grid grid-cols-1 gap-2 mt-6">
                <Button
                  asChild
                  variant="outline"
                  className="w-full dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700"
                >
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <HomeIcon size={16} />
                    Dashboard
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700"
                >
                  <Link
                    href="/dashboard/blogs"
                    className="flex items-center gap-2"
                  >
                    <FileTextIcon size={16} />
                    My Blogs
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="dark:bg-slate-900 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-black dark:text-white">
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-black dark:text-white">
                    Bio
                  </h3>
                  <p className="text-muted-foreground dark:text-zinc-400 mt-2">
                    {user.bio || "No bio provided."}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-black dark:text-white">
                    Account Information
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-700">
                      <span className="text-muted-foreground dark:text-zinc-400">
                        Name
                      </span>
                      <span className="text-black dark:text-white font-medium">
                        {user.name}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-700">
                      <span className="text-muted-foreground dark:text-zinc-400">
                        Email
                      </span>
                      <span className="text-black dark:text-white font-medium">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-black dark:text-white">
                    Blog Statistics
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    <Card className="dark:bg-slate-800">
                      <CardContent className="p-4 flex flex-col items-center">
                        <span className="text-3xl font-bold mb-1 text-black dark:text-white">
                          {user.stats?.published || 0}
                        </span>
                        <p className="text-xs text-muted-foreground">
                          published posts
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="dark:bg-slate-800">
                      <CardContent className="p-4 flex flex-col items-center">
                        <span className="text-3xl font-bold mb-1 text-black dark:text-white">
                          {user.stats?.drafts || 0}
                        </span>
                        <p className="text-xs text-muted-foreground">
                          draft posts
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="dark:bg-slate-800">
                      <CardContent className="p-4 flex flex-col items-center">
                        <span className="text-3xl font-bold mb-1 text-black dark:text-white">
                          {user.stats?.views || 0}
                        </span>
                        <p className="text-xs text-muted-foreground">
                          total views
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
