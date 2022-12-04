# Bowling Scorecard

https://bowling-score-card.vercel.app/

![image](https://user-images.githubusercontent.com/14803518/205494190-6440aed4-9da2-4bb2-8149-f1cf7cbca76e.png)

![image](https://user-images.githubusercontent.com/14803518/205494272-d3065c0d-76a2-483b-be47-36d725c08c1f.png)

A web app which allows a user to input in the scores of a bowling game.

## Features

- User can add in extra players or none (defaults to one player)
- User can rename the current player before the game starts
- Clicking start confirms players are ready to bowl!
- Scores are input via buttons and correctly calculates the scores
- Strikes and spares are estimated until its criteria are met (see below)
- Frame 10 allows for an extra bowl if the 2nd bowl makes a spare or strike, or if the first bowl is a strike
- At game over, it will announce the winner or tied winners

### Spares

A spare is where you knock down 10 pins with two bowls. This includes getting zero on the first bowl and knocking down 10 on the second.

Once this is achieved that player receives 10 points as well as the points of the next bowl of the next frame.

### Strikes

A strike is where you knock down all 10 pins on a first bowl. That frame is over and there is no 2nd bowl.

Once this is achieved that player receives 10 points as well as the next two bowls.

# Tech Stack

- React
- Typescript
- Next.js
- Tailwind CSS
- Jest
- Cypress
- Deployed to Vercel

## Testing - Jest & Cypress

[![Image from Gyazo](https://i.gyazo.com/89df901784e007b95556f674cc48bd58.gif)](https://gyazo.com/89df901784e007b95556f674cc48bd58)

I added End to End testing using Cypress to help build out the app and get visibility of its features especially when refactoring.

![image](https://user-images.githubusercontent.com/14803518/205377551-34379816-2021-4bf8-8e53-d39456fff522.png)

![image](https://user-images.githubusercontent.com/14803518/205377665-171ac05a-fcef-401a-89aa-f6c7cedbc566.png)

I used Jest to unit test at my discretion, mainly at a rather more complex function I was writing.

![image](https://user-images.githubusercontent.com/14803518/205377843-27b11ed6-14f1-44a6-9956-39b113e2e3a8.png)

To run these tests locally;

```
git clone git@github.com:puyanwei/bowling-score-card.git
cd bowling-score-card
yarn
```

- to run jest tests type `yarn test`

- to run cypress tests type `yarn run cy`. This will open up Cypress in another app. Then choose 'End to End' option and then click the tests you want to run.

## Why

I had this challenge at Makers Academy Boot Camp and after 3 attempts (granted using Object Orientated Programming style and vanilla Javascript) and never managed to do it, so after 3ish years in the industry I thought I'd have another crack at it.

## Process

It's always hard to know where to start, that is backend (i.e the logic) or frontend. Nowadays I find it useful to always start with the front end with some mocked data.

1. **Setup project** - `create-next-app` with Typescript, add Tailwind, setup github!
2. **Mock my data** - So since we're in JS land, I thought about what kind of JSON object we'd have, and the different key/value pairs we'd need.
3. **Roughly build out components/html** - Build out the page in the roughest form, meaning add in all the tags/components that is needed. Abstracting out components can happen later/when one file becomes too annoying to work with.
4. **Use data to build out components** - Once imported in, I would use the data to figure out which components should take the data down as props and potentially pass it down further if it has children.
5. **Prepare for Cypress tests and write them** - Since I knew this would start getting complex pretty quick, I decided to make sure all the main components had `data-testid` attributes for Cypress to use for the End to End tests. I considered that when adding in new features/refactoring it could break other sections of the logic so tests are a good way of getting that visibility.
6. **Incrementally add features** - Its important to take an agile approach and not do everything at once or it will get hard to keep track of things. For harder functions I used some Jest tests to make sure they were working correctly, and luckily since we are using Typescript we can have that assurance that the data types are correct and accounted for.
7. **Styling** - Once it all works, style away. Mine can be improved to be honest...
8. **Deploy** - Actually this process can be done as part of the setup, where anytime you commit it does a build on Vercel.

## 5 things I learned coding this

- **Strikes make it a lot harder** - Data structure seemed simple enough, but when strikes logic were applied I realised I needed an extra key/value pair to keep track of the next 2 bowls. So I decided to add `nextTwoBowls` which was an array of two items, which were updated on each points input.
- **Total scores state funkyness** - I probably haven't implemented this in the best way, but when I calculate a currentFrame's total score, if there is a strike/spare in the previous frame, the previous totals would have to be recalculated too. So I modified the previous scorecard that was passed down directly to achieve this. This caused some data to be left behind when implementing a reset button, so in the end I just did a window reload as a compromise.
- **Adding players state issues too** - An after thought was to go above and beyond and add new players feature. When adding in an initial `Player` object to the initial scorecard object, that reference would be for all additional players, causing the totalScore to repeat in them too. However, I found a fresh JS function called `struturedClone` which made a copy with different references.
- **Make bowls strings or numbers?** - Because of the X and / symbols being used to represent spares and strikes, my initial implementation made them all strings. However this caused a lot of annoying parsing back and forth, continuously wrestling with typescript on those conversions and more additional code to do any type of numerical calculations. Later on I realised I could just use numbers and then convert them into the symbols later on in the component itself afterwards.
- **Use the design to limit errors** - When adding players I thought I'd have to code some sort of error for too many players, but why not just hide the add button after 8 players? Less code needed and no need to put in error guards if its impossible to happen!

### Conclusion

Glad I finally did it, it is a lot more complex on first appearance! The design can be improved of course, and other features like adding in keyboard inputs for the buttons would be nice. But I'm glad I can put this to rest, and its nice to see the progress I have made in comparison to the other attempts.

Kingpin is an awesome movie if you like comedy!

![Kingpin-Sequel](https://user-images.githubusercontent.com/14803518/205329589-231aeaeb-9d4a-45b8-b779-30fbd41d85ac.jpg)
