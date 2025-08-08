import {
  kanbanColors,
  type KanbanColumnType,
} from '../../constant/KanbanColors';
import type { Column } from '../../types/Column';
import ColumnCard from './ColumnCard';

interface ColumnListProps {
  columns: Column[];
}

const ColumnList = ({ columns }: ColumnListProps) => {
  const colorKeys = Object.keys(kanbanColors) as KanbanColumnType[];

  return (
    <div className='w-full flex-1'>
      {/* Desktop: Horizontal scroll layout */}
      <div className='hidden lg:flex gap-6 w-full flex-1 p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
        {columns.map((column, index) => {
          const columnType = colorKeys[index % colorKeys.length];
          return (
            <div key={column.id} className='flex-shrink-0 w-96'>
              <ColumnCard column={column} columnType={columnType} />
            </div>
          );
        })}
      </div>

      {/* Tablet: 2 columns grid */}
      <div className='hidden md:block lg:hidden p-4'>
        <div className='grid grid-cols-2 gap-4'>
          {columns.map((column, index) => {
            const columnType = colorKeys[index % colorKeys.length];
            return (
              <div key={column.id} className='w-full'>
                <ColumnCard column={column} columnType={columnType} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: Single column layout */}
      <div className='md:hidden flex flex-col gap-4 p-2 sm:p-4'>
        {columns.map((column, index) => {
          const columnType = colorKeys[index % colorKeys.length];
          return (
            <div key={column.id} className='w-full'>
              <ColumnCard column={column} columnType={columnType} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColumnList;