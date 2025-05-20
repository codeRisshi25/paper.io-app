'use client'

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';


interface AuthLayoutProps {
  children: ReactNode;
}

function Header({ children }: { children: ReactNode }){
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && ! user) {
            router.replace('/dashboard');
        }
    },[user,loading,router]);

    if (loading || user) return null;
    return (
        <div>
            {children}
        </div>
    )
}

