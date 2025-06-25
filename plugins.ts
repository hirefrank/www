import tailwindcss from 'lume/plugins/tailwindcss.ts';
import postcss from 'lume/plugins/postcss.ts';
import metas from 'lume/plugins/metas.ts';
import sitemap from 'lume/plugins/sitemap.ts';
import minifyHTML from 'lume/plugins/minify_html.ts';
import robots from 'lume/plugins/robots.ts';
import markdown from 'lume/plugins/markdown.ts';
import date from 'lume/plugins/date.ts';
import basePath from 'lume/plugins/base_path.ts';
import slugifyUrls from 'lume/plugins/slugify_urls.ts';
import { merge } from 'lume/core/utils/object.ts';

import 'lume/types.ts';

export interface Options {
  sitemap?: Partial<{ priority: number; changefreq: string }>;
  colorScheme?: 'warm' | 'cool' | 'dark' | 'ocean';
}

export const defaults: Options = {
  colorScheme: 'warm',
};

/** Configure the site */
export default function (userOptions?: Options) {
  const options = merge(defaults, userOptions);

  return (site: Lume.Site) => {
    site
      .use(
        tailwindcss({
          options: {
            theme: {
              screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
              },
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
                  sans: ['Quicksand', 'system-ui', 'sans-serif'],
                  serif: ['CrimsonProItalic', 'Georgia', 'serif'],
                },
              },
            },
          },
        })
      )
      .use(markdown())
      .use(postcss())
      //.use(metas())
      .use(minifyHTML())
      .use(robots())
      .use(sitemap())
      .use(
        date({
          formats: {
            SHORT: 'MMM dd',
            LONG: 'MMMM d, yyyy',
          },
        })
      )
      .use(basePath())
      .use(slugifyUrls())
      .copy('static', '.');

    site.data('colorScheme', options.colorScheme);
  };
}
