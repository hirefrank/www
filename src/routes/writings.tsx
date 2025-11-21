import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/writings')({
  component: WritingsPage,
})

const writings = [
  {
    slug: 'you-can-do-hard-things-hardening-your-vps',
    title: 'You Can Do Hard Things: Hardening Your VPS',
    date: '2024-09-05',
    url: 'https://medium.com/@hirefrank/you-can-do-hard-things-hardening-your-vps-e838af7dc3c9',
  },
  {
    slug: 'plaid-google-sheets',
    title: 'Plaid + Google Sheets',
    date: '2018-03-01',
    url: null,
  },
  {
    slug: 'nyc-summer-films',
    title: 'NYC Summer Films',
    date: '2014-05-18',
    url: null,
  },
  {
    slug: 'nyc-gas-finder',
    title: 'NYC Gas Finder',
    date: '2014-06-04',
    url: null,
  },
  {
    slug: 'kitchen-rodeo',
    title: 'Kitchen Rodeo',
    date: '2020-03-20',
    url: null,
  },
  {
    slug: 'jobasaurus',
    title: 'Jobasaurus',
    date: '2023-12-01',
    url: null,
  },
  {
    slug: 'equinox-scheduler',
    title: 'Equinox Scheduler',
    date: '2018-09-01',
    url: null,
  },
  {
    slug: 'zoom-backup',
    title: 'Zoom Backup',
    date: '2021-02-27',
    url: null,
  },
]

function WritingsPage() {
  return (
    <div className="main-container">
      <h1>Writings</h1>

      <p>
        Thoughts on product, leadership, and building things. Some are technical deep-dives,
        others are reflections on lessons learned.
      </p>

      <ul className="writings-list">
        {writings.map((writing) => (
          <li key={writing.slug} className="writings-item">
            <span>
              {writing.url ? (
                <a
                  href={writing.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {writing.title}
                </a>
              ) : (
                <span>{writing.title}</span>
              )}
            </span>
            <span className="writings-date">
              {new Date(writing.date).toLocaleDateString('en-US', {
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
