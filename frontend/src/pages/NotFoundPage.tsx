import { Button } from '@/components/ui/Button';

export function NotFoundPage() {
  return <div className="page-state shell"><p className="eyebrow">404 / NOT FOUND</p><h1>The page moved before the model converged.</h1><p>Try the home page or jump back to the selected work index.</p><Button to="/">Return home</Button></div>;
}
