'use client'

import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

type FavoriteToggleProps = {
  materialId: string
  gradeId: string
  subjectId: string
  isFavorited: boolean
}

export default function FavoriteToggle({
  materialId,
  gradeId,
  subjectId,
  isFavorited,
}: FavoriteToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={true}
      aria-label={'Añadir a favoritos no disponible en modo local'}
      className="text-muted-foreground"
    >
      <Star className={'h-5 w-5 fill-none'} />
    </Button>
  )
}
