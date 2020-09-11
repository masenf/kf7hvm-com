---
layout: post
title: ham2mon multi-channel scanner on macOS
---

This setup allows for the automatic capture, archive, and playback of narrowband FM signals.
Primarily I'm using it to listen to every 2 meter repeater within hearing distance to my
home QTH of Longview, WA.

# Quick Setup

* Tested with macOS 10.14 using homebrew
* RTLSDR Blog V3

## ham2mon

* brew install python@3.8 gnuradio cmake mpir rtlsdr swig
* clone [ham2mon](https://github.com/madengr/ham2mon) (use [ta6o/master](https://github.com/ta6o/ham2mon) fork until py3 support is merged into mainline)
* clone [osmosdr](https://osmocom.org/projects/gr-osmosdr/wiki/GrOsmoSDR) and build (make install - no sudo)
* run `ham2mon.py` with various options
  * `sudo ./ham2mon.py -a "rtl" -n 4 -f 1463E5 -r 25E5 -g 20 -s -40 -v 20 -t 30 -w -m`

## ham2mon-gui

* `brew install nodejs yarn`
* follow setup steps for [ham2mon-gui](https://github.com/slavik0329/ham2mon-gui)

# Deployment

The software is currently deployed on my main dev laptop running macOS. The ultimate goal is to deploy
to a remote raspberry pi for the RF listening component and host the ham2mon-gui on a Digital Ocean VPS.

# Problems to Solve

* Audible, low frequency hum is present in WAV files decoded and written by ham2mon.
* Audio level written to WAV files is too low and needs to be normalized
* RTLSDR only has 2.5Mhz bandwidth and cannot capture the full 2m spectrum, which is 4Mhz
* RTLSDR has horrible image suppression, so the detection threshold must remain relatively high to
  avoid capturing harmonics.
  
# Screenshot

![image](https://raw.githubusercontent.com/masenf/kf7hvm-com/master/images/ham2mon-gui.png)



