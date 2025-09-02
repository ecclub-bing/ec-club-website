import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, Lightbulb, BarChart, TrendingUp, Target, Handshake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const articles = [
  {
    image: {
      src: "https://picsum.photos/600/400?1",
      hint: "presentation business",
    },
    date: "September 25, 2024",
    title: "Welcome Back: Reflecting on Our Recent GIM Sessions",
    link: "#",
  },
  {
    image: {
      src: "https://picsum.photos/600/400?2",
      hint: "portrait speaker",
    },
    date: "April 15, 2024",
    title: "Having a Great Idea Is Only Brushing the Surface",
    link: "#",
  },
  {
    image: {
      src: "https://picsum.photos/600/400?3",
      hint: "group discussion",
    },
    date: "March 1, 2024",
    title: "The Art of the Pitch: Key Takeaways from our Workshop",
    link: "#",
  },
];

const events = [
    {
        date: "OCT 25",
        title: "Koffman Incubator Tour",
        location: "Koffman Southern Tier Incubator",
        link: "#",
    },
    {
        date: "OCT 18",
        title: "GBM#3: KLAWS Speaker Event",
        location: "Lecture Hall 10",
        link: "#",
    },
]

export default function Home() {
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
        <div className="relative z-10 flex flex-col items-center gap-6 p-4 animate-fade-in-up animation-delay-300">
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-shadow-lg animate-fade-in-up animation-delay-500">
            Entrepreneur Connect
          </h1>
          <p className="max-w-3xl text-lg md:text-xl text-neutral-200 animate-fade-in-up animation-delay-700">
            Uniting Binghamton's brightest minds to foster innovation and build the future of student-led enterprise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 animate-fade-in-up animation-delay-900">
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
            <div className="flex flex-col items-center gap-4 p-6 rounded-lg animate-fade-in-up animation-delay-300">
              <div className="bg-primary text-primary-foreground rounded-full p-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="font-headline text-xl font-semibold">Community</h3>
              <p className="text-muted-foreground">Connect with a diverse network of student entrepreneurs and industry mentors.</p>
            </div>
            <div className="flex flex-col items-center gap-4 p-6 rounded-lg animate-fade-in-up animation-delay-500">
              <div className="bg-primary text-primary-foreground rounded-full p-4">
                <Lightbulb className="h-8 w-8" />
              </div>
              <h3 className="font-headline text-xl font-semibold">Resources</h3>
              <p className="text-muted-foreground">Access workshops, funding opportunities, and essential tools for your startup.</p>
            </div>
            <div className="flex flex-col items-center gap-4 p-6 rounded-lg animate-fade-in-up animation-delay-700">
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
            {articles.map((article, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group border-transparent hover:border-primary animate-fade-in-up" style={{animationDelay: `${index * 200}ms`}}>
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
                  <div className="p-6 flex flex-col">
                    <p className="text-sm text-muted-foreground mb-2">{article.date}</p>
                    <h3 className="font-headline text-lg font-semibold mb-4 flex-grow h-16">{article.title}</h3>
                    <Link href={article.link} className="font-semibold text-primary group-hover:underline self-start mt-auto flex items-center gap-2">
                        Read More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
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
                    {events.map((event, index) => (
                        <Link href={event.link} key={index} className="block bg-background p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-primary animate-fade-in-up" style={{animationDelay: `${index * 200}ms`}}>
                            <div className="flex items-center gap-6">
                                <div className="flex flex-col items-center justify-center text-primary w-16">
                                    <span className="font-headline font-bold text-2xl">{event.date}</span>
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-headline font-semibold text-xl">{event.title}</h3>
                                    <p className="text-muted-foreground">{event.location}</p>
                                </div>
                                <ArrowRight className="h-6 w-6 text-muted-foreground" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
