"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  date: z.date({ required_error: "A date is required." }),
  paragraph: z.string().min(10, "Paragraph must be at least 10 characters."),
  linkedinUrl: z.string().url("Please enter a valid LinkedIn URL."),
  imageUrl: z.string().url("An image URL is required."),
});

const CLOUDINARY_CLOUD_NAME = "drrm2qz39";
const CLOUDINARY_UPLOAD_PRESET = "ecbing";


export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const articleId = params.id as string;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (!articleId) return;

    const fetchArticle = async () => {
      setIsFetching(true);
      try {
        const articleDoc = await getDoc(doc(db, "articles", articleId));
        if (articleDoc.exists()) {
          const articleData = articleDoc.data();
          form.reset({
            ...articleData,
            date: articleData.date ? parseISO(articleData.date) : new Date(),
          });
        } else {
          toast({
            variant: "destructive",
            title: "Not Found",
            description: "Article not found.",
          });
          router.push("/admin/articles");
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch article data.",
        });
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchArticle();
  }, [articleId, form, router, toast]);
  
  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.secure_url) {
        form.setValue("imageUrl", data.secure_url);
        toast({
          title: "Image Uploaded!",
          description: "Your image has been successfully uploaded.",
        });
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload Error",
        description: "Failed to upload image. Please try again.",
      });
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await updateDoc(doc(db, "articles", articleId), {
        ...values,
        date: format(values.date, "yyyy-MM-dd"),
      });
      toast({
        title: "Article Updated!",
        description: "The article has been successfully updated.",
      });
      router.push("/admin/articles");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isFetching) {
      return (
          <div className="container mx-auto px-4 py-8">
              <h1 className="text-3xl font-bold font-headline mb-8">Edit Article</h1>
              <div className="space-y-8">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-1/3" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-10 w-24" />
              </div>
          </div>
      )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Edit Article</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter article title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paragraph"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Paragraph</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter the first paragraph of the article"
                    {...field}
                    rows={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedinUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn Post URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://www.linkedin.com/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Article Image</FormLabel>
                <FormControl>
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleImageUpload(e.target.files[0]);
                        }
                      }}
                      disabled={isUploading}
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    >
                      {isUploading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="mr-2 h-4 w-4" />
                      )}
                      {field.value ? "Change Image" : "Upload Image"}
                    </label>
                    {form.getValues("imageUrl") && (
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground">Image Preview:</p>
                        <div className="relative w-full max-w-sm h-48 mt-2 rounded-md overflow-hidden">
                           <Image src={form.getValues("imageUrl")} alt="Preview" fill className="object-contain" />
                        </div>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading || isUploading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
            <Button variant="outline" onClick={() => router.back()}>
                Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
