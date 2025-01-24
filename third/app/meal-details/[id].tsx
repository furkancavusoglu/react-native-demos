import { useLocalSearchParams, useNavigation } from 'expo-router';
import { MEALS } from '../../data/dummyData';
import MealDetails from '../../components/MealDetails';
import { View, ActivityIndicator, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFavorites } from '../../store/favorites-context';
import { useLayoutEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function MealDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const selectedMeal = MEALS.find(meal => meal.id === id);

  const mealIsFavorite = isFavorite(id);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => (mealIsFavorite ? removeFavorite(id) : addFavorite(id))}
          className="mr-4"
        >
          <Ionicons
            name={mealIsFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={mealIsFavorite ? '#e74c3c' : '#666'}
          />
        </Pressable>
      ),
    });
  }, [navigation, mealIsFavorite]);

  if (!selectedMeal) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1" edges={['bottom']}>
      <MealDetails item={selectedMeal} />
    </SafeAreaView>
  );
}
