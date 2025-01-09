import { View, StyleSheet, Alert, FlatList, Text } from 'react-native';
import Title from '../components/ui/Title';
import { useState, useEffect } from 'react';
import NumberContainer from '../components/game/NumberContainer';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';

function generateRandomBetween(min: number, max: number, exclude: number): number {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }

  return rndNum;
}

let minBoundary = 1;
let maxBoundary = 100;

export default function GameScreen() {
  const { number } = useLocalSearchParams<{ number: string }>();
  const navigation = useNavigation();
  const userNumber = parseInt(number);

  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState<number[]>([initialGuess]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  useEffect(() => {
    if (currentGuess === userNumber) {
      navigation.setOptions({ headerBackVisible: false, gestureEnabled: false });
      router.replace({
        pathname: '/game-over',
        params: { rounds: guessRounds.length, number: userNumber },
      });
    }
  }, [currentGuess, userNumber, guessRounds.length, navigation]);

  const nextGuessHandler = (direction: 'lower' | 'higher') => {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'higher' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }

    if (direction === 'higher') {
      minBoundary = currentGuess + 1;
    } else {
      maxBoundary = currentGuess - 1;
    }

    if (minBoundary > maxBoundary) {
      Alert.alert('Invalid Range', 'The range is invalid. Please restart the game.', [
        { text: 'Restart', onPress: () => router.replace('/') },
      ]);
      return;
    }

    const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    setCurrentGuess(newRndNumber);
    setGuessRounds(prevRounds => [newRndNumber, ...prevRounds]);
  };

  return (
    <View style={styles.container}>
      <Title title="Opponent's Guess" />
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.instructionCard}>
        <InstructionText>Higher or lower?</InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <Button onPress={() => nextGuessHandler('higher')}>
              <Ionicons name="add" size={24} color={Colors.accent500} />
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={() => nextGuessHandler('lower')}>
              <Ionicons name="remove" size={24} color={Colors.accent500} />
            </Button>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <Card style={styles.guessLogCard}>
          <InstructionText style={styles.guessLogTitle}>Guess Log</InstructionText>
          <FlatList
            data={guessRounds}
            renderItem={({ item, index }) => (
              <View style={styles.guessLogItem}>
                <Text style={styles.guessLogText}>
                  Guess {guessRounds.length - index}: {item}
                </Text>
              </View>
            )}
            keyExtractor={item => item.toString()}
          />
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    marginTop: 50,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  buttonContainer: {
    flex: 1,
  },
  instructionCard: {
    gap: 20,
  },
  listContainer: {
    flex: 1,
    marginTop: 16,
  },
  guessLogCard: {
    flex: 1,
    padding: 16,
  },
  guessLogTitle: {
    textAlign: 'center',
    marginBottom: 12,
  },
  guessLogItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.primary700,
    padding: 12,
    marginVertical: 4,
    borderRadius: 20,
    elevation: 2,
  },
  guessLogText: {
    fontFamily: 'open-sans',
    fontSize: 16,
    color: Colors.accent500,
  },
});
