import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { profile } from '@/features/portfolio/content';

const links = [
  { label: 'Projects', href: '/#projects' },
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Writing', href: '/writing' },
];

export function Navigation() {
  const [openFor, setOpenFor] = useState<string | null>(null);
  const location = useLocation();
  const locationKey = `${location.pathname}${location.hash}`;
  const isOpen = openFor === locationKey;

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link className="wordmark" to="/" aria-label={`Home — ${profile.name}`}><span className="wordmark__mark">D</span><span>{profile.shortName.toUpperCase()} / ML</span></Link>
        <nav className={`site-nav ${isOpen ? 'site-nav--open' : ''}`} aria-label="Primary navigation" id="primary-navigation">
          {links.map((link) => link.href.startsWith('/#') ? (
            <a className="site-nav__link" href={link.href} key={link.href}>{link.label}</a>
          ) : (
            <NavLink className="site-nav__link" to={link.href} key={link.href}>{link.label}</NavLink>
          ))}
          <a className="nav-cta" href="/#contact">Start a conversation <span aria-hidden="true">↗</span></a>
        </nav>
        <button className="menu-toggle" aria-expanded={isOpen} aria-controls="primary-navigation" aria-label={isOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setOpenFor((value) => value === locationKey ? null : locationKey)} type="button">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
