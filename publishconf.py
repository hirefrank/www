#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

# This file is only used if you use `make publish` or
# explicitly specify it as your config file.

import os
import sys
sys.path.append(os.curdir)
from pelicanconf import *
import hashlib

#RELATIVE_URLS = False
SEARCH = False

MD5_CSS_FILE = hashlib.md5(open (THEME + '/static/css/' + CSS_FILE).read()).hexdigest()
CSS_FILE = MD5_CSS_FILE + ".css"

# Following items are often useful when publishing
PLUGINS = ['sitemap', 'minify']
