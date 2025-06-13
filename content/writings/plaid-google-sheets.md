---
title: 'Plaid + Google Sheets'
summary:
  'Automates the process of fetching transaction data and maintaining a record
  in a Google Sheet.'
date: 2018-03-01
emoji: 🏦
---

This project automates the process of fetching your up-to-date transaction data
from Plaid and maintaining a tidy record of it in a Google Sheet, saving you the
hassle of manually tracking your finances across different accounts. Plaid
connects to your bank accounts and provides your transaction history in a
convenient format.

The program runs daily and fetches your transactions from the past 6 days. This
accounts for any pending transactions that may take a few days to fully process.

It then takes this transaction data from Plaid and neatly records it in a Google
Sheet. Each row represents one transaction, with details like the date,
description, amount, category, and account.

To avoid duplicates, the program keeps track of transactions already recorded in
the sheet and only adds new ones. It also removes any transactions that were
previously pending but didn't go through.

[Code on GitHub](https://github.com/hirefrank/plaid-txns-google-sheets/)
