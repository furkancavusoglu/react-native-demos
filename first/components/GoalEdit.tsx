import { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useIntl } from 'react-intl';
import { GoalEditProps } from '../types/goal';

export function GoalEdit({ visible, onCancel, onEdit, goalText, goalId }: GoalEditProps) {
  const [editedGoal, setEditedGoal] = useState(goalText);
  const intl = useIntl();

  const goalInputHandler = useCallback((enteredText: string) => {
    setEditedGoal(enteredText);
  }, []);

  const handleEdit = useCallback(() => {
    if (editedGoal.trim().length === 0) {
      return;
    }
    onEdit(goalId, editedGoal.trim());
  }, [editedGoal, goalId, onEdit]);

  return (
    <Modal visible={visible} animationType="slide">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.screen}
        >
          <View style={styles.inputContainer}>
            <Text style={styles.title}>{intl.formatMessage({ id: 'goal.edit.title' })}</Text>
            <TextInput
              placeholder={intl.formatMessage({ id: 'goal.edit.placeholder' })}
              style={styles.textInput}
              onChangeText={goalInputHandler}
              value={editedGoal}
              returnKeyType="done"
              onSubmitEditing={handleEdit}
              accessibilityLabel={intl.formatMessage({ id: 'goal.edit.accessibility' })}
              accessibilityHint={intl.formatMessage({ id: 'goal.edit.hint' })}
            />
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button
                  title={intl.formatMessage({ id: 'button.cancel' })}
                  onPress={onCancel}
                  color="#f31282"
                />
              </View>
              <View style={styles.button}>
                <Button
                  title={intl.formatMessage({ id: 'button.save' })}
                  onPress={handleEdit}
                  color="#5e0acc"
                />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 24,
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
});
