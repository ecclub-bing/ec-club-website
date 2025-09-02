import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const articles = [
  {
    image: { src: "https://picsum.photos/600/400?1", hint: "presentation screen" },
    date: "September 25, 2024",
    title: "Welcome Back: Reflecting on Our Recent GIM Sessions",
    link: "#",
  },
  {
    image: { src: "https://picsum.photos/600/400?2", hint: "portrait speaker" },
    date: "April 15, 2024",
    title: "“Having a Great Idea Is Only Brushing the Surface of What it Means To Be an Entrepreneur” - Ryon Batson",
    link: "#",
  },
  {
    image: { src: "https://picsum.photos/600/400?3", hint: "students collaborating" },
    date: "March 1, 2024",
    title: "The Art of the Pitch: Key Takeaways from our Workshop",
    link: "#",
  },
  {
    image: { src: "https://picsum.photos/600/400?4", hint: "networking event" },
    date: "February 12, 2024",
    title: "Connecting Minds: A Look Back at Our Annual Networking Gala",
    link: "#",
  },
    {
    image: { src: "https://picsum.photos/600/400?5", hint: "startup office" },
    date: "January 20, 2024",
    title: "From Dorm Room to Boardroom: An Alumni Success Story",
    link: "#",
  },
    {
    image: { src: "https://picsum.photos/600/400?6", hint: "business plan" },
    date: "December 5, 2023",
    title: "Crafting a Winning Business Plan for 2024",
    link: "#",
  },
];

export default function ArticlesPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline">
            Our <span className="text-primary">Articles</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Insights, stories, and updates from the world of student entrepreneurship.
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <div className="p-6 flex flex-col">
                    <p className="text-sm text-muted-foreground mb-2">{article.date}</p>
                    <h3 className="font-headline text-lg font-semibold mb-4 flex-grow">{article.title}</h3>
                    <Button asChild variant="link" className="p-0 font-bold text-accent group-hover:text-primary self-start mt-auto">
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
    </div>
  );
}
