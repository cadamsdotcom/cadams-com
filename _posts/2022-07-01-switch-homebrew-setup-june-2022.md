---
date: '2022-07-01 05:25:00'
layout: post
title: Switch Homebrew Setup in June 2022
cover: assets/images/2022/07/switch-homebrew-1.jpg
author: cadams
tags: [technology]
---
If you have a [Nintendo Switch which can be patched to run homebrew software](https://nh-server.github.io/switch-guide/user_guide/getting_started/), the possibilities are endless. Fortunately for me, my Switch falls into this category. More people should try it!

Over the years of owning this console I've enjoyed tons of great homebrew software, first via SXOS custom firmware (discontinued, allegedly due to a [raid](https://www.reddit.com/r/SwitchPirates/comments/j6h1ak/so_now_that_the_tx_team_were_arrested_is_sxos_dead/)) and now via [Atmosphere](https://github.com/Atmosphere-NX/Atmosphere).

The tools have improved steadily over the years as have the guides out there. My guide is my attempt to cover all the steps involved, trying to avoid the pitfalls. I hope it helps you!

## Before you start

You need to be able to get your Switch into [RCM Mode](https://nh-server.github.io/switch-guide/user_guide/emummc/entering_rcm/) (an RCM jig is easiest, I made mine from aluminium foil) and inject payloads via [fusee-gelee](https://github.com/Qyriad/fusee-launcher).

What that and an SD card (mine is 128gb), this guide should be all you need!

Instructions are for Mac.

## What you get

  * The latest Switch firmware
  * Hekate - low-level toolkit for USB emulation etc.
  * Atmosphere - custom firmware
  * Convenient ways to bounce between Hekate and Atmosphere without a laptop
  * 100% open source, no more sketchy payments

## What to download to perform these steps

  * Hekate - low level firmware + SD card emulator for usb-c  
So you never have to take out the SD card  
From <https://github.com/CTCaer/hekate/releases>
  * Atmosphere & `fusee.bin`  
From <https://github.com/Atmosphere-NX/Atmosphere/releases>
  * Latest SigPatches for Atmosphere  
From <https://github.com/ITotalJustice/patches/releases>  
(SigPatches stop games crashing on launch)
  * Switch Firmware 14.1.2  
From <https://archive.org/details/nintendo-switch-global-firmwares>
  * git clone <https://github.com/Qyriad/fusee-launcher>

## Instructions

Instructions are broken into 5 parts:

  1. Putting all the files on the SD card
  2. Easy way to jump from Hekate to Atmosphere (via launcher)
  3. Easy way to jump back (via reboot to payload)
  4. [emuMMC](https://nh-server.github.io/switch-guide/user_guide/rcm/), runs firmware off your SD card, to defeat a variety of Nintendo's anti-homebrew measures
  5. Latest firmware from Nintendo

### Part 1. file prep

  1. Mount the SD card
  2. Extract zip files for Hekate, Atmosphere, Firmware 14.1.2, and the SigPatches to the root of the SD card
  3. Choose "Merge" when prompted, otherwise you'll delete savegame files etc. that are on the SD card

### Part 2. a way to get from Atmosphere to Hekate

  1. Delete (or rename away) `atmosphere/reboot_payload.bin`
  2. Copy or move `hekate_ctcaer_X.Y.Z.bin` to `atmosphere/reboot_payload.bin`
  <br>
  (Now, "reboot to payload" from the homebrew menu takes you conveniently from Atmosphere to Hekate)

### Part 3. a way to get from Hekate to Atmosphere

  1. Copy `fusee.bin` to `bootloader/payloads/fusee.bin`
  2. Add this to the bottom of `bootloader/hekate_ipl.ini` (create the file it doesn't exist):
    
    [Atmosphere CFW]
    payload=bootloader/payloads/fusee.bin
    
(Now, Hekate's Launch menu has an option "Atmosphere CFW")

3. Unmount SD

### Part 4. prep emuMMC

emuMMC may already be set up if you have SXOS but just in case, you should check and make sure [your Switch won't burn any fuses](https://www.reddit.com/r/SwitchPirates/comments/cgtuc3/autorcm_and_emummc/)

  1. Turn on the Switch in RCM mode & plug in USB-C
  2. Inject Hekate payload using fusee-launcher
    
    # NOTE: Your paths and python executable may vary
    $ cd ~/src/fusee-launcher && . ./env/bin/activate && python3 ./fusee-launcher.py ~/Downloads/hekate_ctcaer_5.7.2_Nyx_1.2.2/hekate_ctcaer_5.7.2.bin

{:start="3"}
  3. Go to emuMMC, confirm emuMMC is enabled in green at top left
  4. If not, [follow these instructions](https://nh-server.github.io/switch-guide/user_guide/emummc/making_emummc/) to make an emuMMC, NAND backup, and get your console's unique keys.

### Part 5. update to latest Switch firmware

Atmosphere bundles a utility for firmware update called Daybreak. It'll appear in the homebrew launcher. No more [ChoiDujourNX](https://www.cfwaifu.com/choidujournx/) (the recommended tool to upgrade firmware with SXOS)

Daybreak only has one niggle: it hates Mac dotfiles.

  1. Mount SD card (with Hekate: `Tools -> USB Tools -> SD Card`) and run this command in a terminal:
    
    # Replace with the path to your SD card
    $ dot_clean "/Volumes/<SD CARD NAME>/Firmware 14.1.2"

{:start="2"}    
  2. Eject SD card in Mac Finder
  3. Launch Atmosphere from the menu  
NOTE: if you are not using Hekate as an SD reader/writer, you can inject Atmosphere from RCM Mode with:
    
    $ cd ~/src/fusee-launcher && . ./env/bin/activate && python3 ./fusee-launcher.py ~/Downloads/fusee.bin

{:start="4"}    
  4. It should boot Atmosphere. Go to Photo Album (homebrew launcher) and launch Daybreak.
  5. Update the firmware using Daybreak
  6. Choose FAT32 + exFAT driver

## Tips & Tools

  * Hekate SD card reader/writer: Tools -> USB Tools -> SD Card
  * Hekate archive bit fixer: Tools -> Arch bit (bottom right) -> Fix Archive Bit

## Installing NSPs and XCIs

Some games come in [NSP, NSZ, or XCI formats](https://www.reddit.com/r/NewYuzuPiracy/comments/puuc9p/whats_the_difference_betwen_nsz_nsp_and_xci/). These files need additional tools to install. Grab [Tinfoil](https://tinfoil.io/Download) and either:

  * Use [nut](https://github.com/blawar/nut) to install over USB
  * Use Hekate's SD card reader/writer to copy your files over, then Tinfoil to install from the SD card.


