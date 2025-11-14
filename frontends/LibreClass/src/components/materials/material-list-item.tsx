import Link from 'next/link';
import type { Material, UserMaterialStatus } from '@/lib/types';
import { FileText, Presentation, PlayCircle, Download, ChevronRight, HelpCircle } from 'lucide-react';

type MaterialListItemProps = {
  gradeId: string;
  subjectId: string;
  material: Material & { status?: UserMaterialStatus };
};

const fileTypeIcons: { [key: string]: React.ElementType } = {
  pdf: FileText,
  pptx: Presentation,
  video: PlayCircle,
  interactive: HelpCircle,
};

const fileTypeLabels: { [key: string]: string } = {
    pdf: 'Documento PDF',
    pptx: 'Presentación',
    video: 'Video',
    interactive: 'Actividad Interactiva',
}

function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


export default function MaterialListItem({ gradeId, subjectId, material }: MaterialListItemProps) {
  const Icon = fileTypeIcons[material.fileType] || FileText;
  const isInteractive = material.fileType === 'interactive';
  const fileSize = material.fileSize ? formatBytes(material.fileSize) : null;
  const label = fileTypeLabels[material.fileType] || 'Archivo';

  return (
    <Link href={`/${gradeId}/${subjectId}/${material.id}`} className="block">
      <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors">
        <div className="bg-secondary p-3 rounded-full">
            <Icon className="h-6 w-6 text-secondary-foreground" />
        </div>
        <div className="flex-grow">
          <h3 className="font-bold text-md">{material.title}</h3>
          <p className="text-sm text-muted-foreground">
            {label} {fileSize && ` - ${fileSize}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
            {isInteractive ? (
                <ChevronRight className="h-6 w-6 text-muted-foreground" />
            ) : (
                <Download className="h-6 w-6 text-muted-foreground" />
            )}
        </div>
      </div>
    </Link>
  );
}
