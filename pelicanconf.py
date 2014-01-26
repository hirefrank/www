#!/usr/bin/env python
# http://docs.getpelican.com/en/latest/settings.html
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'Frank Harris'
SITENAME = u'hirefrank'
SITEURL = 'http://www.hirefrank.com'
TIMEZONE = 'America/New_York'

DEFAULT_LANG = u'en'
DEFAULT_DATE_FORMAT = '%b %d, %Y'
#USE_FOLDER_AS_CATEGORY = True
DISPLAY_PAGES_ON_MENU = True
AUTHOR_SAVE_AS = None
DEFAULT_CATEGORY = ''

ARTICLE_DIR = ''
ARTICLE_URL = '{date:%y}/{date:%m}/{slug}'
ARTICLE_SAVE_AS = '{date:%y}/{date:%m}/{slug}/index.html'
ARTICLE_EXCLUDES = (('_pages', 'extras'))

PAGE_DIR = '_pages'
PAGE_URL = '{slug}'
PAGE_SAVE_AS = '{slug}/index.html'

#CATEGORY_URL = 'category/{slug}'
#CATEGORY_SAVE_AS = 'category/{slug}/index.html'
CATEGORY_SAVE_AS = None
#CATEGORIES_URL = 'categories'
#CATEGORIES_SAVE_AS = 'categories/index.html'

TAG_URL = 'tag/{slug}'
TAG_SAVE_AS = 'tag/{slug}/index.html'
TAGS_URL = 'tags'
TAGS_SAVE_AS = 'tags/index.html'

ARCHIVES_SAVE_AS = 'archives/index.html'

YEAR_ARCHIVE_SAVE_AS = '{date:%y}/index.html'
MONTH_ARCHIVE_SAVE_AS = '{date:%y}/{date:%m}/index.html'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None

TWITTER = 'http://www.twitter.com/hirefrank'
LINKEDIN = 'http://www.linkedin.com/in/hirefrank'
MAIL = 'frank@hirefrank.com'
SEARCH = True

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True
THEME = 'theme' 
DELETE_OUTPUT_DIRECTORY = True
DIRECT_TEMPLATES = ('index', 'archives', 'tags',)

# path-specific metadata
EXTRA_PATH_METADATA = {
    'extras/old.html': {'path': 'old.html'},
    'extras/touch-icon-114×114.png': {'path': 'touch-icon-114×114.png'},
    'extras/touch-icon-72×72.png': {'path': 'touch-icon-72×72.png'},
    'extras/touch-icon-iphone.png': {'path': 'touch-icon-iphone.png'},
    'extras/favicon.ico': {'path': 'favicon.ico'},
    'extras/robots.txt': {'path': 'robots.txt'},
    }

STATIC_PATHS = [
    'extras',
    ]

PLUGIN_PATH = 'plugins'
PLUGINS = ['sitemap']
