import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Leaderboard } from './components/leaderboard';
import { Home } from 'lucide-react';

export default function ResultsPage() {
    const trophyImage = PlaceHolderImages.find(p => p.id === 'exam-finished');

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                    {trophyImage && (
                        <Image 
                            src={trophyImage.imageUrl}
                            alt={trophyImage.description}
                            width={150}
                            height={112}
                            data-ai-hint={trophyImage.imageHint}
                            className="mx-auto"
                        />
                    )}
                    <h1 className="text-4xl font-bold font-headline">¡Examen Finalizado!</h1>
                    <p className="text-muted-foreground text-lg">Aquí están los resultados finales.</p>
                </div>
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Tabla de Posiciones</CardTitle>
                        <CardDescription>¡Felicidades a todos los participantes!</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Leaderboard />
                    </CardContent>
                </Card>
                <div className="text-center">
                    <Button asChild>
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            Volver al Inicio
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
