import connectToDatabase from "@/app/lib/db";
import Blog from "@/app/models/blog-schema";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try{
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

        // Verify and decode the token to get userId
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { userId: string };
            console.log("Decoded token:", decoded);
        } catch (jwtError) {
            console.error("JWT verification error:", jwtError);
            return new Response(JSON.stringify({ 
                success: false,
                message: "Invalid token" 
            }), { status: 401 });
        }
        
        if (!decoded.userId) {
            console.error("No userId in decoded token:", decoded);
            return new Response(JSON.stringify({ 
                success: false,
                message: "Invalid token payload - userId missing" 
            }), { status: 401 });
        }
        
        const { title, description } = await request.json();
        
        console.log("Creating blog with author:", decoded.userId);
        
        // Create blog with author (userId)
        const newBlog = new Blog({ 
            title, 
            description,
            author: decoded.userId 
        });
        await newBlog.save();
        
        console.log("Blog saved successfully with author:", newBlog.author);
        
        return new Response(JSON.stringify({ 
            success: true,
            message: "Blog created successfully", 
            blog: newBlog 
        }), { status: 201 });
    }catch(error){
        console.error("Error in POST /api/blog:", error);
        return new Response(JSON.stringify({ 
            success: false,
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : "Unknown error"
        }), { status: 500 });
    }
}