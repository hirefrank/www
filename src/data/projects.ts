export interface Project {
  title: string
  summary: string
  date: string
  emoji: string
  post: string | null
  url: string | null
  draft?: string
}

export const projects: Project[] = [
  {
    title: 'Gmail Attachment Extractor',
    summary: 'Automatically saves attachments from labeled emails to Google Drive.',
    date: '2024-12-28',
    emoji: '📎',
    post: null,
    url: 'https://github.com/hirefrank/gmail-attachment-extractor',
  },
  {
    title: 'Tech Compensation Calculator',
    summary: 'Project and compare total compensation packages including salary growth, bonuses, and equity grants.',
    date: '2024-12-15',
    emoji: '💰',
    post: null,
    url: 'https://calculator.hirefrank.com',
  },
  {
    title: 'Field Guide to Culinary Democracy',
    summary: "I analyzed over 500,000 words from 7,605 The NY Times Cooking comments labeled 'most helpful'.",
    date: '2024-10-07',
    emoji: '🍽️',
    post: null,
    url: 'https://medium.com/@hirefrank/the-new-york-times-cooking-comments-a-field-guide-to-culinary-democracy-in-the-digital-age-0ed967bc5a81',
  },
  {
    title: 'AI Reading List',
    summary: "I used AI to outsource my kids' reading list in 30 seconds.",
    date: '2024-09-23',
    emoji: '📚',
    post: null,
    url: 'https://medium.com/@hirefrank/how-i-used-ai-to-outsource-my-kids-reading-list-in-30-seconds-58994092131f',
  },
  {
    title: 'Hardening Your VPS',
    summary: "Learn how to harden your VPS to make it more secure. It's not as scary as it sounds.",
    date: '2024-09-05',
    emoji: '🔒',
    post: null,
    url: 'https://medium.com/@hirefrank/you-can-do-hard-things-hardening-your-vps-e838af7dc3c9',
  },
  {
    title: 'pg-to-sqlite',
    summary: 'A Bash script that automates the migration of PostgreSQL databases to SQLite.',
    date: '2024-04-20',
    emoji: '🗃️',
    post: null,
    url: 'https://github.com/hirefrank/pg-to-sqlite',
  },
  {
    title: 'Zoom Backup',
    summary: 'Automates the process of backing up recorded Zoom meetings to a GCS bucket.',
    date: '2021-02-27',
    emoji: '💾',
    post: null,
    url: 'https://github.com/hirefrank/zoom-backup',
  },
  {
    title: 'Kitchen Rodeo',
    summary: 'A virtual community that brought people together to cook and give back during the pandemic, raising over $175k.',
    date: '2020-03-20',
    emoji: '🐴',
    post: null,
    url: 'https://kitchen.rodeo',
  },
  {
    title: 'Equinox Scheduler',
    summary: 'Easily automate Equinox class reservations with Google Apps Script.',
    date: '2018-09-01',
    emoji: '🗓️',
    post: null,
    url: 'https://github.com/hirefrank/equinox-scheduler',
  },
  {
    title: 'Plaid + Google Sheets',
    summary: 'Automates the process of fetching transaction data and maintaining a record in a Google Sheet.',
    date: '2018-03-01',
    emoji: '🏦',
    post: null,
    url: 'https://github.com/hirefrank/plaid-txns-google-sheets',
  },
  {
    title: 'NYC Gas Finder',
    summary: 'A real-time Twitterbot tracking fuel availability post-Hurricane Sandy.',
    date: '2014-06-04',
    emoji: '⛽',
    post: null,
    url: 'https://github.com/hirefrank/nycgasfinder',
  },
]

// Filter out drafts in production
export const publishedProjects = projects.filter((p) => !p.draft)
