import tailwindcss from 'lume/plugins/tailwindcss.ts';
import postcss from 'lume/plugins/postcss.ts';
import metas from 'lume/plugins/metas.ts';
import sitemap from 'lume/plugins/sitemap.ts';
import minifyHTML from 'lume/plugins/minify_html.ts';
import robots from 'lume/plugins/robots.ts';
import markdown from 'lume/plugins/markdown.ts';
import date from 'lume/plugins/date.ts';
import onDemand from 'lume/plugins/on_demand.ts';


import 'lume/types.ts';

/** Configure the site */
export default function () {
  return (site: Lume.Site) => {
    site
      .use(
        tailwindcss({
          options: {
            theme: {
              extend: {
                colors: {
                  canvas: 'var(--canvas)',
                  'on-canvas': 'var(--on-canvas)',
                  'on-canvas-dim': 'var(--on-canvas--dim)',
                  'on-canvas-mute': 'var(--on-canvas--mute)',
                  accent: 'var(--accent)',
                  'accent-dark': 'var(--accent-dark)',
                },
                fontFamily: {
                  sans: ['Quicksand', 'Fallback', 'sans-serif'],
                  serif: ['CrimsonProItalic', 'Quicksand', 'Fallback', 'serif'],
                },
              },
            },
            variants: {},
            plugins: [],
          },
        })
      )
      .use(markdown())
      .use(postcss())
      .use(metas())
      .use(minifyHTML())
      .use(robots())
      .use(
        sitemap({
          query: 'indexable=true', // Select only pages with the indexable attribute as true
          sort: 'date=desc', // To sort by data in ascendent order
        })
      )
      .use(
        date({
          formats: {
            SHORT: 'MMM dd',
          },
        })
      )
      .use(onDemand())
      .copy('static', './');
  };
}
