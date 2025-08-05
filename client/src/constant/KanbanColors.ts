export type KanbanColumnType =
  | 'inspiration'
  | 'concept'
  | 'creation'
  | 'validation'
  | 'publication';
export type AccentType = 'urgent' | 'important' | 'completed';

export const kanbanColors: Record<KanbanColumnType, string> = {
  inspiration: 'bg-pink-50 border-pink-200',
  concept: 'bg-violet-50 border-violet-200',
  creation: 'bg-blue-50 border-blue-200',
  validation: 'bg-green-50 border-green-200',
  publication: 'bg-amber-50 border-amber-200',
} as const;

export const accentColors: Record<AccentType, string> = {
  urgent: 'bg-pink-400',
  important: 'bg-violet-400',
  completed: 'bg-green-400',
} as const;

export const textColors: Record<KanbanColumnType, string> = {
  inspiration: 'text-pink-700',
  concept: 'text-violet-700',
  creation: 'text-blue-700',
  validation: 'text-green-700',
  publication: 'text-amber-700',
} as const;
