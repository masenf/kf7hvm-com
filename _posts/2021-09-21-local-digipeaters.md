---
layout: post
title: Local Digipeaters
---

In the last month, I've helped stand up 2 new digipeaters. One at the top of
Columbia Heights in Longview and (soon to be) on Rainier hill across the river.
Both of these machines have good elevation and line of sight, so in a default
digipeater configuration of `^WIDE[12]-[12]$`, they end up bringing in a fair
bit of "out of area" traffic to the local RF channel that can clog up the
works.

On the advice of NA7Q, to avoid this issue, I've added a new `FILTER 0 0 ! d/*`
line to the digipeater configuration (as suggested by the
[manual](https://raw.githubusercontent.com/wb2osz/direwolf/master/doc/User-Guide.pdf))
to only retransmit packets that were heard directly on the radio with no digi
hops.

This will cause the digipeaters to _improve_ the RF coverage of the network
without over saturating the local RF channel with repeated traffic from nearby
metro areas.

Note that the W7DG-5 station will still gate _ALL_ traffic it hears, so it also
adds value as a 2-way igate even if it's not repeating everything.

I'm making the configuration changes today and will update this post with the
results.

Complete configuration

```
ADEVICE plughw:1,0
CHANNEL 0
MYCALL W7DG-5
MODEM 1200
AGWPORT 8000
KISSPORT 8001
PBEACON delay=1  every=30   overlay=L  symbol="digi"  lat=46^10.97  long=122^57.50W  power=50  height=20  gain=4  comment="http://www.w7dg.org Local-only contact kf7hvm@0x26.net"
DIGIPEAT 0 0 ^WIDE[3-7]-[1-7]$|^TEST$ ^WIDE[12]-[12]$ TRACE
FILTER 0 0 ! d/*
IGSERVER noam.aprs2.net
IGLOGIN ...
IGTXVIA 0 WIDE1-1
IGFILTER IG 0 i/30
IGTXLIMIT 6 10
```
