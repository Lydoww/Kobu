import type { Column } from '../../types/Column';
import {
  kanbanColors,
  textColors,
  type KanbanColumnType,
} from '../../constant/KanbanColors';
import { useState } from 'react';
import { useColumnStore } from '../../store/columnStore';
import { useTaskStore } from '../../store/taskStore';
import CreateTaskModal from '../task/CreateTaskModal';
import type { Task } from '../../types/Task';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import DraggableTask from '../task/DraggableTask';
import { Plus, Edit3, Trash2, Check, X, MoreVertical } from 'lucide-react';
import ConfirmationModal from '../ConfirmationModal';

interface ColumnCardProps {
  column: Column;
  columnType: KanbanColumnType;
}

const ColumnCard = ({ column, columnType }: ColumnCardProps) => {
  // Vérification défensive
  if (!column) {
    console.error('ColumnCard: column prop is undefined');
    return null;
  }

  const deleteColumn = useColumnStore((s) => s.deleteColumn);
  const updateColumn = useColumnStore((s) => s.updateColumn);
  const createTask = useTaskStore((s) => s.createTask);
  const { tasks, deleteTask, updateTask } = useTaskStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(column.title || '');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const columnTasks = tasks.filter((task) => task.columnId === column.id);

  const handleToggleModal = () => {
    setIsTaskModalOpen(!isTaskModalOpen);
  };

  const handleEdit = () => setIsEditing(true);

  const handleEditTask = (task: Task) => {
    setEditingTaskId(task.id);
    setEditTaskTitle(task.title);
  };

  const handleSaveTask = async (taskId: string) => {
    try {
      const currentTask = columnTasks.find((t) => t.id === taskId);
      const currentOrder = currentTask?.order || 0;

      await updateTask(editTaskTitle, currentOrder, taskId);
      setEditingTaskId(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleSave = async () => {
    try {
      const newTitle = editTitle?.trim();

      if (!newTitle) {
        alert('Column title cannot be empty');
        return;
      }

      await updateColumn(column.id, newTitle, column.order);
      setIsEditing(false);
    } catch (error) {
      console.error('Error while updating column', error);
      alert('Error updating column');
    }
  };

  const handleCancel = () => {
    setEditTitle(column?.title || '');
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteColumn(column.id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error while deleting the column', error);
      alert('Error deleting column');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAddTask = async () => {
    setIsTaskModalOpen(true);
  };

  const onTaskCreated = async (title: string) => {
    try {
      const columnTasks = tasks.filter((t) => t.columnId === column.id);
      const order = columnTasks.length;

      await createTask(title, order, column.id);
      setIsTaskModalOpen(false);
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Error creating task');
      throw error;
    }
  };

  return (
    <div
      className={`${kanbanColors[columnType]} rounded-2xl flex-shrink-0 w-full h-full shadow-lg flex flex-col transition-all duration-200`}
    >
      {/* Header moderne de la colonne */}
      <div className='p-6 pb-4'>
        <div className='flex justify-between items-start mb-4'>
          {isEditing ? (
            <div className='flex-1'>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className='w-full text-lg font-semibold bg-white rounded-lg px-3 py-2 border-2 border-blue-300 focus:border-blue-500 focus:outline-none'
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave();
                  if (e.key === 'Escape') handleCancel();
                }}
              />
              <div className='flex gap-3 mt-3'>
                <button
                  onClick={handleSave}
                  className='inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors'
                  title='Save'
                >
                  <Check className='w-4 h-4 mr-2' />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className='inline-flex items-center px-4 py-2 bg-white/20 text-gray-700 font-medium rounded-lg hover:bg-white/30 transition-colors'
                  title='Cancel'
                >
                  <X className='w-4 h-4 mr-2' />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className='flex-1'>
                <div className='flex items-center gap-3 mb-2'>
                  <h3
                    className={`${textColors[columnType]} text-lg font-semibold`}
                  >
                    {column.title}
                  </h3>
                  <span
                    className={`${textColors[columnType]} bg-white/60 px-2 py-1 rounded-full text-xs font-medium`}
                  >
                    {columnTasks.length}
                  </span>
                </div>
              </div>

              {/* Menu dropdown */}
              <div className='relative group'>
                <button className='inline-flex items-center px-4 py-2 bg-white/20 text-gray-700 font-medium rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm'>
                  <MoreVertical className='w-4 h-4' />
                </button>

                {/* Menu dropdown content */}
                <div className='absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20'>
                  <button
                    onClick={handleEdit}
                    className='w-full flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 transition-colors text-sm'
                  >
                    <Edit3 className='w-3 h-3 mr-2' />
                    Edit
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className='w-full flex items-center px-3 py-2 text-red-600 hover:bg-red-50 transition-colors text-sm'
                  >
                    <Trash2 className='w-3 h-3 mr-2' />
                    Delete
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Liste des tâches avec padding ajusté */}
      <SortableContext
        items={columnTasks.map((task) => `task-${task.id}`)}
        strategy={verticalListSortingStrategy}
      >
        <div className='flex-1 overflow-y-auto px-4 pb-4'>
          <div className='space-y-3'>
            {columnTasks.map((task) => (
              <DraggableTask
                key={task.id}
                task={task}
                editingTaskId={editingTaskId}
                editTaskTitle={editTaskTitle}
                onEditTask={handleEditTask}
                onSaveTask={handleSaveTask}
                onDeleteTask={handleDeleteTask}
                setEditingTaskId={setEditingTaskId}
                setEditTaskTitle={setEditTaskTitle}
              />
            ))}
          </div>
        </div>
      </SortableContext>

      {/* Bouton d'ajout moderne */}
      <div className='p-4 pt-2'>
        <button
          onClick={handleAddTask}
          className='w-full group flex items-center justify-center py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-sm border border-white/20'
        >
          <Plus className='w-4 h-4 mr-2 group-hover:scale-110 transition-transform' />
          <span>Add Task</span>
        </button>
      </div>

      {/* Modal de création de tâche */}
      {isTaskModalOpen && (
        <CreateTaskModal
          onToggle={handleToggleModal}
          onTaskCreated={onTaskCreated}
          columnId={column.id}
          taskCount={columnTasks.length}
        />
      )}
      <ConfirmationModal
        isOpen={showDeleteModal}
        type='column'
        itemName={column.title}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        loading={isDeleting}
      />
    </div>
  );
};

export default ColumnCard;
