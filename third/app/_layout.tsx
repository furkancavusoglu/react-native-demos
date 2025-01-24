import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#f5f5f5' },
        headerTintColor: '#3498db',
        contentStyle: { backgroundColor: '#fff' },
        headerBackTitle: 'Back',
        headerTitleStyle: { color: '#333' },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="meals/[category]"
        options={{
          title: 'Meals Overview',
        }}
      />
      <Stack.Screen
        name="meal-details/[id]"
        options={{
          title: 'About the Meal',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
