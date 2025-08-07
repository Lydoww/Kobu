import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AppLayout from './components/layout/AppLayout';
import BoardDetailsPage from './components/boards/BoardDetailCompo';
import BoardsPage from './pages/Workspace';
import WorkspacePage from './pages/Workspace';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import { useAuthStore } from './store/authStore';
import { useEffect, useState } from 'react';

const App = () => {
  const { checkAuth, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
      setIsLoading(false);
    };
    initAuth();
  }, [checkAuth]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to workspace */}
        <Route path='/' element={<Navigate to='/workspace' replace />} />

        {/* App Layout wrapper */}
        <Route element={<AppLayout />}>
          {/* Public routes */}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            {/* Main workspace dashboard */}
            <Route path='/workspace' element={<WorkspacePage />} />

            {/* Boards management */}
            <Route path='/boards' element={<BoardsPage />} />
            <Route path='/board/:id' element={<BoardDetailsPage />} />

            {/* User profile */}
            <Route path='/profile' element={<ProfilePage />} />

            {/* Legacy route redirect */}
            <Route
              path='/boardsPage'
              element={<Navigate to='/boards' replace />}
            />
          </Route>
        </Route>

        {/* 404 page */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
