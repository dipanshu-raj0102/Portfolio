import { ArrowUpRight, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  to?: string;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'text';
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Button({ children, href, to, icon: Icon = ArrowUpRight, variant = 'primary', type = 'button', disabled, onClick, className = '' }: ButtonProps) {
  const classes = `button button--${variant} ${className}`;
  const content = <><span>{children}</span><Icon aria-hidden="true" size={16} strokeWidth={1.8} /></>;

  if (to) return <Link className={classes} to={to}>{content}</Link>;
  if (href) return <a className={classes} href={href}>{content}</a>;
  return <button className={classes} disabled={disabled} onClick={onClick} type={type}>{content}</button>;
}
