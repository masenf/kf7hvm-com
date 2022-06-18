---
layout: page
title: Raspberry Pi 4 Setup for Digital Modes
---

<a href="/images/raspberrypi4.jpg">
<img style="float: right" src="/images/raspberrypi4_tn.png">
</a> The Raspberry Pi is a versatile tool for amateur radio operators due to its small size,
low power requirements, and exposed GPIO / serial pins. Unfortunately many of the
tutorials available online need minor tweaks for
the [2022-04-04 release of Raspberry Pi OS](https://www.raspberrypi.com/software/operating-systems/#raspberry-pi-os-32-bit),
so I've attempted to collect an _abbreviated_ walkthrough for configuring a Pi 4
with direwolf sound modem, YAAC for APRS, pat for winlink, and fldigi for other
digital modes.

# Base OS Image

This guide is using the [2022-04-04 release of Raspberry Pi OS](https://www.raspberrypi.com/software/operating-systems/#raspberry-pi-os-32-bit),
32-bit (so it would also work on a Pi Zero):

- Download the img
- Write the img file to a **NEW** SD Card

# Headless Setup

Headless setup was simpler in previous releases, but the 2022-04-04 release **no longer
includes the default `pi` user**.
See [this page](https://www.raspberrypi.com/news/raspberry-pi-bullseye-update-april-2022/)
for more information (particularly the "Headless Setup" section).

After verifying the image, mount the `boot` partition on a PC. The setup works by
creating certain files in the `boot` partition that are handled specially when the
Pi is booting.

After creating the files below, unmount the `boot` partition and insert the card into
the Pi.

## ssh

Enable headless (no display / keyboard) setup by creating a blank file named `ssh` in the
`boot` partition:

    touch /mnt/boot/ssh

## userconf

The `userconf` file contains the username and encrypted password of the default user.

To create the encrypted password, use the command:

    echo 'mypassword' | openssl passwd -stdin

The `userconf` file should look something like

    johndoe:5WMdYxc1LBvgI

`johndoe` is the user that will be created. The encrypted password will be different each
time because it uses a salt to avoid reverse lookup (rainbow) tables.

## wpa_supplicant.conf

I typically connect via wired ethernet, but if you depend on wireless connectivity,
create a file called `wpa_supplicant.conf` that provides details and key for the
desired wifi network.

    ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
    country=US
    update_config=1
    network={
        ssid="johnwifi"
        psk="put the secret key here"
    }

# Initial Configuration

Determine the Pi's IP address by looking at your router configuration, or (maybe)
`ping raspberrypi`, and connect to it.

## Update all Packages

This ensures that any patches since the OS image was released are applied before
installing any further software.

    sudo apt-get update && sudo apt-get upgrade -y

## Remote Graphical Desktop

Raspberry Pi OS includes
a [VNC server](https://www.raspberrypi.com/documentation/computers/remote-access.html#virtual-network-computing-vnc)
that can be enabled in `raspi-config` > 3. Interface Options > VNC.

VNC viewer applications are available for most platforms.

### Install `xrdp` (optional)

Alternatively, `xrdp` allows remote desktop access using tools commonly found preinstalled
on Windows and Linux.

    sudo apt-get install -y xrdp

Unfortunately the
package [is broken out of the box](https://github.com/neutrinolabs/xrdp/issues/2060#issuecomment-980071431)
on recent releases, but isn't too hard to fix.

Edit `/etc/X11/xrdp/xorg.conf`, and change the existing line to remove the `DRMDevice` path.

#### Before

    Option "DRMDevice" "/dev/dri/renderD128"

#### After

    Option "DRMDevice" ""

#### Enable the Service

    sudo systemctl enable xrdp
    sudo systemctl reboot

## Install [`direwolf`](https://github.com/wb2osz/direwolf/)

Steps taken from the repo [README](https://github.com/wb2osz/direwolf/#linux---using-git-clone-recommended)

    sudo apt-get install -y git gcc g++ make cmake libasound2-dev libudev-dev 
    cd ~
    git clone https://www.github.com/wb2osz/direwolf
    cd direwolf
    # to install pre-release version, checkout `dev` branch (bugs may exist)
    # git checkout dev
    mkdir build && cd build
    cmake ..
    make -j4
    sudo make install
    make install-conf

### Edit Launcher

Edit `/usr/share/applications/direwolf.desktop`

Add a `-p` to the `Exec` line to create a pty for `kissattach` (pat) to use.

### Config

Direwolf configuration varies widely, either GPIO or CM108 style PTT is recommended.

Either `~/direwolf.conf` or `/etc/direwolf.conf` is recommended.

## Install `fldigi`

    sudo apt-get install -y fldigi

### Broken `gpio` script

To get flrig/fldigi to use the raspi GPIO pins, ensure the following
script exists at `/usr/bin/gpio` (and make it executable! `chmod a+x /usr/bin/gpio`)

```
#!/usr/bin/env bash
# Alias for old gpio binary for use with 
# fldigi GPIO PTT under RaspiOS Bullseye.
# gpio was from the wiringpi package, which
# is not available in RaspiOS Bullseye.
#
# User running this script must be root
# or a member of the gpio group.
#
# Requires 2 arguments:
# $1 : export|unexport
# $2 : BCM GPIO number

case $2 in
   17|18|27|22|23|24|25|4|5|6|13|19|26|12|16|20|21)
      case $1 in
         export)
            echo $2 >/sys/class/gpio/export
	        sleep 0.1
            echo "out" >/sys/class/gpio/gpio${2}/direction
            ;;
         unexport)
            echo $2 >/sys/class/gpio/unexport
            ;;
         *)
            exit 1
            ;;
      esac
      ;;
   *)
      exit 1
      ;;
esac
exit 0
```

## Install [YAAC](https://www.ka2ddo.org/ka2ddo/YAAC.html)

[YAAC](https://www.ka2ddo.org/ka2ddo/YAAC.html) is a cross-platform java-based
APRS client that provides advanced features.

    apt-get install default-jre

### Extract the YAAC.zip file

In this guide, I suggest extracting YAAC to `~/code/YAAC`, but if
you're using a different user, or would prefer a different location,
adjust the paths in the .desktop file accordingly.

    mkdir -p ~/code/YAAC
    cd ~/code/YAAC
    unzip ~/Downloads/YAAC.zip

### Create a desktop entry

`/usr/local/share/applications/yaac.desktop` (**replace path to `YAAC.jar` appropriately**)

```
[Desktop Entry]
Name=YAAC
Comment=Yet Another APRS client
Exec=/usr/bin/java -jar /home/johndoe/code/YAAC/YAAC.jar
Icon=yaaclogo64.ico
StartupNotify=true
Terminal=false
Type=Application
Categories=HamRadio
Keywords=Ham Radio;APRS;KISS;AGWPE;AX.25
```

## Install [`pat`](https://getpat.io/)

Download the armhf (raspbery pi) package for the latest release at
[https://github.com/la5nta/pat/releases](https://github.com/la5nta/pat/releases).

Install the package directly:

    dpkg -i ~/Downloads/pat_0.12.1_linux_armhf.deb

**IMPORTANT**: Hold the package, so it doesn't update unexpectedly:

    apt-mark hold pat

Some repos, like ubuntu have renamed `pat` to `pat-winlink` and made other modifications
that might differ from the official docs.

### Install ax25 stack

Use `pat` with a TNC requires ax25 support packages and a small bit of configuration.

    apt-get install libax25 ax25-tools

For additional programs used in connected mode packet, like `axlisten` and `axcall`, also
install the `ax25-apps` package

    apt-get install ax25-apps

#### Create the port

Edit `/etc/ax25/axports` to add the following line:

```
wl2k N0CALL 1200 255 2 pat winlink
```

In this line, replace `N0CALL` with your actual callsign.

Two other values in the port definition may need some adjustment based on the situation.

* `255` in the example is the `paclen` or MTU and controls the packet size. For noisy or distant
  connections a lower number (`128`) may improve reception in exchange for slower
  potential transfer speed. (Although if the link is poor, retransmissions of larger
  MTU packets will decimate the throughput).
* `2` in the example is the `window` size, or maximum number of outstanding packets.
  Larger numbers allow more unacknowledged data to be sent and may improve performance
  on high quality channels. Smaller numbers can improve reliability in sub-optimal conditions.

See [`man axports(5)`](https://manpages.debian.org/testing/libax25/axports.5.en.html) for
more information

### Create support scripts

`/usr/bin/patattach.sh`

```shell
#!/usr/bin/env bash
kissattach -m ${PACLEN:-255} $(readlink /tmp/kisstnc) ${AXPORT:-wl2k} \
  && kissparms -c 1 -p ${AXPORT:-wl2k}
```

`/usr/bin/pathttp.sh`
```shell
#!/usr/bin/env bash
sudo /usr/bin/patattach.sh
/usr/bin/pat http "$@"
```

After creating the scripts, make them executable:

    chmod a+x /usr/bin/patattach.sh /usr/bin/pathttp.sh

(Optional) Add `/usr/bin/patattach.sh` to `/etc/sudoers` file to avoid password prompt.

    johndoe ALL=(ALL) NOPASSWD: /usr/bin/patattach.sh

### Create the desktop entry

`/usr/local/share/applications/pat.desktop`

```
[Desktop Entry]
Name=pat winlink HTTP server
Comment=web-based winlink client
Exec=/usr/bin/lxterminal /usr/bin/pathttp.sh
StartupNotify=true
Terminal=true
Type=Application
Categories=HamRadio
Keywords=Ham Radio;APRS;KISS;AGWPE;AX.25;Winlink
```

### Configure pat

Before pat will start up, run `pat configure`, and complete the steps.

# Ready to Go

The system should be in good shape for _manual-start_ packet use.

Configuring systemd units to run these programs on startup may be
covered in the future.