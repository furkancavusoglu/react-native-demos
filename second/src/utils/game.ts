/**
 * Generates a random number between min and max (inclusive) excluding a specific number
 */
export function generateRandomBetween(min: number, max: number, exclude: number): number {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }

  return rndNum;
}

/**
 * Validates if a number is within the valid range for the game
 */
export function isValidGameNumber(number: number): boolean {
  return !isNaN(number) && number > 0 && number <= 99;
}

/**
 * Validates if the player's direction choice is honest based on the current guess and actual number
 */
export function isValidDirectionChoice(
  direction: 'lower' | 'higher',
  currentGuess: number,
  userNumber: number
): boolean {
  return !(
    (direction === 'lower' && currentGuess < userNumber) ||
    (direction === 'higher' && currentGuess > userNumber)
  );
}

/**
 * Calculates the new boundaries for the next guess
 */
export function calculateNewBoundaries(
  direction: 'lower' | 'higher',
  currentGuess: number,
  currentMin: number,
  currentMax: number
): { newMin: number; newMax: number } {
  if (direction === 'higher') {
    return {
      newMin: currentGuess + 1,
      newMax: currentMax,
    };
  } else {
    return {
      newMin: currentMin,
      newMax: currentGuess - 1,
    };
  }
}

/**
 * Checks if the game boundaries are valid
 */
export function isValidBoundaries(min: number, max: number): boolean {
  return min <= max;
}
