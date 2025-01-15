import { Pressable, View, Text } from 'react-native';
import { getColorClass } from '../utils/tailwind-colors';

interface CategoryGridTileProps {
  title: string;
  color: string;
  onPress: () => void;
}

export default function CategoryGridTile({ title, color, onPress }: CategoryGridTileProps) {
  return (
    <View className="flex-1 p-4">
      <Pressable
        onPress={onPress}
        className={`flex-1 min-h-[150px] rounded-xl border border-gray-100 shadow-sm shadow-black/20 ${getColorClass(color)} active:opacity-70`}
      >
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-white text-center font-extrabold text-lg">{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}
