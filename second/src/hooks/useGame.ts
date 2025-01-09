import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { router, useNavigation } from 'expo-router';
import { GuessDirection } from '../types/game';
import {
  generateRandomBetween,
  isValidDirectionChoice,
  calculateNewBoundaries,
  isValidBoundaries,
} from '../utils/game';

interface UseGameProps {
  userNumber: number;
}

export function useGame({ userNumber }: UseGameProps) {
  const navigation = useNavigation();
  const [currentGuess, setCurrentGuess] = useState(() => generateRandomBetween(1, 100, userNumber));
  const [guessRounds, setGuessRounds] = useState<number[]>([currentGuess]);
  const [minBoundary, setMinBoundary] = useState(1);
  const [maxBoundary, setMaxBoundary] = useState(100);

  useEffect(() => {
    if (currentGuess === userNumber) {
      navigation.setOptions({ headerBackVisible: false, gestureEnabled: false });
      router.replace({
        pathname: '/game-over',
        params: { rounds: guessRounds.length.toString(), number: userNumber.toString() },
      });
    }
  }, [currentGuess, userNumber, guessRounds.length, navigation]);

  const nextGuessHandler = (direction: GuessDirection) => {
    if (!isValidDirectionChoice(direction, currentGuess, userNumber)) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }

    const { newMin, newMax } = calculateNewBoundaries(
      direction,
      currentGuess,
      minBoundary,
      maxBoundary
    );

    if (!isValidBoundaries(newMin, newMax)) {
      Alert.alert('Invalid Range', 'The range is invalid. Please restart the game.', [
        { text: 'Restart', onPress: () => router.replace('/') },
      ]);
      return;
    }

    setMinBoundary(newMin);
    setMaxBoundary(newMax);

    const newGuess = generateRandomBetween(newMin, newMax, currentGuess);
    setCurrentGuess(newGuess);
    setGuessRounds(prevRounds => [newGuess, ...prevRounds]);
  };

  return {
    currentGuess,
    guessRounds,
    nextGuessHandler,
  };
}
