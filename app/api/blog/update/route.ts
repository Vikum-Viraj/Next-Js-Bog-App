import connectToDatabase from "@/app/lib/db";
import Blog from "@/app/models/user-model";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
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

        const { title, description } = await request.json();

        if (!title || !description) {
            return new Response(
                JSON.stringify({ message: "Title and description are required" }), 
                { status: 400 }
            );
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title, description },
            { new: true, runValidators: true }
        );
        
        if (!updatedBlog) {
            return new Response(
                JSON.stringify({ message: "Blog not found" }), 
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({ message: "Blog updated successfully", blog: updatedBlog }), 
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in PUT /api/blog/update:", error);
        return new Response(
            JSON.stringify({ message: "Internal Server Error" }), 
            { status: 500 }
        );
    }
}
