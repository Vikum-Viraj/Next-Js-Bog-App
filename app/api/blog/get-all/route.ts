import connectToDatabase from "@/app/lib/db";
import Blog from "@/app/models/blog-schema";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        console.log("📖 Attempting to fetch all blogs...");
        await connectToDatabase();
        console.log("✅ Database connected, querying blogs...");
        
        // First, try to get blogs without populate to isolate the issue
        const blogs = await Blog.find({})
            .sort({ createdAt: -1 })
            .lean()
            .catch((err) => {
                console.error("❌ Error in Blog.find():", err);
                throw err;
            });

        console.log(`✅ Found ${blogs.length} blogs (without populate)`);

        // Then try to populate author info
        const blogsWithAuthor = await Blog.find({})
            .populate({
                path: 'author',
                select: 'name email',
                strictPopulate: false
            })
            .sort({ createdAt: -1 })
            .lean()
            .catch((err) => {
                console.error("⚠️ Error populating author, returning blogs without author info:", err);
                return blogs; // Fallback to blogs without author
            });

        console.log(`✅ Successfully populated author info`);

        return new Response(
            JSON.stringify({ 
                success: true,
                blogs: blogsWithAuthor || blogs
            }), 
            { 
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        console.error("❌ Error in GET /api/blog/get-all:", error);
        console.error("Error details:", {
            name: error instanceof Error ? error.name : 'Unknown',
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : 'No stack trace'
        });
        
        return new Response(
            JSON.stringify({ 
                success: false,
                message: "Internal Server Error",
                error: error instanceof Error ? error.message : "Unknown error"
            }), 
            { 
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}
