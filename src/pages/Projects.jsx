import { Link, useSearchParams } from 'react-router-dom';
import ProjectImage from '../components/ui/ProjectImage';
import ProjectLinks from '../components/sections/ProjectLinks';
import { projects } from '../data/projects';
import './projects-gallery.css';

function ProjectEntry({ project }) {
  return (
    <article className="work-entry" id={`project-${project.id}`} aria-labelledby={`project-title-${project.id}`}>
      <div className="work-entry-copy">
        <div className="work-entry-meta"><span>{project.category}</span>{project.status && <span className="work-entry-status">{project.status}</span>}</div>
        <h2 id={`project-title-${project.id}`}>{project.title}</h2>
        <p className="work-entry-description">{project.details}</p>
        <ul className="work-entry-tech" aria-label={`${project.title} technologies`}>{project.tech.map(tech => <li key={tech}>{tech}</li>)}</ul>
        <ProjectLinks project={project} />
      </div>
      <figure className="work-entry-visual"><ProjectImage project={project} className="work-entry-image" /></figure>
    </article>
  );
}

export default function Projects() {
  const [searchParams] = useSearchParams();
  const filter = (searchParams.get('filter') || '').trim().toLowerCase();
  const visible = projects.filter(project => !filter || [project.title, project.category, ...project.tech].some(value => value.toLowerCase().includes(filter)));
  const main = visible.filter(project => !project.secondary);
  const additional = visible.filter(project => project.secondary);
  return (
    <div className="work-gallery max-w-5xl mx-auto px-4">
      <header className="work-gallery-heading">
        <h1>WORKS<span>.</span></h1>
        <p>Everyday apps, experiments in AI, and stories told through data.</p>
        {filter && <div className="work-filter">Showing “{searchParams.get('filter')}” <Link to="/projects">Show all projects</Link></div>}
      </header>
      <div className="work-gallery-list">{main.map(project => <ProjectEntry key={project.id} project={project} />)}</div>
      {additional.length > 0 && <section className="work-additional" aria-labelledby="additional-work"><h2 id="additional-work">More work</h2>{additional.map(project => <ProjectEntry key={project.id} project={project} />)}</section>}
      {visible.length === 0 && <p className="work-empty">No projects match this search. <Link to="/projects">Browse all projects</Link></p>}
    </div>
  );
}
