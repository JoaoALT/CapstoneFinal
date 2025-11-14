"use client";

import { Material } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ExternalLink, Download } from "lucide-react";

type MaterialViewerProps = {
  material: Material;
};

export default function MaterialViewer({ material }: MaterialViewerProps) {
  const renderContent = () => {
    switch (material.fileType) {
      case 'pdf':
        return (
          <iframe
            src={material.filePath}
            className="w-full h-[calc(100vh-20rem)] rounded-md border"
            title={material.title}
          />
        );
      case 'video':
        return (
          <div className="aspect-video">
            <video controls className="w-full h-full rounded-md bg-black">
                <source src={material.filePath} type="video/mp4" />
                Tu navegador no soporta el tag de video.
            </video>
          </div>
        );
      case 'pptx':
      default:
        return (
          <div className="text-center p-8 border-2 border-dashed rounded-lg">
            <p className="mb-4">Este tipo de archivo ({material.fileType}) no se puede previsualizar.</p>
            <Button asChild>
              <a href={material.filePath} download target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Descargar Archivo
              </a>
            </Button>
          </div>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl">{material.title}</CardTitle>
        <CardDescription>{material.description}</CardDescription>
        {material.fileType !== 'pdf' && (
             <Button variant="outline" asChild className="mt-2 w-fit">
                <a href={material.filePath} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4"/>
                    Abrir en nueva pestaña
                </a>
             </Button>
        )}
      </CardHeader>
      <CardContent>
        {renderContent()}
        <div className="mt-4 flex justify-end">
            <Button variant="secondary">Marcar como completado</Button>
        </div>
      </CardContent>
    </Card>
  );
}
