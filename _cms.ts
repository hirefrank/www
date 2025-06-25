import CMS from 'lume/cms/mod.ts';

const cms = CMS();

cms.document({
  name: 'Site settings',
  description: 'General settings for the site',
  store: 'src:_data.yml',
  fields: [
    'lang: text',
    {
      name: 'metas',
      type: 'object',
      fields: [
        'site: text',
        'title: text',
        'description: text',
        'twitter: text',
        'icon: file',
        'lang: hidden',
        'generator: checkbox',
      ],
    },
    {
      name: 'navigation',
      type: 'object-list',
      fields: ['name: text', 'url: text'],
    },
  ],
});

cms.document({
  name: 'Homepage',
  description: 'Main page of the site',
  store: 'src:index.vto',
  fields: ['layout: hidden', 'title: text', 'intro: textarea', 'content: code'],
});

cms.document({
  name: 'About page',
  description: 'About page content',
  store: 'src:about.md',
  fields: ['layout: hidden', 'title: text', 'content: markdown'],
});

cms.collection({
  name: 'Posts',
  description: 'Blog posts',
  store: 'src:posts/*.md',
  fields: [
    'title: text',
    'date: datetime',
    'tags: text-list',
    'draft: checkbox',
    'content: markdown',
  ],
});

cms.upload('uploads: Uploaded files', 'src:uploads');

export default cms;
