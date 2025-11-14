'use client';

import Link from 'next/link';
import { BookOpenText } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <BookOpenText className="h-8 w-8 text-primary" />
          <span className="font-headline text-2xl font-bold text-primary">LibreLinguo</span>
        </Link>
      </div>
    </header>
  );
}
