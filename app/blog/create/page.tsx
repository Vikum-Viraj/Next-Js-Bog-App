"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post("/api/blog/save/", {
        title,
        description
      });
      
      if(response.status === 201){
        toast.success("Blog post created successfully!");
        setTitle("");
        setDescription("");
        router.push("/blog");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Failed to create blog post. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="space-y-3">
          <CardTitle className="text-2xl">Create Blog Post</CardTitle>
          <CardDescription className="text-base">Write a new blog post</CardDescription>
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
            <Button type="submit" className="w-full h-11 text-base" disabled={loading}>
              {loading ? "Creating..." : "Create Blog Post"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
