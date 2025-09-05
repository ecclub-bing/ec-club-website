
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, Lightbulb, BarChart, TrendingUp, Target, Handshake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, limit, where, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { format, isBefore, parseISO } from "date-fns";

interface Article {
  id: string;
  title: string;
  paragraph: string;
  imageUrl: string;
  imageHint: string;
  date: string;
  linkedinUrl: string;
}

interface Event {
    id: string;
    title: string;
    date: string;
    location?: string;
    link?: string;
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch Articles
        const articlesCollection = collection(db, "articles");
        const articleQuery = query(articlesCollection, orderBy("date", "desc"), limit(3));
        const articlesSnapshot = await getDocs(articleQuery);
        const articlesList = articlesSnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Article)
        );
        setArticles(articlesList);

        // Fetch Upcoming Events
        const eventsCollection = collection(db, "events");
        const today = format(new Date(), 'yyyy-MM-dd');
        const eventQuery = query(
            eventsCollection, 
            where("date", ">=", today), 
            orderBy("date", "asc"), 
            limit(2)
        );
        const eventsSnapshot = await getDocs(eventQuery);
        const eventsList = eventsSnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Event)
        );
        setEvents(eventsList);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] w-full flex items-center justify-center text-center text-white overflow-hidden">
        <Image
          src="https://picsum.photos/1920/1080"
          alt="A team of innovators collaborating"
          fill
          className="object-cover"
          data-ai-hint="students meeting"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
        <div className="relative z-10 flex flex-col items-center gap-6 p-4 container mx-auto px-4">
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-shadow-lg animate-fade-in-up" style={{animationDelay: '300ms'}}>
            Entrepreneur Connect
          </h1>
          <p className="max-w-3xl text-lg md:text-xl text-neutral-200 animate-fade-in-up" style={{animationDelay: '500ms'}}>
            Uniting Binghamton's brightest minds to foster innovation and build the future of student-led enterprise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 animate-fade-in-up" style={{animationDelay: '700ms'}}>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg">
              <Link href="/events">Explore Events</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="font-bold shadow-lg">
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/20 relative">
        <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-48 h-48 bg-primary/5 rounded-full" />
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-32 h-32 bg-primary/5 rounded-full" />
        <TrendingUp className="absolute top-1/4 right-[10%] h-16 w-16 text-primary/10 -rotate-12" />
        <Target className="absolute bottom-1/4 left-[15%] h-12 w-12 text-primary/10 rotate-12" />

        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-4 p-6 rounded-lg animate-fade-in-up" style={{animationDelay: '200ms'}}>
              <div className="bg-primary text-primary-foreground rounded-full p-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="font-headline text-xl font-semibold">Community</h3>
              <p className="text-muted-foreground">Connect with a diverse network of student entrepreneurs and industry mentors.</p>
            </div>
            <div className="flex flex-col items-center gap-4 p-6 rounded-lg animate-fade-in-up" style={{animationDelay: '400ms'}}>
              <div className="bg-primary text-primary-foreground rounded-full p-4">
                <Lightbulb className="h-8 w-8" />
              </div>
              <h3 className="font-headline text-xl font-semibold">Resources</h3>
              <p className="text-muted-foreground">Access workshops, funding opportunities, and essential tools for your startup.</p>
            </div>
            <div className="flex flex-col items-center gap-4 p-6 rounded-lg animate-fade-in-up" style={{animationDelay: '600ms'}}>
              <div className="bg-primary text-primary-foreground rounded-full p-4">
                <BarChart className="h-8 w-8" />
              </div>
              <h3 className="font-headline text-xl font-semibold">Growth</h3>
              <p className="text-muted-foreground">Develop your skills, pitch your ideas, and accelerate your venture's growth.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Articles Section */}
      <section className="py-16 md:py-20 relative">
        <Handshake className="absolute bottom-1/4 right-[5%] h-24 w-24 text-primary/5 rotate-12" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-headline text-4xl font-bold">Latest Insights</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Explore stories, tips, and news from our entrepreneurial community.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                    <Card key={index} className="overflow-hidden">
                        <CardContent className="p-0">
                            <Skeleton className="h-56 w-full" />
                            <div className="p-6 space-y-3">
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-5 w-full" />
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-1/4 mt-2" />
                            </div>
                        </CardContent>
                    </Card>
                ))
            ) : (
                articles.map((article, index) => (
                  <Card key={article.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group border-transparent hover:border-primary animate-fade-in-up" style={{animationDelay: `${index * 200}ms`}}>
                    <CardContent className="p-0">
                      <div className="relative h-56 w-full">
                        <Image
                          src={article.imageUrl}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          data-ai-hint={article.imageHint || 'article image'}
                        />
                      </div>
                      <div className="p-6 flex flex-col">
                        <p className="text-sm text-muted-foreground mb-2">{new Date(article.date).toLocaleDateString('en-US', { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                        <h3 className="font-headline text-lg font-semibold mb-4 flex-grow h-16">{article.title}</h3>
                        <Link href={article.linkedinUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary group-hover:underline self-start mt-auto flex items-center gap-2">
                            Read More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 md:py-20 bg-secondary/20 relative">
        <div className="absolute top-10 right-0 -translate-x-1/4 -translate-y-1/4 w-48 h-48 bg-primary/5 rounded-full" />
        <div className="absolute bottom-10 left-0 translate-x-1/4 translate-y-1/4 w-32 h-32 bg-primary/5 rounded-full" />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="lg:col-span-1 animate-fade-in-up">
              <h2 className="font-headline text-4xl font-bold">Upcoming Events</h2>
              <p className="mt-4 text-muted-foreground text-lg">Stay updated with our latest workshops, talks, and networking sessions.</p>
              <Button asChild size="lg" className="mt-6 group transition-all duration-300 ease-in-out bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                <Link href="/events">
                    See Full Calendar <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            <div className="lg:col-span-1">
                <div className="flex flex-col gap-6">
                    {isLoading ? (
                       Array.from({ length: 2 }).map((_, index) => (
                           <Skeleton key={index} className="h-28 w-full rounded-lg" />
                       ))
                    ) : events.length > 0 ? (
                        events.map((event, index) => (
                            <Link href={event.link || `/events`} key={event.id} className="block bg-background p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-primary animate-fade-in-up" style={{animationDelay: `${index * 200}ms`}}>
                                <div className="flex items-center gap-6">
                                    <div className="flex flex-col items-center justify-center text-primary w-16 text-center shrink-0">
                                        <span className="font-headline font-bold text-sm uppercase">{format(parseISO(event.date), 'MMM')}</span>
                                        <span className="font-headline font-bold text-3xl">{format(parseISO(event.date), 'dd')}</span>
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-headline font-semibold text-xl">{event.title}</h3>
                                        <p className="text-muted-foreground">{event.location || 'Details to be announced'}</p>
                                    </div>
                                    <ArrowRight className="h-6 w-6 text-muted-foreground transition-transform group-hover:translate-x-1" />
                                </div>
                            </Link>
                        ))
                    ) : (
                         <p className="text-center text-muted-foreground bg-background/50 p-6 rounded-lg">No upcoming events. Check back soon!</p>
                    )}
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

    