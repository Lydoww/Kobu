import BoardCard from './BoardCard';
import CreateBoardCard from './CreateBoardCard';
import EmptyState from './EmptyState';
import type { Board } from '../../types/Board';

interface BoardsGridProps {
  boards: Board[];
  onCreateBoard: () => void;
}

function BoardsGrid({ boards, onCreateBoard }: BoardsGridProps) {
  if (boards.length === 0) {
    return <EmptyState onCreateBoard={onCreateBoard} />;
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {boards.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
      <CreateBoardCard onCreateBoard={onCreateBoard} />
    </div>
  );
}

export default BoardsGrid;
