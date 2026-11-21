import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { AIAssistant } from '@/components/common/AIAssistant';
import { CustomCursor } from '@/components/common/CustomCursor';

// Route-level code splitting
const HomePage = lazy(() => import('@/pages/Home'));
const ProjectDetailsPage = lazy(() => import('@/pages/ProjectDetails'));

const PageLoadingFallback: React.FC = () => (
  <div className="min-h-screen bg-bg flex items-center justify-center" role="status" aria-label="Loading page content">
    <div className="flex flex-col items-center gap-3">
      <div className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      <span className="font-mono text-xs text-copy-muted tracking-wider uppercase">Loading experience...</span>
    </div>
  </div>
);

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/attendx" element={<Navigate to="/projects/labattend" replace />} />
            <Route path="/projects/:slug" element={<ProjectDetailsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        {/* Desktop-only Custom Follower Cursor */}
        <CustomCursor />

        {/* Animated Page Transitions with Route Splitting */}
        <AnimatedRoutes />

        {/* Floating AI Assistant UI */}
        <AIAssistant />
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
