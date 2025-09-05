"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calendar, LogOut, Home } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function AdminPage() {
    const { user } = useAuth();
    const router = useRouter();
    const { toast } = useToast();

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            toast({
                title: "Signed Out",
                description: "You have been successfully signed out.",
            });
            router.push('/login');
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Sign Out Error",
                description: "Failed to sign out. Please try again.",
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-4xl font-bold font-headline">Admin Dashboard</h1>
                    {user && <p className="text-muted-foreground mt-2">Welcome, {user.email}!</p>}
                </div>
                <Button variant="outline" onClick={handleSignOut}>
                    Sign Out
                    <LogOut className="ml-2 h-4 w-4" />
                </Button>
            </div>
            
            <p className="text-muted-foreground mb-12">Here you can manage your site's content.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <Link href="/admin/homepage">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-medium">
                                Manage Homepage
                            </CardTitle>
                            <Home className="h-6 w-6 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Edit images and content on the main landing page.
                            </p>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/admin/articles">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-medium">
                                Manage Articles
                            </CardTitle>
                            <FileText className="h-6 w-6 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Create, edit, and delete articles for your blog.
                            </p>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/admin/events">
                     <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-medium">
                                Manage Events
                            </CardTitle>
                            <Calendar className="h-6 w-6 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Add and update events for your upcoming schedule.
                            </p>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    )
}
