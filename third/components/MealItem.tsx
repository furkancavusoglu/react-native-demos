import { View, Text, Pressable, Image, Platform, ActivityIndicator } from 'react-native';
import { useState } from 'react';

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
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <View
      className={`m-4 ${Platform.OS === 'android' ? 'overflow-hidden' : ''} shadow-lg shadow-black/25`}
    >
      <View className="bg-white rounded-lg">
        <Pressable className="active:opacity-70" onPress={onPress}>
          <View className="relative">
            <Image
              source={{ uri: imageUrl }}
              className="w-full h-48 rounded-t-lg"
              onLoadStart={() => {
                setIsLoading(true);
                setHasError(false);
              }}
              onLoadEnd={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
            />
            {isLoading && (
              <View className="absolute inset-0 items-center justify-center bg-gray-100">
                <ActivityIndicator size="large" color="steelblue" />
              </View>
            )}
            {hasError && (
              <View className="absolute inset-0 items-center justify-center bg-gray-100">
                <Text className="text-gray-500 font-medium">Image not found</Text>
              </View>
            )}
          </View>
          <Text className="text-center font-bold text-lg p-2">{title}</Text>
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
