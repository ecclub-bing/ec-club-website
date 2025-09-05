"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Pencil, PlusCircle, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { isBefore, parseISO, format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";

interface Event {
  id: string;
  title: string;
  date: string;
  location?: string;
  time?: string;
}

const EventTable = ({
  events,
  isLoading,
  isDeleting,
  handleDelete,
  noEventsMessage,
}: {
  events: Event[];
  isLoading: boolean;
  isDeleting: string | null;
  handleDelete: (id: string) => void;
  noEventsMessage: string;
}) => (
  <Card>
    <CardContent className="p-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-5 w-48" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-32" />
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Skeleton className="h-9 w-10 inline-block" />
                  <Skeleton className="h-9 w-10 inline-block" />
                </TableCell>
              </TableRow>
            ))
          ) : events.length > 0 ? (
            events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>
                  {format(parseISO(event.date), "MMM d, yyyy")}
                </TableCell>
                 <TableCell className="text-muted-foreground">{event.time || "N/A"}</TableCell>
                <TableCell className="text-muted-foreground">{event.location || "N/A"}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary">
                    <Link href={`/admin/events/edit/${event.id}`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={isDeleting === event.id}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        {isDeleting === event.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the event.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(event.id)}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center h-32 text-muted-foreground">
                {noEventsMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default function ManageEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const eventsCollection = collection(db, "events");
      const q = query(eventsCollection, orderBy("date", "desc"));
      const eventsSnapshot = await getDocs(q);
      const eventsList = eventsSnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Event)
      );
      setEvents(eventsList);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch events.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    try {
      await deleteDoc(doc(db, "events", id));
      toast({
        title: "Event Deleted",
        description: "The event has been successfully deleted.",
      });
      fetchEvents(); // Refresh the list
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete the event.",
      });
      console.error("Error deleting event:", error);
    } finally {
      setIsDeleting(null);
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0); 
  
  const upcomingEvents = events.filter((event) => !isBefore(parseISO(event.date), today));
  const pastEvents = events.filter((event) => isBefore(parseISO(event.date), today));


  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold font-headline">Manage Events</h1>
            <p className="text-muted-foreground mt-1">Create, view, and manage your organization's events.</p>
        </div>
        <Button asChild>
          <Link href="/admin/events/new">
            <PlusCircle className="mr-2" />
            New Event
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <EventTable
            events={upcomingEvents}
            isLoading={isLoading}
            isDeleting={isDeleting}
            handleDelete={handleDelete}
            noEventsMessage="There are no upcoming events."
          />
        </TabsContent>
        <TabsContent value="past">
          <EventTable
            events={pastEvents}
            isLoading={isLoading}
            isDeleting={isDeleting}
            handleDelete={handleDelete}
            noEventsMessage="There are no past events in the archive."
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
