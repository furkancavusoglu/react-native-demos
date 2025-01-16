import { useLocalSearchParams } from 'expo-router';
import { FlatList, Text } from 'react-native';
import { MEALS } from '../../data/dummyData';

type MealItem = {
  id: string;
  title: string;
  categoryIds: string[];
  imageUrl: string;
  duration: number;
  complexity: string;
  affordability: string;
};

type RenderItemProps = {
  item: MealItem;
};

export default function MealsScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();

  const meals = MEALS.filter(meal => meal.categoryIds.includes(category));

  function renderMealItem({ item }: RenderItemProps) {
    return <Text>{item.title}</Text>;
  }

  return (
    <FlatList
      data={meals}
      keyExtractor={item => item.id}
      renderItem={renderMealItem}
      className="flex-1"
    />
  );
}
