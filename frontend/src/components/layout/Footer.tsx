import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCurrentYear } from '@/lib/format';
import { profile } from '@/features/portfolio/content';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__top">
        <div><p className="eyebrow">Have a hard problem?</p><h2>Let’s make the system legible.</h2></div>
        <a className="footer-contact" href="/#contact">Open contact form <ArrowUpRight size={18} /></a>
      </div>
      <div className="shell site-footer__bottom">
        <span>© {getCurrentYear()} · {profile.name.toUpperCase()}</span>
        <div className="footer-links"><Link to="/">Home</Link><Link to="/writing">Writing</Link><a href={profile.links.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
      </div>
    </footer>
  );
}
