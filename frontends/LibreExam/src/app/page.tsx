import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpenCheck } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { JoinExamForm } from '@/components/join-exam-form';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4 flex justify-between items-center border-b">
        <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
          <BookOpenCheck className="w-8 h-8" />
          <h1 className="text-2xl font-bold font-headline">LibreExam</h1>
        </Link>
        <Button asChild>
          <Link href="/teacher">Teacher Portal</Link>
        </Button>
      </header>
      <main className="flex-grow flex items-center justify-center p-4 lg:p-8">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 text-center lg:text-left">
            <h2 className="text-4xl lg:text-5xl font-bold font-headline tracking-tighter text-primary">
              Engage Your Classroom, Instantly.
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Create, host, and participate in live exams. Real-time feedback and friendly competition to make learning fun.
            </p>
            {heroImage && (
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg mt-8 border">
                    <Image
                        src={heroImage.imageUrl}
                        alt={heroImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={heroImage.imageHint}
                        priority
                    />
                </div>
            )}
          </div>
          <Card className="w-full max-w-md mx-auto shadow-xl border-t-4 border-primary">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Join a Live Exam</CardTitle>
              <CardDescription>Enter the access code provided by your teacher to begin.</CardDescription>
            </CardHeader>
            <CardContent>
              <JoinExamForm />
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground border-t">
        © {new Date().getFullYear()} LibreExam. All rights reserved.
      </footer>
    </div>
  );
}
