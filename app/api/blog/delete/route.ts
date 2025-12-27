import connectToDatabase from "@/app/lib/db";
import Blog from "@/app/models/blog-schema";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
    try {
        await connectToDatabase();
        
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        
        if (!id) {
            return new Response(
                JSON.stringify({ message: "Blog ID is required" }), 
                { status: 400 }
            );
        }

        const deletedBlog = await Blog.findByIdAndDelete(id);
        
        if (!deletedBlog) {
            return new Response(
                JSON.stringify({ message: "Blog not found" }), 
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({ message: "Blog deleted successfully", blog: deletedBlog }), 
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in DELETE /api/blog/delete:", error);
        return new Response(
            JSON.stringify({ message: "Internal Server Error" }), 
            { status: 500 }
        );
    }
}
