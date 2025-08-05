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
    <div className='flex gap-6 w-full flex-1 overflow-x-auto '>
      {columns.map((column, index) => {
        const columnType = colorKeys[index % colorKeys.length];
        return (
          <ColumnCard key={column.id} column={column} columnType={columnType} />
        );
      })}
    </div>
  );
};

export default ColumnList;
