import { createFileRoute } from "@tanstack/react-router";
import { ProjectCard } from "~/components/ProjectCard";
import { publishedProjects } from "~/data/projects";

export const Route = createFileRoute("/studio")({
  component: StudioPage,
  head: () => ({
    meta: [
      { title: "Studio - Frank Harris" },
      { name: "description", content: "Side projects, experiments, and things Frank has built over the years." },
      { property: "og:title", content: "Studio - Frank Harris" },
      { property: "og:description", content: "Side projects, experiments, and things Frank has built over the years." },
    ],
  }),
});

function StudioPage() {
  return (
    <div className="pt-24 pb-16 bg-white min-h-screen animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-backwards">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Studio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Side projects, experiments, and things I've built over the years.
            Some are still active, others are archived but were fun learning
            experiences.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 animate-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-backwards">
          {publishedProjects.map((project) => (
            <div key={project.title} className="h-full">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
