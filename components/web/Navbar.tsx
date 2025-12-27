import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export function Navbar() {
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
                    <Link href="/auth/signup" className={buttonVariants()}>Sign up</Link>
                    <Link href="/auth/login" className={buttonVariants({ variant: "secondary" })}>Login</Link>
                </div>
            </div>
        </nav>
    );
}