import { createFileRoute } from '@tanstack/react-router'
import { ProjectCard } from '~/components/ProjectCard'
import { publishedProjects } from '~/data/projects'

export const Route = createFileRoute('/projects')({
  component: ProjectsPage,
  head: () => ({
    meta: [
      { title: "Projects - Frank Harris" },
      { name: "description", content: "Side projects, experiments, and things Frank has built over the years." },
      { property: "og:title", content: "Projects - Frank Harris" },
      { property: "og:description", content: "Side projects, experiments, and things Frank has built over the years." },
    ],
  }),
})

function ProjectsPage() {
  return (
    <div className="main-container">
      <h1>Projects</h1>

      <p>
        Side projects, experiments, and things I've built over the years. Some are still
        active, others are archived but were fun learning experiences.
      </p>

      <ul className="projects-list">
        {publishedProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </ul>
    </div>
  )
}
