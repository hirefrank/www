import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="main-container">
      <h1>About</h1>

      <p>
        Frank Harris is a coach and former product executive with over 20 years of
        experience building teams and products at companies like Slack, Etsy, and
        Google.
      </p>

      <div className="clearfix">
        <div className="about-image-container">
          <img src="/images/speaking.jpg" alt="Frank Harris" className="about-image scale-hover" />
        </div>
      </div>

      <p>
        Frank's career spans engineering, design, and product leadership across
        startups, scale-ups, and public companies. He's known for combining deep
        technical intuition with design sensibility and a sharp sense of product
        strategy — a blend that shapes his coaching today.
      </p>

      <p>
        As a self-taught engineer, Frank joined Google as a UX designer and created the
        original transit icons for Google Maps — an early example of his ability to
        bridge tech with human-friendly design.
      </p>

      <p>
        He later joined Etsy as a product manager pre-IPO, where he played a pivotal
        role in enhancing search and discovery and led the launch of a high-margin,
        self-serve ad platform for sellers — one of their most successful revenue
        initiatives.
      </p>

      <p>
        Frank went on to hold VP roles at Betterment, Casper, InVision, and Slack,
        leading cross-functional teams through periods of rapid growth, product
        reinvention, and organizational change.
      </p>

      <p>
        Today, he works with senior ICs, VPs, and founders as a coach — helping them
        navigate complex leadership challenges, clarify strategy, and grow with
        intention.
      </p>

      <p>
        His practice is grounded in ICF-aligned coaching, supported by{' '}
        <a href="/coaching">1:1 work</a>, tools like{' '}
        <a href="https://tryfrank.chat" target="_blank" rel="noopener noreferrer">
          Frankbot
        </a>{' '}
        (his AI coaching assistant), and{' '}
        <a href="https://franktakeaways.com/" target="_blank" rel="noopener noreferrer">
          Frank Takeaways
        </a>
        , a weekly newsletter on product and leadership.
      </p>

      <p>
        He lives in Brooklyn, NY with his wife, two young daughters, and an Italian
        truffle dog that isn't of much use in the city.
      </p>

      <p>
        <a
          href="https://www.linkedin.com/in/hirefrank/"
          target="_blank"
          rel="noopener noreferrer"
        >
          View full career on LinkedIn &rarr;
        </a>
      </p>
    </div>
  )
}
