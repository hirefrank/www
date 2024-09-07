---
title: "You Can Do Hard Things: Hardening Your VPS"
tags: post
---


You don’t need to deadlift 100kg or race a car to climb the mountain. Just a little determination and curiosity.

Running your own server can seem intimidating, but it doesn’t have to be. With powerful, affordable VPS options and tools like [Kamal](https://kamal-deploy.org/) to streamline deployments, you’re more than halfway there. The missing piece? A simple, effective guide to harden your VPS and make it secure.

> Just like my toddler’s preschool mantra of ‘You can do hard things,’ securing your VPS may seem tough at first — but with the right guide, you’ll find it’s something you can tackle, no problem.

Why now?
========

Recent discussions led by [DHH](https://medium.com/u/54bcbf647830?source=post_page-----e838af7dc3c9--------------------------------) and [levels.io](https://medium.com/u/75452cb7f664?source=post_page-----e838af7dc3c9--------------------------------) on how modern servers can handle substantial traffic made me think: Why aren’t more people running their own secure servers?

I spent some time researching and brainstorming with Claude, and in no time, I had a practical guide that anyone can follow without feeling overwhelmed.

Securing your VPS might seem like one of those ‘I can’t do it’ moments — but remember, just like with learning any skill, it’s only a ‘yet.’ This guide will get you there, one step at a time.

What it does?
=============

So, what does this guide help you achieve? In less than 5 minutes, you’ll take a fresh Ubuntu 24.04 install and turn it into a hardened, secure VPS.

*   **System Updates:** Selects the fastest mirror, ensures the system is up-to-date with the latest security patches, and configures unattended-upgrades for automatic security updates.
*   **Locking Down Your Firewall:** Sets up and configures [UFW](https://en.wikipedia.org/wiki/Uncomplicated_Firewall) (Uncomplicated Firewall) to restrict incoming traffic.
*   **SSH Hardening**: Enhances SSH security by disabling root login, using key-based authentication, and other best practices.
*   **Detecting and Preventing Intrusions:** Installs and configures [Fail2Ban](https://github.com/fail2ban/fail2ban) to protect against brute-force attacks, and [OSSEC](https://www.ossec.net/) to detect and alert on various security events and intrusions.
*   **Keeping an Eye on Logs and Stats:** Implements [Logwatch](https://sourceforge.net/projects/logwatch/) for log analysis and Glances for real-time system monitoring, both with Slack notifications.
*   **Security Auditing:** Installs [Lynis](https://cisofy.com/lynis/) for periodic security audits.
*   **Backups:** Configures [Kopia](https://kopia.io/) for secure, encrypted backups to [Backblaze](https://www.backblaze.com/).

[

GitHub - hirefrank/vps-ubuntu-hardening
---------------------------------------

### Contribute to hirefrank/vps-ubuntu-hardening development by creating an account on GitHub.

github.com

](https://github.com/hirefrank/vps-ubuntu-hardening?source=post_page-----e838af7dc3c9--------------------------------)

Prerequisites
=============

*   A VPS running a fresh install of Ubuntu Minimal 24.04 LTS (full version should work too); **Tip:** [I found Netcup’s Root Servers to be the best value](https://www.netcup.com/en/server/root-server?ref=244817)
*   Root or sudo access to the server
*   A Slack workspace (for server notifications)
*   A Blackblaze account with [B2 App Key](https://www.backblaze.com/docs/cloud-storage-create-and-manage-app-keys) — First 10GB storage is always free. (Any S3-compatible storage should work with minor modifications to the script)

Quick Start
===========

Here’s the basic flow for setting up your hardened VPS:

*   Generate SSH keys
*   Set up a Slack webhook for notifications
*   Clone the repo and configure settings
*   Run the hardening script

Now, let’s dive into the details:
---------------------------------

⚠️ The hardening script will disable password authentication for SSH, so it’s essential to set up key-based authentication before running the script.

Continue to Step #2 if your server is already setup for key-based authentication.

1.  Generate an SSH key pair on your local machine: (skip this step

```
ssh-keygen -t ed255519 -C "your\_email@example.com"
```

Copy it your server:

```
ssh-copy-id user@your\_server\_ip
```

Test the SSH key authentication:

```
ssh user@your\_server\_ip
```

_Replace ‘user’ with your username and ‘your\_server\_ip’ with your server’s IP address._

2\. Create a Slack webhook URL to relay server notifications to your

*   Open Slack and select the “Automations” tool for your workspace.
*   Create a new workflow and select “From a web hook” as the event to start a workflow.
*   Select “Set Up Variables” and create a key named “text” for Data type “text”.
*   Select “Continue” and then select pencil icon to edit the “Starts with a webhook” event.
*   Copy the link for the Web request URL and select “Cancel”. You’ll need the URL for the script settings in Step #4.
*   Select “Messages” and then “Send a message to a channel”. Select the channel you want to send notifications to and then select “Insert a variable” and choose “text” under “From a webhook” subheading. Save the step.
*   Select “Finish Up” to publish the workflow. Once completed it should look like this:

It took longer to write all the of the steps that create the workflow. Promise!

3\. Clone this repository:

```
git clone https://github.com/hirefrank/vps-ubuntu-hardening.git
cd vps-ubuntu-hardening
```

4\. Copy the configuration template and edit it with your settings:

```
cp vps\_config.template vps\_config.env
nano vps\_config.env
```

5\. Run the script:

```
sudo ./configure.sh
```

This script significantly enhances your VPS security, but remember that security is an ongoing process. Stay informed about the latest security practices and keep your system updated.

What next?
==========

[The source code is on GitHub.](https://github.com/hirefrank/vps-ubuntu-hardening) It’s open source, so feel free to fork it, share it, or submit a PR. Make it better!