---
layout: post
title: September 2021 Station Update
---

Unlike summer 2020, I found significantly less time for radio projects this
year. Between mentoring a team of interns at my day job and twice as many
weddings as usual, I rarely had time for more than Monday net control and
occasional check ins.

But with autumn on the horizon, I'm jumping back into some old and new projects
that I'm excited to share.

# `pnwho.net`

A distributed system for working with [PNWDigital.net](http://pnwdigital.net)
CallWatch:

  * daemon for [ingesting live callwatch](https://github.com/mycodeplug/callwatch-ingest)
    data into a postgres database
  * public [`pnwusers`](https://github.com/mycodeplug/pnwusers) repo is automatically
    updated each day with _active_ DMR users seen on the PNWDigital network (~9k)
  * API server and web app, "QSO Watch" for showing who talks to who
    over a longer period of time (currently private alpha)

There's still a lot more work to be done here, and I'm not sure it will ever be
released. Last summer, I got kind of stuck working on the persistence layer
because it required changes across the code base, but also killed performance
and wasn't fun to work on.

# VHF Packet

The [W7DG-5](https://aprs.fi/info/a/W7DG-5) high level digipeater and igate had
been offline since October 2020 after the Raspberry Pi 2 hosting it ended up
with a fried USB controller. Last month, I finally got around to replacing it with an
Raspberry Pi 4 (8GB) running raspbian OS, direwolf software model, and YAAC
(APRS client).

The new interim station still needs work, but it's now providing 2-way internet
connectivity to local stations over RF and operating in both autonomous and
manual mode.

Remaining improvements:
  * New antenna, relocate station and clean up wire mess
  * 12v/5v converter for backup power
  * Separate user accounts for W7DG and N7DEM to operate independently with same RF link
  * Operator guide
  * Link WX station via RF

## Home packet station

Packet is infectious, so I've also been working on my own personal home
station. After fighting against my Yaesu FTM-400 with 10-pin connector,
I realized it made way more sense to move the Yaesu with builtin TNC+GPS
into the mobile station (KF7HVM-5) and bring the Kenwood TM-V71A into the
shack (KF7HVM-1).

I'm running the station from a single board computer I had laying around,
the [rock64](https://pine64.com/product/rock64-4gb-single-board-computer/),
using the standard Kenwood OEM cable kit and a cheap USB sound card. So
far there are a few problems:

  * rock64 is not binary compatible with raspi, so I have to compile many
    packages myself (thanks docker build environments!)
  * The Kenwood OEM Echolink cable only handles Audio In/Out, relying on the
    serial connection for PTT. While hamlib supports this rig, there is no CAT
    command I've found to key the data side only and revert to the previously
    active control side. **Worse than that**, keying with CAT control doesn't open
    the data line, but rather the microphone, so it's really not usable at all.
  * Kenwood's recommended approach is to put the radio into "Echolink Sysop Mode"
    by holding `[PF2]` while powering on. This has its own problems: 1) CAT
    control doesn't work in this mode, so no remote control and 2)
    Audio output is always controlled by channel squelch, so using Voice
    Alert (PL 100Hz) is broken.

I'm still happy with the radio for packet use and will solve all of these
problems by building a custom 6-pin data cable that breaks out the PTT and
COS pins for attachment to GPIO of a Raspberry Pi Zero.

The complete setup with pictures will be posted after I finish the next
iteration.

# SDR Scanner

After being down for about 4 months (and Rick continuing to advertise it),
I finally got a day to get my original RTL-SDR scanner back online at
[https://scanner.kf7hvm.com](https://scanner.kf7hmv.com) and functional.

There are three main issues that still need to be solved to optimize the
scanner:

  * Two colocated receivers that can be toggled at 50% duty cycle to
    avoid thermal issues that reduce performance. After running for 1
    week straight, the signal becomes degraded to the point that
    ham2mon can't reliable decode the FM signal.
  * Increase audio level without distortion - partly due to thermal
    issues, partly additional tweaks are needed in ham2mon, partly
    these cheap SDRs just leave something to be desired.
  * Reduce CPU load at capture point. Currently I'm spinning the
    CPU between 200-300% on a multicore desktop workstation with
    32GB of RAM to decode 4 concurrent FM signals from 1 MHz of
    spectrum and while it _could_ handle more, I suspect the constant
    load is not ideal.
    * Current plan is to investigate sending raw IF to cloud servers
      for decoding, or leverage USB over IP to virtually bring the SDR
      into the data center.

In the short term, I expect to solve the 2 receivers tradeoff problem in
the next week!

# Closing

Updating this blog has been overdue and I'm definitely happpy to be back to
tinkering with radios again.  While none of this work seemed to warrant its own
post (yet), it is starting to pile up, so I wanted to at least get a status
update out. 73.
