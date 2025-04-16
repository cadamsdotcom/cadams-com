---
date: '2024-09-26 02:00:15'
layout: post
title: Ideas to level up daily standups
author: cadams
tags: [technology]
---
Today while reading [The Daily Scrum](https://rethinkingsoftware.substack.com/p/the-daily-scrum) over at [Rethinking Software](https://rethinkingsoftware.substack.com/) I realized that what is framed as a complaint could be reframed as a question:

Why do daily standups cause so much consternation and anxiety?

A couple reasons were given:

  * It's hard to remember what I was doing yesterday.
  * Some tasks are bigger than a day.
  * Sometimes I spent the day stuck, and that shouldn't be demonized - or worse, misconstrued as me not doing my job.

Rather than focus on the unpleasantness of standups I think we can examine the symptoms and see if each can be solved in isolation. By addressing each reason the balance tips back in favor of standups.

Here we go.

## It's hard to remember what I was doing yesterday.

Agreed. I feel you. It is _really_ hard to remember what was going on yesterday. And for good reason! Your mind was occupied on work, with no spare cycles left to remember what work was being done. For this, we are crying out for better tooling. It should be possible to gather your entire day's artifacts (PRs reviewed & submitted, GPS if you like to go for walks, messages sent, screenshots of your devices, maybe even cafe receipts!) and run a pass over them to produce a thorough summary at the right level of detail for your audience, ready to edit and send out.

So let's say we have this hypothetical tooling. It's tracking everything you do, you trust it, it's utterly private to you. It aggregates every data source in your life. It shows you how much time you burnt on Hacker News (yuck!)

Almost no one sees the day play out this way, which means tremendous efficiencies await, right in front of us. Maybe that 5 minutes on Hacker News was actually an hour but you didn't notice - great! That's data. Doesn't have to be shared but at least you know. And that accountability won't help you the first, 5th, or 10th time - but over time you can see patterns emerge. And none of that has to make it into your daily summary.

And even better - imagine it being so quick and easy to summarize yesterday's work, that you now do it at the end of your day when you sign off. It's no surprise that the morning is a terrible time to remember yesterday - you've had a big evening to yourself and a sleep and your working memory is empty - you're about to tackle today.

Evening summaries take care of the boring parts of standup - everyone already gave their update, you can read it while you wait for that teammate who's always 2 minutes late. Giving your update as you sign off would be a boon when you working across timezones. Imagine handing off to the team on the other side of the world with an explainer: what branch to find the code in, what bugs & features you tackled, what support requests you responded to...

This is a big and real problem and we're never going to solve it with our fully-occupied brains which means we won't solve it with process. We need better tools.

## Some tasks are bigger than a day.

Definitely solvable with process and culture. This point provokes the question of whether daily accountability is valid because some tasks exist at the scale of weeks or months and no progress can be expected day to day. My counters to this are:

  1. **There is orders of magnitude size difference between tasks.**  
  Some tasks take 3 minutes and some might take 3 months. Daily cadence splits the difference. But sometimes when you can see a task not move, you can change the approach and turn a 3-month task into a 3-day one. Seeing daily non-progress might suggest a need to break the work down more.

  2. **No task being worked on should be bigger than a day.**  
  Keep breaking those tasks down and keep tracking them! Everyone hates on task tracking tooling; and it makes sense because a line item always takes 40-100 vertical pixels but could represent any size of work, risk, and certainty across 2 or 3 orders of magnitude. Some work is too tiny to track - better just do it and have it done. Better tooling (see above) would help see where the point of diminishing returns lies, expose work that's not tracked, and expose dead time spent wrangling task tracking tools!
  <br><br>
  But none of this excuses a professional from scoping the work, breaking it down, enumerating it, and making sure it's visible so it can be tracked. This is a basic expectation of operating in a team.

  3. **It needs to be OK to burn a day.**  
  This is a cultural issue that's often discussed. Daily standups uncover when someone burnt a day. Depending on the culture that either results in the person being blamed or the team chipping in to help. But either way daily standups are a stopgap measure to stop you burning a week or more instead. It's one of the big positives of standups. Nothing here to add except, implement [blameless culture](https://hbr.org/2023/05/how-to-build-a-blameless-work-culture) throughout your org, not just in postmortems. Any time something bad happens, it's not the person's fault it's the process. Build broke and burnt a day? Great, invest in the build.
  
  4. **It needs to be permitted to discover unplanned work.**  
  No matter how well you scope something, there will always be things you didn't anticipate. It can be anything from a software update breaking your system and costing half a day to unstick, to a bug in a third party API needing a workaround, to doing the easy, naive implementation of an algorithm and discovering it has poor results. It might be in your control but it's usually going to be something out of your control. These things happen, whether your team and leaders like it or not.
  <br><br>
  To help here, give people permission to flag unplanned work. (Whether unplanned work is tracked as such is up to the team and org.)
  <br><br>
  Great news! Your daily standup surfaced something that could've tanked the project. You can plan the new work in with everything else. And you can rethink the whole plan if this bumps up against constraints in new ways.

## Sometimes I get stuck all day, don't judge me.

It's not your fault. It happens! You need to be psychologically safe to raise that -again, [blameless culture](https://hbr.org/2023/05/how-to-build-a-blameless-work-culture) is crucial.

Even worse, it's sometimes hard to even know what you were stuck on. We lack tools too see precisely where things go off the rails (see above), but in the absence of information it's human nature to [make up something awful](https://randsinrepose.com/archives/gossip-rumors-and-lies/), so you owe it to yourself and your team to always understand what went wrong and surface it so you can get. Even an imprecise description can be refined with the help of the team all being online.

The daily stopgap of daily standups ensures you don't burn a week stuck.

People shouldn't judge you for burning a day - but if you don't raise the problem and you burn a second day, that's you not using the tools at your disposal and that's really not great.

## Maybe software engineers just need to suck it up and account for our time like other professions?

Why don't we just make time-tracking part of what we do? Why have the decades passed and this hasn't become a question?

After all, plenty of professionals consider accountability for time spent to be a requirement. Lawyers bill for time and must account for it. Unbillable time equals lost revenue. Everyone in these professions hates invoicing, but it does makes abundantly clear who's goofing off and who's bringing in that cash money.

Maybe we need time tracking? Maybe daily standups are a tool for time tracking, so we can see who worked each day and who goofed off or got stuck too often?

Nope, and we all know why. Accounting for time is only informative if more time spent on a task strictly equals more money earned. If the work being done is linearly correlated to the revenue it generates, sure - create accountability to stop people goofing off. But software engineering is full of bumps in the road, creative solutions that have outsized impact, and left-field innovations that no one saw coming that you had in the shower.

So that's not it. Daily standups can't be used to guilt-trip people into sitting at their computers and producing output all day.

But we can't have you goofing off forever, else you'll get paid for no work - and sometimes, paid for negative contributions, making others slower. We still need _something_ to tell us if we're not productive.

## The answer lies somewhere in the middle.

The software engineering profession resists accountability despite existing in a context that requires it, so some level of accountability is a requirement. There's only so much money and time to get results from investing in us and our work.

We lack tools to understand where the time and energy goes at a level beneath a single day. Adding tools for sub-daily time tracking would fuel a revolution in productivity. But even adding some process changes can help - like sending a "what I did today" at the end of the day, even without summarizing tools.

In the absence of higher granularity progress tracking, daily standups are a good compromise that has been settled and can really help. It's not compulsory and it's not universal. But it helps the business and helps the team.

With the right culture in place and even without better tools & a few easy process improvements, daily standups still work. But _only if the culture is blameless and help is offered when needed._

So in summary:

  * Better tools, if they existed, could help improve our intra-day understanding of progress.
  * Daily checkpointing is a good compromise for keeping you from burning too much time, while also helping the team and business see progress and course-correct.
  * Daily cadence maps well to a reasonable task size.
  * Unplanned work and blockages _happen_. A healthy, blameless culture will acknowledge this, accommodate, and assist.
