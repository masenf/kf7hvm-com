---
layout: page
title: TYT (Tytera) Radio Info
permalink: /info/tyt/
---

[TYT (Tytera)](https://www.tyt888.com/) is a chinese manufacturer of commercial
and amateur radios. These radios are popular due to their relatively low cost
and versatility.

# Info and Stock Software

This page will focus on using the following models for Ham radio applications,
particularly on the Brandmeister and PNWDigital DMR networks:

  * **TYT MD-380**: Monoband DMR Handheld available in VHF and UHF variants.
    * [Stock manual](http://www.rigreference.com/documents/rr-5ecd84ba3b2b01.74142421)
    * Support [custom firmware](http://md380.org/)
      * Contact database
      * Last heard
      * Promiscuous Mode
    * [After market manual](http://arec.info/DMR-downloads/MD380-user-guide.pdf)
    * Stock CPS: 2020-05-08 [firmware D15.01 for MD-380 new vocode](https://www.tyt888.com/uploadfile/upfiles/20200506083948.zip)
    * Limits:
      * 1000 Channels
      * 10,000 Contacts
      * 250 Scan lists (of 32 channels each)
      * 250 Zones (of 16 channels each)
  * **TYT MD-390**
    * Same as above, but with built in GPS
  * **TYT MD-UV380**: Dualband VHF+UHF DMR Handheld
    * [Stock manual](https://md-uv380.s3.amazonaws.com/TYT%20MD-UV380%20User%20Manual.pdf)
    * Stock firmware now supports digital contact database and monitor
      * No custom firmware support at all
    * Stock CPS: 2020-03-16 [MD-UV380, MD-UV390 firmware](https://www.tyt888.com/uploadfile/upfiles/20200316105738.zip)
    * Stock MD-UV380 Firmware 2019-11-20 [MD-UV380, MD-UV390 firmware](https://www.tyt888.com/uploadfile/upfiles/20191120100323.zip)
    * Limits:
      * 3000 Channels
      * 10,000 Contacts (or 120K with ContactListCSV firmware)
      * 250 Scan lists (of 64 channels each)
      * 250 Zones (of 64 channels each)
  * **TYT MD-UV390**
    * Same as above, but with built in GPS

# Additional Software

## USB Driver (Windows)

Windows may require the [STM32 DFU driver](https://www.st.com/en/development-tools/stsw-stm32080.html) (requires an email address to download the package) [direct link](https://www.st.com/content/ccc/resource/technical/software/demo_and_example/93/55/e0/89/d1/e3/40/d5/stsw-stm32080.zip/files/stsw-stm32080.zip/jcr:content/translations/en.stsw-stm32080.zip) - may not work, try entering an email address.

**NOTE:** The TYT radios use a "dumb" passthrough cable. It will not appear as
a USB device unless it is plugged into the radio and turned ON.

Note: Linux USB works without any special driver.

## Farnsworth `editcp` (Windows/Linux)

Highly recommend the aftermarket CPS
[`editcp`](https://www.farnsworth.org/dale/codeplug/editcp/) by Dale Farnsworth
which supports all 380/390 variants and allows for conversion between the
different radios.

Additionally `editcp` runs on windows and linux and supports JSON
import/export for interfacing with scripts
and codeplug generators such as [`dzcb`](https://github.com/masenf/dzcb).

`editcp` is capable of reading and writing the codeplug and contact database
over USB, so the official CPS is not required.

## N0GSG Contact Manager (Windows)

[N0GSG DMR Contact Manager](http://n0gsg.com/contact-manager/) supports a
variety of radio codeplug formats. It is primarily used to download, filter,
and reformat the DMR contact database to match the size and format appropriate
for your radio.

For TYT radios the contact limit is either 10K or 120K (for UV380/UV390 with
CSV firmware).

The tool can also be used to cobble codeplugs together from different types
of radios. Since it can read and write native codeplug formats, it doesn't
require the use the spreadsheets or CSV munging.

# Codeplug Layout

## Contacts and Group (RX) Lists

Contacts map a DMR ID to a Name.

### Talkgroups

a "Talkgroup" is a way of routing and filtering traffic. A "Group Call" contact
should be added to the "Digital Contact" list for each talkgroup the radio
will receive or transmit on.

### Group List

Also known as RX lists. A group list defines a set of Group Call contacts
that can all be received on a given channel. A common use for Group List is
to monitor _other_ static talkgroups on a particular repeater timeslot to
avoid interrupting other traffic on the timeslot that may be coming from a
different talkgroup.

### Private Call

Private call is typically only used for mapping callsigns and names to 
IDs. Recommend the use of N0GSG contact manager to automatically import
the DMR contact database.

On the UV380 "ContactsCSV" firmware, the DMR contact database is managed
separately, and Private Call contacts are not used.

## Channels

A channel is either Analog or Digital mode.

* **Channel Name**: 16 character channel name. Doesn't have to be unique,
  but recommended for your sanity. For digital repeaters, the name
  typically includes the talkgroup, timeslot, and shortened repeater name/code.
* **Admit Criteria**: when the radio allows transmit
  * **Always**: "impolite" mode. OK for analog, but not advised for digital.
  * **Channel Free**: transmit when no carrier heard on RX frequency
  * **Correct CTCSS/CDCSS**: transmit when the received signal does not
    match the configured TX tone (analog only)
  * **Color Code**: transmit when the received signal does not match the
    configured Color Code (digital only)
* **Band Width**: 12.5, 20, 25 (KHz)
  * Only configurable for Analog channels
  * Most analog repeaters are 25
  * FRS / GMRS / MURS unlicensed frequencies use 12.5 or 20
* **Scan List**: The channel scanlist will be used when the scan feature is
  enabled and this channel is selected.
* RX / TX Ref Frequency: Adjust the radio's internal clock frequency to
  shift interferance from used frequencies to unused frequencies. _This
  setting is almost never used_.
* TOT: Time-Out-Timer. Radio will stop transmitting after the number of
  seconds elapses. I personally use a 90 second TOT, just to avoid
  talking forever. Depending on the channel / repeater a different value
  may be desirable to avoid timing out the repeater.
* TOT Rekey Delay: If the TOT is triggered, the radio will wait for this
  delay before transmitting again.
* **Power**: High / Middle / Low

* **Auto Scan**: the channel enters scan mode when selected
* **Rx Only**: don't allow transmit on this channel. Useful for public
  safety or unlicensed channels.
* Lone Worker: require the user to press a button or enter emergency mode. NOT USED by amateurs.
* VOX: Activate PTT when mic detects audio
* Allow Talkaround: If talkaround is enabled, use RX settings for TX. NOT USED by amateurs.
* Send/Receive GPS Info: For 390 variants, also send GPS data. NOT USED by amateurs.

### Analog

* **Squelch**: appears in the "common" section, but only applies to Analog channels.
Recommend "1".
* **CTCSS/DCS Dec**: Open the squelch for received signals matching this tone
* **CTCSS/DCS Enc**: Include this tone when transmitting
* RX / TX Signalling System: DTMF signalling. NOT USED by amateurs.
* QT Reverse / Non-QT/DQT Turn-off: NOT USED by amateurs.
* Display PTT ID: Leave off. NOT USED by amateurs.

### Digital

* **Contact Name**: The channel transmits on this talkgroup
* **Group List**: The channel receives traffic for all talkgroups in the list.
* **Color Code**: Analogous to CTCSS tone for DMR repeaters. Most use color code 1.
* **Repeater Slot**: The timeslot to transmit / receive on. A channel can
  be on either TS 1 or TS 2. A particular channel will not
  receive traffic from the other slot unless promiscuous mode (MD-380) or
  monitor mode (MD-UV380) is enabled. However a TS 1 channel on "A" band and
  TS 2 channel on "B" band will allow dual timeslot monitoring in normal
  mode.
* In Call Criteria: Determines how the radio responds when currently receiving
  a call on the channel. Typically "Follow Admit Criteria" should be used.

#### Unused commercial settings (LEAVE ALL TURNED OFF)

These settings are for commercial dispatch environments and don't really
make sense for currently deployed Ham infrastructure.

* Private Call Confirmed: Amateurs typically don't use private call
* Emergency Alarm Ack: allow radio to respond to dispatch emergency alert
* Data Call Confirmed: use a reliable data transport. 
* DCDM Switch: Unknown.
* Emergency System: Unused.
* Privacy: Unused. Part 97 doesn't allow for obscured communications in most cases.
* GPS System: Unused.

## Zones

Zones are generally a collection of Digital Channels for a single repeater
or Analog Channels for a particular area (city, county, etc).

Each zone has a name of 16 or fewer characters. On the MD-380/390, a zone contains up
to 16 channels. On the MD-UV380/390, a zone has both an "A" band (top row)
and a "B" band (bottom row) of 64 channels each.

A zone may contain mixed analog and digital channels.

The zone list may be reordered with `editcp` or N0GSG. The stock CPS does not
allow reordering the zone list.

## Scanlists

A scanlist consists of 32 or fewer channels that are scanned together.

Each channel may have a default scanlist set, but any scanlist can
be used with any channel by selecting it from the menu.

A scanlist provides several options to control the scan:

  * Priority Channel 1/2: These channels are checked 50% of the time.
    Even when the radio is receiving traffic from a different scan
    channel, it will still check the priority channels.
  * TX Designated Channel: This channel will be used when PTT is pressed.
    * Selected - the channel selected in the zone
    * Last Active - the last channel to receive traffic
    * Explicitly specify a channel for the list
  * Signalling Hold Time (default 500ms): Controls how long the radio will
    monitor an Analog channel to decode a DTMF sequence. Typically NOT used
    by amateurs.
  * Priority Sample Time (default: 2000ms): How often the radio will check
    the priority channel when the scan is receiving a signal on another
    channel. Lower values will make the received audio choppy. Higher values
    could result in missed calls on the priority channel.

# Other Resources

* [ARRL Ohio](http://arrl-ohio.org/digital/digital.html) has some excellent DMR presentations
  * [MD-380 Codeplug Explained](http://arrl-ohio.org/digital/DMR_CodePlug-101_TYT_20170120.pdf)
  * [Codeplug Programming](http://arrl-ohio.org/digital/Codeplug%20Programming.pptx) - Explaination of all relevant settings
