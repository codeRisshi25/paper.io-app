// app/blogs/actions.ts
'use server';

import { cookies } from 'next/headers';

interface Blog {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'published';
  updatedAt: string;
}

export async function fetchUserBlogs(): Promise<Blog[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value; // You might still want this for a quick auth check
  
  if (!token) { // Or, if your server solely relies on the cookie, you might remove this client-side check
    throw new Error('Not authenticated');
  }
  const cookieHeader = cookieStore.getAll().map(cookie => `${cookie.name}=${cookie.value}`).join('; ')
  const res = await fetch(`${process.env.API_PUBLIC_API_URL}/api/blogs/my-blogs`, {
    headers: { 
      'Cookie': cookieHeader 
    },
    cache: 'no-store', // always fresh
  });

  if (!res.ok) {
    const errorBody = await res.text(); // or res.json() if your API returns JSON errors
    throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText} - ${errorBody}`);
  }
  return res.json();
}