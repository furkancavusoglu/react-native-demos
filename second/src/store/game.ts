import { create } from 'zustand';
import { GameState, GameActions, GuessDirection, GameResult } from '../types/game';
import {
  generateRandomBetween,
  isValidDirectionChoice,
  calculateNewBoundaries,
  isValidBoundaries,
} from '../utils/game';

type GameStore = GameState & GameActions;

const INITIAL_MIN = 1;
const INITIAL_MAX = 100;

const initialState: GameState = {
  currentGuess: 0,
  guessRounds: [],
  userNumber: 0,
  isGameOver: false,
  boundaries: {
    min: INITIAL_MIN,
    max: INITIAL_MAX,
  },
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  initializeGame: (userNumber: number) => {
    const firstGuess = generateRandomBetween(INITIAL_MIN, INITIAL_MAX, userNumber);
    set({
      userNumber,
      currentGuess: firstGuess,
      guessRounds: [{ number: firstGuess, id: '1' }],
      isGameOver: false,
      boundaries: {
        min: INITIAL_MIN,
        max: INITIAL_MAX,
      },
    });
  },

  makeGuess: (direction: GuessDirection): GameResult => {
    const { currentGuess, userNumber, boundaries } = get();

    if (!isValidDirectionChoice(direction, currentGuess, userNumber)) {
      return {
        isValid: false,
        message: "Don't lie! You know that this is wrong...",
      };
    }

    const { newMin, newMax } = calculateNewBoundaries(
      direction,
      currentGuess,
      boundaries.min,
      boundaries.max
    );

    if (!isValidBoundaries(newMin, newMax)) {
      return {
        isValid: false,
        message: 'The range is invalid. Please restart the game.',
      };
    }

    const newGuess = generateRandomBetween(newMin, newMax, currentGuess);

    set(state => ({
      currentGuess: newGuess,
      guessRounds: [
        {
          number: newGuess,
          id: `${state.guessRounds.length + 1}`,
        },
        ...state.guessRounds,
      ],
      isGameOver: newGuess === userNumber,
      boundaries: {
        min: direction === 'higher' ? newMin : state.boundaries.min,
        max: direction === 'lower' ? newMax : state.boundaries.max,
      },
    }));

    return { isValid: true };
  },

  resetGame: () => {
    set(initialState);
  },
}));
