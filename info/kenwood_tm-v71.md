---
layout: page
title: Kenwood TM-V71(a) Raspberry Pi Packet Node
---

The Kenwood TM-V71 is a dual band (2m/70cm), dual receive
FM transceiver. It features an 8-pin serial port and 6-pin
mini DIN packet connection. This page will describe how I
use this rig as part of a dual purpose VHF general use + packet
station (APRS, Winlink) with a Raspbeery Pi as the control
and TNC.

This configuration should also allow other operating modes such
as Svxlink, Allstar, and SSTV; but as this point, I haven't worked
with those.

# Hardware

## Serial

The 8-pin serial port operates from 9600 to 57600 baud and provides
CAT and memory (MCP) access via a standard serial protocol. In normal
mode, enabling PTT works for the active band and uses the microphone
input (rather than data input).

### Echolink Sysop Mode

When the radio is powered on while [PF2] is pressed, it will enter
"Echolink Sysop Mode". In this mode, the CAT interface is disabled
and any data on the serial line triggers PTT of the data band and
mute of the microphone.

## Packet

Also provided is a standard 6-pin mini DIN packet interface with
audio in (PKD), audio out (PR1, 1200bps, de-emphasized, squelch controlled),
audio out (PR9, 9600bps, flat response, discriminator output),
audio ground (DE), PTT, COS (SQC, programmable),

This interface appears to operate with 3.3v logic and can be directly
controlled via Raspberry Pi GPIO pins. Note that the 6-pin PTT
is ignored in aforementioned "Echolink Sysop Mode";

Only one of PR1 (1200bps out) and PR9 (9600bps out) will be active
at any given time based on the Data Sp. setting.

The COS output line is set high when a signal is received according
to the data squelch menu setting. It can be configured to raise in the
presence of any carrier, tone squelch, or TX and although doesn't
provide immediate use for a packet node, it will be important for
echolink/svxlink/allstar use.

## Cables

Kenwood sells a cable kit <INSERT LINK/REF> for this radio, but I
can't recommend it at this time because it doesn't bring out the
6-pin PTT switch. I'm guessing kenwood is relying on folks using
the "Echolink Sysop Mode" in this configuration, but that requires
sacrificing CAT control.

So I will make my own modular cable from parts.

### 6-pin mini DIN

I purchased a male-to-male 6ft 6-pin mini DIN cable from amazon for 5
dollars, cut it in half, and stripped the shielding. I was pleased to
discover a shielded cable with 6 conductors. The particular cable I
bought had the following pin colors:

| No. | Name  | Function               | Wire Color  |
| --- | ----- | ---------------------- | ----------- |
| 1   | PKD   | Audio Input (to Green) | Pink        |
| 2   | DE    | Audio Ground           | Red         |
| 3   | PKS   | "L" for PTT / mic mute | Orange      |
| 4   | PR9   | 9600 Output (discrim.) | Yellow      |
| 5   | PR1   | 1200 Output (squelch)  | Green       |
| 6   | SQC   | COS - "H" for open     | Black       |
| -   | E     | Common Ground          | Bare        |

Instead of soldering the connectors to the appropriate audio
and header socket ends, I opt to crimp them into a standard
RJ-45 (ethernet) end and use a standard RJ-45 screw terminal
to make the terminating connections.

For the RJ-45 pinout, I copied what Signalink uses, because
I might as well make a compatible cable with a common pinout.
As it turns out, signalink uses the same pin number scheme,
I don't think that's an accident.

| No. | Name  | Function               | Wire Color  |
| --- | ----- | ---------------------- | ----------- |
| 1   | PKD   | Audio Input (to Green) | Pink        |
| 2   | DE    | Audio Ground           | Red         |
| 3   | PKS   | "L" for PTT / mic mute | Orange      |
| 4   | PR9   | 9600 Output (discrim.) | Yellow      |
| -   | ---   | Non-standard pins      | -           |
| 5   | PR1   | 1200 Output (squelch)  | Green       |
| 6   | SQC   | COS - "H" for open     | Black       |
| 8   | E     | Common Ground          | Bare        |

I'll also bring PR1 and SQC out to the RJ-45 as well, non-standard
pin location. The common ground will also be broken out into RJ-45
pin 8 for the PTT and COS connections.

On the other side of the cable, I'll also use RJ-45 and bond both
ends with a standard RJ-45 coupler for a quick and secure connection
with no fiddly soldering.

| No. | Name  | Function               | Wire Color  |
| --- | ----- | ---------------------- | ----------- |
| 1   | PKD   | Audio Output (Green)   | Red         |
| 2   | DE    | Audio Ground           | Green       |
| 3   | PKS   | "L" for PTT / mic mute | White       |
| 4   | PR9   | 9600 Output (discrim.) | Black       |
| 5   | PR1   | 1200 Output            | ---         |
| 6   | SQC   | COS - "H" for open     | Red         |
| 7   | -     | Unused                 | Black (cut) |
| 8   | E     | Common Ground          | Green       |

For the audio, I'm using a TRRS "headset" type 1/8" phono
plug where the Tip and first ring are wired to the audio
output from the soundcard, the 2nd ring is the audio ground,
and the shield is the audio input to the soundcard. This is
more convenient than the more popular 2-jack soundcards
because only a single audio cable is required.

T - Left Channel (Red)
R - Right Channel (White)
R - Ground (Green)
S - Mic / Audio In (Black)

For the PTT, COS, and common ground, I'm bringing the pins
out to 3x pin socket to connect directly to the Raspberry Pi
GPIO pins.

### 8-pin mini DIN Serial

By using a 6-pin cable with PTT, the serial cable is technically not
needed, but it can be nice for CAT control of the radio, reading frequency
information, and general station management. For these purposes,
the standard kenwood serial cable and a USB-Serial adapter is sufficient.

However, to avoid the need for a bulky USB-to-serial adapter and
DB-9 connectors. We can attach TX, RX, and ground directly to the
Raspberry Pi UART pins on the GPIO header.

I purchased a male-to-male 6ft 8-pin mini DIN cable from amazon for 10
dollars, cut it in half, and stripped the shielding. I was pleased to
discover a shielded cable with 8 conductors. Sounds eerily similar
to the 6-pin cable. I prefer this approach because I'm not great
at soldering and I find that manufactured ends tend to hold up better.

## Raspberry Pi

I'm using the ubiquitous Raspberry Pi platform (specifically the 4B/8GB)
to run the TNC, APRS, Pat, and CAT control. Eventually I expect to run
asterisk/all star or svxlink as well.

# Software

## Raspbian

Mainly for the support and stability on the platform, I'm using
the standard minimal raspbian distribution.

```
apt-get update && apt-get upgrade
apt-get install -y libhamlib-dev libhamlib-utils ax25-tools grig xauth
apt-get install -y python3-venv python3-tk
apt-get install -y default-jdk
apt-get install -y xfce4 xfce4-goodies xorg dbus-x11 x11-xserver-utils xrdp xrdpxorg
systemctl enable xrdp
systemctl start xrdp
```

### `hamlib`

Ensure user is in `dialout` group for TTY access.

```
rigctl -m 2034 -r /dev/ttyUSB0 -s 57600
```

(if this fails, double check the baud rate and serial device)

### Direwolf

Direwolf operates as a soundcard modem / TNC and currently outperforms
all old school hardware TNC in terms of decode performance.

```
ADEVICE plughw:1,0
CHANNEL 0
MYCALL KF7HVM-1
MODEM 1200
# For normal CAT control
#PTT RIG 2034 /dev/ttyUSB0 9600
# For echolink sysop mode. Hold PF2 when power on.
#PTT /dev/ttyUSB0 RTS DTR
# For Direct GPIO on rockpi pin 18
#PTT GPIO -102
```

### Winlink

`Pat` provides cross platform winlink message access via a web
interface.

To set up AX25 port: /etc/ax25/axports
```
wl2k KF7HVM-10 1200 255 7 Winlink
```

To connect the ax.25 port to direwolf (`/tmp/kisstnc`):
```
kissattach -m 128 /tmp/kisstnc wl2k
kissparms -c 1 -p wl2k
```

### YAAC

Yet another APRS client. Java-based, no installation. Just unzip and run

```
java -jar /path/to/yaac.jar
```

Create an AGWPE port for localhost:8000
