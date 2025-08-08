import {
  kanbanColors,
  type KanbanColumnType,
} from '../../constant/KanbanColors';
import type { Column } from '../../types/Column';
import ColumnCard from './ColumnCard';
import { useDroppable } from '@dnd-kit/core';

interface ColumnListProps {
  columns: Column[];
}

// Composant wrapper pour les zones de drop
const DroppableColumn = ({
  column,
  columnType,
  className,
}: {
  column: Column;
  columnType: KanbanColumnType;
  className?: string;
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `column-${column.id}`,
  });

  return (
    <div
      ref={setNodeRef}
      className={`${className} ${
        isOver ? 'ring-2 ring-blue-400 ring-opacity-50' : ''
      }`}
    >
      <ColumnCard column={column} columnType={columnType} />
    </div>
  );
};

const ColumnList = ({ columns }: ColumnListProps) => {
  const colorKeys = Object.keys(kanbanColors) as KanbanColumnType[];

  return (
    <div className='w-full flex-1'>
      {/* Desktop: Horizontal scroll layout */}
      <div className='hidden lg:flex gap-6 w-full flex-1 p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
        {columns.map((column, index) => {
          const columnType = colorKeys[index % colorKeys.length];
          return (
            <DroppableColumn
              key={column.id}
              column={column}
              columnType={columnType}
              className='flex-shrink-0 w-96'
            />
          );
        })}
      </div>

      {/* Tablet: 2 columns grid */}
      <div className='hidden md:block lg:hidden p-4'>
        <div className='grid grid-cols-2 gap-4'>
          {columns.map((column, index) => {
            const columnType = colorKeys[index % colorKeys.length];
            return (
              <DroppableColumn
                key={column.id}
                column={column}
                columnType={columnType}
                className='w-full'
              />
            );
          })}
        </div>
      </div>

      {/* Mobile: Single column layout */}
      <div className='md:hidden flex flex-col gap-4 p-2 sm:p-4'>
        {columns.map((column, index) => {
          const columnType = colorKeys[index % colorKeys.length];
          return (
            <DroppableColumn
              key={column.id}
              column={column}
              columnType={columnType}
              className='w-full'
            />
          );
        })}
      </div>
    </div>
  );
};

export default ColumnList;
