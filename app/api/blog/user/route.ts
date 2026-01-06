import connectToDatabase from "@/app/lib/db";
import Blog from "@/app/models/blog-schema";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(request: Request) {
    try {
        await connectToDatabase();

        // Get the token from cookies
        const cookieStore = await cookies();
        const token = cookieStore.get(process.env.COOKIE_KEY || "auth_token")?.value;
        
        if (!token) {
            return new Response(JSON.stringify({ 
                success: false,
                message: "Unauthorized - No token provided" 
            }), { status: 401 });
        }

        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { userId: string };

        // Fetch only blogs created by this user
        const userBlogs = await Blog.find({ author: decoded.userId })
            .populate('author', 'name email')
            .sort({ createdAt: -1 });

        return new Response(
            JSON.stringify({ 
                success: true,
                blogs: userBlogs 
            }), 
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching user blogs:", error);
        return new Response(
            JSON.stringify({ 
                success: false,
                message: "Internal Server Error" 
            }), 
            { status: 500 }
        );
    }
}
