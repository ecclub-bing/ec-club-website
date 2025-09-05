"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { doc, getDoc, setDoc } from "firebase/firestore";
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
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  heroImageUrl: z.string().url("A valid hero image URL is required."),
  aboutImageUrl: z.string().url("A valid about image URL is required."),
});

const CLOUDINARY_CLOUD_NAME = "drrm2qz39";
const CLOUDINARY_UPLOAD_PRESET = "ecbing";

export default function ManageHomepage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isUploading, setIsUploading] = useState<"hero" | "about" | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        heroImageUrl: "https://picsum.photos/1920/1080",
        aboutImageUrl: "https://picsum.photos/800/600",
    }
  });

  useEffect(() => {
    const fetchHomepageContent = async () => {
      setIsFetching(true);
      try {
        const homepageDocRef = doc(db, "homepage", "main");
        const docSnap = await getDoc(homepageDocRef);
        if (docSnap.exists()) {
          form.reset(docSnap.data() as z.infer<typeof formSchema>);
        } else {
          // Document doesn't exist, we can use default values
           await setDoc(homepageDocRef, form.getValues());
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch homepage content.",
        });
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchHomepageContent();
  }, [form, toast]);
  
  const handleImageUpload = async (file: File, field: "heroImageUrl" | "aboutImageUrl") => {
    setIsUploading(field);
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
        form.setValue(field, data.secure_url);
        toast({
          title: "Image Uploaded!",
          description: "Your image has been successfully uploaded. Don't forget to save your changes.",
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
      setIsUploading(null);
    }
  };


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const homepageDocRef = doc(db, "homepage", "main");
      await setDoc(homepageDocRef, values);
      toast({
        title: "Homepage Updated!",
        description: "Your homepage content has been successfully saved.",
      });
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
              <h1 className="text-3xl font-bold font-headline mb-8">Manage Homepage Content</h1>
              <div className="space-y-8">
                  <Skeleton className="h-64 w-full" />
                  <Skeleton className="h-64 w-full" />
                  <Skeleton className="h-10 w-24" />
              </div>
          </div>
      )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Manage Homepage Content</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
            <Card>
                <CardHeader>
                    <CardTitle>Hero Section Image</CardTitle>
                </CardHeader>
                <CardContent>
                     <FormField
                        control={form.control}
                        name="heroImageUrl"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                            <div>
                                <Input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="hero-image-upload"
                                onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                    handleImageUpload(e.target.files[0], 'heroImageUrl');
                                    }
                                }}
                                disabled={isUploading === 'hero'}
                                />
                                <label
                                htmlFor="hero-image-upload"
                                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                                >
                                {isUploading === 'hero' ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Upload className="mr-2 h-4 w-4" />
                                )}
                                Change Hero Image
                                </label>
                                {form.getValues("heroImageUrl") && (
                                <div className="mt-4">
                                    <p className="text-sm text-muted-foreground">Image Preview:</p>
                                    <div className="relative w-full max-w-xl h-64 mt-2 rounded-md overflow-hidden border">
                                    <Image src={form.getValues("heroImageUrl")} alt="Hero Preview" fill className="object-cover" />
                                    </div>
                                </div>
                                )}
                            </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>About Section Image</CardTitle>
                </CardHeader>
                <CardContent>
                    <FormField
                        control={form.control}
                        name="aboutImageUrl"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                            <div>
                                <Input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="about-image-upload"
                                onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                    handleImageUpload(e.target.files[0], 'aboutImageUrl');
                                    }
                                }}
                                disabled={isUploading === 'about'}
                                />
                                <label
                                htmlFor="about-image-upload"
                                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                                >
                                {isUploading === 'about' ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Upload className="mr-2 h-4 w-4" />
                                )}
                                Change About Image
                                </label>
                                {form.getValues("aboutImageUrl") && (
                                <div className="mt-4">
                                    <p className="text-sm text-muted-foreground">Image Preview:</p>
                                    <div className="relative w-full max-w-lg h-48 mt-2 rounded-md overflow-hidden border">
                                    <Image src={form.getValues("aboutImageUrl")} alt="About Preview" fill className="object-cover" />
                                    </div>
                                </div>
                                )}
                            </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </CardContent>
            </Card>
          

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading || !!isUploading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Saving..." : "Save Homepage Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
