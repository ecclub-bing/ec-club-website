import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calendar, Settings } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold font-headline mb-8">Admin Dashboard</h1>
            <p className="text-muted-foreground mb-12">Welcome! Here you can manage your site's content.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
