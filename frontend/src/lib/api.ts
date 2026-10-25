import type { ContactPayload, ContactResponse, ProjectsResponse } from '@/types/content';

const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ?? '';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { detail?: string } | null;
    throw new Error(payload?.detail ?? `Request failed with status ${response.status}.`);
  }

  return (await response.json()) as T;
}

export function fetchProjects(signal?: AbortSignal): Promise<ProjectsResponse> {
  return request<ProjectsResponse>('/api/v1/projects', { signal });
}

export function submitContact(payload: ContactPayload): Promise<ContactResponse> {
  return request<ContactResponse>('/api/v1/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
