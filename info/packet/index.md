---
layout: page
title: Packet Radio
---

Packet radio on VHF (AX.25) is largely the same today as it was in the 1980s, but with
ubiquitous, small form-factor computer cheaply available, the possibilities for deploying
packet equipment are more flexible and inexpensive than they've ever been.

View the [video introduction](https://www.youtube.com/watch?v=AonilN0h2xA) presented by
KF7HVM at LCARA presentation night Feb 2022.

# Radio

The radio makes up the physical layer of the stack and there are hundreds of variations
possible. Typically I recommend using whatever gear is available at hand, or cheaply.

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

When selecting a radio for packet use, prefer a dedicated DATA port:
  * typically exposes "discriminator" audio regardless of squelch state
  * typically exposes COS (squelch detect) which is important when acting as a
    packet server
  * allows the use of the MIC and speaker for increased flexibility

# Interface

The interface provides a bridge between the computer and the radio. In the past, the interface
was typically a "full TNC" which performed packet<->audio encode/decode, providing a serial
port interface to the PC. More modern configurations use a software encode/decode, like direwolf,
coupled with a commodity soundcard.

There are three types of interfaces used in my station:

  * Cheap Soundcard + GPIO: Cheap and easy solution for single board computers such as Raspberry Pi.
    * Use a ~$10 soundcard from Amazon/eBay
    * Use 2 pins from the GPIO header to provide PTT and ground (use a third for COS if desired)
    * Create a custom cable (see below) that integrates audio and PTT for the target radio.
  * [DRA-34](http://masterscommunications.com/products/radio-adapter/dra/dra34.html): Assembled and tested $69
    * Provides a fully integrated soundcard + PTT (supported by direwolf)
    * Exposes an RJ-45 interface with (RX, TX, PTT). Very easy to terminate RJ-45 with the correct tools
    * Create a custom cable that converts from the radio's native DATA port to the standard RJ-45 pinout
  * [Signalink USB](https://www.tigertronics.com/slusbmain.htm): Device with cable kit ~$150
    * Most expensive option, but fully plug and play due to integrated VOX circuit.
    * Extensive pre-fab cable collection if you don't want to make your own.

## The Cable

# Client Software
