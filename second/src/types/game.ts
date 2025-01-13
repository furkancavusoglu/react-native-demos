export type GuessDirection = 'lower' | 'higher';

export interface GuessRound {
  number: number;
  id: string;
}

export interface GameState {
  currentGuess: number;
  guessRounds: GuessRound[];
  userNumber: number;
  isGameOver: boolean;
  boundaries: {
    min: number;
    max: number;
  };
}

export interface GameActions {
  initializeGame: (userNumber: number) => void;
  makeGuess: (direction: GuessDirection) => GameResult;
  resetGame: () => void;
}

export interface GameResult {
  isValid: boolean;
  message?: string;
}
