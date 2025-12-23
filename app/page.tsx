import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, PenTool, Users, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Welcome to <span className="text-blue-500">NextPro</span> Blog
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Share your thoughts, stories, and ideas with the world. 
              Create, publish, and manage your blog posts effortlessly.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/auth/signup" className={buttonVariants({ size: "lg", className: "text-lg px-8" })}>
              Get Started
            </Link>
            <Link href="/blog" className={buttonVariants({ variant: "outline", size: "lg", className: "text-lg px-8" })}>
              Browse Blogs
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose NextPro?</h2>
          <p className="text-lg text-muted-foreground">Everything you need to create amazing blog content</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-2 hover:border-blue-500 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <PenTool className="w-6 h-6 text-blue-500" />
              </div>
              <CardTitle>Easy Writing</CardTitle>
              <CardDescription>
                Simple and intuitive interface to write and format your blog posts
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-blue-500 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-500" />
              </div>
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                Built with Next.js for blazing fast performance and optimal user experience
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-blue-500 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <CardTitle>User Roles</CardTitle>
              <CardDescription>
                Manage permissions with admin and user roles for better content control
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-blue-500 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-blue-500" />
              </div>
              <CardTitle>Rich Content</CardTitle>
              <CardDescription>
                Create engaging blog posts with rich formatting and media support
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <Card className="border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent">
          <CardContent className="flex flex-col items-center text-center space-y-6 py-12">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Blogging?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Join our community of writers and share your unique perspective with the world. 
              It only takes a minute to get started.
            </p>
            <Link href="/auth/signup" className={buttonVariants({ size: "lg", className: "text-lg px-8" })}>
              Create Your Account
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
