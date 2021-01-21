---
layout: post
title: dzcb: DMR Zone Channel Builder
---

After 3 months of sporadic development, I'm pleased to announce the public release of my
DMR codeplug generator, [dzcb](https://github.com/mycodeplug/dzcb).

dzcb is designed to remove manual editing steps from DMR codeplug management, preferring to
take channel data from upstream sources such as Repeaterbook.com, PNWDigital.net, and SeattleDMR.org.
If there is a problem with the generated codeplug, the _best_ fix is to correct the data at
the source, such that it benefits the largest number of operators.

dzcb uses Github Actions to create codeplugs in the cloud, so no software needs to be
installed to generate or edit the source files of a codeplug. Users are free to fork
the upstream `mycodeplug/dzcb` repository and make their own modifications, which will
also be built in the cloud. [Here](https://github.com/masenf/kf7hvm-codeplug/releases)
is my personal fork of dzcb that I use to generate codeplugs for my TYT MD-UV380 and
Radioddity OpenGD77.

For more information see:
  * [dzcb README](https://github.com/mycodeplug/dzcb/blob/main/README.md)
  * [kf7hvm codeplug](https://github.com/masenf/kf7hvm-codeplug/tree/main/codeplug/kf7hvm)
