import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className='flex h-screen'>
      {/* Sidebar */}
      <aside className='w-64 bg-gray-800 text-white p-4'>
        <h2 className='text-xl font-bold'>Kanban</h2>
        {/* liens / boutons */}
      </aside>

      {/* Contenu principal */}
      <main className='flex-1 p-6 overflow-y-auto'>
        {/* Header global (logout, nom, etc.) */}
        <header className='mb-4 flex justify-between items-center'>
          <h1 className='text-2xl font-semibold'>Dashboard</h1>
          {/* Bouton logout etc. */}
        </header>

        {/* Routes enfants */}
        <Outlet />
      </main>
    </div>
  );
}
