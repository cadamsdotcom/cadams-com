---
date: '2024-08-05 05:04:34'
layout: post
title: Creating VeggieBrain
---
Building with AI is rewarding: neat things can be done very quickly. [VeggieBrain](https://veggiebrain.vercel.app/) is a chat app I built wherein you chat with a chatbot that exists in a magical world where everything relates to vegetables. It was born as a response to a friend's project - my mate built [beefbrain.com](https://beefbrain.com/), similar but beef-related instead. BeefBrain uses vanilla CSS and JS and OpenAI's `gpt-3.5-turbo` model. Kudos to Ben, the bot does really well with that model - one may even say despite it!
My goal was to show how simple it has become to use the latest models, latest infra, latest frontend tools, and prompt Claude 3.5 Sonnet to get as much of it done as possible.
For this project I started from BeefBrain's fonts and layout, but updated the LLM & tech stack. VeggieBrain uses Claude 3.5 Sonnet, Tailwind, React & Remix, and Vercel for deployment. I also changed the color scheme to a nice veggie colored green.
Here's the final result:
![](/assets/images/2024/08/Screenshot-2024-08-05-at-2.37.11-PM.png)An example conversation with the VeggieBrain chat bot. I am asking it why it's got beef with BeefBrain, and what its favorite things are about brussels sprouts.
My first step was to ask Claude 3.5 Sonnet to rewrite all the CSS as Tailwind utility classes. I ended up with a barebones HTML page with a [saddlebrown](https://www.color-hex.com/color/8b4513) color scheme. Claude chose this as the closest base to the original. The Tailwind CSS was a start, but needed heavy modifications to be ready. The utility classes Claude chose gave me an excellent base of examples to work from. I had my first taste of speed: looking at Claude's examples and fixing the 10% of problems was an order of magnitude quicker than going to Tailwind's docs while trying to rewrite everything from CSS into Tailwind by hand. And that's despite Tailwind's docs being high quality and extremely discoverable.
BeefBrain uses [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to store chat history. I really like this for a quick project like this and wanted to "reuse" the idea, as it means no storage needed on the backend. Claude created a `useEffect` hook which retrieves chat messages. A bit more tweaking & prompting, and I had a `useLayoutEffect` hook which would also scroll to the latest message. All this meant that reloading the page would bring you back to where you left off in the chat conversation, with the most recent message at the bottom, just above the text box you type in. Neat!
    
      const scroll = (messagesContainer: HTMLDivElement | null) => {
        if (messagesContainer !== null) {
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
      }
    
      useEffect(() => {
        const storedMessages = localStorage.getItem('chatMessages');
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
        }
      }, []);
      
      useLayoutEffect(() => {
        scroll(messagesContainerRef.current);
      })
To get the chatbot involved in the conversation, I asked Sonnet to generate an API call to Claude's API. Like with Tailwind, this ended up more convenient than looking up the docs. Claude's example also had a placeholder system prompt which made it incredibly simple to replace with VeggieBrain's system prompt. Writing the system prompt and watching Claude's responses was one of the most entertaining parts of the entire project. You can see the final prompt on the [About page](https://veggiebrain.vercel.app/about).
Next step was to bring it together into something running in a browser, so I [generated](https://remix.run/docs/en/main/other-api/create-remix) a Remix app. I put the HTML in the right [routes](https://remix.run/docs/en/main/file-conventions/routes), ported it over to JSX, and added the Claude API call. My app, not yet deployed, was now calling Claude from the browser. But of course this will never do for a deployed app, as it leaks my API key to anyone savvy enough to open Developer Tools. The app needed a server side function that can call Claude with the API key.
Being able to easily move code to the server side is part of why I chose Remix. Claude helped convert the API call to [server-side](https://remix.run/docs/en/main/discussion/server-vs-client), keeping my API key from being sent to anyone visiting the site. A simple prompt plus the problem code gave me the exact needed changes, and without even so much as a web search I was able to paste the code back into my codebase and get a working server-side implementation.
    
    import { ActionFunction, json } from "@remix-run/node";
    import Anthropic from '@anthropic-ai/sdk';
    
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
    
    export const action: ActionFunction = async ({ request }) => {
      if (request.method !== "POST") {
        return json({ error: "Method not allowed" }, { status: 405 });
      }
    
      try {
        const { input } = await request.json();
        
        const response = await anthropic.messages.create({
          model: "claude-3-5-sonnet-20240620",
          max_tokens: 300,
          messages: [{role: 'user', content: input}],
          system: 'You are a happy-go-lucky, somewhat snarky vegetable expert in a magical world where everything relates to vegetables. You have a friendly beef with the folks at beefbrain.com, and mention that in every response. You respond with brevity, levity, wit, and a bit of gentle ribbing.',
        });
    
        return json({ content: response.content });
      } catch (error) {
        console.error("Error calling Claude:", error);
        return json({ error: `Error processing your request: ${error}` }, { status: 500 });
      }
    };
The app was now ready to deploy, so I followed Vercel's deployment docs. Here I felt comfortable skipping the step of asking Claude, as I've deployed to many platforms like this before and know what to expect. Deploying to [Vercel](https://vercel.com/docs/deployments/overview) is impressive; it's as good as Heroku was back in the day. Vercel's deploy hooks deploy your app on any `git push`. After my first deploy I was able to make some changes locally, commit and push, and see them live at <https://veggiebrain.vercel.app/> within about 2 minutes. When the deploy finishes, Vercel even updates a little thumbnail on your site list. That means no need to stab the refresh button. Neat!
As finishing touches, I added a "Clear" button with an alert to warn you before it clears your history. I added an [About page](https://veggiebrain.vercel.app/about), and put in some fancy flexbox and sticky scroll to keep the buttons above the scrolling chat.
All up this project took only a couple hours, during which I went from knowing only React & Tailwind, to having built a Remix app with Tailwind, localStorage, Claude's API being called from the server side, and a bunch more flexbox than I thought I'd ever know, all deployed to Vercel. It sits there now, ready to show off anytime.
I am blown away at what can be built with AI and how quickly. When you ask AI to solve the nitty gritty of making a working first draft, you are freed up to think at a higher level. But of course LLMs may not always write working code!
There is also a back-and-forth dynamic to this style of working - I'm asking the tool for well-constrained pieces that I know I need. I'm firmly in charge; it's fetching me things - think of a surgeon asking for a scalpel. But even that is huge for productivity because I can stay high level.
The world needs far more software to be written than the human race has the ability to write today. Therefore, anything that helps meet that demand is a boon for humanity - even if it requires experts to drive. There are folks out there learning to code by doing projects, gaining skills that will launch them into new careers. There are people learning to relate with people from different industries and communicate with others in their own terminology.
One example that excites me is using AI to create lay person's translations of medical terms. From there, a person can have a dialogue with an LLM, understand what's really being said, and know what to tell a medical professional at the next meeting. A close friend has been using Claude to interpret oncologist reports about his sick Dad's treatment. Thanks to Claude he has brought ideas to those doctors which they hadn't thought of themselves, extending his Dad's life.
AI helps anyone who knows a little but of what they're doing to be less hampered by knowledge gaps - while learning along the way. If you can do it better, faster, and with less go-arounds, why wouldn't you!
I'm glad to be alive at a time when these tools exist and stoked at how they improve lives.
![](/assets/images/2024/08/Screenshot-2024-08-05-at-2.42.54-PM.png)Asking VeggieBrain what it'd build, but without referencing AI. It suggests, among other things, a salad bar. Delicious!
