// app/blogs/BlogListClient.tsx
'use client';

import { useState } from 'react';

interface Blog {
  id: string;
  title: string;
  status: 'draft' | 'published';
  updatedAt: string;
}

export default function BlogListClient({ initialBlogs }: { initialBlogs: Blog[] }) {
  // Persist fetched blogs in React state
  const [blogs] = useState<Blog[]>(initialBlogs);

  return (
    <ul className="list-disc pl-6">
      {blogs.map((b) => (
        <li key={b.id} className="mb-1">
          <em>[{b.status}]</em> {b.title} —{' '}
          <small>{new Date(b.updatedAt).toLocaleTimeString()}</small>
        </li>
      ))}
    </ul>
  );
}
