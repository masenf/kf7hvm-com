---
layout: post
title: Banned From Repeaterbook
---

> Your account at [Repeaterbook.com](https://www.repeaterbook.com) has been
> temporarily suspended due to unusual export activity. We are seeing multiple
> CSV exports occurring from multiple IP addresses less than a second apart.
> This could only be accomplished by some sort of bot. This puts a substantial
> strain on the server resources.

And just like that, a week after going live with
[`dzcb`](https://github.com/mycodeplug/dzcb) building codeplugs in the cloud, my
"unusual" actvity on the prox/csv endpoint was discovered and shut down. The
dzcb code has been using this non-public Repeaterbook endpoint for several
months, but it wasn't until Github Actions started downloading 18 different
proximity search exports for every push/pull request/release that it overloaded
the Repeaterbook servers enough to draw attention.

Upon receiving this email at 7:37 am local time, I promptly removed my
credentials from all related Github Actions builds and pushed an updated
version of `dzcb` that printed an error message, but otherwise
didn't attempt to download anything from the site.

It was never my intention to DoS Repeaterbook, it's a very valuable resource
that every operator I know has used at some point...and they don't
upcharge or have a tiered subscription model.

At the bottom of the email, Garrett suggested

> You may want to investigate the use of our API if you need data for some sort
> of project.

**So why wasn't I using the API to begin with?** While most data
was available in the API response, the geo coordinates of the machines notably
were **NOT** available in the response. Since I wanted to construct codeplug
zones with analog repeaters sorted by distance from a point of interest,
coordinates were a baseline requirement.

Although the prox/csv export endpoint that I had been hitting required
authentication and also didn't return coordinates, I could rely on the query to
return a CSV of repeaters _already sorted by distance_. The only wrinkle was
having to authenticate as a browser would: scraping HTML, submitting a
form, and snagging a cookie. Nothing too hard, but definitely a weak
point in the program as the HTML and field names could change at will
with no expectation of stability. At the time I didn't see an easy way
around this problem, and it certainly made my project less approachable
for users who needed to register with Repeaterbook and pass _their own_
credentials in to access the information. Read: more friction!

So, I finally decided to do what a sensible person would in this situation:
I asked for what I needed.

> I would prefer to use the API, but it doesn’t appear to return lan/long
> coordinates for US/Canada repeaters, so I couldn’t figure out how to simulate
> the Repeaterbook proximity search endpoint (which is why I was relying on the
> export CSV interface).

> ...

> If you have any ideas on recreating proximity search using the API, I’d
> appreciate it.

And less than 9 hours after my initial suspension notification, Garrett had gone
out of his way to implement Lat/Long fields in the API response!

> I have added lat and long to the api. Please give it a try and let me know.

I was blown away at both the turnaround time and Garrett's willingness to work
with me after abusing his endpoints and straining his server resources. All the
while, he was polite about it and very straightforward.  Back in November, I
exchanged emails with him regarding `dzcb` and distribution of generated
codeplugs based on Repeaterbook data and his willingness to work with and
interoperate with community projects is really excellent. I have no shortage of
good things to say about Repeaterbook and its administrator.

About a day later, I had the time to replace all of `dzcb`'s existing Repeaterbook
code with a new implementation that used the official API and local distance
calculation with [geopy](https://pypi.org/project/geopy/), while retaining
feature parity with the previous version. I also took the opportunity to clean
up the Repeaterbook proximity input CSV: adding field names and symbolic
names for the bands (`"2m"` and `"70cm"` instead of `14` and `4`). Additionally
the new implementation doesn't require login, so it's easier for new users to
get started with `dzcb` and less likely to break in the fragile web scraping
code.

To further respect the Repeaterbook servers, I implemented a "user-specific"
cache of the API response that will be reused for 12.1 hours instead of
redownloading the data for every invocation. For the cloud builds, I'm
leveraging Github Actions [`actions/cache`](https://github.com/actions/cache)
to save the API response on a per-project basis to reduce strain the
Repeaterbook servers. At this time, the raw API responses are shared between
codeplug input directories and are not cached in the codeplug output
directory/zip.

After some additional testing, I'm pleased to announce the release of
[`dzcb 0.2.4`](https://github.com/mycodeplug/dzcb/releases/tag/0.2.4),
which has been integrated into the
[`mycodeplug/example-codeplug`](https://github.com/mycodeplug/example-codeplug)
project and ready for immediate use.

Thank you to Garrett for implementing the Lat/Long API response and
Venkat ([@hillsboro](https://github.com/hillsboro) for encouragement
and testing.
