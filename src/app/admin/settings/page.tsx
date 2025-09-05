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
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  logoUrl: z.string().url("A valid logo URL is required.").optional().or(z.literal("")),
});

const CLOUDINARY_CLOUD_NAME = "drrm2qz39";
const CLOUDINARY_UPLOAD_PRESET = "ecbing";

export default function SettingsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      logoUrl: "",
    },
  });

  useEffect(() => {
    const fetchSettings = async () => {
        setIsLoading(true);
        const settingsDocRef = doc(db, "settings", "site");
        const docSnap = await getDoc(settingsDocRef);
        if (docSnap.exists()) {
            form.reset(docSnap.data());
        }
        setIsLoading(false);
    }
    fetchSettings();
  }, [form]);

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
        form.setValue("logoUrl", data.secure_url, { shouldValidate: true });
        toast({
          title: "Image Uploaded!",
          description: "Your logo has been successfully uploaded.",
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
      await setDoc(doc(db, "settings", "site"), values, { merge: true });
      toast({
        title: "Settings Saved!",
        description: "Your site settings have been updated.",
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

  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-8">Site Settings</h1>
      <Card>
        <CardHeader>
            <CardTitle>Website Logo</CardTitle>
            <CardDescription>Update your website's logo. This will be displayed in the header and footer.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="logoUrl"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Logo Image</FormLabel>
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
                            disabled={isUploading || isLoading}
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
                            {field.value ? "Change Logo" : "Upload Logo"}
                            </label>
                            {form.getValues("logoUrl") && (
                            <div className="mt-4">
                                <p className="text-sm text-muted-foreground">Logo Preview:</p>
                                <div className="relative w-48 h-16 mt-2 rounded-md overflow-hidden border p-2 bg-secondary/30">
                                <Image src={form.getValues("logoUrl")!} alt="Preview" fill className="object-contain" />
                                </div>
                            </div>
                            )}
                        </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <Button type="submit" disabled={isLoading || isUploading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? "Saving..." : "Save Settings"}
                </Button>
                </form>
            </Form>
        </CardContent>
      </Card>
      
    </div>
  );
}
