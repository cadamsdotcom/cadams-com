---
date: '2014-04-01 00:00:00'
layout: post
title: What's your unit of (software) reuse?
cover: assets/images/2022/05/e-waste-recycling.jpeg
author: cadams
tags: [technology, philosophy]
---
> Keeping concerns separate in software is a key step on the path to reusability, as a company I was at before 2013 learned, when a desktop web app suddenly needed to become mobile-ready.  
>   
> The desktop web app had significant business logic in UI components, which was not feasible to duplicate 3 more times to support mobile web, iOS, and Android.
We are constantly trying to lighten our load on Earth. A lot of man-made things are designed to last beyond their useful life, going full-circle and ending up in a store after being discarded and remade.
New packaging can be made from old packaging - old plastic and cardboard, recycled. Mother nature has been doing this for a long time! Consider earthworms, munching organic matter from dead plant material and producing soil, so the cycle of growth continues. Earthworms can do this, because the material being reused is organic, and there’s only one kind of thing in the mix.
![Earthworms making soil](https://cadams.com.au/images/earthworms.jpg)
Most of the “stuff” we consume is not designed for reuse. It's designed to end up as landfill. Pieces of disparate material: wood, plastic and cardboard, glued or snapped together never to come apart. I was throwing away the box from a toy helicopter the other day, and its plastic window was glued to its cardboard box. Unsure how to recycle this I shrugged and threw the whole thing in the recycle bin. Some poor person has to take that plastic and cardboard apart and put them in separate piles - if they don't just throw it in landfill.
Today we have [toxic e-waste](http://www.cbsnews.com/news/following-the-trail-of-toxic-e-waste/) being handled by humans. There are [facilities in China](https://news.climate.columbia.edu/2018/08/27/growing-e-waste-problem/) and Africa where electronics are pulled apart, separating toxic metals from wires; circuit boards from plastic casing.
![](/assets/images/2022/05/image-1.png)
I wish I knew what to do about it, but alas I'm a software engineer.
**This post is about how the same phenomenon arises in code.**
Code from a “good” codebase which is going to be reused, when viewed at say 10% magnification, has a very obvious “appearance”:
  * You can tell from the size of the functions you're looking at and the indentation, whether it's likely to be a handler function, database query, view, logic that mostly wraps an RPC call, or many other things.
  * Controller code is short methods delegating work and rendering - you won’t see much nesting.
  * Repositories look like database accessors, inheriting most of their behavior.
  * Views are mindless puppets mostly made up of template code.

![Different types of code appear different when you zoom out](https://cadams.com.au/images/code.jpg)
In a “bad” codebase though, the same parts are there but the code has no specific appearance. All the “materials” the code is made from - models, repositories, controllers, views, helpers, services… - weave in and out with each other and are difficult to pry apart.
![](/assets/images/2022/05/image-4.png)Example material composition of e-waste.
No one ever minds that concerns are mixed up, because everything works great and business is humming along. That is, until the company must react to change:
> Our traffic just hit 50% mobile! We need apps and a mobile site yesterday!
Hopefully, some of your code can be reused on mobile. But how much must be rewritten? Will you:
  * Keep the existing code in place?
  * Support both desktop and mobile in the new code?
  * Or rewrite the business logic, front it with an API, and migrate to it?


Unless you’ve been diligently keeping code concerns separate - keeping your “materials” easily recyclable - you have a lot of work ahead, much code will get thrown away, and a ton of new code will have to be written which reimplements what was already there.
In a complex, aging codebase I worked on recently, there were UI controls which had significant business logic in them. Guess what happened when it was time to put this logic in the mobile app?
The new mobile web UI, plus iOS and Android apps, added 3 new ways to get the same data and do the same things. The 3 new UIs all arrived at the same time. Duplicating business logic _3 more times_ was a non-starter.
With the business logic locked up in the desktop site’s view code the company had to do [a complex series of migrations](https://lethain.com/migrations/) and duplicate work:
  1. Infrastructure was prepared to move the business logic to separate backend services.
  2. A new backend service was built to supply data and perform operations on behalf of each of the 3 new UIs.
  3. An API was created for the 3 new UIs to fetch data.
  4. The 3 new UIs were built, tested, and launched.
  5. The desktop app's (duplicate) data-fetching and processing logic was then migrated to the new API.


Non-plot twist: everything worked out OK, the project was a success, but writing the logic then retiring the now-duplicated logic in the desktop web app was definitely "learning the hard way".
The lesson:
**Rather than trying to anticipate change, try to respect the “materials” your code is made from.**
Single-concern code has an "appearance", if you zoom out.
Business logic creeps in all over the place, unless you're watching closely.
Different code has different properties. If you keep them apart nicely you can recycle them. Put them together too tightly and you’ll get an unrecyclable mess, only good for landfill. Be more like mother nature and _recycle!_
