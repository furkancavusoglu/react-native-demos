import { Tabs } from 'expo-router';
import '../../global.css';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f5f5f5',
        },
        headerTintColor: '#333',
        tabBarStyle: {
          backgroundColor: '#fff',
        },
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tabs.Screen
        name="categories"
        options={{
          title: 'All Categories',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
          tabBarLabel: 'Categories',
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" color={color} size={size} />,
          tabBarLabel: 'Favorites',
        }}
      />
    </Tabs>
  );
}
