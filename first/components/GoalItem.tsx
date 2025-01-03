import { memo, useCallback } from 'react';
import { StyleSheet, View, Text, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GoalItemProps } from '../types/goal';

export const GoalItem = memo(function GoalItem({ text, id, onDelete, onStartEdit }: GoalItemProps) {
  const handleDelete = useCallback(() => {
    Alert.alert(
      'Delete Goal',
      'Are you sure you want to delete this goal?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(id),
        },
      ],
      { cancelable: true }
    );
  }, [id, onDelete]);

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
          accessibilityLabel="Edit goal"
          accessibilityRole="button"
        >
          <Ionicons name="pencil" size={18} color="white" />
        </Pressable>
        <Pressable
          onPress={handleDelete}
          style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          android_ripple={{ color: '#210644' }}
          accessibilityLabel="Delete goal"
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
