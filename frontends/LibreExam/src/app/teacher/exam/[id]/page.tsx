"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Exam } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Users, Play, SkipForward, Flag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type HostState = 'waiting' | 'in-progress' | 'finished';

export default function HostExamPage() {
    const router = useRouter();
    const params = useParams();
    const examId = params.id as string;

    const [exam, setExam] = useState<Exam | undefined>(undefined);
    const [hostState, setHostState] = useState<HostState>('waiting');
    const [accessCode, setAccessCode] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
    const [joinedStudents, setJoinedStudents] = useState<string[]>([]);

    useEffect(() => {
        const storedExams = localStorage.getItem('exams');
        if (storedExams) {
            const exams: Exam[] = JSON.parse(storedExams);
            const currentExam = exams.find(e => e.id === examId);
            setExam(currentExam);
        }
    }, [examId]);

    useEffect(() => {
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        setAccessCode(code);
    }, []);

    useEffect(() => {
        if (hostState !== 'waiting') return;

        const studentJoinInterval = setInterval(() => {
            const students = ['Ana', 'Carlos', 'Sofía', 'Luis', 'Mariana'];
            setJoinedStudents(prev => {
                if(prev.length < students.length){
                    const newStudent = students[prev.length];
                    return [...prev, newStudent];
                }
                clearInterval(studentJoinInterval);
                return prev;
            });
        }, 1500);
        
        return () => clearInterval(studentJoinInterval);
    }, [hostState]);

    const startExam = () => {
        setHostState('in-progress');
        setCurrentQuestionIndex(0);
        // Here you would typically open a new port or signal your backend
        // For now, we'll just log it.
        console.log(`Starting exam ${exam?.title} on a new port with code ${accessCode}`);
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < (exam?.questions.length || 0) - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            router.push(`/results/${accessCode}`);
        }
    };
    
    if (!exam) return <div className="text-center py-10">Examen no encontrado.</div>;
    const currentQuestion = exam.questions[currentQuestionIndex];
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Card className="min-h-[500px] flex flex-col">
                    <CardHeader>
                        <CardTitle>Hospedando: {exam.title}</CardTitle>
                        <CardDescription>Controla el flujo del examen en tiempo real.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex items-center justify-center">
                        {hostState === 'waiting' && (
                            <div className="text-center space-y-4">
                                <h3 className="text-2xl font-bold">¡Listos para empezar!</h3>
                                <p className="text-muted-foreground">Comparte este código con tus estudiantes para que se unan.</p>
                                <div className="p-4 bg-muted rounded-md text-4xl font-mono tracking-widest font-bold text-primary">
                                    {accessCode || <Loader2 className="animate-spin mx-auto" />}
                                </div>
                                <Button size="lg" onClick={startExam} disabled={!accessCode || joinedStudents.length === 0}>
                                    <Play className="mr-2" /> Iniciar Examen
                                </Button>
                            </div>
                        )}
                        {hostState === 'in-progress' && currentQuestion && (
                            <div className="w-full text-center space-y-4">
                                <p className="text-sm text-muted-foreground">Pregunta {currentQuestionIndex + 1} de {exam.questions.length}</p>
                                <h3 className="text-3xl font-semibold">{currentQuestion.text}</h3>
                                {currentQuestion.type === 'multiple-choice' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                        {currentQuestion.options?.map((opt, i) => (
                                            <div key={i} className={`p-4 border rounded-md text-left ${opt === currentQuestion.correctAnswer ? 'border-primary bg-primary/10 text-primary font-bold' : ''}`}>
                                                {String.fromCharCode(65 + i)}. {opt}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {currentQuestion.type === 'open-ended' && currentQuestion.correctAnswer && (
                                  <div className="pt-4">
                                    <p className="text-sm text-muted-foreground">Respuesta correcta esperada:</p>
                                    <p className="p-4 border rounded-md bg-primary/10 text-primary font-bold">{currentQuestion.correctAnswer}</p>
                                  </div>
                                )}
                                <div className="pt-8">
                                    <Button size="lg" onClick={nextQuestion}>
                                        {currentQuestionIndex === exam.questions.length - 1 ? <Flag className="mr-2"/> : <SkipForward className="mr-2" />}
                                        {currentQuestionIndex === exam.questions.length - 1 ? 'Finalizar y ver resultados' : 'Siguiente Pregunta'}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
            
            <div className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users />
                            Estudiantes
                            <Badge>{joinedStudents.length}</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {joinedStudents.length > 0 ? (
                            <ul className="space-y-2 max-h-96 overflow-y-auto">
                                {joinedStudents.map(student => <li key={student} className="p-2 bg-muted rounded-md">{student}</li>)}
                            </ul>
                        ) : (
                            <p className="text-muted-foreground text-center py-8">Esperando estudiantes...</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
