import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const authToken = cookieStore.get(process.env.COOKIE_KEY || "auth_token");
        
        return NextResponse.json({
            isAuthenticated: !!authToken
        });
    } catch (error) {
        return NextResponse.json({
            isAuthenticated: false
        });
    }
}
