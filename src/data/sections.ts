export interface Section {
  url: string;
  label: string;
  show: boolean;
  includes?: string[];
}

export const sections: Section[] = [
  {
    url: "/",
    label: "Coaching",
    show: true,
  },
  {
    url: "/about",
    label: "About",
    show: true,
  },
  {
    url: "/studio",
    label: "Studio",
    show: false,
  },
  {
    url: "/speaking/",
    label: "Speaking",
    show: false,
  },
  {
    url: "/uses/",
    label: "Uses",
    show: false,
  },
  {
    url: "/projects/",
    label: "Projects",
    show: false,
    includes: ["projects.vto"],
  },
  {
    url: "/contact/",
    label: "Contact",
    show: false,
    includes: ["calendar.vto", "social.vto"],
  },
];

export const site = {
  title: "Frank Harris",
  name: "hirefrank",
  description: "Frank Harris's personal website.",
};
