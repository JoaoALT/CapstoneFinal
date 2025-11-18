"use client";

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SearchBar({ placeholder = "Search all articles...", contextCategory }: { placeholder?: string, contextCategory?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    const params = new URLSearchParams();
    params.set('q', query);
    if (contextCategory) {
      params.set('category', contextCategory);
    }
    
    startTransition(() => {
      router.push(`/search?${params.toString()}`);
    });
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full items-center space-x-2">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-10 h-12 text-base"
          aria-label="Search articles"
        />
      </div>
      <Button type="submit" size="lg" disabled={isPending} className="h-12">
        {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5 md:hidden" />}
        <span className="hidden md:inline">Search</span>
      </Button>
    </form>
  );
}
