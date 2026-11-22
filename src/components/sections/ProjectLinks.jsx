import { Github, ExternalLink } from 'lucide-react';

export default function ProjectLinks({ project }) {
  const style = 'inline-flex items-center gap-2 px-5 py-3 border border-skin-border-base rounded-full font-semibold text-sm hover:bg-skin-inverted hover:text-skin-text-inverted transition-colors';
  return <div className="flex flex-wrap gap-3">
    {project.liveLink && project.liveLink !== '#' && project.liveLink !== project.githubLink && <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className={style}><ExternalLink size={16} aria-hidden="true" />{project.liveLabel || 'View Project'}</a>}
    {project.githubLink && project.githubLink !== '#' && <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className={style}><Github size={16} aria-hidden="true" />GitHub Repository</a>}
    {project.skillLink && <a href={project.skillLink} target="_blank" rel="noopener noreferrer" className={style}>REA Skill</a>}
  </div>;
}
