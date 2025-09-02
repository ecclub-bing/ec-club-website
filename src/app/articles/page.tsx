"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  imageUrl: string;
  imageHint: string;
  createdAt: any;
}

function ArticleCard({ article }: { article: Article }) {
    const articleDate = article.createdAt?.toDate ? article.createdAt.toDate().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }) : 'Date not available';

    return (
        <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group">
            <CardContent className="p-0">
                <div className="relative h-56 w-full">
                    <Image
                        src={article.imageUrl || "https://picsum.photos/600/400"}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        data-ai-hint={article.imageHint}
                    />
                </div>
                <div className="p-6 flex flex-col">
                    <p className="text-sm text-muted-foreground mb-2">{articleDate}</p>
                    <h3 className="font-headline text-lg font-semibold mb-4 flex-grow">{article.title}</h3>
                    <Button asChild variant="link" className="p-0 font-bold text-accent group-hover:text-primary self-start mt-auto">
                        <Link href="#">
                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}


function ArticleSkeleton() {
  return (
    <Card className="overflow-hidden shadow-lg">
      <CardContent className="p-0">
        <Skeleton className="h-56 w-full" />
        <div className="p-6 space-y-4">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-1/4 mt-4" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesCollection = collection(db, "articles");
        const q = query(articlesCollection, orderBy("createdAt", "desc"));
        const articlesSnapshot = await getDocs(q);
        const articlesList = articlesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article));
        setArticles(articlesList);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

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
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => <ArticleSkeleton key={index} />)
            ) : articles.length > 0 ? (
              articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            ) : (
                <p className="col-span-full text-center text-muted-foreground">No articles found. Start by adding one in the admin dashboard!</p>
            )}
          </div>
      </div>
    </div>
  );
}
