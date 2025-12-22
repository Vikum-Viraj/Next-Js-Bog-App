"use client"

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

interface DeleteButtonProps {
  blogId: string;
}

export default function DeleteButton({ blogId }: DeleteButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    setLoading(true);
    try {
      await axios.delete(`/api/blog/delete?id=${blogId}`);
      toast.success("Blog deleted successfully!");
      router.push("/blog");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button 
      variant="destructive" 
      onClick={handleDelete} 
      disabled={loading}
      className="flex items-center gap-2"
    >
      <Trash2 className="size-4" />
      {loading ? "Deleting..." : "Delete"}
    </Button>
  );
}
