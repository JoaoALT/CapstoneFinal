"use client";

import { CreateExamForm } from './components/create-exam-form';

export default function CreateExamPage() {
    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-bold font-headline">Crear un Nuevo Examen</h2>
                <p className="text-muted-foreground">Define el título, las preguntas y las respuestas para tu evaluación.</p>
            </div>
            <CreateExamForm />
        </div>
    );
}
