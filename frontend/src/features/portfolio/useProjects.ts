import { useEffect, useState } from 'react';
import { fetchProjects } from '@/lib/api';
import { localProjects } from './content';
import type { Project } from '@/types/content';

interface ProjectsState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  isOfflineSnapshot: boolean;
}

export function useProjects(): ProjectsState {
  const [state, setState] = useState<ProjectsState>({
    projects: localProjects,
    isLoading: true,
    error: null,
    isOfflineSnapshot: false,
  });

  useEffect(() => {
    const controller = new AbortController();

    fetchProjects(controller.signal)
      .then((response) => {
        setState({ projects: response.items, isLoading: false, error: null, isOfflineSnapshot: false });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setState({
          projects: localProjects,
          isLoading: false,
          error: error instanceof Error ? error.message : 'The project API is unavailable.',
          isOfflineSnapshot: true,
        });
      });

    return () => controller.abort();
  }, []);

  return state;
}
