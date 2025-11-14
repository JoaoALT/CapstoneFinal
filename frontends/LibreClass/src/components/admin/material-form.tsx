"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { generateMaterialDetails } from "@/lib/actions";
import { Wand2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  topic: z.string().min(3, "El tema debe tener al menos 3 caracteres."),
  fileType: z.string().min(2, "El tipo de archivo es requerido."),
  title: z.string().optional(),
  description: z.string().optional(),
  tags: z.string().optional(),
  filePath: z.string().min(1, "La ruta del archivo es requerida."),
});

export default function MaterialForm() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      fileType: "pdf",
      title: "",
      description: "",
      tags: "",
      filePath: "",
    },
  });

  const handleGenerateContent = async () => {
    const topic = form.getValues("topic");
    const fileType = form.getValues("fileType");
    if (!topic || !fileType) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor, introduce un tema y tipo de archivo para generar contenido.",
      });
      return;
    }
    setIsGenerating(true);
    try {
      const result = await generateMaterialDetails({ topic, fileType });
      if (result.success && result.data) {
        form.setValue("title", result.data.title, { shouldValidate: true });
        form.setValue("description", result.data.description, { shouldValidate: true });
        form.setValue("tags", result.data.tags.join(", "), { shouldValidate: true });
        toast({
          title: "Contenido Generado",
          description: "Se han rellenado los campos del formulario.",
        });
      } else {
        throw new Error(result.error || "Error desconocido");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error de Generación",
        description: error.message,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Here you would typically call a server action to save the data to Firestore
    console.log(values);
    toast({
      title: "Material Enviado",
      description: "El nuevo material ha sido guardado (simulado).",
    });
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Añadir Nuevo Material</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tema del Material</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Álgebra básica" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fileType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Archivo</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: pdf, pptx, video" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <Button
                type="button"
                variant="outline"
                onClick={handleGenerateContent}
                disabled={isGenerating}
                className="w-full"
              >
                <Wand2 className="mr-2 h-4 w-4" />
                {isGenerating ? "Generando..." : "Generar Título, Descripción y Tags con IA"}
              </Button>
            </div>
            
            <div className="space-y-4 border-t pt-6">
                 <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (separados por coma)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="filePath"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ruta del archivo</FormLabel>
                    <FormControl>
                      <Input placeholder="/content/math/algebra.pdf" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">Guardar Material</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
