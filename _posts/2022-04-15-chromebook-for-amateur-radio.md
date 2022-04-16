---
title: Chromebook for Amateur Radio?
layout: post
---

Sure! Why not? After hearing about [a fellow
ham](https://kc7mm.com/wiki/doku.php)'s recent experience installing
[GalliumOS](https://galliumos.org/) Linux on a chromebook, I decided to take
the plunge myself since I need multiple low-cost, low-power nodes for [packet
radio](/info/packet/) and [APRS](https://www.nwaprs.info/) use and the Raspberry
Pi is currently in low supply and expensive. Plus the built in screen,
keyboard, mouse and battery is hard to beat for monitoring, troubleshooting and
tweaking settings at the repeater site.

# Lenovo N23

<a href="/images/lenovo-n23.jpg"><img style="float: left; padding: 5px" src="/images/lenovo-n23_tn.png"></a>

I went chromebook shopping online one night when I couldn't sleep and picked up
a pair of refurbished [Lenovo N23
Chromebooks](https://www.lenovo.com/il/en/laptops/lenovo/student-chromebooks/N23-Chromebook/p/88ELC1S0873)
for $48 each, which arrived at my door within 3 days. This model is from 2016
and features a dual-core Intel Celeron Braswell clocked at 1.6GHz, 4GB of RAM,
and a 16GB eMMC storage module. Not too shabby, but I'd be more comfortable
with 32GB disk (haven't checked if it is easily accessible or replaceable).

## Unlocking the Chromebook

Some older models may require the removal of a physical write-protect screw
inside the case, but thankfully the N23 from 2016 can be configured for
use with Linux in a much simpler way.

* [Turn on Developer Mode](https://www.xda-developers.com/how-to-turn-on-chrome-os-developer-mode/)
* [Enable Boot from USB](https://chromeready.com/7065/boot-from-a-bootable-usb-drive-on-chromebook/)
* open Crosh (CTRL-ALT-T): `shell`; `sudo bash`; `enable_dev_usb_boot`
* Install [MrChromebox.tech](https://mrchromebox.tech/#fwscript) firmware
* **That's it**, then it just boots x86\_64 UEFI installation media from USB or SD Card

# Linux Distros

Since my purposes revolve around Packet Radio applications, my criteria
for stability is generally going to be lower, however _at a minimum, I should be
able to open a browser and watch a youtube video._ Operating AX.25 requires much
less resources than that.

I will be installing each operating system in its vanilla configuration, opting
out of extended packages such as office suite.

Primarily I will be observing the following characteristics of each tested operating system:

* **kernel version**
* **installed size** - using the default configuration how much free space is
  available on disk after the install
* **running processes / load average** - after the system has been running idle
  for 10 minutes, what is the load and how many background processes are
  running
* **driver support:** (webcammictest.com)
  * audio, headphone/mic jack
  * camera
  * HDMI
  * Wifi
  * bluetooth
  * Sleep/Resume
  * keyboard or trackpad issues
* **5th boot time** - after the system is upgraded and settled, how long to boot from cold?
* youtube works?
* ax.25 packet works?
* initial impression
* what issues had to be resolved?

## Debian 11 Bullseye (Aug 2021)

Debian is my favorite linux distro, so I tried it first...but my initial disk
image didn't work because the Lenovo N23 depends on [non-free firmware
blob](https://wiki.debian.org/Firmware) for wifi. So I downloaded the **Unofficial
CD/DVD image with non-free firmware included**.

Installation proceeded without a hitch. Installed size was around 5GB. I didn't continue
testing because audio was broken initially and attempts to fix it were not successful.

## GalliumOS 3.1 (Dec 2019)

_[Note: tried on 01]_

[Gallium](https://galliumos.org/) is an Ubuntu-derived purpose-built
distribution _specifically for chromebook compatibility_. Unfortunately the
project appears to be dead as the last release was based on Ubuntu 18.04
(Bionic) and the refresh effort (GalliumOS 4) was unable to rebase on 20.04,
and now 22.04 is coming out in a few weeks.

* Kernel: 4.16.18
* Installed Size: 3.9GB - the lightest tested
* Running processes: 150 / LA 0.15 / 2.8GB Free
* **driver support:**
  * audio, headphone/mic jack:
    * Builtin Speakers: Yes
    * Builtin Mic: No
    * Headphones: Yes
    * Headset Mic: Extremely bad quality
    * USB Speakers/Mic: Yes
  * camera: Yes
  * HDMI: Yes (No Audio)
    * Cursor flickers a bit on both panels
  * Wifi: Yes
  * bluetooth: Yes (rfcomm)
  * Sleep/Resume: Yes
  * keyboard or trackpad: No issue
* **5th boot time**: 27 seconds
* youtube works?
  * Yes, no problems! LA 3.3 while playing
* ax.25 packet works?
  * Yes
* initial impression: lightweight, quick boot up, good hardware support compared to debian
* what issues had to be resolved?
  * During install, do NOT connect wifi, do NOT install updates
  * After first boot, sudo apt-get update && sudo apt-get upgrade

## Ubuntu 22.04 (Beta Apr 2022)

_[Note: tried on 02]_

The [latest Ubuntu](https://releases.ubuntu.com/22.04/) uses Gnome Shell by
default and is surprisingly quick feeling. I haven't ran Ubuntu as my primary
OS for several years (preferring Debian), but I was impressed by how slick and
polished everything looks, particularly for a beta.

* Kernel: 5.15
* Installed Size: 7.5GB - over half the disk! 5.7G free on /
* Running processes: 200 / LA 0.16 / 2.4GB Free
* **driver support:**
  * audio, headphone/mic jack:
    * Builtin Speakers: Yes
    * Builtin Mic: No
    * Headphones: Yes
    * Headset Mic: Yes
    * USB Speakers/Mic: Yes
  * camera: Yes
  * HDMI: Yes
    * plugged in and my XWayland session froze and logged me out, then it worked fine
    * audio sort of works... i repro'd a loud annoying sine wave that can't be muted and goes away
      with a reboot twice when messing with HDMI. Thankfully not something I plan to use with these.
  * Wifi: Yes
  * bluetooth: Yes (rfcomm)
  * Sleep/Resume: Yes
  * keyboard or trackpad: No issue
* **5th boot time**: 37 seconds (10s slower than Gallium)
* youtube works?
  * Yes, no problems!
* ax.25 packet works?
  * Yes
* initial impression: polished and smooth, modern
* what issues had to be resolved?
  * None

## Linux Mint 20.3 (January 2022)

_[Note: tried on 01]_

The [latest Mint uses Cinnamin by
default](https://linuxmint.com/edition.php?id=292). This is my first time
running Linux Mint and it appears to be based on Ubuntu 20.04.

* Kernel: 5.4
* Installed Size: 8.1GB - over half the disk! 5.2G free on /
  * includes more packages in the default installation that ubuntu or gallium
* Running processes: 172 / LA 0.15 / 2.5GB Free
* **driver support:**
  * audio, headphone/mic jack:
    * Builtin Speakers: NO
    * Builtin Mic: NO
    * Headphones: NO
    * Headset Mic: NO
    * USB Speakers/Mic: Yes, but quality is questionable
  * camera: Yes
  * HDMI: Yes
    * audio over HDMI works great
    * extends desktop by default
  * Wifi: Yes
  * bluetooth: Sort of -- can pair, but rfcomm doesn't work for bluetooth TNC
  * Sleep/Resume: Yes
  * keyboard or trackpad: No issues
* **5th boot time**: 43 seconds (15s slower than Gallium)
* youtube works?
  * Yes; LA 2.2 while watching on external monitor
* ax.25 packet works?
  * Not tested (but probably), couldn't connect bluetooth
* initial impression: would reconsider Mint after rebases on 22.04 LTS
  as it stands, the audio and bluetooth issues are a non starter
* what issues had to be resolved?
  * None

## Manjaro 21.2.5 KDE Plasma (February 2021)

_[Note: tried on 02]_

The [latest Manjaro uses KDE
Plasma](https://manjaro.org/downloads/official/kde/) [(or
XFCE)](https://manjaro.org/downloads/official/xfce/) by default. I prefer
Manjaro on ARM based low-spec systems, so I'm curious to see how the x86
Celeron compares with the Pinebook Pro. Unfortunately suspend / resume
and small disk size make KDE distribution unusable. Save Manjaro XFCE for
another day.

* Kernel: 5.15.28
* Installed Size: 11GB - over 75% the disk! < 3GB free on /
* Running processes: TBD / LA / Free
* **driver support:**
  * audio, headphone/mic jack:
    * Builtin Speakers: Yes
    * Builtin Mic: No
    * Headphones: Yes
    * Headset Mic: Yes
    * USB Speakers/Mic: Yes
  * camera: Yes
  * HDMI: Yes
    * minor video corruption, eventually went away.
    * audio works
    * hot un-plug works
    * extends desktop by default
  * Wifi: Yes
  * bluetooth: Yes
  * Sleep/Resume: No, doesn't wake up
    * Might have slept at an inopportune time... didn't reboot afterwards either, kernel was hosed
    * Reinstalled the system again, tried suspend/resume, also crashed.
  * keyboard or trackpad: no issue
* **5th boot time**: XX seconds (10s slower than Gallium)
* youtube works?
  * Yes
* ax.25 packet works?
  * Unknown
* initial impression: a big sluggish, but software is very up to date
* what issues had to be resolved?
  * Installer failed after wiping out my partitions. Had to reboot, didn't connect wifi, then it worked.
  * Base install is too large, not enough headroom on the partition

## Xubuntu 22.04 (Beta Apr 2022)

_[Note: tried on 01]_

The [latest Xubuntu](https://cdimage.ubuntu.com/xubuntu/releases/22.04/beta/)
uses XFCE 4.16 by default. Typically I would reach for Xubuntu for a resource
constrained system, but booting up into the live environment shows that the
experience is not polished like Ubuntu 22.04 Beta. Probably some of the issues
around the trackpad being unresponsive will be worked out before the 22.04.1
release.

**I found this one to be unusable on my hardware.**

* Kernel: 5.15
* keyboard or trackpad: Trackpad is "janky": doesn't respond to small motions, is slow to start and
  often moves too far after stopping. Maybe remove the symantec input driver? Need to try that.
* initial impression: needs work, slow
* what issues had to be resolved?
  * Trackpad issue, unknown workaround

I didn't test this one extensively because it was painful to use.

## Winner

For now, **the clear winner is Ubuntu 22.04 Beta**. I'll be installing that on
both chromebooks and continuing to prototype my "packet-server-in-a-box"
ansible playbooks to construct a functional ax25 environment from a yaml
definition.
