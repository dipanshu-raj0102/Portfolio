import { ScanLine, Waves } from 'lucide-react';
import type { Project } from '@/types/content';

interface ProjectVisualProps {
  project: Project;
  compact?: boolean;
}

export function ProjectVisual({ project, compact = false }: ProjectVisualProps) {
  const isRegression = project.slug !== 'neural-network-from-scratch';

  return (
    <div className={`project-visual project-visual--${isRegression ? 'regression' : 'lab'} ${compact ? 'project-visual--compact' : ''}`} aria-label={`${project.title} abstract visual`} role="img">
      <div className="project-visual__topline"><span>{isRegression ? 'OPT / TRACE-04' : 'LAB / TRACE-01'}</span><span>{compact ? '01:1' : '01:2'}</span></div>
      {isRegression ? (
        <>
          <div className="regression-map" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>
          <Waves className="project-visual__glyph" aria-hidden="true" size={compact ? 28 : 48} strokeWidth={1.1} />
          <div className="project-visual__coordinate">LOSS / WEIGHTS / 04</div>
        </>
      ) : (
        <>
          <div className="lab-grid" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>
          <div className="lab-curve" aria-hidden="true"><span /><span /><span /></div>
          <ScanLine className="project-visual__glyph" aria-hidden="true" size={compact ? 28 : 48} strokeWidth={1.1} />
          <div className="project-visual__coordinate">LOSS / BOUNDARY / 03</div>
        </>
      )}
      <div className="project-visual__footer"><span>{project.status}</span><span>EDITABLE VISUAL</span></div>
    </div>
  );
}
