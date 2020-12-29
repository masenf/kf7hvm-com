---
layout: page
title: TYT (Tytera) Radio Info
---

[TYT (Tytera)](https://www.tyt888.com/) is a chinese manufacturer of commercial
and amateur radios. These radios are popular due to their relatively low cost
and versatility.

# Info and Stock Software

This page will focus on using the following models for Ham radio applications,
particularly on the Brandmeister and PNWDigital DMR networks:

  * TYT MD-380: Monoband DMR Handheld available in VHF and UHF variants.
    * Stock manual: http://www.rigreference.com/documents/rr-5ecd84ba3b2b01.74142421
    * Support custom firmware: http://md380.org/
      * Contact database
      * Last heard
      * Promiscuous Mode
    * After market manual: http://arec.info/DMR-downloads/MD380-user-guide.pdf
    * Stock CPS: 2020-05-08 [firmware D15.01 for MD-380 new vocode](https://www.tyt888.com/uploadfile/upfiles/20200506083948.zip)
    * Limits:
      * 1000 Channels
      * 10,000 Contacts
      * 250 Scan lists (of 16 channels each)
      * 250 Zones (of 16 channels each)
  * TYT MD-UV380: Dualband VHF+UHF DMR Handheld
    * Stock manual: https://md-uv380.s3.amazonaws.com/TYT%20MD-UV380%20User%20Manual.pdf
    * Stock firmware now supports digital contact database and monitor
      * No custom firmware support at all
    * Stock CPS: 2020-03-16 [MD-UV380, MD-UV390 firmware](https://www.tyt888.com/uploadfile/upfiles/20200316105738.zip)
    * Stock MD-UV380 Firmware 2019-11-20 [MD-UV380, MD-UV390 firmware](https://www.tyt888.com/uploadfile/upfiles/20191120100323.zip)
    * Limits:
      * 3000 Channels
      * 10,000 Contacts (or 120K with ContactListCSV firmware)
      * 250 Scan lists (of 16 channels each)
      * 250 Zones (of 16 channels each)

# USB Driver

Linux works out of the box.

Windows may require the STM32 DFU driver: https://www.st.com/en/development-tools/stsw-stm32080.html (requires an email address to download the package)

https://www.st.com/content/ccc/resource/technical/software/demo_and_example/93/55/e0/89/d1/e3/40/d5/stsw-stm32080.zip/files/stsw-stm32080.zip/jcr:content/translations/en.stsw-stm32080.zip

# Farnsworth `editcp`

Highly recommend the aftermarket CPS
[`editcp`](https://www.farnsworth.org/dale/codeplug/editcp/) by Dale Farnsworth
which supports all 380/390 variants and allows for conversion between the
different radios.

Additionally `editcp` runs on windows and linux and supports JSON
import/export for interfacing with scripts
and codeplug generators such as [`dzcb`](https://github.com/masenf/dzcb).
