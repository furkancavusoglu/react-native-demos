import { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Modal,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { GoalInputProps } from '../types/goal';
import goalImage from '../assets/images/goal.png';

export function GoalInput({ onAddGoal, visible, onCancel }: GoalInputProps) {
  const [enteredGoal, setEnteredGoal] = useState('');

  const goalInputHandler = useCallback((enteredText: string) => {
    setEnteredGoal(enteredText);
  }, []);

  const handleAddGoal = useCallback(() => {
    if (enteredGoal.trim().length === 0) {
      return;
    }
    onAddGoal(enteredGoal);
    setEnteredGoal('');
  }, [enteredGoal, onAddGoal]);

  return (
    <Modal visible={visible} animationType="slide">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.screen}
        >
          <View style={styles.inputContainer}>
            <Image
              source={goalImage}
              style={styles.image}
              resizeMode="contain"
              accessibilityLabel="Goal image"
            />
            <TextInput
              placeholder="Your goal"
              style={styles.textInput}
              onChangeText={goalInputHandler}
              value={enteredGoal}
              returnKeyType="done"
              onSubmitEditing={handleAddGoal}
              accessibilityLabel="Enter your goal"
              accessibilityHint="Type your goal and press enter or add goal button"
            />
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button title="Cancel" onPress={onCancel} color="#f31282" />
              </View>
              <View style={styles.button}>
                <Button title="Add Goal" onPress={handleAddGoal} color="#5e0acc" />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#311b6b',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e4d0ff',
    backgroundColor: '#e4d0ff',
    color: '#120438',
    borderRadius: 6,
    width: '100%',
    padding: 16,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    width: 100,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});