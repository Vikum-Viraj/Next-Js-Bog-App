import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "@/app/models/user-model";
import connectToDatabase from "@/app/lib/db";

export const POST = async (request: Request) => {
    try {
        await connectToDatabase();

        const { email, password } = await request.json();

        const existingUser = await UserModel.findOne({ email });
        if (!existingUser || existingUser.role !== "user") {
            return NextResponse.json({
                success: false,
                message: "Invalid user"
            }, { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return NextResponse.json({
                success: false,
                message: "Invalid password"
            }, { status: 401 });
        }

        const token = jwt.sign(
            { userId: existingUser._id.toString() }, 
            process.env.JWT_SECRET_KEY!
        );

        const response = NextResponse.json({
            success: true,
            message: "Login successful"
        });

        const expires = new Date(
            Date.now() + (parseInt(process.env.COOKIE_EXPIRES || "7")) * 24 * 60 * 60 * 1000
        );
        
        // Set httpOnly cookie for security
        response.cookies.set(process.env.COOKIE_KEY || "auth_token", token, {
            expires,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax'
        });

        // Set a client-readable cookie to check auth state
        response.cookies.set("isLoggedIn", "true", {
            expires,
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax'
        });

        return response;
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Server error: " + (error as Error).message
        }, { status: 500 });
    }
};
