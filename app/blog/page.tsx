"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Blog {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    try {
      const response = await axios.get("/api/blog/get-all");
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(e: React.MouseEvent, blogId: string) {
    e.preventDefault(); // Prevent navigation to blog detail
    e.stopPropagation(); // Stop event bubbling

    if (!confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    try {
      await axios.delete(`/api/blog/delete?id=${blogId}`);
      toast.success("Blog deleted successfully!");
      // Remove deleted blog from state
      setBlogs(blogs.filter(blog => blog._id !== blogId));
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog. Please try again.");
    }
  }

  function handleEdit(e: React.MouseEvent, blogId: string) {
    e.preventDefault(); // Prevent navigation to blog detail
    e.stopPropagation(); // Stop event bubbling
    router.push(`/blog/update/${blogId}`);
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading blogs...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Button asChild>
          <Link href="/blog/create">Create Blog Post</Link>
        </Button>
      </div>
      {blogs.length === 0 ? (
        <p className="text-gray-500">No blogs yet. Create your first blog post!</p>
      ) : (
        <div className="grid gap-6">
          {blogs.map((blog) => (
            <Card key={blog._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <Link href={`/blog/${blog._id}`} className="flex-1 cursor-pointer">
                    <CardTitle className="text-xl hover:underline">{blog.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{blog.description}</CardDescription>
                  </Link>
                  <div className="flex gap-2 shrink-0">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={(e) => handleEdit(e, blog._id)}
                      className="cursor-pointer"
                    >
                      <Edit className="size-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="icon"
                      onClick={(e) => handleDelete(e, blog._id)}
                      className="cursor-pointer"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
