import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { articles } from '@/features/portfolio/content';

export function WritingPage() {
  return <section className="page-section shell"><SectionHeading index="04" eyebrow="Field notes" title="Writing, when the system needs a clearer explanation." description="An editorial home for technical articles, project notes, and research explanations. These entries are intentionally marked by editorial status until real copy is supplied." /><div className="writing-page-grid">{articles.map((article, index) => <article className="writing-card" key={article.slug}><div className="writing-card__top"><span>0{index + 1}</span><span>{article.status}</span></div><h2>{article.title}</h2><p>{article.excerpt}</p><div className="writing-card__bottom"><span>{article.date} · {article.readingTime}</span><Link to="/#contact">Request the draft <ArrowUpRight size={15} /></Link></div><div className="tag-row">{article.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></article>)}</div><div className="writing-placeholder"><p className="eyebrow">Editorial system ready</p><h2>Add a markdown-backed article without changing the page shell.</h2><p>When verified articles are available, add them to the shared content model and give each one a route-specific metadata object.</p></div></section>;
}
