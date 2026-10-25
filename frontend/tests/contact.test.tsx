import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ContactForm } from '@/features/contact/ContactForm';

describe('contact form', () => {
  it('shows accessible client-side validation', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText('Please enter your name.')).toBeInTheDocument();
    expect(screen.getByText('Please share a little more context (20 characters minimum).')).toBeInTheDocument();
  });

  it('shows success only after the API accepts the message', async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ id: 'msg-1', status: 'accepted', received_at: new Date().toISOString() }) });
    vi.stubGlobal('fetch', fetchMock);
    render(<ContactForm />);
    await user.type(screen.getByLabelText('Name'), 'Ada Lovelace');
    await user.type(screen.getByLabelText('Email'), 'ada@example.com');
    await user.type(screen.getByLabelText('Subject'), 'A systems question');
    await user.type(screen.getByLabelText('Message'), 'I would like to discuss a careful ML systems build.');
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText(/Message received/i)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith('/api/v1/contact', expect.objectContaining({ method: 'POST' }));
  });
});
