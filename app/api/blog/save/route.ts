import connectToDatabase from "@/app/lib/db";
import Blog from "@/app/models/user-model";


export async function POST(request: Request) {
    try{
        await connectToDatabase();
        const { title, description } = await request.json();
        const newBlog = new Blog({ title, description });
        await newBlog.save();
        return new Response(JSON.stringify({ message: "Blog created successfully", blog: newBlog }), { status: 201 });
    }catch(error){
        console.error("Error in POST /api/blog:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}