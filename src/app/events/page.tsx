"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { format, parseISO, isBefore } from "date-fns";

interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description: string;
  link?: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = events.filter((event) => !isBefore(parseISO(event.date), today));
  const pastEvents = events.filter((event) => isBefore(parseISO(event.date), today));

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="text-center mb-20">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-headline">
            Upcoming <span className="text-primary">Events</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Join our workshops, speaker sessions, and networking events to accelerate your entrepreneurial journey.
          </p>
        </div>

        {/* Upcoming Events List */}
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-48 w-full mb-8" />)
          ) : upcomingEvents.length > 0 ? (
            <div className="relative">
              <div className="absolute left-10 top-0 h-full w-0.5 bg-border -z-10"></div>
              {upcomingEvents.map((event) => (
                  <div key={event.id} className="relative mb-12 pl-10">
                      <div className="absolute left-10 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                      <Card className="group shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-1 border-transparent hover:border-primary/50 relative overflow-hidden">
                          <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
                              <div className="flex flex-col items-center justify-center bg-primary text-primary-foreground rounded-lg p-4 w-24 h-24 text-center shrink-0">
                                  <span className="text-4xl font-bold font-headline">{format(parseISO(event.date), 'dd')}</span>
                                  <span className="text-md font-semibold uppercase">{format(parseISO(event.date), 'MMM')}</span>
                              </div>
                              <div className="flex-grow text-center md:text-left">
                                  {event.time && <div className="text-muted-foreground font-medium mb-1">{event.time}</div>}
                                  <h3 className="font-headline text-2xl font-bold leading-tight mb-2">{event.title}</h3>
                                  {event.location && (
                                    <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground mb-3">
                                      <MapPin className="h-4 w-4 shrink-0" />
                                      <span>{event.location}</span>
                                    </div>
                                  )}
                                  <p className="text-muted-foreground mb-4 text-sm">{event.description}</p>
                              </div>
                              {event.link && (
                                <div className="mt-auto shrink-0">
                                    <Button asChild size="sm" className="group-hover:bg-primary/90 transition-colors w-full sm:w-auto">
                                        <Link href={event.link} target="_blank" rel="noopener noreferrer">
                                            Register Now <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </Button>
                                </div>
                              )}
                          </CardContent>
                      </Card>
                  </div>
              ))}
            </div>
          ) : (
             <p className="text-center text-muted-foreground">No upcoming events scheduled. Check back soon!</p>
          )}
        </div>


        {/* Past Events Section */}
        <div className="mt-32">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-extrabold tracking-tight font-headline">
                    From Our <span className="text-primary/80">Archives</span>
                </h2>
                <p className="mt-3 max-w-md mx-auto text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                    A look back at some of our memorable past events.
                </p>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-56 w-full" />)}
                </div>
            ) : pastEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pastEvents.map((event) => (
                        <Card key={event.id} className="flex flex-col bg-card/50 hover:bg-card transition-all duration-300 group shadow-md hover:shadow-xl border">
                            <CardContent className="p-6 flex flex-col flex-grow">
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="font-headline text-3xl font-bold text-primary/90">{format(parseISO(event.date), 'dd')}</span>
                                    <span className="text-lg font-semibold text-muted-foreground">{format(parseISO(event.date), 'MMM')}</span>
                                    <span className="text-lg text-muted-foreground">{format(parseISO(event.date), 'yyyy')}</span>
                                </div>
                                <h3 className="font-headline text-xl font-bold mb-3 flex-grow">{event.title}</h3>
                                <p className="text-muted-foreground text-sm mb-4">{event.description}</p>
                                {event.link && (
                                  <Button asChild variant="link" className="p-0 self-start text-accent-foreground/70 group-hover:text-primary">
                                    <Link href={event.link} target="_blank" rel="noopener noreferrer">
                                          Event Recap <ArrowRight className="ml-2 h-4 w-4" />
                                      </Link>
                                  </Button>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted-foreground">No past events to show.</p>
            )}
        </div>
      </div>
    </div>
  );
}
