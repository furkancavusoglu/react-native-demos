import { FlatList } from 'react-native';
import { router } from 'expo-router';
import { CATEGORIES } from '../data/dummyData';
import CategoryGridTile from '../components/CategoryGridTile';

type CategoryItem = {
  id: string;
  title: string;
  color: string;
};

type RenderItemProps = {
  item: CategoryItem;
};

export default function CategoriesScreen() {
  function navigateToMeals(categoryId: string) {
    router.push({
      pathname: '/meals/[category]',
      params: { category: categoryId },
    });
  }

  function renderCategoryItem({ item }: RenderItemProps) {
    return (
      <CategoryGridTile
        title={item.title}
        color={item.color}
        onPress={() => navigateToMeals(item.id)}
      />
    );
  }

  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={item => item.id}
      numColumns={2}
      renderItem={renderCategoryItem}
      className="p-2"
    />
  );
}
