import { View, Text, Image, ScrollView, ActivityIndicator, Pressable } from 'react-native';
import { useState } from 'react';
import Tags from './Tags';

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

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <Pressable onPress={() => setIsTooltipVisible(false)} className="flex-1">
      <ScrollView className="flex-1 bg-white">
        <View className="relative">
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-64"
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
        <View className="p-4">
          <Text className="text-2xl font-bold text-center mb-4">{title}</Text>

          <Tags
            duration={duration}
            complexity={complexity}
            affordability={affordability}
            isGlutenFree={isGlutenFree}
            isVegan={isVegan}
            isVegetarian={isVegetarian}
            isLactoseFree={isLactoseFree}
            isTooltipVisible={isTooltipVisible}
            setIsTooltipVisible={setIsTooltipVisible}
          />

          <View className="h-[1px] bg-gray-200 my-4" />

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
    </Pressable>
  );
}
