import Link from "next/link";
import { GraduationCap, Home } from "lucide-react";
import UserNav from "@/components/layout/user-nav";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";

type AppHeaderProps = {
  breadcrumbs: { href: string; label: string }[];
};

export default function AppHeader({ breadcrumbs }: AppHeaderProps) {
  const isHomePage = breadcrumbs.length <= 1;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="inline-block font-bold text-primary">LibreClass</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
            <Badge variant="secondary" className="hidden sm:inline-flex">Local</Badge>
            <UserNav />
        </div>
      </div>
      <div className="container pb-4 flex flex-col gap-4">
        {!isHomePage && (
            <Button asChild className="w-fit">
                <Link href="/">
                    <Home className="mr-2"/>
                    Volver al inicio
                </Link>
            </Button>
        )}
        <Breadcrumbs segments={breadcrumbs} />
      </div>
    </header>
  );
}
