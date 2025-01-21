import { Stack } from 'expo-router';
import { CATEGORIES, MEALS } from '../data/dummyData';
import '../global.css';

type CategoryParams = {
  category: string;
};

type MealParams = {
  id: string;
};

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTintColor: '#1f2937',
        contentStyle: {
          backgroundColor: '#f3f4f6',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'All Categories',
        }}
      />
      <Stack.Screen
        name="meals/[category]"
        options={({ route }) => ({
          title: CATEGORIES.find(cat => cat.id === (route.params as CategoryParams).category)
            ?.title,
          headerBackTitle: 'Back',
        })}
      />
      <Stack.Screen
        name="meal-details/[id]"
        options={({ route }) => ({
          presentation: 'modal',
          title: MEALS.find(meal => meal.id === (route.params as MealParams).id)?.title,
          headerBackTitle: 'Back',
        })}
      />
    </Stack>
  );
}
