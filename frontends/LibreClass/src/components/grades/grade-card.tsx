import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Grade } from '@/lib/types';
import { Folder } from 'lucide-react';

type GradeCardProps = {
  grade: Grade;
};

export default function GradeCard({ grade }: GradeCardProps) {
  return (
    <Link href={`/${grade.id}`} className="group">
        <Card className="flex flex-col items-center justify-center text-center p-6 aspect-square hover:shadow-lg transition-shadow group-hover:bg-accent">
        <CardContent className="p-0 flex flex-col items-center justify-center gap-2">
            <Folder className="w-12 h-12 text-primary" />
            <p className="font-semibold text-foreground">{grade.name}</p>
        </CardContent>
        </Card>
    </Link>
  );
}
