export enum Suit {
  Spade = "SPADE",
  Club = "CLUB",
  Heart = "HEART",
  Diamond = "DIAMOND",
}

/**
 * Defines a card type
 *
 * @export
 * @interface Card
 */
export interface Card {
  suit: Suit;
  value: number; // 1 - Ace, 11 - Jack, 12 - Queen, etc.
}

/**
 * Defines the current positions of cards in a solitaire game
 *
 * @export
 * @interface CurrentPositions
 */
export interface Gameboard {
  /**
   * The cards the user can rotate through
   *
   * @type {Card[]}
   * @memberof Gameboard
   */
  stock: Card[];

  /**
   * The cards that have been completed and removed from the active game
   *
   * @type {{
   *     [suit in Suit]: Card[];
   *   }}
   * @memberof SolitaireState
   */
  foundation: {
    [suit in Suit]: Card[];
  };

  /**
   * The array of active card lines in the game. The ultimate size will be
   * [7][1..7] with lines one having one element
   *
   * @type {Card[][]}
   * @memberof SolitaireState
   */
  tableau: Card[][];
}

/**
 * Defines the state of the solitaire game
 *
 * @export
 * @interface SolitaireState
 */
export interface SolitaireState {
  gameboard: Gameboard;

  /**
   * Determines whether the game has been completed.
   *
   * @type {boolean}
   * @memberof SolitaireState
   */
  gameover: boolean;
}
