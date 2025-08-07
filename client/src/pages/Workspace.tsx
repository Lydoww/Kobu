import { useEffect, useState } from 'react';
import { useBoardStore } from '../store/boardStore';
import CreateBoardModal from '../components/boards/CreateBoardModal';
import WorkspaceSkeleton from '../components/skeleton/WorkspaceSkeleton';
import WorkspaceHeader from '../components/workspace/WorkspaceHeader';
import StatsCards from '../components/workspace/StatsCard';
import BoardsGrid from '../components/workspace/BoardsGrid';
import ErrorState from '../components/workspace/ErrorState';
import { useAuthStore } from '../store/authStore';

function Workspace() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const boards = useBoardStore((state) => state.boards);
  const loading = useBoardStore((state) => state.loading);
  const error = useBoardStore((state) => state.error);
  const fetchBoards = useBoardStore((state) => state.fetchBoards);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBoards();
    }
  }, [isAuthenticated, fetchBoards]);

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (loading) {
    return <WorkspaceSkeleton />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <WorkspaceHeader onCreateBoard={handleOpenModal} />
        <StatsCards boards={boards} />
        <BoardsGrid boards={boards} onCreateBoard={handleOpenModal} />
      </div>

      {isModalOpen && <CreateBoardModal onToggle={handleOpenModal} />}
    </div>
  );
}

export default Workspace;
