'use client';

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { IconHome, IconEdit, IconSettings, IconFileText, IconUser, IconLogout } from "@tabler/icons-react";
import { motion } from "framer-motion";

function Logo() {
    return (
        <a href="/dashboard" className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black dark:text-white">
            <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-gradient-to-br from-violet-500 to-pink-500" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-medium whitespace-pre text-black dark:text-white"
            >
                Paper IO
            </motion.span>
        </a>
    );
}

function AppSidebar() {
    const { user, logout } = useAuth();
    const pathname = usePathname();
    
    const links = [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: <IconHome className="w-5 h-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        },
        {
            label: "My Blogs",
            href: "/dashboard/blogs",
            icon: <IconFileText className="w-5 h-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        },
        {
            label: "Create Post",
            href: "/dashboard/create",
            icon: <IconEdit className="w-5 h-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        },
        {
            label: "Profile",
            href: "/dashboard/profile",
            icon: <IconUser className="w-5 h-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        }
    ];
    return (
        <div className="flex flex-col h-full justify-between">
            <div className="flex-1 flex flex-col overflow-x-hidden overflow-y-auto">
                <Logo />
                
                <div className="mt-8 flex flex-col gap-2">
                    {links.map((link) => (
                        <SidebarLink 
                            key={link.href} 
                            link={link} 
                            className={pathname === link.href ? "bg-neutral-200 dark:bg-slate-700 rounded-md" : ""}
                        />
                    ))}
                        <SidebarLink
                            link={{
                                label: "Logout",
                                href: "/",
                                icon: <IconLogout className="w-5 h-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                logout();
                            }}
                        />
                </div>
            </div>
            
            <div className="flex flex-col gap-2">
                <SidebarLink
                    link={{
                        label: user?.name || "User",
                        href: "/dashboard/profile",
                        icon: (
                            <div className="w-7 h-7 shrink-0 rounded-full bg-neutral-200 text-black flex items-center justify-center">
                                {user?.name?.charAt(0) || "U"}
                            </div>
                        ),
                    }}
                />
            </div>
        </div>
    );
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { user, loading } = useAuth();
    const [open, setOpen] = useState(true);
    
    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neutral-800"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden md:dark:bg-slate-900">
            <Sidebar open={open} setOpen={setOpen} animate={true}>
                <SidebarBody className="justify-between dark:bg-slate-900">
                    <AppSidebar />
                </SidebarBody>
            </Sidebar>
            
            <main className="flex-1 bg-white dark:bg-slate-200 p-4 md:p-12 overflow-auto rounded-tl-lg">
                {children}
            </main>
        </div>
    );
}