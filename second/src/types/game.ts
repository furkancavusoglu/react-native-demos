export type GuessDirection = 'lower' | 'higher';

export interface GameState {
  currentGuess: number;
  guessRounds: number[];
  userNumber: number;
  isGameOver: boolean;
}
