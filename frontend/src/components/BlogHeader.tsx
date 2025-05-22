"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Home } from "lucide-react";

interface BlogHeaderProps {
    title?: string;
    logoUrl?: string;
    isLoggedIn?: boolean;
    username?: string;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({
    title = "Paper io",
    logoUrl = "/logo.png",
    isLoggedIn = false,
    username = "",
}) => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white dark:bg-slate-200">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo and Title */}
                <div className="flex items-center space-x-2">
                    <Link href="/" className="flex items-center space-x-2">
                        {logoUrl && (
                            <div className="h-8 w-8 rounded bg-gradient-to-br from-violet-500 to-pink-500" />
                        )}
                        <span className="text-xl font-semibold text-black">{title}</span>
                    </Link>
                </div>

                <nav className="hidden md:flex items-center space-x-1">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/" className="flex items-center space-x-1">
                            <Home className="h-4 w-4" />
                            <span>Home</span>
                        </Link>
                    </Button>
                </nav>
                <div className="flex items-center space-x-3">
                    {/* Desktop "Get Started" button */}
                    <div className="hidden md:block">
                        <Button
                            variant="default"
                            size="sm"
                            className="bg-slate-800 hover:bg-slate-700 text-white"
                            asChild
                        >
                            <Link href="/auth/register">Get Started</Link>
                        </Button>
                    </div>
                    
                    {/* Mobile "Get Started" button */}
                    <div className="md:hidden">
                        <Button
                            variant="default"
                            size="sm"
                            className="bg-slate-800 hover:bg-slate-700 text-white"
                            asChild
                        >
                            <Link href="/auth/register">Get Started</Link>
                        </Button>
                    </div>
                </div>
            </div>
            <Separator className="bg-slate-800" />
        </header>
    );
};

export default BlogHeader;
