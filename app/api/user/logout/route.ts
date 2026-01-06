import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/db";

export const GET = async () => {
    try {
        await connectToDatabase();
        
        const response = NextResponse.json({
            success: true,
            message: "Logout successful"
        });

        // Clear the auth token cookie
        response.cookies.set(process.env.COOKIE_KEY || "auth_token", '', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            expires: new Date(0)
        });

        // Clear the client-readable cookie
        response.cookies.set("isLoggedIn", '', {
            httpOnly: false,
            secure: true,
            sameSite: 'none',
            expires: new Date(0)
        });

        return response;
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Server error: " + (error as Error).message
        });
    }
};
