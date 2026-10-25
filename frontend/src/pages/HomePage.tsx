import {
  ArrowDownRight,
  ArrowUpRight,
  Award,
  BrainCircuit,
  Code2,
  Download,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Network,
  Phone,
  Radar,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatusPill } from '@/components/ui/StatusPill';
import { ContactForm } from '@/features/contact/ContactForm';
import { articles, profile } from '@/features/portfolio/content';
import { useProjects } from '@/features/portfolio/useProjects';

const capabilities = [
  {
    icon: BrainCircuit,
    title: 'Machine learning',
    body: 'Implementing core algorithms from scratch with NumPy, then making the training loop and evaluation behavior inspectable.',
  },
  {
    icon: Radar,
    title: 'Computer vision',
    body: 'A focused learning direction built around understanding how models turn visual signals into useful predictions.',
  },
  {
    icon: Code2,
    title: 'Engineering foundations',
    body: 'Python, C, data structures, Linux, and Git — the fundamentals that make experiments easier to reproduce and extend.',
  },
];

export function HomePage() {
  const { projects, isLoading, isOfflineSnapshot } = useProjects();
  const featured = projects[0];
  const skillItems = Array.from(new Set([...profile.skillGroups.flatMap((group) => group.items), 'Computer Vision']));

  return (
    <>
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="eyebrow eyebrow--signal"><span className="pulse-dot" />DIPANSHU RAJ / MACHINE LEARNING ENGINEER</p>
          <h1 id="hero-title">{profile.heroStatement}</h1>
          <p className="hero__lede">{profile.summary}</p>
          <div className="hero__actions"><Button href="#projects">Explore selected work</Button><Button href="/resume.pdf" icon={Download} variant="secondary">View résumé</Button></div>
          <div className="hero__socials"><span className="mono-label">LINKS / DIPANSHU RAJ</span><a href={profile.links.github} target="_blank" rel="noreferrer"><Code2 size={15} /> GitHub <ArrowUpRight size={13} /></a><a href={profile.links.linkedin} target="_blank" rel="noreferrer"><Network size={15} /> LinkedIn <ArrowUpRight size={13} /></a></div>
        </div>
        <div className="hero__visual" aria-label="Abstract model monitoring visual" role="img">
          <div className="hero-visual__frame"><div className="hero-visual__header"><span>MODEL / OBSERVATION LOOP</span><span>v.01</span></div><div className="hero-visual__orb"><div className="orb-ring orb-ring--one" /><div className="orb-ring orb-ring--two" /><div className="orb-core"><Radar size={28} strokeWidth={1} /></div><span className="orb-label orb-label--one">signal</span><span className="orb-label orb-label--two">loss</span><span className="orb-label orb-label--three">context</span></div><div className="hero-visual__chart"><span style={{ height: '34%' }} /><span style={{ height: '51%' }} /><span style={{ height: '46%' }} /><span style={{ height: '72%' }} /><span style={{ height: '64%' }} /><span style={{ height: '88%' }} /><span style={{ height: '78%' }} /></div><div className="hero-visual__footer"><span>EXPLAIN / ITERATE / SHIP</span><Sparkles size={14} /></div></div>
          <div className="hero__visual-caption"><span>01</span><span>From mathematical foundations to useful machine-learning systems.</span></div>
        </div>
      </section>

      <section className="ticker" aria-label="Focus areas"><div className="ticker__track"><span>MACHINE LEARNING</span><i>✳</i><span>COMPUTER VISION</span><i>✳</i><span>NUMPY</span><i>✳</i><span>MODEL FOUNDATIONS</span><i>✳</i><span>MACHINE LEARNING</span></div></section>

      <section className="section shell" id="projects" aria-labelledby="projects-title">
        <SectionHeading index="01" eyebrow="Selected work" title="A closer look at the work." description="Three resume-backed projects that show how the fundamentals are being implemented, tested, and visualized from first principles." />
        {isOfflineSnapshot ? <p className="inline-note">API unavailable — showing the local project content snapshot.</p> : null}
        <div className="projects-grid">
          {isLoading && !featured ? <div className="loading-block">Loading project index…</div> : null}
          {projects.map((project, index) => <ProjectCard featured={index === 0} index={`0${index + 1}`} key={project.slug} project={project} />)}
        </div>
        <div className="section-endnote"><span>PROJECTS / NUMPY-FIRST IMPLEMENTATIONS</span><ArrowDownRight size={18} /></div>
      </section>

      <section className="section section--split shell" id="about" aria-labelledby="about-title">
        <SectionHeading index="02" eyebrow="About Dipanshu" title="Learning the model by building the mechanism." />
        <div className="split-copy"><p className="lede" id="about-title">{profile.summary}</p><p>Currently pursuing a B.Tech in Computer Science at Birla Institute of Technology, Mesra, Dipanshu is building a practical foundation in machine learning, computer vision, and the systems that support both.</p><div className="quote-mark">“</div><p className="quote">Understand the fundamentals deeply enough to know what the abstraction is hiding.</p><div className="profile-facts"><div className="profile-fact"><div className="profile-fact__heading"><GraduationCap size={17} /><span>Education</span></div>{profile.education.map((item) => <div className="timeline-item" key={`${item.institution}-${item.period}`}><strong>{item.institution}</strong><span>{item.credential}</span><small>{item.period}</small></div>)}</div><div className="profile-fact"><div className="profile-fact__heading"><Award size={17} /><span>Certifications</span></div><div className="certification-list">{profile.certifications.map((item) => <span key={item}>{item}</span>)}</div><div className="profile-fact__heading profile-fact__heading--spaced"><Languages size={17} /><span>Languages</span></div><div className="language-list">{profile.languages.map((language) => <span key={language}>{language}</span>)}</div></div></div></div>
      </section>

      <section className="section section--capabilities shell" id="skills" aria-labelledby="skills-title">
        <SectionHeading index="03" eyebrow="Skills & focus" title="A resume-backed technical foundation." description="No arbitrary proficiency scores — just the tools, subjects, and learning directions listed in the current résumé." />
        <div className="capability-grid" id="skills-title">{capabilities.map(({ icon: Icon, title, body }, index) => <article className="capability" key={title}><div className="capability__number">0{index + 1}</div><Icon className="capability__icon" size={26} strokeWidth={1.2} /><h3>{title}</h3><p>{body}</p><div className="capability__line" /></article>)}</div>
        <div className="skill-cloud">{skillItems.map((item) => <span key={item}>{item.toUpperCase()}</span>)}</div>
      </section>

      <section className="section section--writing shell" id="writing" aria-labelledby="writing-title">
        <div className="writing-heading"><SectionHeading index="04" eyebrow="Field notes" title="Writing for the in-between moments." description="Technical notes are the next layer of the portfolio: a place to document experiments, explain the math, and share what worked." /><Button to="/writing" variant="text">View all notes</Button></div>
        <div className="article-list" id="writing-title">{articles.map((article, index) => <Link className="article-row" to="/writing" key={article.slug}><span className="article-row__index">0{index + 1}</span><div><div className="article-row__meta"><span>{article.status}</span><span>{article.readingTime}</span></div><h3>{article.title}</h3><p>{article.excerpt}</p></div><ArrowUpRight className="article-row__arrow" size={20} /></Link>)}</div>
      </section>

      <section className="contact-section shell" id="contact" aria-labelledby="contact-title">
        <div className="contact-section__intro"><p className="eyebrow eyebrow--signal">05 / CONTACT</p><h2 id="contact-title">Let’s build the next experiment.</h2><p>For project conversations, collaboration, or a thoughtful technical question, reach out directly. The form is connected to the Python API and only confirms after persistence succeeds.</p><div className="contact-aside"><StatusPill label="Dipanshu Raj" tone="lime" /><a href={`mailto:${profile.email}`}><Mail size={14} />{profile.email}</a><a href={`tel:${profile.phone.replaceAll(' ', '')}`}><Phone size={14} />{profile.phone}</a><span><MapPin size={14} />{profile.location}</span></div></div><ContactForm />
      </section>
    </>
  );
}
