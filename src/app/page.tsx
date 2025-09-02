import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const articles = [
  {
    image: {
      src: "https://picsum.photos/600/400",
      hint: "presentation business",
    },
    date: "September 25, 2024",
    title: "Welcome Back: Reflecting on Our Recent GIM Sessions",
    link: "#",
  },
  {
    image: {
      src: "https://picsum.photos/600/400",
      hint: "group discussion",
    },
    date: "September 25, 2024",
    title: "Welcome Back: Reflecting on Our Recent GIM Sessions",
    link: "#",
  },
  {
    image: {
      src: "https://picsum.photos/600/400",
      hint: "portrait speaker",
    },
    date: "April 15, 2024",
    title: "“Having a Great Idea Is Only Brushing the Surface of What it Means To Be an Entrepreneur” - Ryon Batson",
    link: "#",
  },
];

const events = [
    {
        date: "Fri, Oct 25",
        title: "Koffman Incubator Tour",
        location: "Location is TBD",
        link: "#",
    },
    {
        date: "Fri, Oct 18",
        title: "GBM#3: KLAWS Speaker Event",
        location: "Lecture Hall 10",
        link: "#",
    },
]

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[500px] w-full flex items-center justify-center text-center text-white overflow-hidden">
        <Image
          src="https://picsum.photos/1920/1080"
          alt="A team of innovators collaborating"
          fill
          className="object-cover"
          data-ai-hint="students meeting"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center gap-6 p-4">
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-shadow-lg">
            Entrepreneur Connect
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-neutral-200">
            Uniting like-minded innovators and leaders to do what they do best.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
              <Link href="/events">Events</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="font-bold">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="flex flex-col gap-4">
              <h2 className="font-headline text-4xl font-bold text-primary">Entrepreneurship and Innovation</h2>
              <h3 className="font-headline text-2xl font-semibold">Building a Community of Student Entrepreneurs</h3>
              <p className="text-muted-foreground mt-2">
                 Entrepreneur Connect is a student founded and run professional organization at Binghamton Universities campus. Our main focus is helping students with entrepreneurial interests get a headstart through: resources, connections, and other student entrepreneurs.
              </p>
              <Button asChild className="mt-4 self-start group transition-all duration-300 ease-in-out bg-accent hover:bg-accent/90">
                <Link href="/about">
                  Read More <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-2xl group">
              <Image
                src="https://picsum.photos/600/800"
                alt="About EC"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                data-ai-hint="university campus"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"/>
              <div className="absolute bottom-6 left-6">
                <h3 className="font-headline text-3xl font-bold text-white">About EC</h3>
                 <Link href="/about" className="text-primary font-semibold hover:underline">Read More</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-20 md:py-32 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl font-bold">Articles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group">
                <CardContent className="p-0">
                  <div className="relative h-56 w-full">
                    <Image
                      src={article.image.src}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      data-ai-hint={article.image.hint}
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground mb-2">{article.date}</p>
                    <h3 className="font-headline text-lg font-semibold mb-4 h-20">{article.title}</h3>
                    <Button asChild variant="link" className="p-0 font-bold text-accent group-hover:text-primary">
                      <Link href={article.link}>
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="font-headline text-4xl font-bold">Upcoming Events</h2>
              <p className="mt-4 text-muted-foreground">Stay updated with our latest workshops, talks, and networking sessions.</p>
              <Button asChild className="mt-6 group transition-all duration-300 ease-in-out bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/events">
                    See Full Calendar <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            <div className="lg:col-span-2">
                <div className="flex flex-col gap-4">
                    {events.map((event, index) => (
                        <Card key={index} className="transition-all duration-300 hover:shadow-xl hover:border-primary">
                            <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <div className="flex items-center gap-3 text-primary">
                                    <CalendarDays className="h-8 w-8"/>
                                    <span className="font-headline font-bold text-lg w-24">{event.date}</span>
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-headline font-semibold text-xl">{event.title}</h3>
                                    <p className="text-muted-foreground">{event.location}</p>
                                </div>
                                <Button asChild variant="outline" className="shrink-0 self-start sm:self-center">
                                    <Link href={event.link}>Details</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
