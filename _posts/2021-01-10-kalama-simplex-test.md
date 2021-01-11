---
layout: post
title: Kalama Simplex Test
---

Last Saturday, I participated in a simplex testing exercise in 
[Kalama, WA](https://aprs.fi/#!mt=roadmap&z=9&ts=1610150400&te=1610236800&call=a%2FKF7HVM-5)
to determine communication capability in the absence of grid comms.

Eight tactical teams and net control spread out to a number of predefined locations
in the area and checked in via 50w mobile 2m VHF to establish role. As
net control proceeded to call the TAC stations, they would report their
position by different available means (2m handheld, FRS handheld, GMRS mobile)
as the other stations recorded a signal report from 0 to 3. After the
called station completed their tranmissions, they alerted net control via
2m 50 watt.

After the complete roll call, teams would move to a different location and
repeat the process.

After collecting all of the reports, we can better understand where stations
should be located to maximize communication possibilities.

# Lessons

More pre-planning, written instructions, and scripts could have saved some
time on the day of the exercise that could be spent testing more locations.

On the suggestion of a team member, the roll call for the 2nd and subsequent
rounds was simplified by having each station test all of their modes
when called by net control. Other stations were more likely to copy the
initial, strong 50w mobile acknowledgement of the station and location
and be ready to mark reports of each subsequent mode / transmission.

As a practice exercise, I think it would have been valuable to also play
a game of telephone with each station having a codeword at each location
and passing this along with their transmission. I think it would have made
the experience more fun and prepared participants for relaying and traffic
passing scenarios.

Broader participation, particularly with non-hams, would teach our family
and neighbors better operating technique. Mobile stations operated by
licensed amateurs are good relay points for dissmenating information
across neighborhoods via widely available "bubble-pack" radios found in
most households. Everyone should understand how to use and practice
operating the equipment available to them should the need arise.

# `simplextest.net`

As a programmer I've been thinking of how simplex testing and emcomm
exercises might be simplified and streamlined such that they could be
performed more often and undertaken by those with less experience.

To that end, I'm writing a simplex testing app that allows users to create
simplex "groups" consisting of "members" (operators) and
"zones" (locations) of interest. A group can schedule an "exercise"
at a certain date/time with a subset of members as participants, net
control, and relay stations. An exercise would include one or
more communications modes:

  * 2m (FT/aprs/digital)
  * CB
  * HF (voice/data)
  * UHF (FRS/GMRS)
  * etc

During an excersise, the interface would allow the operator to quickly
enter signal reports and notes for the stations they can hear. As stations
move, their location can be reported or updated automatically via GPS.
If the station has internet access, the information would be synced 
and visible to the other stations, especially net control.

At the conclusion of the exercise all stations would connect to the
network and sync their reports. The combined data would be visualized
on a map with lines between stations indicating their communication
capabilities.

The exercise station script, at minimum, would feature location
and signal reports, and could include one or two way traffic passing.

The simplex "group" collects previous exercises and can be analyzed
to provide suggestions for strong net control and relay station
locations to best serve the groups' members.

All of the information in the app should also be printable.
In a grid down situation, a web app likely isn't available, but the
skills that are developed should be usable without other comms.
This app is designed to make preparing for grid down comms easier
to coordinate, it likely doesn't provide much utility in an
actual emergency.
