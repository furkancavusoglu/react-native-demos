import { useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, Button, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useIntl } from 'react-intl';
import { GoalItem } from './components/GoalItem';
import { GoalInput } from './components/GoalInput';
import { GoalEdit } from './components/GoalEdit';
import { Goal } from './types/goal';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

function AppContent() {
  const [courseGoals, setCourseGoals] = useState<Goal[]>([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingGoal, setEditingGoal] = useState<{ id: string; text: string } | null>(null);
  const intl = useIntl();
  const { locale, setLocale } = useLanguage();

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

  const toggleLanguage = useCallback(() => {
    setLocale(locale === 'en' ? 'tr' : 'en');
  }, [locale, setLocale]);

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <View style={styles.headerContainer}>
          <Button
            title={locale === 'en' ? 'Türkçe' : 'English'}
            onPress={toggleLanguage}
            color="#311b6b"
          />
          <Button
            title={intl.formatMessage({ id: 'app.addButton' })}
            onPress={startAddGoalHandler}
            color="#5e0acc"
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  goalsContainer: {
    flex: 5,
  },
});
