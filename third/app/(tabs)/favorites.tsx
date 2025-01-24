import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useFavorites } from '../../store/favorites-context';
import { MEALS } from '../../data/dummyData';
import MealItem from '../../components/MealItem';
import { router } from 'expo-router';
import { useCallback, useMemo } from 'react';

export default function Favorites() {
  const { ids, isLoading, error } = useFavorites();

  const favoriteMeals = useMemo(() => MEALS.filter(meal => ids.includes(meal.id)), [ids]);

  const renderMealItem = useCallback(({ item }: { item: (typeof MEALS)[0] }) => {
    const pressHandler = () => {
      router.push({
        pathname: '/meal-details/[id]',
        params: { id: item.id },
      });
    };

    return <MealItem item={item} onPress={pressHandler} />;
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center p-8">
        <Text className="text-red-600 text-center mb-4">{error}</Text>
      </View>
    );
  }

  if (favoriteMeals.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-8">
        <Text className="text-lg text-gray-600 text-center">
          No favorite meals added yet. Start adding some!
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <FlatList
        data={favoriteMeals}
        keyExtractor={item => item.id}
        renderItem={renderMealItem}
        className="p-2"
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    </View>
  );
}
