import { View, Text, Image, ScrollView } from 'react-native';

interface MealDetailsProps {
  item: {
    title: string;
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
}

export default function MealDetails({ item }: MealDetailsProps) {
  const {
    title,
    imageUrl,
    duration,
    complexity,
    affordability,
    ingredients,
    steps,
    isGlutenFree,
    isVegan,
    isVegetarian,
    isLactoseFree,
  } = item;

  return (
    <ScrollView className="flex-1 bg-white">
      <Image source={{ uri: imageUrl }} className="w-full h-64" />
      <View className="p-4">
        <Text className="text-2xl font-bold text-center mb-2">{title}</Text>

        <View className="flex-row justify-center items-center mb-4">
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

        <View className="flex-row flex-wrap justify-center gap-2 mb-4">
          {isGlutenFree && (
            <View className="bg-green-100 px-3 py-1 rounded-full">
              <Text className="text-sm text-green-700">Gluten Free</Text>
            </View>
          )}
          {isVegan && (
            <View className="bg-green-100 px-3 py-1 rounded-full">
              <Text className="text-sm text-green-700">Vegan</Text>
            </View>
          )}
          {isVegetarian && (
            <View className="bg-green-100 px-3 py-1 rounded-full">
              <Text className="text-sm text-green-700">Vegetarian</Text>
            </View>
          )}
          {isLactoseFree && (
            <View className="bg-green-100 px-3 py-1 rounded-full">
              <Text className="text-sm text-green-700">Lactose Free</Text>
            </View>
          )}
        </View>

        <View className="mb-4">
          <Text className="text-lg font-bold mb-2">Ingredients</Text>
          {ingredients.map((ingredient, index) => (
            <Text key={index} className="text-gray-700 py-1">
              • {ingredient}
            </Text>
          ))}
        </View>

        <View>
          <Text className="text-lg font-bold mb-2">Steps</Text>
          {steps.map((step, index) => (
            <View key={index} className="mb-2">
              <Text className="text-gray-700">
                {index + 1}. {step}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
