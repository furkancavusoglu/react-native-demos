import { useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, Platform, Pressable, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useIntl } from 'react-intl';
import { Ionicons } from '@expo/vector-icons';
import { GoalItem } from './components/GoalItem';
import { GoalInput } from './components/GoalInput';
import { GoalEdit } from './components/GoalEdit';
import { OptionsMenu } from './components/OptionsMenu';
import { Goal } from './types/goal';
import { LanguageProvider } from './context/LanguageContext';

function AppContent() {
  const [courseGoals, setCourseGoals] = useState<Goal[]>([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [editingGoal, setEditingGoal] = useState<{ id: string; text: string } | null>(null);
  const intl = useIntl();

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

  const toggleOptions = useCallback(() => {
    setOptionsVisible(prev => !prev);
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.appContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.cogContainer}>
            <Pressable
              onPress={toggleOptions}
              style={({ pressed }) => [styles.cogButton, pressed && styles.pressed]}
            >
              <Ionicons name="settings" size={24} color="#5e0acc" />
            </Pressable>
          </View>
          <Pressable
            style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}
            onPress={startAddGoalHandler}
          >
            <Ionicons name="add-circle" size={24} color="white" style={styles.addIcon} />
            <Text style={styles.addButtonText}>{intl.formatMessage({ id: 'app.addButton' })}</Text>
          </Pressable>
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
        <OptionsMenu visible={optionsVisible} onClose={toggleOptions} />
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

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 60 : 30,
    paddingHorizontal: 16,
    gap: 16,
  },
  headerContainer: {
    gap: 12,
  },
  cogContainer: {
    alignItems: 'flex-end',
  },
  cogButton: {
    padding: 8,
    borderRadius: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4a0599',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addIcon: {
    marginRight: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  goalsContainer: {
    flex: 5,
  },
});
