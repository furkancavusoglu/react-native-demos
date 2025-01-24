import { View, Text, FlatList } from 'react-native';
import { useFavorites } from '../../store/favorites-context';
import { MEALS } from '../../data/dummyData';
import MealItem from '../../components/MealItem';
import { router } from 'expo-router';

export default function Favorites() {
  const { ids } = useFavorites();
  const favoriteMeals = MEALS.filter(meal => ids.includes(meal.id));

  if (favoriteMeals.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-8">
        <Text className="text-lg text-gray-600 text-center">
          No favorite meals added yet. Start adding some!
        </Text>
      </View>
    );
  }

  function renderMealItem({ item }: { item: (typeof MEALS)[0] }) {
    function pressHandler() {
      router.push({
        pathname: '/meal-details/[id]',
        params: { id: item.id },
      });
    }

    return <MealItem item={item} onPress={pressHandler} />;
  }

  return (
    <View className="flex-1">
      <FlatList data={favoriteMeals} keyExtractor={item => item.id} renderItem={renderMealItem} />
    </View>
  );
}
