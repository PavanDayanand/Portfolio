import ProjectLinks from "./ProjectLinks";
import ProjectImage from "../ui/ProjectImage";
import { projects } from "../../data/projects";

export default function FeaturedProjects() {
  return (
    <section aria-labelledby="recent-work" className="mb-12 md:mb-20">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-widest text-skin-text-base/60 mb-2">Apps & websites</p>
        <h2 id="recent-work" className="text-3xl md:text-5xl font-bold tracking-tight">What I’m building.</h2>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        {projects.filter(project => project.featured).map(project => (
          <article key={project.id} className="rounded-[24px] overflow-hidden bg-skin-card border border-skin-border-base">
            <ProjectImage project={project} className="w-full aspect-video object-contain" />
            <div className="p-6">
              <p className="text-sm text-skin-text-base/60 mb-2">{project.category}{project.status ? ` · ${project.status}` : ""}</p>
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-base text-skin-text-base/70 leading-relaxed mb-4">{project.description}</p>
              {project.skillNote && <p className="text-sm text-skin-text-base/60 mb-4">{project.skillNote}</p>}
              <ProjectLinks project={project} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
