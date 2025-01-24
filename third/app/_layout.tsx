import { Stack } from 'expo-router';
import { FavoritesProvider } from '../store/favorites-context';

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#f5f5f5' },
          headerTintColor: '#3498db',
          contentStyle: { backgroundColor: '#fff' },
          headerBackTitle: 'Back',
          headerTitleStyle: { color: '#333' },
          headerShadowVisible: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="meals/[category]"
          options={() => ({
            title: 'Meals Overview',
            animation: 'slide_from_right',
          })}
        />
        <Stack.Screen
          name="meal-details/[id]"
          options={{
            title: 'About the Meal',
            presentation: 'modal',
            animation: 'slide_from_bottom',
            headerStyle: { backgroundColor: '#f5f5f5' },
          }}
        />
      </Stack>
    </FavoritesProvider>
  );
}
