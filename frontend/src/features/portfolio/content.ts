import projectsJson from '../../../../content/projects.json';
import articlesJson from '../../../../content/articles.json';
import profileJson from '../../../../content/profile.json';
import type { Article, Profile, Project } from '@/types/content';

export const localProjects = projectsJson as Project[];
export const articles = articlesJson as Article[];
export const profile = profileJson as Profile;
