import { Project } from '~/data/projects'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const content = (
    <>
      <span className="text-2xl mr-2">{project.emoji}</span>
      <strong>{project.title}</strong> &mdash; {project.summary}
    </>
  )

  if (project.url) {
    return (
      <li>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="link-style"
        >
          {content}
        </a>
      </li>
    )
  }

  return <li>{content}</li>
}
