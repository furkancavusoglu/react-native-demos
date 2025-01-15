import { Stack } from 'expo-router';
import '../global.css';

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
    </Stack>
  );
}
