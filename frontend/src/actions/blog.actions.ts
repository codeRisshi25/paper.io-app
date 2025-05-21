// app/blogs/actions.ts
'use server';

import { cookies } from 'next/headers';

interface ApiBlog { 
  _id: string; 
  title: string;
  content: string | null;
  status: 'draft' | 'published';
  updatedAt: string;
  tags: string[]; 
  author: string;
  createdAt: string;
}

interface ApiResponse {
  success: boolean;
  blogs: ApiBlog[];
}

export async function fetchUserBlogs(): Promise<ApiBlog[]> { // Return type updated
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  if (!token) {
    throw new Error('Not authenticated');
  }
  const cookieHeader = cookieStore.getAll().map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
  const res = await fetch(`${process.env.API_PUBLIC_API_URL}/api/blogs/my-blogs`, {
    headers: { 
      'Cookie': cookieHeader 
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText} - ${errorBody}`);
  }
  
  const data: ApiResponse = await res.json();

  if (!data.success || !Array.isArray(data.blogs)) {
    throw new Error('Failed to fetch blogs: API response format is incorrect.');
  }

  return data.blogs.map(blog => ({
    ...blog,
    id: blog._id 
  }));
}
