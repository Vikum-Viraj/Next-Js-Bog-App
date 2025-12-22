"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UpdateBlogPageProps {
  params: Promise<{
    blogId: string
  }>
}

export default function UpdateBlogPage({ params }: UpdateBlogPageProps) {
  const [blogId, setBlogId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadBlog() {
      const resolvedParams = await params;
      setBlogId(resolvedParams.blogId);
      
      try {
        const response = await axios.get(`/api/blog/get-one?id=${resolvedParams.blogId}`);
        const blog = response.data.blog;
        setTitle(blog.title);
        setDescription(blog.description);
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to load blog. Please try again.");
      } finally {
        setFetching(false);
      }
    }
    loadBlog();
  }, [params]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.put(`/api/blog/update?id=${blogId}`, {
        title,
        description
      });
      
      if(response.status === 200){
        toast.success("Blog post updated successfully!");
        router.push("/blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog post. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-3">
          <CardTitle className="text-2xl">Update Blog Post</CardTitle>
          <CardDescription className="text-base">Edit your blog post</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">Blog Title</Label>
              <Input 
                id="title" 
                type="text" 
                placeholder="Enter your blog title" 
                className="h-11"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">Description</Label>
              <textarea 
                id="description" 
                placeholder="Write your blog content here..." 
                className="min-h-[100px] min-w-full p-3 border border-gray-300 rounded-md resize-y"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="flex gap-4">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1 h-11 text-base"
                onClick={() => router.push("/blog")}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 h-11 text-base" disabled={loading}>
                {loading ? "Updating..." : "Update Blog Post"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
