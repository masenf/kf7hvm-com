---
layout: post
title: Longview-centric Frequencies
---

In this post, I share my 2m/70cm frequency and repeater list
which I'm constantly revising and editing. I program these frequencies
into my various radios to achieve somewhat consistent results
regardless of which unit I'm operating.

## Download

_Last updated 2020-09-22_

* [Master list, excel format](../assets/2020_09_22_Longview-centric_Frequencies.xlsx)
  * [CSV export](../assets/2020_09_22_Longview-centric_Frequencies.csv)
* [Baofeng/chirp csv](../assets/2020_09_22_baofeng.csv) (this is only a subset)

## Methodology

* 0: 2m calling frequency
* 1: personal go-to simplex frequency

Then the frequencies are grouped by

* Longview proximity 2m
* 2m simplex
* Longview proximity 70cm
* 70cm simplex
* Couger, WA proximity
* Packwood, WA proximity
* Cannon Beach, OR proximity
* Olympia, WA proximity
* FRS/GMRS
* APRS

This tends to cover the area where I'm primarily operating (home,
mobile, and handheld - hiking, etc).

## Naming

My kenwood radios are limited to 6 characters on the display, so
this presents some interesting challenges.

For 4 letter IDs, I prefer <CALL> <LOCATION>. If there are multiple
repeaters with the same call, I tend to lookup the repeater owner's
website and number the repeaters in the same order listed on their
site.

For 5 letter IDs, I will leave the space out.

For 6 letter IDs with multiple repeater sites, I will truncate the last
letter of the call and replace it with a serial as described above.

In the master version of the spreadsheet, calls highlighted in Yellow
have multiple repeaters in the list.

## Tones

Not all repeaters transmit with the uplink tone, but most do.

Where repeaterbook has explicitly identified a "downlink" town, I'm
using CTCSS / TSQL mode to open the squelch only when the tone is present.

For ambiguous entries, I keep the tone mode to transmit only, sometimes
this will erroneously open the squelch for different, closer repeaters.

Since this list spans multiple geographic areas and contains duplicate
frequencies, occasionally I will identify stations which don't match
their memory name/expected repeater. I tend to turn these to CTCSS
as I find them.

In the master version of the spreadsheet, frequencies highlighted in red
are duplicated within the list and do NOT have the CTCSS mode set. These
red entries may pick up signals transmitted from a different repeater
than expected.

## WiP

This is continually a work in progress. If you have any suggestions or
comments, please reach me via [email](mailto:kf7hvm@0x26.net).
