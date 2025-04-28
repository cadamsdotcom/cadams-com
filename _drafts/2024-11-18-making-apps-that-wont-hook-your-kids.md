---
layout: post
title: Making apps that won't hook your kids
author: cadams
---
This post is about a superpower we gained in 2024. With a little work AI can build you whatever software you ask for. Because it's made by you, it can work the way _you_ want. The saying "there's an app for that" is great marketing - now it can finally come true.
Large language models like Claude and ChatGPT can write code! Just describe what you want and they'll choose the software tooling, write the code, and explain it too. Then you can ask how to make the code work and use those instructions to try it out.
When it's not quite right (it never is the first time) you can also ask for changes!
It's not yet suitable for making anything complex unless you're already a software engineer or you're very persistent. That said, for little toys it works great. Why not make an app for your kid. Unlike most of the app stores yours can be free of addictive tricks; free of micro-transactions, have no ads, have no time-based unlocks, no in-app purchases, and no fake currency tokens. You could even bake in a screen-time limit - just ask for that feature when you specify what you want. The sky's the limit.
Maybe you want to create a story about your kids, or maybe a flappy bird clone.
To prove the concept I went and created a pocket xylophone. I call it XyPhone.
Farm animal noises apps on the app store
  
overly monetized apps for kids/babies, let's make our own!
outline
this post is about
lLMs cam write code
problem: spo many apps today are crap, overly monetized, and some are even worse - designed to hook kids
show examples of how terrible the apps are
sad state of the app store in 2024 is that nothign is free, everyone is trying to suck money out of you, and in a lot of cases the only move is not to play.
making my own - xyphone
\- first cut - asked for an app
\- realized i could just do my own swiftui
\- process for self meta learning, trying ot make another app and found 12 hour course, came back and understood what to do to make my own thingy
\- generate audio - would've have to look up frequencies and how to make audio with AudioKit - saved a ton of time there
harmonics & reverb would have had to play with values to get something good, instead got a great first cut right away.
\- tr-catch around call to sunthetizer.sendProbramChange
\- uint8 fix
\- same width bars
(screenshot of original look)
\- ignore safe area
\- overlapping notes
\- popping when a button is pressed
\- tried attack/release, midi tempo
\- tweak instrument duration
\- why fuzzy at startup???
\- tried to add a loading indicator
\- asked for it to generate the waveforms fo rthe nortes - didn't work, it insisted I could just insert wav files of each note
dragonbreath
\- wanted for a while to be abel to breathe on the microphone and have fire come out
\- claude version was crap (include a video)
\- grabbed a stock fire footage but it was too slow
\- asked for a ffmpeg command to speed it up 2x, that wasn't fast enough,m went to 3x and then 5x then 10x. the faster the better up to a point, since the whole point is to have a snappy demo that gets the point across before people get bored, so went for 10x speedup
\- i believe this is fair use as it's parody and being done for educational purposes to demonstrated the power of AI to write code
\- todo: add fire crackling sound effect from youtube. add it as a soundtrack to the video so it's always in sync.
\- adding the sound
\- downloaded a fireplace crackling, firest5min of https://www.youtube.com/watch?v=xKFBYZNXqAk
\- and a fireball sfx https://www.youtube.com/watch?v=AHRf27GPhQc
\- sped up teh fireplace 16x to get more crackles
\- boosted the bass
\- trimmed the fireball to just a whoosh portion
\- sped it up slightly
\- overlaid then on top of one another
\- sped up the whoosh 1,5x so it was right length for the video and redid the overlay
\- added it as the sound for the video
\- rebuild the app and voila!
\- needed to play audio via speaker!
\- sfx: 
recap
