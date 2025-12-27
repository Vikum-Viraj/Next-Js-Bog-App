import connectToDatabase from "@/app/lib/db";
import Blog from "@/app/models/blog-schema";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();
        
        const blogs = await Blog.find({});

        return new Response(
            JSON.stringify({ blogs }), 
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in GET /api/blog/get-all:", error);
        return new Response(
            JSON.stringify({ message: "Internal Server Error" }), 
            { status: 500 }
        );
    }
}
