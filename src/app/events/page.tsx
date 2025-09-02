import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

const upcomingEvents = [
    {
        date: "25",
        month: "Oct",
        time: "5:00 PM",
        title: "Koffman Incubator Tour",
        location: "Koffman Southern Tier Incubator",
        description: "Join us for an exclusive tour of the Koffman Incubator and see where innovation happens.",
        link: "#",
    },
    {
        date: "18",
        month: "Oct",
        time: "7:00 PM",
        title: "GBM#3: KLAWS Speaker Event",
        location: "Lecture Hall 10",
        description: "Listen to an inspiring talk from the founders of KLAWS, a successful student-run startup.",
        link: "#",
    },
    {
        date: "04",
        month: "Oct",
        time: "6:30 PM",
        title: "Networking Night & Social",
        location: "University Union, Room 120",
        description: "Connect with fellow entrepreneurs, professionals, and alumni in a relaxed social setting.",
        link: "#",
    },
];

const pastEvents = [
    {
        date: "20",
        month: "Sep",
        year: "2024",
        title: "GBM#2: Idea Pitch Workshop",
        description: "Learned how to craft and deliver a compelling pitch for a business idea.",
        link: "#",
    },
    {
        date: "06",
        month: "Sep",
        year: "2024",
        title: "Welcome Back GIM",
        description: "Kicked off the semester with our first General Interest Meeting.",
        link: "#",
    },
    {
        date: "28",
        month: "Apr",
        year: "2024",
        title: "End of Year Showcase",
        description: "Members presented their semester-long projects to a panel of judges.",
        link: "#",
    }
]

export default function EventsPage() {
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

        {/* Upcoming Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {upcomingEvents.map((event, index) => (
                <Card key={index} className="group shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-1 border-transparent hover:border-primary/50 relative overflow-hidden flex flex-col">
                    <CardContent className="p-6 relative z-10 flex flex-col flex-grow">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex flex-col items-center justify-center bg-primary text-primary-foreground rounded-lg p-3 w-20 h-20 text-center shrink-0">
                                <span className="text-3xl font-bold font-headline">{event.date}</span>
                                <span className="text-sm font-semibold uppercase">{event.month}</span>
                            </div>
                            <div>
                                <h3 className="font-headline text-xl font-bold leading-tight">{event.title}</h3>
                                <div className="text-muted-foreground font-medium mt-1">{event.time}</div>
                            </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4 text-sm flex-grow">{event.description}</p>
                        
                        <div className="flex items-start gap-2 text-sm text-muted-foreground mb-6">
                            <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                            <span>{event.location}</span>
                        </div>

                        <div className="mt-auto">
                            <Button asChild size="sm" className="w-full group-hover:bg-primary/90 transition-colors">
                                <Link href={event.link}>
                                    Register Now <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pastEvents.map((event, index) => (
                    <Card key={index} className="flex flex-col bg-card/50 hover:bg-card transition-all duration-300 group shadow-md hover:shadow-xl border">
                        <CardContent className="p-6 flex flex-col flex-grow">
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="font-headline text-3xl font-bold text-primary/90">{event.date}</span>
                                <span className="text-lg font-semibold text-muted-foreground">{event.month}</span>
                                <span className="text-lg text-muted-foreground">{event.year}</span>
                            </div>
                            <h3 className="font-headline text-xl font-bold mb-3 flex-grow">{event.title}</h3>
                            <p className="text-muted-foreground text-sm mb-4">{event.description}</p>
                            <Button asChild variant="link" className="p-0 self-start text-accent-foreground/70 group-hover:text-primary">
                               <Link href={event.link}>
                                    Event Recap <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
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
