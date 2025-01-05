import { View, TextInput, StyleSheet, Alert } from 'react-native';
import Button from '../components/ui/Button';
import { useState } from 'react';
import { Colors } from '../constants/colors';

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
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    padding: 16,
    marginHorizontal: 24,
    backgroundColor: Colors.primary700,
    borderRadius: 8,
    elevation: 8,
    gap: 10,
    alignItems: 'center',
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
