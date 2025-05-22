'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function TopNavigation() {
  const router = useRouter();
  
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => router.push('/dashboard')}
            aria-label="Go back to dashboard"
            className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="relative flex items-center space-x-2">
            <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-gradient-to-br from-violet-500 to-pink-500" />
            <span className="text-xl font-medium whitespace-pre text-black dark:text-white">
              Paper IO
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-gray-700 dark:text-gray-300"
          >
            Preview
          </Button>
        </div>
      </div>
    </header>
  );
}