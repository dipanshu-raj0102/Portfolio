export type ProjectStatus = 'completed' | 'in progress' | 'research prototype' | 'experimental';

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  problem: string;
  approach: string;
  architecture: string[];
  stack: string[];
  period: string;
  status: ProjectStatus;
  statusTone: 'lime' | 'violet';
  metric: string;
  metricLabel: string;
  limitations: string;
  links: ProjectLink[];
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  status: string;
  tags: string[];
}

export interface EducationItem {
  institution: string;
  credential: string;
  period: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Profile {
  name: string;
  shortName: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
  heroStatement: string;
  links: {
    github: string;
    linkedin: string;
  };
  education: EducationItem[];
  skillGroups: SkillGroup[];
  certifications: string[];
  languages: string[];
}

export interface ProjectsResponse {
  items: Project[];
  total: number;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  submission_token: string;
  website?: string;
}

export interface ContactResponse {
  id: string;
  status: 'accepted';
  received_at: string;
}
