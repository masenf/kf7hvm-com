---
layout: post
title: ham2mon rock64 setup
---

After deploying [ham2mon with ham2mon-gui on my Mac Book Pro](/2020/09/11/ham2mon-multi-channel-scanner),
I was interested to see how the software would perform on dedicated, but more limited hardware: the
[Pine64 Rock64](https://www.pine64.org/devices/single-board-computers/rock64/)
single board computer.

# [Demo](http://sdrock.0x26.net:8080/)

## Replaced 2021-01-03: [running on DigitalOcean now](/2021/01/03/ham2mon-scanner-progress)

* ~[http://sdrock.0x26.net:8080/](http://sdrock.0x26.net:8080/) [Up as of 2020-09-14]~
* Audio quality may vary between recordings the settings were tweaked

# Deploy steps

* install software on top of
[ayufan's debian buster](https://github.com/ayufan-rock64/linux-build/releases/tag/0.9.14) image:

```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
apt-get update && apt-get upgrade
apt-get install tmux git nodejs gnuradio gr-osmosdr yarn
mkdir -p /opt/ham2mon && cd /opt/ham2mon
git clone https://github.com/madengr/ham2mon.git
git clone https://github.com/slavik0329/ham2mon-gui.git
```

* For RTL SDR: [blacklist the default driver and build rtl_sdr](https://gist.github.com/matix2120/a58976b7cca97f7ba3f22998e925a7f5)


# Problems
  
* Not sure why this was necessary, but I needed to rebuild the UTF-8 locale to get ncurses working

```
export LC_ALL="en_US.UTF-8"
export LC_CTYPE="en_US.UTF-8"
sudo dpkg-reconfigure locales
```

* Very high CPU usage when decoding 2 Mhz of spectrum > 375
  * Had to drop bandwidth to 1.5Mhz
  * Had to drop channels to 3
  * Perhaps GNURadio could be rebuilt with higher optimization level?
  
Overall, the performance on this board is a bit disappointing out of the box. It seems that
additional tweaking will be necessary if I want to support an AirSpy or SDRPlay radio with
wider bandwidth. It's not clear if the Rock64 is capable of processing even 4Mhz of raw spectrum, even if
it is only decoding 3 simultaneous channels of NBFM. I need to determine if better results would
be achieved with a better SDR or more compute, or if both are necessary.

# Future plans

I have submitted [some issues](https://github.com/slavik0329/ham2mon-gui/issues) to the ham2mon-gui repo
to make the web interface more real-time. This should enable automatic refresh when new calls
come in to allow near-realtime listening.

One potential application for this setup is a mobile, multi-use public safety scanner. It could be
deployed in a refuge or evacuation staging area to scan public service or amateur repeater
frequencies and then dissimenate this information to many laptop/tablet/smartphone users via wifi.
