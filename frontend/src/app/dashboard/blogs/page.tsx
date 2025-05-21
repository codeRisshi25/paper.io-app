import { fetchUserBlogs } from '@/actions/blog.actions';
import BlogListClient from './BlogListClient';

export default async function MyBlogsPage() {
  let blogs = [];
  try {
    let resp = await fetchUserBlogs();
    blogs = resp.blogs
    console.log('Fetched blogs:', blogs);
  } catch (error) {
    // Handle auth failure by redirecting, or show a message
    console.error('Failed to fetch blogs', error);
    return <p>You must <a href="/login">log in</a> to see your blogs.</p>;
  }

  // Render a Server‑Component that streams the static HTML
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">My Blogs (Server Rendered)</h1>
      <ul>
        {blogs.map((b) => (
          <li key={b.id} className="mb-2">
            <strong>[{b.status}]</strong> {b.title}
            <span className="text-gray-500 ml-2">
              {new Date(b.updatedAt).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>

      <h2 className="text-xl mt-8 mb-4">Hydrated Client List</h2>
      {/* Hydrate on the client and persist in React state */}
      <BlogListClient initialBlogs={blogs} />
    </div>
  );
}
