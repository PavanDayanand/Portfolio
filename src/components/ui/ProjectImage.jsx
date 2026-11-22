export default function ProjectImage({ project, alt = project.title, className = "", decorative = false }) {
  const compact = project.image.replace(/\.webp$/, "-800.webp");
  return <img src={project.image} srcSet={`${compact} 800w, ${project.image} 1600w`} sizes={decorative ? "96px" : "(max-width: 767px) 90vw, 700px"} alt={decorative ? "" : alt} width="1600" height="900" loading="lazy" decoding="async" className={className} />;
}
