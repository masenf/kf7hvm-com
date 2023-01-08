---
layout: post
title: Pulseaudio Crackling
---

I recently posted my steps for creating a [VARA+direwolf Hybrid Packet
Gateway](/info/packet/vara-direwolf-hybrid-gateway), but one problem has been
eluding me, and thus preventing me from sharing this information further:

## Pulseaudio just sounds like trash sometimes

I believe it's correlated with higher CPU load and buffer underruns. In fact, I do see buffer
underrun errors on the direwolf console which confirm this suspicion.

So, I just need to increase the buffer... right?

As far as I can tell, the pulse daemon setting `default-fragments` is related
to the buffer size; from the [Arch
wiki](https://wiki.archlinux.org/title/PulseAudio#daemon.conf)

> **`default-fragments`**: Audio samples are split into multiple fragments of
> `default-fragment-size-msec` each. The larger the buffer is, the less likely
> audio will skip when the system is overloaded. On the downside this will
> increase the overall latency. Increase this value if you have issues.

> **`default-fragment-size-msec`**: The size in milliseconds of each fragment.
> This is the amount of data that will be processed at once by the daemon.

The defaults for these values _should_ be commented out in your `/etc/pulse/daemon.conf`, for me they are

* `default-fragments` = 4
* `default-fragment-size-msec` = 25

The value I'm currently experimenting with is `default-fragments = 8`, and it does seem to improve the
situation, but doesn't totally resolve the issue.

The other setting that I hear a lot about is passing `load-module
module-udev-detect tsched=0` in `/etc/pulse/default.pa`. This disables the
timer scheduling in favor of the previous "interrupt-based" scheduling.

Once I get to the bottom of this, I'll be updating the VARA hybrid gateway
guide linked above.
