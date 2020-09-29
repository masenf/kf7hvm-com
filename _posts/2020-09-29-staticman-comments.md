---
layout: post
title: Staticman Comments
---

Comments make an otherwise static site interactive and engaging for readers,
but for jekyll/github pages sites, there aren't a lot of options for
enabling comments. [Disqus](https://fatfrogmedia.com/delete-disqus-comments-wordpress/)
and Facebook comments are free, but include invasive tracking that slows the
site down and forced sign up which increases friction and reduces contribution.

[Hyvor Talk](https://talk.hyvor.com/) looks pretty cool, but it is yet another
paid subscription, which is not a hit I'm willing to take for a hobby website.

Enter [Staticman](https://travisdowns.github.io/blog/2020/02/05/now-with-comments.html),
a git-based comment platform for jekyll sites. When users make comments,
a backend service processes them and submits a pull request into the site
repository, if moderation is disabled, the comments are committed directly.

It's dead simple and fits with the jekyll ethos of a static generated site. The
external resource is only needed to post _new_ comments. Once a comment is
made, it becomes part of the static site's code and is regenerated and served
in the same way as all other content in the site. This is a huge benefit
of staticman, because comments often contain valuable information, corrections,
and updates for later visitors, allowing the site to be "maintained" even when
the original author is unable to update their posts.

The only downside to Staticman is configuration complexity. The official
documentation on the Staticman project site is outdated and recommends
and installation method using a Public API server which no longer works.
During deployment, I had to reference github issues, existing implementation
code from jekyll templates, and an
[extremely informative blog post](https://travisdowns.github.io/blog/2020/02/05/now-with-comments.html)
built on the shoulders of giants. All in all I had everything configured
in about an hour.

I'm using a separate github account (`kf7hvm-bot`), which I will probably
reuse for my other jekyll sites.

The Staticman endpoint is deployed on heroku free tier. I've never used
heroku before and found the deployment to be completely straightforward:
click a button, make an account, done.

Next, I set up reCAPTCHA using an existing Google account. Initially I picked
a V3 CAPTCHA, but that didn't work. After going back and selecting V2, I had no
problem generating the keys and incorporating them into the Staticman config.

The last step is to update the template files for the site to display
the comment form and render the comments. This is going to be hugely
variable from theme to theme, so the instructions are not easy to follow.
This is also where I spent most of my time during the implementation,
even after starting with the sample files from travisdowns' site.

The trickiest part was getting comments enabled for pages. To accomplish this,
I replaced the use of `page.slug` with `page.path | slugify`.  This also had
the nice benefit of separating comments for posts with the same title, but
different date (of which I use frequently).

If you made it this far, leave a comment and lets see if it's still working =].
