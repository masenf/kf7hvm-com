---
layout: page
title: AX.25 Packet Radio
---

Packet radio on VHF (AX.25) is largely the same today as it was in the 1980s,
but with ubiquitous, small form-factor computing cheaply available, the
possibilities for deploying packet equipment are more _flexible_ and _inexpensive_
than they've ever been.

View the [📼 video introduction](https://www.youtube.com/watch?v=AonilN0h2xA) presented by
KF7HVM at LCARA presentation night Feb 2022.

# Radio

The radio makes up the **physical** layer of the stack and there are hundreds
of variations possible. Typically I recommend using whatever gear is available
at hand, or cheaply.

If one is intent on buying new equipment, I recommend the following:

  * [Alinco DR-135T](http://www.alinco.com/Products/ham/mbl/DR-135/)
    * The standard DB9 (RS232) connector exposes 1200/9600 baud audio, PTT, and COS at the back of the radio
      making this model very easy to interface with a variety of equipment.
  * [Kenwood TM-V71a](https://www.kenwood.com/usa/com/amateur/tm-v71a/)
    * The standard 6-pin DIN connector exposes 1200/9600 baud audio, PTT, and COS using a cable and pinout
      that is extremely common and interoperable.
  * [HG-98UV](https://www.venus-itech.com/product/hg-uv98-handheld-with-aprs/)
    * An inexpensive handheld with APRS, GPS, and Bluetooth KISS functinoality.
      Still need to determine if connected mode packet is possible with this
      unit, but certainly APRS is working. Also supports custom firmware, so
      capabilities missing today may arrive tomorrow.

When selecting a radio for packet use, **prefer a dedicated DATA port** 👈:
  * typically exposes **_discriminator_** audio [without
    de-emphasis](http://www.repeater-builder.com/tech-info/flat-audio.html) and
    regardless of squelch state (needed for 9600 baud)
  * typically exposes COS (squelch detect) which is important when acting as a
    packet server
  * allows the use of the MIC and speaker on the radio for increased operating
    flexibility

# Interface

The interface provides a bridge between the computer and the radio. In the
past, the interface was often a "full TNC" which performed packet↔audio
encode/decode (modem) and provided a serial interface to the PC. More modern
configurations use a software modem, like direwolf, coupled with a commodity
soundcard.

There are three types of interfaces used in my station:

  * USB Soundcard + On-board GPIO: Cheap and easy solution for single board computers such as Raspberry Pi.
    * Use a [~$5
      soundcard](https://www.newegg.com/p/23H-00AN-00008?Description=sound%20card%20usb&cm_re=sound_card%20usb-_-9SIAGFY94V1246-_-Product)
      from your favorite electronics retailer.
    * Use 2 pins from the GPIO header to provide PTT and ground (use a third for COS if desired)
    * Create a custom cable (see below) that integrates audio and PTT for the target radio.
  * [DRA-34](http://masterscommunications.com/products/radio-adapter/dra/dra34.html): Assembled and tested $69
    * Provides a fully integrated soundcard + PTT (supported by direwolf)
    * Exposes an RJ-45 interface with (RX, TX, PTT). Very easy to terminate RJ-45 with the correct tools
    * Create a custom cable that converts from the radio's native DATA port to the standard RJ-45 pinout
  * [Signalink USB](https://www.tigertronics.com/slusbmain.htm): Device with cable kit ~$150
    * Most expensive option, but fully plug and play due to integrated VOX circuit.
    * Extensive pre-fab cable collection if you don't want to make your own.

## [The Cable](/info/packet/cables)

<img style="float: right; padding: 10px; max-width: 200px" src="/images/packet/rj45.png">

Out of
[TRRS](https://en.wikipedia.org/wiki/File:TRRS_3.5mm_-_2_length_variants.jpg),
[6-pin miniDIN](https://commons.wikimedia.org/wiki/File:MiniDIN-6_Connector_Pinout.svg),
and [DE-9](https://commons.wikimedia.org/wiki/File:9_pin_d-sub_connector_male_closeup.jpg),
I've found [**8P8C Modular Connector**](https://en.wikipedia.org/wiki/Modular_connector#8P8C)
("RJ-45") ends are the simplest to construct, cheapest, and most universal
connector for TNCs. Buying a [modular connector crimp
tool](https://en.wikipedia.org/wiki/Modular_connector#Termination) to build TNC
interface cables is a good investment for such common connectors. Other special
ends can be purchased as pre-made cables and adapters can be paired with simple
[RJ-45 couplers](https://www.newegg.com/p/36M-01FW-00001?Description=rj45%20coupler&cm_re=rj45_coupler-_-36M-01FW-00001-_-Product).

## See [TNC Cables](/info/packet/cables) for detailed information

# Client Software

## [direwolf](https://github.com/wb2osz/direwolf#dire-wolf) - Modem

Cross-platform AX.25 "soundcard" modem. Basic TNC features include digipeater,
beaconing, and APRS-IS capabilities.

## [YAAC](https://www.ka2ddo.org/ka2ddo/YAAC.html) - APRS

Cross-platform feature-rich [APRS](http://www.aprs.org/) client with offline
mapping.

_Windows Installation Note_: use Java 11, create shortcut: `java -jar C:\Users\Ham\Downloads\YAAC\YAAC.jar`.

## [pat](https://getpat.io/) - Winlink

Cross-platform open-source [Winlink](https://www.winlink.org/) client,
supporting forms and peer-to-peer messaging.

# PC Hardware


<a href="/info/packet/pi4-setup">
<img style="float: right" src="/images/raspberrypi4_tn.png">
</a> Current recommendation is [Raspberry Pi 3B or 4B](https://www.raspberrypi.org/) or
[refurbished chromebook](/2022/04/15/chromebook-for-amateur-radio/).

[Raspberry Pi (any) Setup Guide 2022-04-06](/info/packet/pi4-setup)
