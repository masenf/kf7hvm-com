---
layout: post
title: Kenwood Software and Wine
---

You can run Kenwood's windows-only memory control software on macOS (<10.15) or linux using Wine.

# homebrew wine

**Important: `wine` no longer runs on macOS 10.15**

1. install homebrew
2. brew cask install --no-quarantine wine-stable
3. brew install winetricks

# Kenwood Software

My overall impression of the free Kenwood software is that it lacks interoperability
and has a few bugs which will never be fixed. But, it is free to download and
can run decently with wine.

* These compatibility steps will probably mostly work for linux as well, but untested.
* Other MCP versions can probably be loaded into wine in a similar way. The most
  important things are to use a 32-bit wine prefix and install the appropriate .NET
  runtime as specified in the system requirements.

# [MCP-2A](https://www.kenwood.com/i/products/info/amateur/mcp_2a.html)

Kenwood's solution for memory management on TM-V71 and TM-D710.

This guide will install [MCP-2A 3.22](https://www.kenwood.com/i/products/info/amateur/mcp_2a.html)
on macOS 10.14 using wine-5.0.

```
WINEPREFIX=~/kenwood/mcp-2a WINEARCH=win32 winetricks dotnet35
```
* Follow the steps to install .NET framework 3.5
```
curl https://www.kenwood.com/i/products/info/amateur/image/M2A322.zip > ~/kenwood/M2A322.zip
cd ~/kenwood && unzip M2A322.zip
WINEPREFIX=~/kenwood/mcp-2a wine setup.exe
```
* Follow the steps to install MCP-2A

## Serial Port

I'm using a USB to Serial adapter from Pluggable that is well known and tested.
Anything that is usable from the host should probably work here.

* `ln -s /dev/tty.usbserial ~/kenwood/mcp-2a/dosdevices/com1`

## Launch

```
WINEPREFIX=~/kenwood/mcp-2a wine ~/kenwood/mcp-2a/drive_c/Program\ Files/Kenwood/MCP-2A/MCP-2A.exe
```

## Known Problems

* Copy/paste only works between instances of MCP-2A, I couldn't paste from excel or google sheets
* Importing HMK (kenwood's fancy CSV format) clears all receiver settings similar to factory reset
* When pasting memory rows, blanks are not saved. This is particularly annoying because
  the TM-V71A identifies groups by number 0-99, 100-199, 200-299, etc.

# [MCP-5A](https://www.kenwood.com/i/products/info/amateur/mcp5a_e.html)

Covers the TH-K20 and TH-K40 handheld transcievers.

**2020-09-20 NOTE:** The software runs and can read memory from the radio, however
I have yet to successfully write memory back to the radio.

These steps should be considered a Work in Progress at this time and will be updated
if I ever get it working.

This guide will install [MCP-5A 1.10](https://www.kenwood.com/i/products/info/amateur/mcp5a_e.html)
on macOS 10.14 using wine-5.0

```
curl https://www.kenwood.com/i/products/info/amateur/image/M5A110.zip > ~/kenwood/M5A110.zip
cd ~/kenwood && unzip M5A110.zip
WINEARCH=win32 WINEPREFIX=~/kenwood/mcp-5a winetricks dotnet30
WINEPREFIX=~/kenwood/mcp-5a wine M5A110/setup.exe
```

## Serial Port

I'm using a cheap baofeng cable for this which shows up on my mac as `/dev/tty.usbserial-AL0652T9`

* `ln -s /dev/tty.usbserial-AL0652T9 ~/kenwood/mcp-5a/dosdevices/com1`

## Launch

```
WINEPREFIX=~/kenwood/mcp-5a wine ~/kenwood/mcp-5a/drive_c/Program\ Files/Kenwood/MCP-5A/MCP-5A.exe
```

## Known Problems

* No good way to import memory settings from CSV
* Cannot write memory to transceiver
