"use client";

import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import Logo from '@/assets/logo.png';

export function Footer() {

  return (
    <footer className="bg-secondary/40 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="mb-4">
                <Image src={Logo} alt="Entrepreneur Connect Logo" width={300} height={75} />
            </Link>
             <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Entrepreneur Connect. All Rights Reserved.</p>
          </div>
          
          <div>
            <h3 className="font-headline font-semibold mb-4">Socials</h3>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-headline font-semibold mb-4">Inquiries</h3>
            <p className="text-muted-foreground text-sm mb-2">
                For any inquiries, questions or commendations, please email us at: <a href="mailto:ecclub@binghamton.edu" className="text-primary hover:underline">ecclub@binghamton.edu</a>
            </p>
            <Button asChild variant="outline">
                <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
