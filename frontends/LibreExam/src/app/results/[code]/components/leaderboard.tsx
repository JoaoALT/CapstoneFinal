import { MOCK_LEADERBOARD } from '@/lib/data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Award, CheckCircle, Trophy } from 'lucide-react';

export function Leaderboard() {
    const leaderboard = MOCK_LEADERBOARD;
    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Trophy className="text-yellow-500" />;
        if (rank === 2) return <Trophy className="text-gray-400" />;
        if (rank === 3) return <Trophy className="text-orange-400" />;
        return <Award className="text-muted-foreground" />;
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[80px]">Rank</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead className="text-right">Respuestas Correctas</TableHead>
                    <TableHead className="text-right">Puntuación</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {leaderboard.map((entry) => (
                    <TableRow key={entry.rank} className={entry.name === 'Sofía' ? 'bg-accent/20' : ''}>
                        <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                                {getRankIcon(entry.rank)}
                                {entry.rank}
                            </div>
                        </TableCell>
                        <TableCell>{entry.name} {entry.name === 'Sofía' && <span className="text-muted-foreground ml-1">(Tú)</span>}</TableCell>
                        <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                                {entry.correctAnswers}
                                <CheckCircle className="h-4 w-4 text-primary"/>
                            </div>
                        </TableCell>
                        <TableCell className="text-right font-bold text-lg">{entry.score}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
