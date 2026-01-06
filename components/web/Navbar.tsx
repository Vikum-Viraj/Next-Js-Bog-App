"use client"

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Check if user is logged in by calling API endpoint
        const checkAuth = async () => {
            try {
                const response = await axios.get("/api/user/check-auth");
                const { isAuthenticated: authStatus } = response.data;
                setIsAuthenticated(authStatus);
            } catch (error) {
                console.error("Auth check error:", error);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
        
        const interval = setInterval(checkAuth, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleLogout = async () => {
        try {
            const response = await axios.get("/api/user/logout");
            
            if (response.data.success) {
                toast.success(response.data.message || "Logout successful!");
                setIsAuthenticated(false);
                setIsDropdownOpen(false);
                router.push('/auth/login');
            } else {
                toast.error(response.data.message || "Logout failed");
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "An error occurred during logout");
        }
    };

    return (
        <nav className="border-b">
            <div className="container mx-auto px-4 py-5 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/">
                        <h1 className="text-3xl font-bold">
                            Next<span className="text-blue-500">Pro</span>
                        </h1>
                    </Link>

                    <div className="flex items-center gap-4">
                        <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
                        <Link href="/blog" className="hover:text-blue-500 transition-colors">Blog</Link>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {isAuthenticated ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={buttonVariants({ variant: "outline" }) + " flex items-center gap-2"}
                            >
                                <User className="h-5 w-5" />
                                Account
                                <ChevronDown className="h-4 w-4" />
                            </button>
                            
                            {isDropdownOpen && (
                                <>
                                    <div 
                                        className="fixed inset-0 z-10" 
                                        onClick={() => setIsDropdownOpen(false)}
                                    />
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border z-20">
                                        <div className="py-1">
                                            <div className="px-4 py-2 text-sm font-semibold border-b">My Account</div>
                                            <button
                                                onClick={() => {
                                                    setIsDropdownOpen(false);
                                                    router.push('/user/profile');
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                Profile
                                            </button>
                                            <div className="border-t my-1" />
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link href="/auth/signup" className={buttonVariants()}>Sign up</Link>
                            <Link href="/auth/login" className={buttonVariants({ variant: "secondary" })}>Login</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}