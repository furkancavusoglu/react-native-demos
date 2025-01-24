import { useLocalSearchParams, useNavigation, router } from 'expo-router';
import { MEALS } from '../../data/dummyData';
import MealDetails from '../../components/MealDetails';
import { View, ActivityIndicator, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFavorites } from '../../store/favorites-context';
import { useLayoutEffect, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function MealDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const { isFavorite, addFavorite, removeFavorite, isLoading, error } = useFavorites();
  const selectedMeal = MEALS.find(meal => meal.id === id);

  const mealIsFavorite = isFavorite(id);

  const handleFavoritePress = useCallback(() => {
    if (isLoading) return;
    mealIsFavorite ? removeFavorite(id) : addFavorite(id);
  }, [mealIsFavorite, id, isLoading]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={handleFavoritePress}
          className="mr-4 items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#3498db" />
          ) : (
            <Ionicons
              name={mealIsFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={mealIsFavorite ? '#e74c3c' : '#666'}
            />
          )}
        </Pressable>
      ),
    });
  }, [navigation, mealIsFavorite, isLoading, handleFavoritePress]);

  if (!selectedMeal) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-lg text-gray-600 mb-4">Meal not found</Text>
        <Pressable onPress={() => router.back()} className="bg-blue-500 px-4 py-2 rounded-lg">
          <Text className="text-white font-medium">Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1" edges={['bottom']}>
      {error ? (
        <View className="absolute top-4 left-4 right-4 bg-red-100 p-4 rounded-lg z-50">
          <Text className="text-red-600">{error}</Text>
        </View>
      ) : null}
      <MealDetails item={selectedMeal} />
    </SafeAreaView>
  );
}
