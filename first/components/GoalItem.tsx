import { memo, useCallback } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { useIntl } from 'react-intl';
import { IconButton } from './shared/IconButton';
import { GoalItemProps } from '../types/goal';
import { colors, spacing, borderRadius, typography } from '../constants/theme';

export const GoalItem = memo(function GoalItem({ text, id, onDelete, onStartEdit }: GoalItemProps) {
  const intl = useIntl();

  const handleDelete = useCallback(() => {
    Alert.alert(
      intl.formatMessage({ id: 'goal.delete.title' }),
      intl.formatMessage({ id: 'goal.delete.message' }),
      [
        {
          text: intl.formatMessage({ id: 'button.cancel' }),
          style: 'cancel',
        },
        {
          text: intl.formatMessage({ id: 'button.delete' }),
          style: 'destructive',
          onPress: () => onDelete(id),
        },
      ],
      { cancelable: true }
    );
  }, [id, onDelete, intl]);

  return (
    <View style={styles.goalItem}>
      <Text style={styles.goalText} numberOfLines={2}>
        {text}
      </Text>
      <View style={styles.iconsContainer}>
        <IconButton
          name="pencil"
          size={18}
          color={colors.white}
          onPress={() => onStartEdit(id, text)}
        />
        <IconButton name="trash" size={18} color={colors.white} onPress={handleDelete} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  goalItem: {
    margin: spacing.sm,
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  goalText: {
    color: colors.white,
    fontSize: typography.sizes.body,
    flex: 1,
    marginRight: spacing.sm,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
});
