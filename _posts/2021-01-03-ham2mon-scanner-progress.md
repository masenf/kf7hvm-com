---
layout: post
title: ham2mon scanner progress
---

### Scanner is [back online](https://scanner.kf7hvm.com) at a new URL: [scanner.kf7hvm.com](https://scanner.kf7hvm.com)

In the [last post](/2020/12/30/ham2mon-scanner-down-for-a-few-weeks) on this topic, the
ham2mon scanner was not syncing the latest calls, so I've done some work to make call
syncing and hosting more robust. The new scanner retains the call history of the previous and
the last 3 days of calls were preserved!

# Host the web interface on DigitalOcean

✅ Using the basic $5 droplet plan, the ham2mon-gui web interface is now hosted in San Francisco SFO2
datacenter. The deployment is automated using ansible and should be able to scale reasonably
well when new servers are needed.

Hosting the files in the cloud will also support a larger number of users and be a bit safer
than hosting from my home internet connection.

# Improve `rsync`

I'm still using `rsync` and `inotify` to push the files from the radio to the cloud server with 
one key difference: after a successful transfer, the file is moved to an archive directory.
This keeps the ham2mon radio output directory fairly empty. Additionally, any files remaining
in the radio output directory are quite likely to not have been transferred (because the target is
down or various reasons), so it's easy to see how many calls were "missed" and also sync them manually.

# Still TODO (maybe)

* Update the web interface server to also accept call audio data via POST requests (from the scanner)
* Update the ham2mon python scripts to queue the calls for upload the moment
  the carrier drops.
* Use a simple message queue on the radio side to check files before uploading and
  to ensure no calls are lost if the remote server is not available.
* Better monitoring and alerting

After reflecting on these items, it didn't make sense to implement at this point. Contrary to my earlier
belief, rsync was reliable enough. The sync lag resulted from delays in watching such a large directory
(40K+ calls) causing the same files to be copied and processed over and over again. ham2mon-gui could
not process the calls fast enough to catch up to the present because it was reprocessing
old calls repeatedly.

Moving calls to an archive directory on the radio side seems to be a poor man's solution to bullet 2
and 3, since the "queue" is just the incoming directory, and the latency for scanning the directory is
reduced.

# Still TODO (definitely)

There are still some tweaks to be made:

* Audio levels are still off. Consider some sort of level normalization as a processing step.
* SDR is highly affected by desensing; this wreaks havoc when transmitting from home, especially
  on high power. Probably need to relocate the receiver to address this.
* Clean up ham2mon-gui UI: move date range pickers and frequency box above the calls instead of in the menu section
* Redirect sdrock.0x26.net:8080 to the new URL to avoid broken links
