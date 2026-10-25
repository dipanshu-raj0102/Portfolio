import type { PropsWithChildren } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

export function SiteShell({ children }: PropsWithChildren) {
  return <div className="app-shell"><Navigation /><main>{children}</main><Footer /></div>;
}
