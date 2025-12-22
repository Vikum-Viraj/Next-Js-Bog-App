import connectToDatabase from "@/app/lib/db";
import Blog from "@/app/models/user-model";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
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

        const blog = await Blog.findById(id);
        
        if (!blog) {
            return new Response(
                JSON.stringify({ message: "Blog not found" }), 
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({ blog }), 
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in GET /api/blog/get-one:", error);
        return new Response(
            JSON.stringify({ message: "Internal Server Error" }), 
            { status: 500 }
        );
    }
}
