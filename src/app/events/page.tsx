import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";

const events = [
    {
        date: "Fri, Oct 25",
        time: "5:00 PM",
        title: "Koffman Incubator Tour",
        location: "Koffman Southern Tier Incubator",
        description: "Join us for an exclusive tour of the Koffman Incubator and see where innovation happens.",
        link: "#",
    },
    {
        date: "Fri, Oct 18",
        time: "7:00 PM",
        title: "GBM#3: KLAWS Speaker Event",
        location: "Lecture Hall 10",
        description: "Listen to an inspiring talk from the founders of KLAWS, a successful student-run startup.",
        link: "#",
    },
    {
        date: "Fri, Oct 4",
        time: "6:30 PM",
        title: "Networking Night & Social",
        location: "University Union, Room 120",
        description: "Connect with fellow entrepreneurs, professionals, and alumni in a relaxed social setting.",
        link: "#",
    },
    {
        date: "Fri, Sep 20",
        time: "7:00 PM",
        title: "GBM#2: Idea Pitch Workshop",
        location: "Fine Arts Building, Room 258",
        description: "Learn how to craft and deliver a compelling pitch for your business idea.",
        link: "#",
    },
];

export default function EventsPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline">
            Club <span className="text-primary">Events</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Join our workshops, speaker sessions, and networking events to accelerate your entrepreneurial journey.
          </p>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
            <div className="flex flex-col gap-8">
                {events.map((event, index) => (
                    <Card key={index} className="transition-shadow duration-300 hover:shadow-lg">
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                <CardTitle className="font-headline text-2xl">{event.title}</CardTitle>
                                <div className="flex items-center gap-2 text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                                    <CalendarDays className="h-4 w-4" />
                                    <span>{event.date} @ {event.time}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
                                <MapPin className="h-4 w-4" />
                                <span>{event.location}</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">{event.description}</p>
                            <Button asChild>
                                <Link href={event.link}>View Details</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
