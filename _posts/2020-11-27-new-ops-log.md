---
layout: post
title: new ops log
category: log
---

tl;dr [New Logs are Here](/qso)

After struggling with the free-form QSO logging in 
daily (and then weekly) blog posts which were assembled by hand
from notepads and cell phone memos, text messages and memory,
I've decided to write some code to make it easier to manage my
logging on the go.

I looked at other, off-the-shelf solutions, such as QRZ logbook.
But ultimately they didn't provide the UI that I was looking for:
a nice way to quickly log repeater contacts. I wanted something
that could be operated simply while driving, hiking, etc. Something
that would auto-complete recently used frequencies, locations,
calls, etc. I needed something that would allow me to maintain
ownership of my data, while permitting updates from anywhere I
might be.

The solution that I've [coded up](https://github.com/masenf/kf7hvm-com/tree/master/webpack/components)
in React doesn't quite check all of those boxes, but it's
getting close. I'm avoiding having to run a separate server
by leveraging my existing staticman comment server to also
process my QSO logging form. This directly commits my QSO logs as
[YAML data files in the kf7hvm-com repo](https://github.com/masenf/kf7hvm-com/tree/master/_data/qso).

The autocomplete on my logging form is fed from other QSO entries,
Repeaterbook API, and FCC LicenseView API, which makes it nice to
log on the go from partial information.

Eventually, I'd like to implement a local queueing
mechanism so that I can log on-the-go, even when my internet
connection is unavailable.

Because things are still in flux, I don't consider this to be
the "final writeup" on what I'm doing. There is still some cleanup
and UX testing which needs to be done as well as some spit and
polish, but at this point, I'll no longer be posting "ops log"
weekly entries anymore. Everything will be on `/qso`.