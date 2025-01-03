import { useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, Button, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GoalItem } from './components/GoalItem';
import { GoalInput } from './components/GoalInput';
import { GoalEdit } from './components/GoalEdit';
import { Goal } from './types/goal';

export default function App() {
  const [courseGoals, setCourseGoals] = useState<Goal[]>([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingGoal, setEditingGoal] = useState<{ id: string; text: string } | null>(null);

  const startAddGoalHandler = useCallback(() => {
    setModalIsVisible(true);
  }, []);

  const endAddGoalHandler = useCallback(() => {
    setModalIsVisible(false);
  }, []);

  const addGoalHandler = useCallback(
    (enteredGoal: string) => {
      setCourseGoals(prevGoals => [
        ...prevGoals,
        { text: enteredGoal, id: Math.random().toString() },
      ]);
      endAddGoalHandler();
    },
    [endAddGoalHandler]
  );

  const startEditGoalHandler = useCallback((id: string, text: string) => {
    setEditingGoal({ id, text });
    setEditModalVisible(true);
  }, []);

  const endEditGoalHandler = useCallback(() => {
    setEditModalVisible(false);
    setEditingGoal(null);
  }, []);

  const editGoalHandler = useCallback(
    (id: string, newText: string) => {
      setCourseGoals(prevGoals =>
        prevGoals.map(goal => (goal.id === id ? { ...goal, text: newText } : goal))
      );
      endEditGoalHandler();
    },
    [endEditGoalHandler]
  );

  const deleteGoalHandler = useCallback((goalId: string) => {
    setCourseGoals(prevGoals => prevGoals.filter(goal => goal.id !== goalId));
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.appContainer}>
        <View style={styles.buttonContainer}>
          <Button title="Add New Goal" onPress={startAddGoalHandler} color="#5e0acc" />
        </View>
        <GoalInput
          visible={modalIsVisible}
          onAddGoal={addGoalHandler}
          onCancel={endAddGoalHandler}
        />
        {editingGoal && (
          <GoalEdit
            visible={editModalVisible}
            onCancel={endEditGoalHandler}
            onEdit={editGoalHandler}
            goalText={editingGoal.text}
            goalId={editingGoal.id}
          />
        )}
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <GoalItem
                text={item.text}
                id={item.id}
                onDelete={deleteGoalHandler}
                onStartEdit={startEditGoalHandler}
              />
            )}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 60 : 30,
    paddingHorizontal: 16,
    gap: 16,
  },
  buttonContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  goalsContainer: {
    flex: 5,
  },
});
