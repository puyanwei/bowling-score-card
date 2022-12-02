# Bowling Scorecard

https://bowling-score-card.vercel.app/

![image](https://user-images.githubusercontent.com/14803518/205291630-ff0d8145-a093-450e-bcac-753fe755a5d4.png)

![image](https://user-images.githubusercontent.com/14803518/205291586-c9673b48-8a57-454b-9e5f-9875c44c0ced.png)

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

## Testing - Jest & Cypress

I added End to End testing using Cypress to help build out the app and get visibility of its features especially when refactoring.

I used Jest to unit test at my discretion, mainly at a rather more complex function I was writing.

To run these tests locally;

```
git clone git@github.com:puyanwei/bowling-score-card.git
cd bowling-score-card
yarn
```

- to run jest tests type `yarn test`

- to run cypress tests type `yarn run cy`. This will open up Cypress in another app. Then choose 'End to End' option and then click the tests you want to run.
