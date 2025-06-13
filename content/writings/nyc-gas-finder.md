---
title: 'NYC Gas Finder'
summary:
  'A real-time Twitterbot providing updates on gas stations serving fuel
  following Hurricane Sandy.'
date: 2014-06-04
emoji: ⛽
---

NYC Gas Finder is a real-time application that I created to provide updates on
gas stations serving fuel in the New York City area, based on transaction data.
I developed this project (@hirefrank) in response to the gas shortage following
Hurricane Sandy in 2012.

The project consists of multiple Twitter bots (@nycgasfinder, @njgasfinder,
@bronxgasfinder, etc.) that I built to tweet the locations of gas stations
within a specified radius of different zip codes in NYC, New Jersey, and Long
Island.

The application scrapes data from WEX (formerly Wright Express), a payment
solutions provider, using BeautifulSoup for HTML parsing. I integrated the
Tweepy Twitter API library to post updates to the respective Twitter accounts.

[Code on GitHub](https://github.com/hirefrank/nycgasfinder)
