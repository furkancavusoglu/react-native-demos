import { FlatList, View } from 'react-native';
import { CATEGORIES } from '../data/dummyData';
import CategoryGridTile from '../components/CategoryGridTile';
import { router } from 'expo-router';

export default function Index() {
  function pressHandler(id: string) {
    router.push(`/meals/${id}`);
  }

  return (
    <View className="flex-1">
      <FlatList
        className="p-2"
        numColumns={2}
        data={CATEGORIES}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <CategoryGridTile
            title={item.title}
            color={item.color}
            onPress={() => pressHandler(item.id)}
          />
        )}
      />
    </View>
  );
}
