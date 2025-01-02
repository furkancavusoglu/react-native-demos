import { StyleSheet, View, Text, Pressable } from 'react-native';

interface GoalItemProps {
  text: string;
  id: string;
  onDelete: (id: string) => void;
}

export function GoalItem({ text, id, onDelete }: GoalItemProps) {
  return (
    <Pressable onLongPress={() => onDelete(id)}>
      <View style={styles.goalItem}>
        <Text style={styles.goalText}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
  },
  goalText: {
    color: 'white',
  },
});
