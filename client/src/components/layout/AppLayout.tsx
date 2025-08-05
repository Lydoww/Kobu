import { Outlet } from 'react-router-dom';
import NavBarTest from '../ui/Navbar';

export default function AppLayout() {
  return (
    <div
      className='flex flex-col min-h-screen bg-gray-50 text-gray-900'
      style={{ fontFamily: 'Inter, Roboto, sans-serif' }}
    >
      {/* Header */}
      <header>
        <NavBarTest />
      </header>

      {/* Main content - flex-1 pour occuper tout l'espace disponible */}
      <main className='flex-1 flex flex-col'>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className='py-4 shadow-sm text-center text-sm text-gray-500 bg-white border-t border-gray-200'>
        © 2025 Kōbu. All rights reserved.
      </footer>
    </div>
  );
}
