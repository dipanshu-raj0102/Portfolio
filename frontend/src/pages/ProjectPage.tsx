import { ArrowLeft, ArrowUpRight, Check, CircleAlert } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ProjectVisual } from '@/components/projects/ProjectVisual';
import { StatusPill } from '@/components/ui/StatusPill';
import { localProjects } from '@/features/portfolio/content';
import { useProjects } from '@/features/portfolio/useProjects';

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const { projects } = useProjects();
  const project = projects.find((item) => item.slug === slug) ?? localProjects.find((item) => item.slug === slug);

  if (!project) return <div className="page-state shell"><p className="eyebrow">404 / PROJECT NOT FOUND</p><h1>That case study is not in the index.</h1><Button to="/">Return home</Button></div>;

  return <article className="project-detail shell"><Link className="back-link" to="/#projects"><ArrowLeft size={16} /> Back to selected work</Link><div className="project-detail__hero"><div><p className="eyebrow">{project.kicker}</p><h1>{project.title}</h1><p className="project-detail__summary">{project.summary}</p><div className="project-detail__meta"><StatusPill label={project.status} tone={project.statusTone} /><span>Case study / editable content</span></div></div><ProjectVisual project={project} /></div><div className="project-detail__grid"><div className="case-study-copy"><section><p className="eyebrow">01 / The question</p><h2>Start with the problem, not the model.</h2><p>{project.problem}</p></section><section><p className="eyebrow">02 / The approach</p><h2>Make the reasoning inspectable.</h2><p>{project.approach}</p></section><section><p className="eyebrow">03 / Limits</p><h2>What this work does not claim.</h2><p>{project.limitations}</p></section></div><aside className="case-study-aside"><div className="metric-panel"><span>{project.metricLabel}</span><strong>{project.metric}</strong><small>Replace with a verified measurement and evaluation protocol.</small></div><div className="aside-list"><p className="eyebrow">System notes</p>{project.architecture.map((item) => <div className="aside-list__item" key={item}><Check size={15} />{item}</div>)}</div><div className="aside-list"><p className="eyebrow">Stack</p><div className="tag-row">{project.stack.map((item) => <span className="tag" key={item}>{item}</span>)}</div></div><div className="placeholder-callout"><CircleAlert size={18} /><span>External project links are intentionally empty until verified.</span></div></aside></div><div className="project-detail__next"><span>Next step</span><Button href="/#contact" variant="secondary">Discuss a similar problem <ArrowUpRight size={16} /></Button></div></article>;
}
