import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4">
      <div className="py-4">
        <Link href="/" className={buttonVariants({ variant: "secondary" })}>
          <ArrowLeft className="size-4 mr-2" />
          Go Back
        </Link>
      </div>
      {children}
    </div>
  );
}