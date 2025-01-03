import { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useIntl } from 'react-intl';
import { GoalEditProps } from '../types/goal';
import { Button } from './shared/Button';
import { colors, spacing, borderRadius, typography } from '../constants/theme';

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
              <Button
                title={intl.formatMessage({ id: 'button.cancel' })}
                onPress={onCancel}
                variant="secondary"
              />
              <Button
                title={intl.formatMessage({ id: 'button.save' })}
                onPress={handleEdit}
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
  title: {
    fontSize: typography.sizes.title,
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: spacing.xxl,
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
});
