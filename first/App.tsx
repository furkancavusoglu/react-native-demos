import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { GoalItem } from './components/GoalItem';
import { GoalInput } from './components/GoalInput';

type GoalItem = {
  text: string;
  key: string;
};

export default function App() {
  const [courseGoals, setCourseGoals] = useState<GoalItem[]>([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  const addGoalHandler = (enteredGoal: string) => {
    setCourseGoals(prevGoals => [
      ...prevGoals,
      { text: enteredGoal, key: Math.random().toString() },
    ]);
    endAddGoalHandler();
  };

  const deleteGoalHandler = (goalId: string) => {
    setCourseGoals(prevGoals => prevGoals.filter(goal => goal.key !== goalId));
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.buttonContainer}>
        <Button title="Add New Goal" onPress={startAddGoalHandler} color="#5e0acc" />
      </View>
      <GoalInput visible={modalIsVisible} onAddGoal={addGoalHandler} onCancel={endAddGoalHandler} />
      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          renderItem={({ item }) => (
            <GoalItem text={item.text} id={item.key} onDelete={deleteGoalHandler} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
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
