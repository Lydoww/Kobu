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
import WorkspaceSkeleton from './components/skeleton/WorkspaceSkeleton';

const App = () => {
  const { checkAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
      setIsLoading(false);
    };
    initAuth();
  }, [checkAuth]);

  if (isLoading) {
    return <WorkspaceSkeleton />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/workspace' replace />} />

        <Route element={<AppLayout />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path='/workspace' element={<WorkspacePage />} />

            <Route path='/boards' element={<BoardsPage />} />
            <Route path='/board/:id' element={<BoardDetailsPage />} />

            <Route path='/profile' element={<ProfilePage />} />

            <Route
              path='/boardsPage'
              element={<Navigate to='/boards' replace />}
            />
          </Route>
        </Route>

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
