import { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Modal,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  Text,
} from 'react-native';
import { useIntl } from 'react-intl';
import { GoalInputProps } from '../types/goal';
import goalImage from '../assets/images/goal.png';

export function GoalInput({ onAddGoal, visible, onCancel }: GoalInputProps) {
  const [enteredGoal, setEnteredGoal] = useState('');
  const intl = useIntl();

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
              accessibilityLabel={intl.formatMessage({ id: 'goal.input.accessibility' })}
            />
            <TextInput
              placeholder={intl.formatMessage({ id: 'goal.input.placeholder' })}
              style={styles.textInput}
              onChangeText={goalInputHandler}
              value={enteredGoal}
              returnKeyType="done"
              onSubmitEditing={handleAddGoal}
              accessibilityLabel={intl.formatMessage({ id: 'goal.input.accessibility' })}
              accessibilityHint={intl.formatMessage({ id: 'goal.input.hint' })}
            />
            <View style={styles.buttonContainer}>
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  styles.cancelButton,
                  pressed && styles.pressed,
                ]}
                onPress={onCancel}
              >
                <Text style={styles.buttonText}>{intl.formatMessage({ id: 'button.cancel' })}</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  styles.addButton,
                  pressed && styles.pressed,
                ]}
                onPress={handleAddGoal}
              >
                <Text style={styles.buttonText}>{intl.formatMessage({ id: 'button.add' })}</Text>
              </Pressable>
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
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f31282',
  },
  addButton: {
    backgroundColor: '#5e0acc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.7,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});
