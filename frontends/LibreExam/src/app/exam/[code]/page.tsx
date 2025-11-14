"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Exam } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

type StudentState = 'waiting' | 'question' | 'answered' | 'finished';

export default function ExamPage() {
    const router = useRouter();
    const params = useParams();
    const code = params.code as string;
    
    const [exam, setExam] = useState<Exam | undefined>(undefined);
    
    const [studentState, setStudentState] = useState<StudentState>('waiting');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const storedExams = localStorage.getItem('exams');
        if (storedExams) {
            const exams: Exam[] = JSON.parse(storedExams);
            // In a real app, you'd match the 'code' to a specific running exam instance.
            // For this mock, we'll just use the first exam.
            setExam(exams[0]);
        }
    }, []);

    const currentQuestion = exam?.questions[currentQuestionIndex];
    
    useEffect(() => {
        if (!exam) return;
        // Simulate teacher starting the exam
        const timer = setTimeout(() => {
            if (exam?.questions.length) {
                setStudentState('question');
                setProgress(100 / exam.questions.length);
            } else {
                setStudentState('finished');
                 router.push(`/results/${code}`);
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, [exam, code, router]);

    const handleAnswerSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedAnswer) return;
        
        console.log(`Answered Q${currentQuestionIndex + 1} with: ${selectedAnswer}`);
        setStudentState('answered');

        // Simulate teacher pushing next question
        const timer = setTimeout(() => {
            if (currentQuestionIndex < (exam?.questions.length || 0) - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setSelectedAnswer('');
                setStudentState('question');
                setProgress(prev => prev + (100 / (exam?.questions.length || 1)));
            } else {
                setStudentState('finished');
                router.push(`/results/${code}`);
            }
        }, 2500);
        return () => clearTimeout(timer);
    };

    if (!exam) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Card>
                    <CardHeader>
                        <CardTitle>Buscando examen...</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    const renderContent = () => {
        switch (studentState) {
            case 'waiting':
                return (
                    <div className="text-center space-y-4">
                        <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                        <h2 className="text-2xl font-semibold">Esperando que el profesor inicie el examen...</h2>
                        <p className="text-muted-foreground">¡Prepárate!</p>
                    </div>
                );
            case 'question':
                if (!currentQuestion) return null;
                return (
                    <form onSubmit={handleAnswerSubmit} className="space-y-6 w-full">
                        <CardTitle className="text-2xl">{currentQuestion.text}</CardTitle>
                        <CardDescription>{currentQuestion.points} puntos</CardDescription>
                        {currentQuestion.type === 'multiple-choice' && (
                            <RadioGroup onValueChange={setSelectedAnswer} value={selectedAnswer} className="space-y-2 pt-4">
                                {currentQuestion.options?.map((option, i) => (
                                    <Label key={i} className="flex items-center space-x-3 p-4 border rounded-lg has-[:checked]:bg-accent has-[:checked]:border-accent has-[:checked]:text-accent-foreground cursor-pointer transition-colors">
                                        <RadioGroupItem value={option} id={`option-${i}`} />
                                        <span className="font-normal">{option}</span>
                                    </Label>
                                ))}
                            </RadioGroup>
                        )}
                        {currentQuestion.type === 'open-ended' && (
                             <Textarea 
                                value={selectedAnswer}
                                onChange={e => setSelectedAnswer(e.target.value)}
                                placeholder="Escribe tu respuesta aquí..."
                                rows={5}
                                className="mt-4"
                             />
                        )}
                        <Button type="submit" disabled={!selectedAnswer} className="w-full" size="lg">Enviar respuesta</Button>
                    </form>
                );
            case 'answered':
                return (
                    <div className="text-center space-y-4">
                        <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                        <h2 className="text-2xl font-semibold">¡Respuesta enviada!</h2>
                        <p className="text-muted-foreground">Esperando la siguiente pregunta...</p>
                    </div>
                );
            default:
                return null;
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
            <Card className="w-full max-w-2xl shadow-xl">
                <CardHeader>
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-xl font-bold font-headline">{exam.title}</h1>
                        {studentState === 'question' && <p className="text-sm text-muted-foreground">Pregunta {currentQuestionIndex + 1} de {exam.questions.length}</p>}
                    </div>
                    {studentState === 'question' && <Progress value={progress} />}
                </CardHeader>
                <CardContent className="min-h-[350px] flex items-center justify-center">
                    {renderContent()}
                </CardContent>
            </Card>
        </div>
    )
}
