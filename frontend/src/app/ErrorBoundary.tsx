import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';

interface ErrorBoundaryProps { children: ReactNode }
interface ErrorBoundaryState { hasError: boolean }

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState { return { hasError: true }; }

  componentDidCatch(error: Error, info: ErrorInfo) { console.error('Portfolio UI error', error, info); }

  render() {
    if (!this.state.hasError) return this.props.children;
    return <div className="page-state shell"><p className="eyebrow">RECOVERY / UI ERROR</p><h1>The interface hit an unexpected state.</h1><p>Refresh the page to retry the view. The error has been isolated from the rest of the app.</p><Button onClick={() => window.location.reload()}>Refresh page</Button></div>;
  }
}
