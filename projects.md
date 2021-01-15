---
layout: page
title: Projects
---

# ham2mon - SDR multisignal scanner

## [**ham2mon-gui demo**](https://scanner.kf7hvm.com) (up as of 2021-01-03)

## blog posts

* [ham2mon on macOS (overview)](/_posts/2020-09-11-ham2mon-multi-channel-scanner.md)
* [ham2mon on rock64](/_posts/2020-09-14-ham2mon-rock64-setup.md)
* [ham2mon scanner progress](/_posts/2021-01-03-ham2mon-scanner-progress.md)

# [`dzcb`](https://github.com/mycodeplug/dzcb/)

Alpha DMR codeplug generator for Farnsworth [EditCp](https://www.farnsworth.org/dale/codeplug/editcp/)
(TYT MD-UV380) and [GB3GF CSV](http://www.gb3gf.co.uk/downloads.html) (OpenGD77).

The codeplug generator downloads data from [PNWDigital.net](http://www.pnwdigital.net),
[SeattleDMR](http://seattledmr.org), and [Repeaterbook](http://www.repeaterbook.com)
to combine into a WA/OR regional codeplug.

The main repo ([`mycodeplug/dzcb`](https://github.com/mycodeplug/dzcb))
builds codeplugs with default settings for the MD-UV380, MD-UV390,
MD380, MD390, and OpenGD77.

My fork of the repo ([`masenf/kf7hvm-codeplug`](https://github.com/masenf/kf7hvm-codeplug/releases))
adds [some additional customizations](https://github.com/masenf/kf7hvm-codeplug/tree/codeplug/kf7hvm):
  * My DMR ID and call are included in the template
  * A list of repeater book locations for analog
  * Custom zone ordering
  * Additional scanlists
  
Anyone can fork [`mycodeplug/dzcb`](https://github.com/mycodeplug/dzcb/),
enable github actions, and build their own customized codeplugs in the cloud.

See project [README.md](https://github.com/mycodeplug/dzcb/#dzcb) for more information.

# Miscellaneous Project Posts

* [kenwood MCP software with wine on macOS](/_posts/2020-09-18-kenwood-software-and-wine.md)

# Upcoming Projects

* simplextest.net - coordinating propagation testing
* qsowatch - a new way of visualizing DMR network traffic
* USB+standalone PTT switch w/ PC data+voice for Yaesu FT-2900
* HF multiband wire dipole
* Roll up J Pole (portable antenna)
* Cell phone autopatch

## [myCodeplug.com](http://mycodeplug.com)

Landing page / planning for my online DMR code plug editor in early development.
