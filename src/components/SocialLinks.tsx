import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

export function SocialLinks() {
  return (
    <div className="flex gap-4 my-6">
      <a
        href="https://twitter.com/hirefrank"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
        aria-label="Twitter"
      >
        <Twitter />
      </a>
      <a
        href="https://linkedin.com/in/hirefrank"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
        aria-label="LinkedIn"
      >
        <Linkedin />
      </a>
      <a
        href="https://github.com/hirefrank"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
        aria-label="GitHub"
      >
        <Github />
      </a>
      <a
        href="mailto:frank@hirefrank.com"
        className="social-icon"
        aria-label="Email"
      >
        <Mail />
      </a>
    </div>
  )
}
