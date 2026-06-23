import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import TestsCatalog from './pages/TestsCatalog';
import Attempts from './pages/Attempts';
import Results from './pages/Results';
import Profile from './pages/Profile';
import TestWindow from './pages/TestWindow';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { initializeStorage, isSessionActive } from './lib/storage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!isSessionActive()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  useEffect(() => {
    // Bootstrap standard datasets into local browser storage on mount
    initializeStorage();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing Entrance */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Portal dashboard pages nested under standard layouts */}
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tests" element={<TestsCatalog />} />
          <Route path="/attempts" element={<Attempts />} />
          <Route path="/results" element={<Results />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Independent fullscreen Sandbox Assessment Panel */}
        <Route path="/test-window/:testId" element={
          <ProtectedRoute>
            <TestWindow />
          </ProtectedRoute>
        } />

        {/* Fallback Redirection Rules */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
