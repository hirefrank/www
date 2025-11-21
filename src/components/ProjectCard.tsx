import { Project } from "~/data/projects";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  if (project.url) {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full no-underline group"
      >
        <div className="flex flex-col h-full p-6 bg-white rounded-xl border border-neutral-200 shadow-sm group-hover:shadow-lg group-hover:border-primary-200 group-hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
              {project.emoji}
            </span>
            <ExternalLink className="w-5 h-5 text-neutral-400 group-hover:text-primary-500 transition-colors" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
            {project.title}
          </h3>
          <p className="text-neutral-600 leading-relaxed flex-grow">
            {project.summary}
          </p>
        </div>
      </a>
    );
  }

  return (
    <div className="flex flex-col h-full p-6 bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl">{project.emoji}</span>
      </div>
      <h3 className="text-xl font-bold text-neutral-900 mb-2">{project.title}</h3>
      <p className="text-neutral-600 leading-relaxed flex-grow">
        {project.summary}
      </p>
    </div>
  );
}
