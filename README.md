# Frank Harris Personal Website

This repository contains the source code for Frank Harris's personal website, built using Deno's Lume framework, Tailwind CSS for styling, and VTO as the template engine.


## 🚀 Features
- Built with Lume, a static site generator for Deno
- Responsive design with custom Tailwind CSS styling
- Dynamic content rendering using VTO templates
- Blog posts and project showcases
- Optimized for performance and SEO
- Automatic deployment to Deno Deploy

## 🛠️ Technologies Used

- [Deno](https://deno.land/) - JavaScript/TypeScript runtime
- [Lume](https://lume.land/): A static site generator for Deno
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework
- [VTO](https://lume.land/plugins/vento/): A template engine for Lume


## 🏗️ Project Structure

```
.
├── _config.ts
├── src/
│   ├── _data.yml
│   ├── _includes/
│   ├── pages/
│   ├── writings/
│   └── styles.css
├── .github/workflows/
│   └── deploy.yml
├── cli/
│   └── medium-to-markdown.ts
└── serve.ts
```

## 🚀 Getting Started

To run the project locally:

1. Ensure you have [Deno](https://deno.land/) installed
2. Clone this repository
3. Navigate to the project directory
4. Run `deno task serve` to start the development server
5. Open http://localhost:3000 in your browser


## 🚢 Deployment

The site is automatically deployed to Deno Deploy when changes are pushed to the main branch. The deployment configuration can be found in `.github/workflows/deploy.yml`.


## 📝 Content Management
- Blog posts are stored in src/writings/ as Markdown files
- Pages are stored in src/pages/ as Markdown files
- Site configuration is in _config.ts
- Global data is stored in src/_data.yml
- `medium-to-markdown.ts`: Converts Medium articles to Markdown format

## License

This project is open source and available under the [MIT License](LICENSE).
