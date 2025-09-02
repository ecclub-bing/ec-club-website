import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline">
            About <span className="text-primary">Entrepreneur Connect</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            We are a student-founded and run professional organization dedicated to fostering entrepreneurial spirit on campus.
          </p>
        </div>

        <div className="mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl font-bold font-headline text-foreground">Our Mission</h2>
                    <p className="mt-4 text-muted-foreground">
                        Our main focus is helping students with entrepreneurial interests get a headstart. We provide essential resources, valuable connections, and a supportive community of like-minded student entrepreneurs. We believe that by working together, we can turn innovative ideas into successful ventures.
                    </p>
                    <p className="mt-4 text-muted-foreground">
                        Through workshops, speaker events, networking sessions, and incubator tours, we aim to equip our members with the knowledge and tools they need to thrive in the competitive world of entrepreneurship.
                    </p>
                </div>
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
      </div>
    </div>
  );
}
