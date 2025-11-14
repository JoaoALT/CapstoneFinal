import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import type { Subject } from '@/lib/types';
import * as LucideIcons from 'lucide-react';

type SubjectCardProps = {
  gradeId: string;
  subject: Subject;
};

const Icon = ({ name, className }: { name: string; className: string }) => {
  const LucideIcon = (LucideIcons as any)[name];
  if (!LucideIcon) {
    return <LucideIcons.Folder className={className} />; // Fallback icon
  }
  return <LucideIcon className={className} />;
};


export default function SubjectCard({ gradeId, subject }: SubjectCardProps) {
  return (
    <Link href={`/${gradeId}/${subject.id}`} className="group">
        <Card className="flex flex-col items-center justify-center text-center p-6 aspect-square hover:shadow-lg transition-shadow group-hover:bg-accent">
        <CardContent className="p-0 flex flex-col items-center justify-center gap-2">
            <Icon name={subject.icon || 'Folder'} className="w-12 h-12 text-primary" />
            <p className="font-semibold text-foreground">{subject.name}</p>
        </CardContent>
        </Card>
    </Link>
  );
}
