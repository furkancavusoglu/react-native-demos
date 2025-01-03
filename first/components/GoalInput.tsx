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
} from 'react-native';
import { useIntl } from 'react-intl';
import { GoalInputProps } from '../types/goal';
import { Button } from './shared/Button';
import goalImage from '../assets/images/goal.png';
import { colors, spacing, borderRadius } from '../constants/theme';

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
              <Button
                title={intl.formatMessage({ id: 'button.cancel' })}
                onPress={onCancel}
                variant="secondary"
              />
              <Button
                title={intl.formatMessage({ id: 'button.add' })}
                onPress={handleAddGoal}
                variant="primary"
              />
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
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.inputBackground,
    backgroundColor: colors.inputBackground,
    color: colors.inputText,
    borderRadius: borderRadius.sm,
    width: '100%',
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: spacing.xl,
  },
});
