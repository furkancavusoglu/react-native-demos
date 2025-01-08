import { View, TextInput, StyleSheet, Alert } from 'react-native';
import Button from '../components/ui/Button';
import { useState } from 'react';
import { Colors } from '../constants/colors';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';

interface StartGameScreenProps {
  onPickNumber: (number: number) => void;
}

export default function StartGameScreen({ onPickNumber }: StartGameScreenProps) {
  const [enteredNumber, setEnteredNumber] = useState('');

  const numberInputHandler = (input: string) => {
    setEnteredNumber(input);
  };

  const resetInputHandler = () => {
    setEnteredNumber('');
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid number!', 'Number has to be between 1 and 99.', [
        { text: 'Okay', style: 'destructive', onPress: resetInputHandler },
      ]);
      return;
    }
    onPickNumber(chosenNumber);
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
    paddingTop: 100,
    alignItems: 'center',
    gap: 36,
  },
  inputContainer: {
    gap: 16,
  },
  numberInput: {
    height: 70,
    width: 70,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  buttonContainer: {
    flex: 1,
  },
});
