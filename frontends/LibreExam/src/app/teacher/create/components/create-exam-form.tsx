"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, PlusCircle, CheckCircle, Circle, GripVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Exam } from "@/lib/types";


const questionSchema = z.object({
  id: z.string().optional(),
  text: z.string().min(1, "La pregunta no puede estar vacía."),
  type: z.enum(["multiple-choice", "open-ended"]),
  points: z.coerce.number().min(1, "Los puntos deben ser al menos 1."),
  options: z.array(z.string().min(1, "La opción no puede estar vacía.")).length(4, "Debe haber 4 opciones.").optional(),
  correctAnswer: z.string().optional(),
}).refine(data => {
    if (data.type === 'multiple-choice') {
        return !!data.correctAnswer && data.correctAnswer.trim() !== '' && data.options?.includes(data.correctAnswer);
    }
    return true;
}, {
    message: "Debes seleccionar una respuesta correcta que coincida con una de las opciones.",
    path: ["correctAnswer"],
});

const examSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres."),
  questions: z.array(questionSchema).min(1, "El examen debe tener al menos una pregunta."),
});

type ExamFormValues = z.infer<typeof examSchema>;

export function CreateExamForm() {
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<ExamFormValues>({
        resolver: zodResolver(examSchema),
        defaultValues: {
            title: "",
            questions: [],
        },
        mode: "onChange",
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "questions",
    });

    function onSubmit(data: ExamFormValues) {
        const newExam: Exam = {
            id: new Date().getTime().toString(),
            title: data.title,
            questions: data.questions.map((q, i) => ({ ...q, id: `q${i}` })),
        };
        
        const existingExams: Exam[] = JSON.parse(localStorage.getItem('exams') || '[]');
        existingExams.push(newExam);
        localStorage.setItem('exams', JSON.stringify(existingExams));

        toast({
            title: "Examen guardado",
            description: `El examen "${data.title}" se ha guardado exitosamente.`,
        });
        router.push("/teacher");
    }
    
    const addQuestion = (type: 'multiple-choice' | 'open-ended') => {
        append({
            id: `new_${fields.length}`,
            text: "",
            type: type,
            points: 10,
            options: type === 'multiple-choice' ? ["", "", "", ""] : undefined,
            correctAnswer: "",
        });
    };
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Información del Examen</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Título del Examen</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ej: Examen Final de Matemáticas" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <h3 className="text-xl font-bold">Preguntas</h3>
                    {fields.map((field, index) => (
                        <Card key={field.id} className="relative pt-8 border-l-4" style={{borderColor: form.formState.errors.questions?.[index] ? 'hsl(var(--destructive))' : 'hsl(var(--primary))'}}>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                                onClick={() => remove(index)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                             <GripVertical className="absolute top-4 left-2 text-muted-foreground" />
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name={`questions.${index}.text`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Pregunta {index + 1}</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Escribe tu pregunta aquí..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name={`questions.${index}.type`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Tipo</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selecciona un tipo" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="multiple-choice">Opción Múltiple</SelectItem>
                                                        <SelectItem value="open-ended">Respuesta Abierta</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`questions.${index}.points`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Puntos</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {form.watch(`questions.${index}.type`) === 'multiple-choice' && (
                                  <div className="space-y-2">
                                    <FormLabel>Opciones de Respuesta</FormLabel>
                                    <FormDescription>Escribe las opciones y marca la correcta.</FormDescription>
                                    <div className="space-y-2">
                                    {form.watch(`questions.${index}.options`)?.map((_, optionIndex) => (
                                      <FormField
                                        key={optionIndex}
                                        control={form.control}
                                        name={`questions.${index}.options.${optionIndex}`}
                                        render={({ field }) => (
                                          <FormItem className="flex items-center gap-2">
                                            <FormControl>
                                              <Input {...field} placeholder={`Opción ${optionIndex + 1}`} onBlur={(e) => {field.onBlur(); form.trigger(`questions.${index}.correctAnswer`)}} />
                                            </FormControl>
                                            <Button
                                              type="button"
                                              variant={'ghost'}
                                              size="icon"
                                              onClick={() => {
                                                  const currentValue = form.getValues(`questions.${index}.options.${optionIndex}`)
                                                  if(currentValue.trim() !== '') {
                                                    form.setValue(`questions.${index}.correctAnswer`, currentValue, { shouldValidate: true })
                                                  }
                                              }}
                                            >
                                                {form.watch(`questions.${index}.correctAnswer`) === form.watch(`questions.${index}.options.${optionIndex}`) ? <CheckCircle className="h-5 w-5 text-primary" /> : <Circle className="h-5 w-5" />}
                                                <span className="sr-only">Marcar como correcta</span>
                                            </Button>
                                          </FormItem>
                                        )}
                                      />
                                    ))}
                                    </div>
                                    <FormMessage>{form.formState.errors.questions?.[index]?.correctAnswer?.message}</FormMessage>
                                  </div>
                                )}
                                {form.watch(`questions.${index}.type`) === 'open-ended' && (
                                    <FormField
                                        control={form.control}
                                        name={`questions.${index}.correctAnswer`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Respuesta Correcta (Opcional)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Respuesta para calificación automática" {...field} />
                                                </FormControl>
                                                 <FormDescription>Si se deja en blanco, la pregunta requerirá calificación manual.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card>
                    <CardContent className="pt-6 flex flex-col md:flex-row gap-4">
                        <Button type="button" variant="outline" className="flex-1" onClick={() => addQuestion('multiple-choice')}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Añadir Opción Múltiple
                        </Button>
                        <Button type="button" variant="outline" className="flex-1" onClick={() => addQuestion('open-ended')}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Añadir Respuesta Abierta
                        </Button>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-2">
                    <Button type="button" variant="ghost" onClick={() => router.back()}>Cancelar</Button>
                    <Button type="submit">Guardar Examen</Button>
                </div>
            </form>
        </Form>
    );
}
