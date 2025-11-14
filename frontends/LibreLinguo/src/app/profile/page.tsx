'use client';

import { useRequireAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, LogOut, BarChart3, Clock, CheckCircle } from 'lucide-react';
import { Header } from '@/components/Header';

export default function ProfilePage() {
  const { user, userProfile, signOut, loading } = useRequireAuth();

  if (loading || !user || !userProfile) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <>
    <Header />
    <div className="container mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col items-center gap-6 md:flex-row">
        <Avatar className="h-24 w-24 border-4 border-primary">
          <AvatarImage src={user.photoURL || ''} alt={userProfile.displayName || 'Usuario'} />
          <AvatarFallback className="text-3xl">{getInitials(userProfile.displayName)}</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h1 className="font-headline text-4xl font-bold">{userProfile.displayName}</h1>
          <p className="mt-1 text-lg text-muted-foreground">{userProfile.email}</p>
        </div>
        <Button onClick={signOut} variant="outline" className="md:ml-auto">
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar sesión
        </Button>
      </div>

      <div className="my-12">
        <h2 className="font-headline text-3xl font-bold">Tu Progreso</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Lecciones Completadas</CardTitle>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">de 50 lecciones totales</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Tiempo de Estudio</CardTitle>
              <Clock className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3h 45m</div>
              <p className="text-xs text-muted-foreground">en la última semana</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Nota Promedio</CardTitle>
              <BarChart3 className="h-5 w-5 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2 / 5.0</div>
              <p className="text-xs text-muted-foreground">en todas las lecciones</p>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Resumen por curso</CardTitle>
                <CardDescription>Aquí verás tu progreso en cada curso que has iniciado.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-center text-muted-foreground">Las estadísticas detalladas por curso estarán disponibles pronto.</p>
            </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
}
