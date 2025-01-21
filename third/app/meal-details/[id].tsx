import { useLocalSearchParams } from 'expo-router';
import { MEALS } from '../../data/dummyData';
import MealDetails from '../../components/MealDetails';

export default function MealDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const selectedMeal = MEALS.find(meal => meal.id === id);

  if (!selectedMeal) return null;

  return <MealDetails item={selectedMeal} />;
}
