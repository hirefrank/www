export interface Section {
  url: string
  label: string
  show: boolean
  includes?: string[]
}

export const sections: Section[] = [
  {
    url: '/',
    label: 'Home',
    show: false,
    includes: ['social.vto'],
  },
  {
    url: '/about/',
    label: 'About',
    show: true,
  },
  {
    url: '/coaching/',
    label: 'Coaching',
    show: true,
    includes: ['coaching.vto'],
  },
  {
    url: '/speaking/',
    label: 'Speaking',
    show: false,
  },
  {
    url: '/uses/',
    label: 'Uses',
    show: false,
  },
  {
    url: '/projects/',
    label: 'Projects',
    show: true,
    includes: ['projects.vto'],
  },
  {
    url: '/contact/',
    label: 'Contact',
    show: true,
    includes: ['calendar.vto', 'social.vto'],
  },
]

export const site = {
  title: 'Frank Harris',
  name: 'hirefrank',
  description: "Frank Harris's personal website.",
}
