import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SiteShell } from '@/components/layout/SiteShell';
import { ErrorBoundary } from './ErrorBoundary';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProjectPage } from '@/pages/ProjectPage';
import { WritingPage } from '@/pages/WritingPage';

function DocumentMeta() {
  const location = useLocation();
  const isWriting = location.pathname === '/writing';
  const isProject = location.pathname.startsWith('/projects/');
  const title = isProject ? 'Project case study · ML Systems Portfolio' : isWriting ? 'Writing · ML Systems Portfolio' : 'ML Systems Portfolio';
  const description = isProject
    ? 'A technical project case study covering the question, approach, engineering notes, and known limits.'
    : isWriting
      ? 'Technical notes on machine learning systems, evaluation, backend reliability, and the engineering seams around models.'
      : 'An ML and AI engineering portfolio focused on transparent systems, careful evaluation, and useful interfaces.';

  useEffect(() => {
    document.title = title;
    const descriptionMeta = document.querySelector('meta[name="description"]');
    descriptionMeta?.setAttribute('content', description);
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}${location.pathname}`;
  }, [description, location.pathname, title]);

  return null;
}

export function App() {
  return <BrowserRouter><DocumentMeta /><ErrorBoundary><SiteShell><Routes><Route element={<HomePage />} path="/" /><Route element={<ProjectPage />} path="/projects/:slug" /><Route element={<WritingPage />} path="/writing" /><Route element={<NotFoundPage />} path="*" /></Routes></SiteShell></ErrorBoundary></BrowserRouter>;
}
