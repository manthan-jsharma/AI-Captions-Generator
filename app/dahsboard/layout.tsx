import type React from "react";
import { requireAuth } from "@/lib/auth-utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, User } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                CaptionAI
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-purple-100 rounded-full">
                <User className="h-5 w-5 text-purple-600" />
              </div>
              <span>{user.name}</span>
            </div>
            <form action="/api/auth/signout" method="POST">
              <Button variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
}
