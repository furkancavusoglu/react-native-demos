import { memo, useCallback } from 'react';
import { StyleSheet, View, Text, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIntl } from 'react-intl';
import { GoalItemProps } from '../types/goal';

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
        <Pressable
          onPress={() => onStartEdit(id, text)}
          style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          android_ripple={{ color: '#210644' }}
          accessibilityLabel={intl.formatMessage({ id: 'goal.edit.accessibility' })}
          accessibilityRole="button"
        >
          <Ionicons name="pencil" size={18} color="white" />
        </Pressable>
        <Pressable
          onPress={handleDelete}
          style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          android_ripple={{ color: '#210644' }}
          accessibilityLabel={intl.formatMessage({ id: 'button.delete' })}
          accessibilityRole="button"
        >
          <Ionicons name="trash" size={18} color="white" />
        </Pressable>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  goalText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
    marginRight: 8,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    padding: 6,
    borderRadius: 4,
  },
  pressed: {
    opacity: 0.5,
  },
});
