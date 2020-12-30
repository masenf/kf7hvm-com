---
layout: post
title: ham2mon scanner down for a few weeks
---

I've been having a lot of fun with the SDR scanner and ham2mon-gui interface for playing back
the recorded calls. However, in the last week, there have problems keeping the calls flowing,
causing the interface to be hours or days behind.

The current calls will remain up, as long as that is feasible, but I need to make some
updates to the backend in order to improve reliability.

I'm currently listening to RF and recording audio on a more powerful machine, watching the output
directory with inotify, and rsync'ing the files to a Rock64. On the Rock64 I'm watching the input
directory with chokidar, getting wav file information, moving the call files into an archive
directory structure and finally adding the info to a sqlite database.

There are a lot of moving parts which can be disrupted. Additionally, I have zero monitoring
on this project as it is 100% in the hobby status.

So, in order to make the scanner more robust, the following improvements are planned:

* Host the web interface on DigitalOcean with a strong internet connection and more reliable
  hardware
* Update the web interface server to also accept call audio data via POST requests (from the scanner)
* Update the ham2mon python scripts to queue the calls for upload the moment
  the carrier drops.
* Use a simple message queue on the radio side to check files before uploading and
  to ensure no calls are lost if the remote server is not available.
  
This should remove 2 of the most finicky parts: watching the filesystem on 2 different machines.
