import { CheckCircle, Linkedin, User } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const eBoardMembers = [
    { name: 'Amy Wang', role: 'President', imageHint: 'woman portrait' },
    { name: 'Nick Lagana', role: 'Vice President', imageHint: 'man portrait' },
    { name: 'Tony Lin', role: 'Treasurer', imageHint: 'man portrait' },
    { name: 'Justin Chong', role: 'Marketing Director', imageHint: 'man portrait' },
    { name: 'Brian Ng', role: 'Public Relations Chair', imageHint: 'man portrait' },
    { name: 'Ingrid Shen', role: 'Secretary', imageHint: 'woman portrait' },
    { name: 'Kushal Padshala', role: 'Graphic Designer', imageHint: 'man portrait' },
    { name: 'Jason Moeller', role: 'Education Director', imageHint: 'man portrait' },
    { name: 'Genesis Li', role: 'Media Director', imageHint: 'woman portrait' },
    { name: 'Rayaan Lodi', role: 'Editorial Chair', imageHint: 'man portrait' },
    { name: 'Sebastian Ospina', role: 'Partnership Coordinator', imageHint: 'man portrait' },
    { name: 'Selina Zhou', role: 'Media Director Intern', imageHint: 'woman portrait' },
    { name: 'Harrison Lambert', role: 'Treasurer Intern', imageHint: 'man portrait' },
];

export default function AboutPage() {
  return (
    <div className="bg-background container mx-auto px-4">
      <div className="py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline">
            About <span className="text-primary">Us</span>
          </h1>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-bold font-headline text-foreground mb-4">Our Story</h2>
            <div className="space-y-6 text-muted-foreground">
              <p>
                Entrepreneur Connect is a vibrant community dedicated to facilitating innovation, collaboration, and growth among aspiring entrepreneurs. Our purpose is to provide a platform where students from diverse backgrounds can come together to exchange ideas, support one another, and learn about the field of entrepreneurship and what it means to be an entrepreneur.
              </p>
              <p>
                Through networking events, workshops, and pitch-it events, we aim to empower our members with the knowledge, skills, and connections needed to transform their innovative ideas into successful ventures. Utilizing our partnership with Koffman Southern Tier Incubator, we are able to provide students with the opportunity to work with start-ups based in the region as well as receive aid for any potential business ideas that they have. Our goal is to become one of the most effective entrepreneurship resources for all students in Binghamton University.
              </p>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
                <Image 
                    src="https://picsum.photos/800/600"
                    alt="Team meeting"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="team meeting"
                />
            </div>
          </div>
        </div>

        <div className="mt-20">
            <h2 className="text-3xl font-bold font-headline text-foreground text-center mb-10">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                <div className="bg-card p-6 rounded-lg border">
                    <CheckCircle className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-headline font-semibold text-lg mb-2">Weekly Newsletter</h3>
                    <p className="text-muted-foreground text-sm">
                        Receive updates on club events and entrepreneurship opportunities like internships and funding. You can also advertise your own ventures.
                    </p>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                    <CheckCircle className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-headline font-semibold text-lg mb-2">Access to Resources</h3>
                    <p className="text-muted-foreground text-sm">
                        Connect with successful alumni and leverage our partnership with the Koffman Incubator, a hub for promoting start-up companies.
                    </p>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                    <CheckCircle className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-headline font-semibold text-lg mb-2">Engaging Events</h3>
                    <p className="text-muted-foreground text-sm">
                        Participate in weekly events that provide informative and developmental opportunities, including a large Pitch-It Event to pitch your ideas.
                    </p>
                </div>
            </div>
            <p className="mt-12 text-center text-lg text-muted-foreground">
                Students of any major are welcome to join us!
            </p>
        </div>

        <div className="mt-24">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl font-headline">
              Meet Our <span className="text-primary">E-Board</span>
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
              The dedicated team leading Entrepreneur Connect.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {eBoardMembers.map((member, index) => (
              <Card key={index} className="group relative text-center overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="relative w-full h-56 bg-secondary">
                    <Image
                      src={`https://picsum.photos/400/400?${index}`}
                      alt={`Portrait of ${member.name}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      data-ai-hint={member.imageHint}
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                     <h3 className="font-headline text-lg font-bold text-white">{member.name}</h3>
                     <p className="text-primary text-sm font-semibold">{member.role}</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button asChild size="sm" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black">
                        <Link href="#">
                            <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                        </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
