import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { notFound } from "next/navigation";
import DeleteButton from "./DeleteButton";

interface BlogDetailPageProps {
    params: Promise<{
        blogId: string
    }>
}

interface Blog {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
}

async function getBlog(id: string): Promise<Blog | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/get-one?id=${id}`, {
            cache: 'no-store'
        });
        
        if (!res.ok) {
            return null;
        }
        
        const data = await res.json();
        return data.blog;
    } catch (error) {
        console.error('Error fetching blog:', error);
        return null;
    }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
    const { blogId } = await params;
    const blog = await getBlog(blogId);

    if (!blog) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto p-8">
            <Card>
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle className="text-3xl font-bold">{blog.title}</CardTitle>
                            <p className="text-sm text-gray-500">
                                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-lg whitespace-pre-wrap">{blog.description}</p>
                </CardContent>
            </Card>
        </div>
    )
}

