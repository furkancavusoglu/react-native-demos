import { useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useIntl } from 'react-intl';
import { GoalItem } from './components/GoalItem';
import { GoalInput } from './components/GoalInput';
import { GoalEdit } from './components/GoalEdit';
import { OptionsMenu } from './components/OptionsMenu';
import { IconButton } from './components/shared/IconButton';
import { Button } from './components/shared/Button';
import { Goal } from './types/goal';
import { LanguageProvider } from './context/LanguageContext';
import { colors, spacing } from './constants/theme';

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
            <IconButton name="settings" onPress={toggleOptions} />
          </View>
          <Button
            title={intl.formatMessage({ id: 'app.addButton' })}
            onPress={startAddGoalHandler}
            variant="primaryDark"
            icon="add-circle"
            style={styles.addButton}
          />
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
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },
  headerContainer: {
    gap: spacing.md,
  },
  cogContainer: {
    alignItems: 'flex-end',
  },
  addButton: {
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  goalsContainer: {
    flex: 5,
  },
});
