"use client";

import AppHeader from "@/components/layout/app-header";

export default function AppLayout({
  children,
  breadcrumbs,
}: {
  children: React.ReactNode;
  breadcrumbs: { href: string; label: string }[];
}) {

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader breadcrumbs={breadcrumbs} />
      <main className="flex-1 container py-6 md:py-8">{children}</main>
    </div>
  );
}
