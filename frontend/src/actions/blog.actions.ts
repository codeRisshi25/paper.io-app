// app/blogs/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

interface ApiBlog { 
  _id?: string; 
  title: string;
  content: string | null;
  status: 'draft' | 'published';
  updatedAt?: string;
  tags: string[]; 
  author?: {name : string , email : string};
  createdAt?: string;
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

export async function getBlogById(id: string): Promise<ApiBlog> {  // Return type changed to single blog
  const res = await fetch(`${process.env.API_PUBLIC_API_URL}/api/blogs/${id}`, {
    cache: 'no-store',
  });
  
  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Failed to fetch blog: ${res.status} ${res.statusText} - ${errorBody}`);
  }
  
  const data = await res.json();
  
  if (!data.success || !data.blog) {
    throw new Error('Failed to fetch blog: API response format is incorrect.');
  }
  
  return {
    ...data.blog,
    id: data.blog._id
  };
}

export async function getUserBlog(id : string) : Promise<ApiBlog> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  if (!token) {
    throw new Error('Not authenticated');
  }
  
  const cookieHeader = cookieStore.getAll().map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
  
  const res = await fetch(`${process.env.API_PUBLIC_API_URL}/api/blogs/myblog/${id}`, {
    headers: { 
      'Cookie': cookieHeader 
    },
    cache: 'no-store',
  });
  
  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Failed to fetch blog: ${res.status} ${res.statusText} - ${errorBody}`);
  }
  
  const data = await res.json();
  
  if (!data.success || !data.blog) {
    throw new Error('Failed to fetch blog: API response format is incorrect.');
  }
  
  return {
    ...data.blog,
    id: data.blog._id
  };
}

export async function onSaveBlog({blogData} : {blogData: ApiBlog}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  if (!token) {
    throw new Error('Not authenticated');
  }
  
  const cookieHeader = cookieStore.getAll().map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
  
  const res = await fetch(`${process.env.API_PUBLIC_API_URL}/api/blogs/drafts`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Cookie': cookieHeader 
    },
    body: JSON.stringify(blogData),
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    const errorBody = errorData.message || 'Unknown error';
    throw new Error(`Failed to save blog: ${res.status} ${res.statusText} - ${errorBody}`);
  }
  
  const data = await res.json();
  
  if (!data.success || !data.blog) {
    throw new Error('Failed to save blog: API response format is incorrect.');
  }
  
  return {
    message: data.message,
    blogId: data.blog._id,

  }
}

export async function deleteBlog(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  if (!token) {
    throw new Error('Not authenticated');
  }
  
  const cookieHeader = cookieStore.getAll().map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
  
  const res = await fetch(`${process.env.API_PUBLIC_API_URL}/api/blogs/${id}`, {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
      'Cookie': cookieHeader 
    },
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    const errorBody = errorData.message || 'Unknown error';
    throw new Error(`Failed to delete blog: ${res.status} ${res.statusText} - ${errorBody}`);
  }
  
  const data = await res.json();
  
  if (!data.success) {
    throw new Error('Failed to delete blog: API response format is incorrect.');
  }
  
  return data.message;
}

export async function publishBlog(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  if (!token) {
    throw new Error('Not authenticated');
  }
  
  const cookieHeader = cookieStore.getAll().map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
  
  const res = await fetch(`${process.env.API_PUBLIC_API_URL}/api/blogs/publish/${id}`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Cookie': cookieHeader 
    },
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    const errorBody = errorData.message || 'Unknown error';
    throw new Error(`Failed to publish blog: ${res.status} ${res.statusText} - ${errorBody}`);
  }
  
  const data = await res.json();
  
  if (!data.success) {
    throw new Error('Failed to publish blog: API response format is incorrect.');
  }

  revalidatePath('/dashboard');
  return data.message;
}