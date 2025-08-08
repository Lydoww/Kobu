import { useNavigate, useParams } from 'react-router-dom';
import { useBoardStore } from '../../store/boardStore';
import { useColumnStore } from '../../store/columnStore';
import { useEffect, useState } from 'react';
import CreateColumnModal from '../column/CreateColumnModal';
import BoardHeader from './BoardHeader';
import ColumnList from '../column/ColumnList';
import { useTaskStore } from '../../store/taskStore';
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import BoardDetailSkeleton from '../skeleton/BoardDetailSkeleton';
import ConfirmationModal from '../ConfirmationModal';

const BoardDetailCompo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentBoard = useBoardStore((s) => s.currentBoard);
  const fetchOneBoard = useBoardStore((s) => s.fetchOneBoard);
  const deleteOneBoard = useBoardStore((s) => s.deleteBoard);
  const updateOneBoard = useBoardStore((s) => s.updateBoard);

  const fetchColumns = useColumnStore((s) => s.fetchColumnsForBoard);
  const columns = useColumnStore((s) => s.columns);

  const { tasks, moveTask, fetchAllTasksForBoard } = useTaskStore();
  const { loading: boardLoading, error: boardError } = useBoardStore();

  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const validColumns = columns?.filter(Boolean) || [];

  const handleDragStart = (event: DragStartEvent) => {
    setActiveTaskId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTaskId(null);

    if (!over) return;

    const taskId = active.id.toString().replace('task-', '');
    const draggedTask = tasks.find((t) => t.id === taskId);

    if (!draggedTask) return;

    const overId = over.id.toString();

    if (overId.startsWith('column-')) {
      const newColumnId = overId.replace('column-', '');
      if (newColumnId === draggedTask.columnId) return;

      const columnTasks = tasks.filter((t) => t.columnId === newColumnId);
      const newOrder = columnTasks.length;
      await moveTask(taskId, newColumnId, newOrder);
      return;
    }

    if (overId.startsWith('task-')) {
      const overTaskId = overId.replace('task-', '');
      const overTask = tasks.find((t) => t.id === overTaskId);

      if (!overTask || overTask.id === draggedTask.id) return;

      const newColumnId = overTask.columnId;
      let newOrder = overTask.order;

      if (newColumnId === draggedTask.columnId) {
        const columnTasks = tasks
          .filter((t) => t.columnId === newColumnId)
          .sort((a, b) => a.order - b.order);

        const overIndex = columnTasks.findIndex((t) => t.id === overTask.id);

        newOrder = overIndex;
      }

      await moveTask(taskId, newColumnId, newOrder);
    }
  };

  const handleToggleModal = () => {
    setIsColumnModalOpen(!isColumnModalOpen);
  };

  const handleUpdate = async (newTitle: string, newDescription: string) => {
    if (!id) return;
    try {
      await updateOneBoard(id, newTitle, newDescription);
    } catch (error) {
      console.error('Error while updating the board', error);
    }
  };

  const handleDelete = async () => {
    if (id === undefined) {
      navigate('/workspace');
      return;
    }
    setIsDeleting(true);
    try {
      await deleteOneBoard(id);
      navigate('/workspace');
    } catch (error) {
      console.error('Error deleting board:', error);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  useEffect(() => {
    if (id === undefined) {
      navigate('/boardsPage');
      return;
    }
    fetchOneBoard(id);
    fetchColumns(id);
  }, [fetchOneBoard, fetchColumns, id]);

  useEffect(() => {
    const validCols = columns?.filter(Boolean) || [];
    if (validCols.length > 0) {
      fetchAllTasksForBoard(validCols.map((col) => col.id));
    }
  }, [columns, fetchAllTasksForBoard]);

  if (boardLoading) {
    return <BoardDetailSkeleton />;
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className='flex-1 w-full bg-gray-250 p-6 flex flex-col'>
        <BoardHeader
          currentBoard={currentBoard}
          boardError={boardError}
          boardLoading={boardLoading}
          onUpdate={handleUpdate}
          onDelete={() => setShowDeleteModal(true)}
          onToggleModal={handleToggleModal}
        />
        <ColumnList columns={validColumns} />
        {isColumnModalOpen && (
          <CreateColumnModal
            onToggle={handleToggleModal}
            boardId={id!}
            columnsCount={validColumns.length}
          />
        )}

        <DragOverlay>
          {activeTaskId ? (
            <div className='bg-white p-2 rounded shadow-lg opacity-90'>
              {
                tasks.find((t) => t.id === activeTaskId.replace('task-', ''))
                  ?.title
              }
            </div>
          ) : null}
        </DragOverlay>
      </div>
      <ConfirmationModal
        isOpen={showDeleteModal}
        type='board'
        itemName={currentBoard?.title}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        loading={isDeleting}
      />
    </DndContext>
  );
};

export default BoardDetailCompo;
