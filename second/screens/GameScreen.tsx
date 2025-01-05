import { View, StyleSheet, Text } from 'react-native';
import Title from '../components/ui/Title';
import { useState } from 'react';
import NumberContainer from '../components/game/NumberContainer';

function generateRandomBetween(min: number, max: number, exclude: number) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

export default function GameScreen({ userNumber }: { userNumber: number }) {
  const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, userNumber));
  return (
    <View style={styles.container}>
      <Title title="Guess the number" />
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or lower?</Text>
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
});
