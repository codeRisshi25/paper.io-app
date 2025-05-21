'use client'

import { IconHome, IconEdit, IconSettings, IconFileText, IconUser } from "@tabler/icons-react"
import { SidebarLink } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { useAuth } from "@/hooks/use-auth"

export function AppSidebar() {
  const { user } = useAuth()
  
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <IconHome className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />
    },
    {
      label: "My Blogs",
      href: "/dashboard/blogs",
      icon: <IconFileText className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />
    },
    {
      label: "New Post",
      href: "/dashboard/new",
      icon: <IconEdit className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: <IconUser className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: <IconSettings className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />
    }
  ]

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-6">
        <div className="flex items-center gap-2 py-4">
          <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
          <h1 className="text-lg font-bold">Paper.io</h1>
        </div>
        
        <div className="space-y-1">
          {links.map((link) => (
            <SidebarLink key={link.href} link={link} />
          ))}
        </div>
      </div>
      
      <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700" />
            <div className="text-sm font-medium">
              {user?.name || "User"}
            </div>
          </div>
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}