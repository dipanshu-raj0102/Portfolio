import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '@/types/content';
import { ProjectVisual } from './ProjectVisual';
import { StatusPill } from '@/components/ui/StatusPill';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  index: string;
}

export function ProjectCard({ project, featured = false, index }: ProjectCardProps) {
  return (
    <article className={`project-card ${featured ? 'project-card--featured' : ''}`}>
      <ProjectVisual project={project} compact={!featured} />
      <div className="project-card__body">
        <div className="project-card__meta"><span>{index} / {project.period}</span><StatusPill label={project.status} tone={project.statusTone} /></div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="project-card__footer">
          <div className="tag-row">{project.stack.slice(0, 3).map((item) => <span className="tag" key={item}>{item}</span>)}</div>
          <Link className="icon-link" to={`/projects/${project.slug}`} aria-label={`Open ${project.title}`}><ArrowUpRight size={18} /></Link>
        </div>
      </div>
    </article>
  );
}
