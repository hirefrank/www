# Frank Harris Personal Website

This repository contains the source code for Frank Harris's personal website, built using Deno's Lume framework, Tailwind CSS for styling, and VTO as the template engine.


## 🚀 Features
- Built with Lume, a static site generator for Deno
- Responsive design with custom Tailwind CSS styling
- Dynamic content rendering using VTO templates
- Blog posts and project showcases
- Medium post integration
- Automatic deployment to Deno Deploy
- Custom intro email generator
- Calendar integration for coaching sessions
- Automatic daily Medium post sync

## 🛠️ Technologies Used

- [Deno](https://deno.land/) - JavaScript/TypeScript runtime
- [Lume](https://lume.land/): A static site generator for Deno
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework
- [VTO](https://lume.land/plugins/vento/): A template engine for Lume
- [OpenAI](https://openai.com/): For AI-powered intro email generation
- [Cal.com](https://cal.com/): For calendar scheduling
- [PDF.js](https://mozilla.github.io/pdf.js/): For PDF parsing


## 🏗️ Project Structure

```
.
├── _config.ts
├── content/
│   ├── _data.yml
│   ├── _includes/
│   ├── pages/
│   ├── writings/
│   └── styles.css
├── lib/
│   ├── plugins.ts
│   ├── intro.ts
│   └── middleware/
├── .github/workflows/
│   └── deploy.yml
└── serve.ts
```

## 🚀 Getting Started

To run the project locally:

1. Ensure you have [Deno](https://deno.land/) installed
2. Clone this repository
3. Create a `.env` file with required environment variables:
   ```
   OPENAI_API_KEY=your_key_here
   ```
4. Run `deno task serve` to start the development server
5. Open http://localhost:3000 in your browser


## 🚢 Deployment

The site is automatically deployed to Deno Deploy when changes are pushed to the main branch. The deployment configuration can be found in `.github/workflows/deploy.yml`.


## 📝 Content Management
- Blog posts are stored in content/writings/ as Markdown files
- Pages are stored in content/pages/ as Markdown files
- Site configuration is in _config.ts
- Global data is stored in content/_data.yml
- Styles are managed through Tailwind CSS in content/styles.css

## License

This project is open source and available under the [MIT License](LICENSE).
