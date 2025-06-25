import lume from 'lume/mod.ts';
import theme from 'theme/mod.ts';

const site = lume();

site.use(
  theme({
    colorScheme: 'default',
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Source Serif Pro',
    },
  })
);

export default site;
