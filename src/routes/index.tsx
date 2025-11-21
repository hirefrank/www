import { createFileRoute } from '@tanstack/react-router'
import { ProfileImage } from '~/components/ProfileImage'
import { SocialLinks } from '~/components/SocialLinks'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="home-container">
      <ProfileImage src="/images/mug.jpg" alt="Frank Harris" />

      <h1>I'm Frank Harris, a product leader turned coach.</h1>

      <p>
        I help leaders navigate messy and high-stakes moments of growth like new roles,
        scaling teams, evolving strategies, and integrating AI into their work.
      </p>

      <p>
        My coaching is shaped by two decades in the arena at places like{' '}
        <span className="font-medium">Slack</span>
        <span className="relative -top-[0.1em] inline-block">🙌</span>,{' '}
        <span className="font-medium">Etsy</span>
        <span className="relative -top-[0.0em] inline-block">🧶</span>, and{' '}
        <span className="font-medium">Google</span>
        <span className="relative -top-[0.1em] inline-block">🤖</span>.
      </p>

      <p>
        I bring that experience to leaders through{' '}
        <a href="/coaching">1:1 coaching</a>,{' '}
        <a href="https://tryfrank.chat" target="_blank" rel="noopener noreferrer">
          Frankbot
        </a>{' '}
        (my AI assistant), and{' '}
        <a href="https://franktakeaways.com/" target="_blank" rel="noopener noreferrer">
          Frank Takeaways
        </a>
        , my <span className="hidden md:inline-block">mildly entertaining</span> newsletter.
      </p>

      <SocialLinks />
    </div>
  )
}
