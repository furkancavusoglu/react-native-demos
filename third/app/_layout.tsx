import { Stack } from 'expo-router';
import { CATEGORIES } from '../data/dummyData';
import '../global.css';

type CategoryParams = {
  category: string;
};

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
        },
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
          headerBackTintColor: '#0096FF',
        })}
      />
    </Stack>
  );
}
