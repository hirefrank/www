import plugins, { Options } from './plugins.ts';

import 'lume/types.ts';

export type { Options } from './plugins.ts';

export default function (options: Partial<Options> = {}) {
  return (site: Lume.Site) => {
    // Configure the site
    site.use(plugins(options));

    // Add remote files
    const files = [
      '_includes/layouts/base.vto',
      '_includes/layouts/simple.vto',
      '_data.yml',
      '_data/projects.yml',
      'index.vto',
      'about.md',
      'projects.vto',
      'contact.md',
      'styles.css',
      'writings/building-better-products.md',
      'writings/remote-product-teams.md',
      'static/favicon.ico',
      'static/fonts/Quicksand-VariableFont_wght.ttf',
      'static/fonts/CrimsonPro-Italic-VariableFont_wght.ttf',
      'static/images/profile.jpg',
    ];

    for (const file of files) {
      site.remoteFile(file, import.meta.resolve(`./src/${file}`));
    }
  };
}
