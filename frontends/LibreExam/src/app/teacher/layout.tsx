import Link from 'next/link';
import { BookOpenCheck, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4 flex justify-between items-center border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Link href="/teacher" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
          <BookOpenCheck className="w-8 h-8" />
          <h1 className="text-xl md:text-2xl font-bold font-headline">Teacher Portal</h1>
        </Link>
        <Button asChild variant="outline">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" /> Student View
          </Link>
        </Button>
      </header>
      <main className="flex-grow p-4 lg:p-8">
        <div className="container mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
