"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/common/Logo';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/categories', label: 'Categories' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const NavLink = ({ href, label, className }: { href: string; label: string, className?: string }) => {
    const isActive = pathname === href;
    return (
      <Link href={href} passHref>
        <Button
          variant="ghost"
          className={cn(
            "justify-start text-base",
            isActive ? 'text-primary font-bold' : 'text-foreground/80',
            className
          )}
          onClick={() => setIsMenuOpen(false)}
        >
          {label}
        </Button>
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
          <Logo className="h-8 w-auto text-primary" />
        </Link>

        <nav className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs sm:max-w-sm">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between p-4 border-b">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                  <Logo className="h-8 w-auto text-primary" />
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <nav className="flex flex-col space-y-2 p-4">
                {navLinks.map((link) => (
                  <NavLink key={link.href} {...link} className="text-lg" />
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
