import { View, Text, Pressable, Image, Platform } from 'react-native';

interface MealItemProps {
  item: {
    title: string;
    imageUrl: string;
    duration: number;
    complexity: string;
    affordability: string;
  };
  onPress: () => void;
}

export default function MealItem({ item, onPress }: MealItemProps) {
  const { title, imageUrl, duration, complexity, affordability } = item;

  return (
    <View
      className={`m-4 ${Platform.OS === 'android' ? 'overflow-hidden' : ''} shadow-lg shadow-black/25`}
    >
      <View className="bg-white rounded-lg">
        <Pressable className="active:opacity-70" onPress={onPress}>
          <View>
            <Image source={{ uri: imageUrl }} className="w-full h-48 rounded-t-lg" />
            <Text className="text-center font-bold text-lg p-2">{title}</Text>
          </View>
          <View className="flex-row justify-center items-center px-2 pb-4">
            <View className="bg-gray-100 px-3 py-1 rounded-full mx-1">
              <Text className="text-sm text-gray-700">{duration}m</Text>
            </View>
            <View className="bg-gray-100 px-3 py-1 rounded-full mx-1">
              <Text className="text-sm capitalize text-gray-700">{complexity}</Text>
            </View>
            <View className="bg-gray-100 px-3 py-1 rounded-full mx-1">
              <Text className="text-sm capitalize text-gray-700">{affordability}</Text>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
