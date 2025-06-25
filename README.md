# Folio Clean - A Minimalist Portfolio Theme for Lume

A clean, professional portfolio theme for Lume featuring a distinctive design
with custom colors, typography, and a unique branded header.

## Features

- **Distinctive branded header** with colored logo block
- **Custom color schemes** with CSS variables (Warm, Cool, Dark, Ocean)
- **Tailwind CSS** for utility-first styling
- **Beautiful typography** using Quicksand and Crimson Pro fonts
- **Responsive navigation** with hamburger menu for mobile
- **Project showcase** with emoji icons and hover effects
- **Blog/writings section** with clean post layout
- **Profile image** on homepage
- **Fast and lightweight** with optimized performance

## Quick Start

### Installation

```ts
import lume from 'lume/mod.ts';
import folioClean from 'https://deno.land/x/lume_theme_folio_clean/mod.ts';

const site = lume();

site.use(folioClean());

export default site;
```

### Configuration

You can customize the theme by passing options:

```ts
site.use(
  folioClean({
    colorScheme: 'cool', // warm (default), cool, dark, or ocean
  })
);
```

## Color Schemes

Folio Clean includes four color schemes, each with carefully chosen palettes:

- **Warm** (default): Cream background with warm accent colors
- **Cool**: Blue-tinted grays with cool accent colors
- **Dark**: Dark mode with high contrast
- **Ocean**: Teal and blue ocean-inspired colors

## Customization

### Site Configuration

Edit `_data.yml` to customize your site:

```yaml
metas:
  site: 'Your Name'
  tagline: 'Your tagline'
  description: 'Your site description'

navigation:
  - url: '/'
    label: 'Home'
  - url: '/about/'
    label: 'About'
  # Add more navigation items

profileImage: '/images/profile.jpg'
showProfileImage: true
```

### Projects

Add your projects to `_data/projects.yml`:

```yaml
- title: 'Project Name'
  summary: 'Brief description of the project'
  date: '2024-01-15'
  emoji: '🚀'
  url: 'https://github.com/username/project'
```

### Writing Posts

Create new posts in the `writings` directory:

```markdown
---
title: Your Post Title
date: 2024-03-20
type: post
layout: layouts/simple.vto
tags:
  - tag1
  - tag2
---

Your content here...
```

### Custom Styling

The theme uses Tailwind CSS with custom utility classes. Key classes include:

- `.logo-container` - The distinctive header logo block
- `.profile-image` - Circular profile image with hover effect
- `.writings-list` - Styled blog post list
- `.projects-list` - Project list with emoji icons
- `.link-style` - Consistent link styling throughout

### Fonts

The theme includes Quicksand (sans-serif) for headings and body text, and
Crimson Pro Italic (serif) for h2 elements. Fonts are included in the theme.

## File Structure

```
your-site/
├── _config.ts          # Lume configuration
├── _data.yml          # Site metadata and navigation
├── _data/
│   └── projects.yml   # Project data
├── writings/          # Blog posts
├── static/
│   ├── fonts/        # Web fonts
│   └── images/       # Images including profile
└── *.md/vto          # Your pages
```

## Development

### Testing locally

```bash
deno task serve
```

### Building for production

```bash
deno task build
```

## License

MIT License - see LICENSE file for details
