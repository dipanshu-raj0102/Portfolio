interface StatusPillProps {
  label: string;
  tone?: 'lime' | 'violet' | 'muted';
}

export function StatusPill({ label, tone = 'muted' }: StatusPillProps) {
  return <span className={`status-pill status-pill--${tone}`}><span aria-hidden="true" />{label}</span>;
}
