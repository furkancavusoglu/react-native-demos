import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import Button from '../src/components/ui/Button';
import Title from '../src/components/ui/Title';
import Card from '../src/components/ui/Card';
import InstructionText from '../src/components/ui/InstructionText';
import { theme } from '../src/theme';
import { isValidGameNumber } from '../src/utils/game';
import { useState } from 'react';
import { useGameStore } from '../src/store/game';

export default function StartGameScreen() {
  const [enteredNumber, setEnteredNumber] = useState('');
  const resetGame = useGameStore(state => state.resetGame);

  const numberInputHandler = (input: string) => {
    setEnteredNumber(input);
  };

  const resetInputHandler = () => {
    setEnteredNumber('');
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredNumber);
    if (!isValidGameNumber(chosenNumber)) {
      Alert.alert('Invalid number!', 'Number has to be between 1 and 99.', [
        { text: 'Okay', style: 'destructive', onPress: resetInputHandler },
      ]);
      return;
    }
    resetGame();
    router.push({ pathname: '/game', params: { number: chosenNumber } });
    setEnteredNumber('');
  };

  return (
    <View style={styles.rootContainer}>
      <Title title="Guess The Number" />
      <Card style={styles.inputContainer}>
        <InstructionText>Enter a number</InstructionText>
        <TextInput
          style={styles.numberInput}
          keyboardType="number-pad"
          autoCorrect={false}
          autoCapitalize="none"
          maxLength={2}
          value={enteredNumber}
          onChangeText={numberInputHandler}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <Button onPress={resetInputHandler}>Reset</Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={confirmInputHandler}>Confirm</Button>
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: theme.spacing.xxl * 2,
    alignItems: 'center',
    gap: theme.spacing.xl,
  },
  inputContainer: {
    gap: theme.spacing.md,
  },
  numberInput: {
    height: 70,
    width: 70,
    fontSize: theme.typography.sizes.xxl,
    borderBottomColor: theme.colors.accent[400],
    borderBottomWidth: 2,
    color: theme.colors.accent[400],
    fontFamily: theme.typography.fonts.bold,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  buttonContainer: {
    flex: 1,
  },
});
