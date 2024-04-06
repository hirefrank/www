---
title: "Zoom Backup"
summary: "Automates the process of backing up recorded Zoom meetings to a Google Cloud Storage bucket."
date: 2021-02-27
emoji: 💾

---

This Go program is a fork on [codegoalie's effort](https://github.com/codegoalie/zoom-backup). It automates the process of backing up recorded Zoom meetings to a Google Cloud Storage bucket. The code fetches a list of recorded meetings from the Zoom API for a specified user over the past month. For each recorded meeting, it downloads the MP4 video files to the designated Google Cloud Storage bucket.

For each recorded meeting, the program iterates through the available recording files and downloads the MP4 video files. It constructs a file name based on the recording start time, type, and file extension. The downloaded files are then written to the specified Google Cloud Storage bucket, with a folder structure based on the meeting date and topic.

After downloading the recordings, the program deletes the meeting recordings from Zoom to free up space.

Finally, the program generates an HTML file listing all the backed-up recordings in the Google Cloud Storage bucket, with links to access each file. This HTML file is also uploaded to the bucket for easy access.

[Code on GitHub](https://github.com/hirefrank/zoom-backup/)
