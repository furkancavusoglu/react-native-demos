import { useLocalSearchParams, router } from 'expo-router';
import { FlatList } from 'react-native';
import { MEALS } from '../../data/dummyData';
import MealItem from '../../components/MealItem';

type MealItem = {
  id: string;
  title: string;
  categoryIds: string[];
  imageUrl: string;
  duration: number;
  complexity: string;
  affordability: string;
  ingredients: string[];
  steps: string[];
  isGlutenFree: boolean;
  isVegan: boolean;
  isVegetarian: boolean;
  isLactoseFree: boolean;
};

type RenderItemProps = {
  item: MealItem;
};

export default function MealsScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const meals = MEALS.filter(meal => meal.categoryIds.includes(category));

  function renderMealItem({ item }: RenderItemProps) {
    function pressHandler() {
      router.push({
        pathname: '/meal-details/[id]',
        params: { id: item.id },
      });
    }

    return <MealItem item={item} onPress={pressHandler} />;
  }

  return <FlatList data={meals} keyExtractor={item => item.id} renderItem={renderMealItem} />;
}
