# Memory Game

## Running the game

First install packages

```
$ bundle install
```

Then start the app

```
$ rails s
```

## Architecture

The app is broken up into 2 main sections, the "Game", and the "Card" model.

A game knows whether it is in the middle of a turn or that a turn is active.

Each game can contain any number of cards.  A card has a symbol, and a card knows whether it is currently face up, or whether it has currently been selected as part of a "turn".

I wanted to develop the game in such a way that should a user leave the game, or refresh
the page, the state of the game wouldn't be lost.  They could return to the game
at another time and pickup where they left off.

## TODOs

Here are things that would be nice to have in a real-world implementation of the game

- Add support for random ordering of cards in a game
- Add Users and associate games to users
- Add ability to create multiple games
- Improve UX of game
- swap out jquery for react

