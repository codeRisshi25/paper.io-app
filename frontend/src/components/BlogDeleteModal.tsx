"use client";

import { useState, useEffect } from 'react';
import { deleteBlog } from '@/actions/blog.actions'; 
import { Button } from './ui/button';

interface BlogDeleteModalProps {
  blogId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onDeleteSuccess: () => void;
}

export default function BlogDeleteModal({ blogId, isOpen, onClose, onDeleteSuccess }: BlogDeleteModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!isOpen) {
      setIsDeleting(false);
      setError(null);
    }
  }, [isOpen]);

  const handleDelete = async () => {
    if (!blogId) return;

    setIsDeleting(true);
    setError(null);
    try {
      const message = await deleteBlog(blogId);
      console.log(message); 
      onDeleteSuccess();
      onClose();
    } catch (err) {
      console.error("Failed to delete blog:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen || !blogId) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">Confirm Deletion</h2>
        <p className="mb-6 text-slate-700 dark:text-slate-300">
          Are you sure you want to delete this blog post? This action cannot be undone.
        </p>
        {error && (
          <p className="mb-4 text-red-500 bg-red-100 dark:bg-red-900 dark:text-red-200 p-3 rounded-md">{error}</p>
        )}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
            className="dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-100"
          >
            Cancel
          </Button>
          <Button
            variant="destructive" // Assuming you have a destructive variant for delete buttons
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  );
}