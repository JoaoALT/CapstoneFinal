"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function JoinExamForm() {
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (code.trim()) {
      router.push(`/exam/${code.trim().toUpperCase()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="access-code">Access Code</Label>
        <Input
          id="access-code"
          name="code"
          placeholder="e.g., A1B2C3"
          className="text-center text-lg tracking-widest"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          autoComplete="off"
        />
      </div>
      <Button type="submit" className="w-full" size="lg">
        Join Exam
      </Button>
    </form>
  );
}
