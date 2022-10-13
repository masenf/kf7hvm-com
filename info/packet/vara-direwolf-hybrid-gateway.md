---
layout: page
title: VARA FM + Direwolf Hybrid Gateway
---

# Hardware

## Compute

[**Lenovo N23**](https://www.lenovo.com/il/en/laptops/lenovo/student-chromebooks/N23-Chromebook/p/88ELC1S0873) Chromebook.

![Lenovo N23 Chromebook, side view](/images/lenovo-chromebook-n23-clamshell-feature-3.webp)


_(See also my [earlier post](/2022/04/15/chromebook-for-amateur-radio/)
trying out different linux distributions with this particular chromebook)._

This device was chosen primarily due to price ($39 shipped); the x86\_64
processor also means that _no emulation is necessary when running VARA
and Winlink Express via Wine_.

## Interface

Master's Communications
[DRA-34](http://masterscommunications.com/products/radio-adapter/dra/dra34.html)
CM119A-based adapter (supporting CM108-style PTT)

![DRA-34 Top View](/images/dra34-top.jpg)

## Radio

A variety of FM radios were tested:

  * Yaesu FT-8900
  * Yaesu FT-2980R
  * Kenwood TH-K20A (handheld)

# Software

<img src="/images/Debian_logo.png" style="float: right; width: 10vw">

[Debian x86_64 11.5](https://www.debian.org/download) stable (i386 wont boot UEFI for the chromebook!).

Note that chromebook **installation requires the community "non-free" firmware
installation image**, otherwise the installer cannot connect wifi.

After installation, the non-free `firmware-intel-sound` is necessary to
get the built-in audio functional.

# Installation Procedure

Defaults are accepted throughout the installer, except as noted below.

## Users

I create a user called `packet` as the default user that will run the
gateway. All commands below are assumed to run as the user, unless
prefixed by `sudo`.

## Partition

The N23 comes with a whopping **16GB of eMMC flash**, so it might be desirable to forgo the swap partition, and get an extra 1GB of disk.

Additionally, swapping to flash memory and wearing out the eMMC isn't really
desirable anyway. If swap is necessary, then I suggest adding external USB
device as a /var and swap partition.

## Package Selection

For space reasons, I recommend disabling the GNOME desktop environment.

![Debian 11 Text Installer > Package Selection Screen](/info/packet/screenshots/debian_11_package_selection.png)

* disable "Debian Desktop Environment" and "GNOME"
* select "XFCE" 
* select "SSH Server" (if desired)

## First boot

### Allow your default user to `sudo`:
```
su -
usermod -G sudo -a packet
```

Log out and in to take effect.

### Basics
```
# clean up, if desired
# sudo apt-get remove libreoffice-common
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get install -y tmux vim git 
# for builtin audio
sudo apt-get install -y firmware-intel-sound
sudo apt-get autoremove -y
```

### Install `wine` stable 🍷

Taken from [https://wiki.winehq.org/Debian](https://wiki.winehq.org/Debian).

```
sudo dpkg --add-architecture i386
sudo mkdir -pm755 /etc/apt/keyrings
sudo wget -O /etc/apt/keyrings/winehq-archive.key https://dl.winehq.org/wine-builds/winehq.key
sudo wget -NP /etc/apt/sources.list.d/ https://dl.winehq.org/wine-builds/debian/dists/bullseye/winehq-bullseye.sources
sudo apt-get update
sudo apt-get install --install-recommends winehq-stable cabextract
sudo wget -O/usr/local/bin/winetricks-latest https://raw.githubusercontent.com/Winetricks/winetricks/master/src/winetricks
sudo chmod +x /usr/local/bin/winetricks-latest
```

# Set up wineprefix

These steps create a 32-bit ["wine prefix"](https://wiki.winehq.org/FAQ#Wineprefixes) capable of running Winlink and VARA.

```
sudo mkdir -p /opt/wine-winlink && sudo chown packet /opt/wine-winlink
export WINEPREFIX=/opt/wine-winlink
export WINEARCH=win32

alias winetricks=/usr/local/bin/winetricks-latest

winetricks winxp
winetricks sound=alsa
winetricks -q dotnet472

# these two tricks pop up license agreements and need a display
export DISPLAY=:0.0
winetricks vb6run
winetricks vcrun2015
```

## ❗️Copy additional DLL components to `$WINEPREFIX/drive_c/windows/system32/`

Some additional components are required to run VARA which are not shipped by any
winetricks package, these must be obtained elsewhere.

Mirror: [https://www.kf7hvm.com/assets/vara_components.tar.gz](https://www.kf7hvm.com/assets/vara_components.tar.gz)

These are the SHA256 hashes that worked for me.

```
bc7d070ad557343aa0731d6d4fcb1f0c312bff838eeb9006bcc79085f21e8ae4  cdosys.dll
c79a5b677704f93fe2b8646243f3590e7e34621b09838aef6e606f6832bd37ea  MSCHRT20.OCX
152121a5d1ac8f12002c18afc294bb1ebcecc1d61deec6211df586c11acde9b6  MSCOMCTL.OCX
36f4a412b8f99b4906cbbd3a0160d76ab51aeb2dfce8a933faa62bd275c7f602  MSCOMM32.OCX
8a151667fa150fa3c910cd43d6588df86bf2a696729d3fd23d4c16bb4b462e5b  mswinsck.ocx
553cc733eebe8fc3633ed81ab0e1c09817c4ab0cc3a39b8f27c095ff09350a60  pdh.dll
```

```
wget https://www.kf7hvm.com/assets/vara_components.tar.gz -O /tmp/vara_components.tar.gz
cd $WINEPREFIX/drive_c/windows/system32
tar xvzf /tmp/vara_components.tar.gz
```

# Install and configure windows software

```
wine /path/to/Installer.exe
```

![Winlink Express Installer on Wine](/info/packet/screenshots/debian_11_wine_winlink_express_install.png)

Click next, etc, etc.

![VARA FM Installer on Wine](/info/packet/screenshots/debian_11_wine_vara_fm_install.png)

# Backup The wineprefix

I recommend configuring winlink express for your callsign and registering vara,
exiting all wine applications, then taking a complete backup of the wineprefix

```
tar cvzf ~/wine-winlink-backup.tar.gz -C /opt wine-winlink
```

This backup can be restored on similar hardware to avoid the long
setup times that result from running the windows installers. Note
that distributing this backup to others may constitute a violation
of one or more licenses.

# Hybrid Mode (with ALSA+PulseAudio)

Using ALSA's PulseAudio integration, multiple applications (VARA and direwolf)
can share the same audio device. Applications can point to the symbolic device
names, simplifying configuration changes.

![Hybrid Gateway Overview Diagram](/info/packet/screenshots/hybrid-gateway.drawio.png)
[[1]](/info/packet/screenshots/hybrid-gateway-r1.drawio)

Earlier attempts used ALSA's native `dmix` and `dsnoop` modules to mux
the hardware device, but this was not reliable in VARA running under Wine.
PulseAudio adds latency, but a) it's working for this purpose and b) the
control plane tooling for PulseAudio is nicer and offers richer possibilities
for shipping audio across the network.

## Create `~/.asoundrc`

Since ALSA is _better supported_ by wine and direwolf, but pulse provides
better control over mixing, we get the best of each by combining them (at
the expense of latency).

```
pcm.radio0-rx {
    type pulse
    device "alsa_input.usb-C-Media_Electronics_Inc._USB_PnP_Sound_Device-00.mono-fallback"
}
pcm.radio0-tx {
    type pulse
    device "alsa_output.usb-C-Media_Electronics_Inc._USB_PnP_Sound_Device-00.analog-stereo"
}
```

The PulseAudio device names are from the `pacmd list-sources` and `pacmd list-sinks` commands, respectively.

ALSA applications will use the "radio0-rx" and "radio0-tx" device names
in place of "plughw:1,0" (for example). Multiple applications can
open these virtual devices without conflict.

## Update `wine` ALSA device list

In order for VARA to see the "virtual" ALSA devices:

```
export WINEPREFIX=/opt/wine-winlink
wine reg add 'HKCU\Software\Wine\Drivers\winealsa.drv' /v ALSAOutputDevices /t REG_MULTI_SZ /f /d 'radio0-tx'
wine reg add 'HKCU\Software\Wine\Drivers\winealsa.drv' /v ALSAInputDevices /t REG_MULTI_SZ /f /d 'radio0-rx'
```

![winealsa.drv key in regedit after making changes](/info/packet/screenshots/wine_alsa_devices_regedit.png)

### Start winecfg and set default sound card

```
export WINEPREFIX=/opt/wine-winlink
wine $WINEPREFIX/drive_c/VARA\ FM/VARAFM.exe
```

![VARA soundcard settings](/info/packet/screenshots/vara_soundcard_settings.png)

## Bones `direwolf` config

```
sudo apt-get install -y direwolf
```

### `/opt/direwolf.conf`

```
ADEVICE radio0-rx radio0-tx
CHANNEL 0
MYCALL KF7HVM-12
MODEM 1200
# if using CM108, the hidraw device MUST be specified
PTT CM108 /dev/hidraw0
```

```
sudo chown packet /opt/direwolf.conf
```

## Gateways

I've been working on some [`gensio`](https://github.com/cminyard/gensio) wrapper
scripts in python that enable gateway usage via ax25 direwolf and VARA FM and HF
without installing or configuring significant software: [`gensio-modems`](https://github.com/masenf/gensio-modems).

```
sudo apt-get install -y python3-pip git
git clone https://github.com/masenf/gensio-modems
cd gensio-modems
/usr/bin/python3 -m pip install --user -r requirements.txt
```

# On Boot

For a gateway, reliable bringup on boot is very important.

## Autologin

`/etc/lightdm/lightdm.conf`

    [Seat:*]
    autologin-user=packet

## Systemd Units

Copy example units from 
[`~/gensio-modems/examples/systemd`](https://github.com/masenf/gensio-modems/tree/main/examples/systemd),
modify accordingly.

```
mkdir -p ~/.config/systemd/
cp -r ~/gensio-modems/examples/systemd ~/.config/systemd/user
systemctl --user daemon-reload
systemctl --user enable varafm varagate@KF7HVM-12 direwolf diregate@KF7HVM-12 logs
```

Reboot. 🤞.

# Done

For VOX-based devices, like Signalink, the gateways should both be listening
and ready to recieve connections as RMS gateways. The VARA FM window should be displayed with logs visible in a terminal window.

![VARA gateway running](/info/packet/screenshots/vara_gateway_running.png)

## Checking Services

Individual services can be examined if needed:

```
systemctl --user status direwolf
systemctl --user status varafm
```

```
journalctl --user -ru diregate@KF7HVM-12
journalctl --user -ru varagate@KF7HVM-12
```

# CM108 PTT (Optional)

This section is only relevant to CM108 PTT.

🎉VARA supports Native "R-Audio" CM108 PTT!

😔As far as I can tell, it doesn't work on Wine VARA...

However, **`rigctlcom`** from the hamlib suite can _emulate_ a Kenwood TS-2000
CAT interface, which VARA and wine support very well. This requires a few packages
and some moving parts that I wrapped in a script below.

![Kenwood TS-2000, venerably supported by CAT control software everywhere](/images/kenwood-ts2000.webp)

## Prerequisites

```
sudo apt-get install -y libhamlib-utils socat
```

**Important:** See note below about hamlib < 4.3 on Debian 11.

Ensure CM108 device is accessible to `audio` group via [`udev` rule](https://github.com/wb2osz/direwolf/blob/7d3c1d100ea38605bf5d11459f5a678be99fffab/conf/99-direwolf-cmedia.rules).

```
sudo wget -O/etc/udev/rules.d/99-direwolf-cmedia.rules https://raw.githubusercontent.com/wb2osz/direwolf/7d3c1d100ea38605bf5d11459f5a678be99fffab/conf/99-direwolf-cmedia.rules
```

Plug and unplug the CM108 before continuing; `ls -la /dev/hidraw*` should show  audio group and
`0640` permissions on the device.

Before
```
packet@mf-n23-03:~$ ls -la /dev/hidraw*
crw------- 1 root root 244, 0 Oct 12 18:01 /dev/hidraw0
```

After
```
packet@mf-n23-03:~$ ls -la /dev/hidraw*
crw-rw---- 1 root audio 244, 0 Oct 12 19:44 /dev/hidraw0
```

## [`socat` 🐈](https://linux.die.net/man/1/socat)

Essentially a pipe swiss army knife and a huge inspiration for how to wire anything
together in linux and make it work. Thankfully for todays work, we need the
simplest capability, a virtual serial port (`pts`).

```
socat -d -d \
    pty,raw,echo=0,link=/tmp/cm108 \
    pty,raw,echo=0,link=/tmp/vts2000 &
```

This simply provides a bidirectional pipe, which can be used in linux and wine as a serial port.

A bit of convenience allows the creation of a link as a chosen name once the
serial port is up, here we choose a name for each end of the pipe:

  * `/tmp/cm108` will be be used by `rigctlcom` to interface with the cm108 PTT (or any rigctl compatible interface).
  * `/tmp/vts2000` will be used by VARA to control the virtual Kenwood TS-2000

## [`rigctlcom`](https://manpages.ubuntu.com/manpages/jammy/man1/rigctlcom.1.html)

I was hoping something like this existed, and I was not disappointed. It works
exactly like you expect for simple operation such as PTT. I haven't tried a
more complicated setup. (See note below about using hamlib 4.3.1 or newer).

```
rigctlcom -P CM108 -p /dev/hidraw0 \
    -R $(readlink /tmp/cm108) -S 57600 &
```

## The Virtual Kenwood

```
ln -s $(readlink /tmp/vts2000) $WINEPREFIX/dosdevices/com6
```

After restarting VARA, the Kenwood TS-2000 on COM6 at 56700 baud can be
used to key the CM108 soundcard. 🙌

![VARA PTT settings](/info/packet/screenshots/vara_ptt_settings.png)

## Scripting startup (and cleanup)

That's way too much tedious to type, so I use a systemd unit to bring it up.

See [socat@.service](https://github.com/masenf/gensio-modems/blob/main/examples/systemd/socat%40.service)
and [rigctlcom@.service](https://github.com/masenf/gensio-modems/blob/main/examples/systemd/rigctlcom%40.service)

```
systemctl --user daemon-reload
systemctl --user enable rigctlcom@hidraw0
```

## Building hamlib

If you made it this far and are

❗️ Using **Debian 11 Bullseye** or older,

**`rigctlcom` CM108 PTT wont work with VARA**, and we have to build 4.3.1 from
source.  You can skip this step when using different PTT method or running
Debian testing build (bookworm).

### Prebuilt Binaries

* [libhamlib-utils_4.3.1-1_amd64.deb](https://github.com/masenf/kf7hvm-com/releases/download/hamlib-4.3.1-debian-11-x86_64/libhamlib-utils_4.3.1-1_amd64.deb)
* [libhamlib4_4.3.1-1_amd64.deb](https://github.com/masenf/kf7hvm-com/releases/download/hamlib-4.3.1-debian-11-x86_64/libhamlib4_4.3.1-1_amd64.deb)

#### Download and install with `sudo dpkg -i`.

```
cd /tmp
wget https://github.com/masenf/kf7hvm-com/releases/download/hamlib-4.3.1-debian-11-x86_64/libhamlib4_4.3.1-1_amd64.deb
wget https://github.com/masenf/kf7hvm-com/releases/download/hamlib-4.3.1-debian-11-x86_64/libhamlib-utils_4.3.1-1_amd64.deb
sudo dpkg -i libhamlib4_4.3.1-1_amd64.deb libhamlib-utils_4.3.1-1_amd64.deb
```

Otherwise, build it yourself as seen below.

### Get Dependencies

#### Update `/etc/apt/sources.list` to use `deb-src` from `testing` (instead of `bullseye`)

```
sudo apt-get update
sudo apt-get install -y build-essential fakeroot devscripts
sudo apt-get build-dep -y hamlib
```

### Build Packages

```
mkdir -p ~/src/debian && cd ~/src/debian
apt-get source hamlib
cd hamlib-4*
debuild -b -uc -us
```

-> Install the new packages in `~/src/debian`

```
sudo dpkg -i ~/src/debian/libhamlib4_4*.deb ~/src/debian/libhamlib-utils_4*.deb
```

# Done

For now...

## Still TODO

* Integrate [`aprs3`](https://github.com/python-aprs/aprs3) library to beacon.
* Post gateway status to winlink.org
* Better statistics and logging (gensio-modems)

# Winlink Express

As a bonus, there is a systemd unit included in the gensio-modems example
to bring up Winlink Express (and shut down the varagate so you can use VARA!).

```
systemctl --user start winlink
```

![Winlink Express listening for VARA FM P2P connection](/info/packet/screenshots/winlink_vara_p2p.png)

![Winlink Express connecting to a Packet gateway](/info/packet/screenshots/winlink_packet_client.png)

After you're done, then bring the gateway back up, please.

```
systemctl --user restart varafm
```
