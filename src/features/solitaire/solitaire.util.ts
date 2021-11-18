import { Card, Gameboard, Stock, Suit } from "./solitaire.model";

export function createGameboard(): Gameboard {
  const tableau: Card[][] = [];
  const stock: Stock = {
    remaining: [],
    used: []
  };
  const deck: Card[] = getDeck();

  // Build the tableau
  for (let i = 0; i < 7; ++i) {
    tableau[i] = [];
    for (let j = 0; j <= i; ++j) {
      const cardToRemove: number = getRandomInt(deck.length);
      const card: Card = deck.splice(cardToRemove, 1)[0];
      if (j === i) card.hidden = false;
      tableau[i].push(card);
    }
  }

  // Build the stock
  while (deck.length > 0) {
    const cardToRemove: number = getRandomInt(deck.length);
    const card: Card = deck.splice(cardToRemove, 1)[0];
    stock.remaining.push(card);
  }

  return {
    stock,
    tableau,
    foundation: {
      HEARTS: [],
      SPADES: [],
      DIAMONDS: [],
      CLUBS: []
    }
  };
}

function getDeck(): Card[] {
  const deck: Card[] = [];
  Object.values(Suit).forEach(suit => {
    for (let i = 1; i <= 13; ++i) {
      deck.push({
        value: i,
        suit,
        hidden: true
      })
    }
  });
  return deck;
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function getCardImageFile(card: Card) {
  return `${card.value}_${card.suit.toLowerCase()}.png`;
}

export function isTableauDecendant(tableauCard: Card, candidate: Card): boolean {
  // Only Kings can be moved to empty locations
  if (tableauCard === undefined) {
    return candidate.value === 13;
  }
  // Aces cannot be decendants
  if (tableauCard.value === 2) {
    return false;
  }
  const numberCompatible: boolean = tableauCard.value === candidate.value + 1;
  const colorCompatible: boolean = ((candidate.suit === Suit.Club || candidate.suit === Suit.Spade) && (tableauCard.suit === Suit.Heart || tableauCard.suit === Suit.Diamond)) ||
    ((candidate.suit === Suit.Diamond || candidate.suit === Suit.Heart) && (tableauCard.suit === Suit.Club || tableauCard.suit === Suit.Spade));

  return numberCompatible && colorCompatible;
}