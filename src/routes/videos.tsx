import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/videos')({
  component: VideosPage,
})

const videos = [
  {
    slug: 'why-is-it-so-hard',
    title: "Why is it so hard?",
    artist: 'Charles Bradley',
    date: '2014-08-07',
  },
  {
    slug: 'rainbows-rainier',
    title: "Rainbows & Rainier",
    artist: 'Fleet Foxes',
    date: '2014-08-24',
  },
  {
    slug: 'past-to-find-the-future',
    title: "Past to Find the Future",
    artist: 'Fleet Foxes',
    date: '2014-09-01',
  },
  {
    slug: 'long-shadows',
    title: "I'm not afraid of the dark",
    artist: 'Josh Ritter',
    date: '2014-09-02',
  },
  {
    slug: 'cooke-blowin-in-the-wind',
    title: "Blowin' in the Wind",
    artist: 'Sam Cooke',
    date: '2014-09-19',
  },
  {
    slug: 'bey-toe-ven',
    title: 'Bey-toe-ven',
    artist: 'Steve Martin',
    date: '2014-10-11',
  },
  {
    slug: 'apple-in-your-mouth',
    title: 'Apple in Your Mouth',
    artist: 'Donovan',
    date: '2014-10-22',
  },
]

function VideosPage() {
  return (
    <div className="main-container">
      <h1>Videos</h1>

      <p>
        A collection of music videos that have inspired me over the years. Some are fan-made,
        others are official, all are worth watching.
      </p>

      <ul className="writings-list">
        {videos.map((video) => (
          <li key={video.slug} className="writings-item">
            <span>
              {video.title} &mdash; {video.artist}
            </span>
            <span className="writings-date">
              {new Date(video.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
              })}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
