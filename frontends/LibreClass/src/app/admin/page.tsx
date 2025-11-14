import AppLayout from "@/components/layout/AppLayout";
import MaterialForm from "@/components/admin/material-form";

export default function AdminPage() {
  const breadcrumbs = [{ href: "/admin", label: "Admin" }];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col items-start gap-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary">Panel de Administración</h1>
            <p className="text-lg text-muted-foreground">
              Añadir nuevo material de estudio.
            </p>
          </div>
          <MaterialForm />
        </div>
    </AppLayout>
  );
}
