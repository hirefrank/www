import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/speaking')({
  component: SpeakingPage,
})

function SpeakingPage() {
  return (
    <div className="main-container simple-content">
      <h1>Speaking</h1>

      <p>
        I've spoken at events all around the world and been interviewed for many
        podcasts. One of my favorite ways to share my ideas is live on stage, where
        there's so much more communication bandwidth than there is in writing, and I
        love podcast interviews because they give me the opportunity to answer questions
        instead of just present my opinions.
      </p>

      <h2>Conferences</h2>

      <p>
        <strong>In space, no one can watch you stream — until now</strong> SysConf 2021
      </p>

      <p>
        A technical deep-dive into HelioStream, the real-time streaming library I wrote
        for transmitting live video back to Earth.
      </p>

      <p>Watch video</p>

      <p>
        <strong>Lessons learned from our first product recall</strong> Business of Startups 2020
      </p>

      <p>
        They say that if you're not embarassed by your first version, you're doing it
        wrong. Well when you're selling DIY space shuttle kits it turns out it's a bit
        more complicated.
      </p>

      <p>Watch video</p>

      <h2>Podcasts</h2>

      <p>
        <strong>Using design as a competitive advantage</strong> Encoding Design, July 2022
      </p>

      <p>
        How we used world-class visual design to attract a great team, win over
        customers, and get more press for Planetaria.
      </p>

      <p>Listen to podcast</p>

      <p>
        <strong>Bootstrapping an aerospace company to $17M ARR</strong> The Escape Velocity Show, March 2022
      </p>

      <p>
        The story of how we built one of the most promising space startups in the world
        without taking any capital from investors.
      </p>

      <p>Listen to podcast</p>

      <p>
        <strong>Programming your company operating system</strong> How They Work Radio, September 2021
      </p>

      <p>
        On the importance of creating systems and processes for running your business so
        that everyone on the team knows how to make the right decision no matter the
        situation.
      </p>

      <p>Listen to podcast</p>
    </div>
  )
}
