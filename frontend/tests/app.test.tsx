import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from '@/app/App';

describe('portfolio app', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ items: [], total: 0 }),
    }));
  });

  it('renders the primary identity and project section', async () => {
    render(<App />);
    expect(screen.getByText('DIPANSHU / ML')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /I build ML systems/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /A closer look at the work/i })).toBeInTheDocument();
  });

  it('navigates to a project detail page from the project card', async () => {
    render(<App />);
    const link = await screen.findByRole('link', { name: /Open Neural Network \(MLP\) From Scratch/i });
    expect(link).toHaveAttribute('href', '/projects/neural-network-from-scratch');
  });
});
