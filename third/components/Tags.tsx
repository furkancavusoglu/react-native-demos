import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Tooltip from './Tooltip';

interface TagsProps {
  duration: number;
  complexity: string;
  affordability: string;
  isGlutenFree: boolean;
  isVegan: boolean;
  isVegetarian: boolean;
  isLactoseFree: boolean;
  isTooltipVisible: boolean;
  setIsTooltipVisible: (visible: boolean) => void;
}

export default function Tags({
  duration,
  complexity,
  affordability,
  isGlutenFree,
  isVegan,
  isVegetarian,
  isLactoseFree,
  isTooltipVisible,
  setIsTooltipVisible,
}: TagsProps) {
  const tooltipText = 'GF - Gluten Free\nV - Vegan\nVG - Vegetarian\nLF - Lactose Free';

  return (
    <View className="flex-row justify-between items-start">
      <View className="flex-1">
        <View className="h-7 flex-row items-center">
          <Text className="text-xs text-gray-500 uppercase tracking-wider">Details</Text>
        </View>
        <View className="flex-row">
          <View className="bg-orange-100 px-3 py-1 rounded-full mr-1">
            <Text className="text-xs text-orange-700 font-medium">{duration}m</Text>
          </View>
          <View className="bg-blue-100 px-3 py-1 rounded-full mr-1">
            <Text className="text-xs text-blue-700 font-medium capitalize">{complexity}</Text>
          </View>
          <View className="bg-purple-100 px-3 py-1 rounded-full">
            <Text className="text-xs text-purple-700 font-medium capitalize">{affordability}</Text>
          </View>
        </View>
      </View>

      <View className="flex-1">
        <View className="h-7 flex-row justify-end items-center relative">
          <Text className="text-xs text-gray-500 uppercase tracking-wider">Dietary</Text>
          <Pressable
            onPress={() => setIsTooltipVisible(true)}
            className="ml-1 bg-gray-100 w-5 h-5 rounded-full items-center justify-center"
          >
            <Text className="text-xs text-gray-500 font-medium">?</Text>
          </Pressable>
          <Tooltip
            isVisible={isTooltipVisible}
            text={tooltipText}
            onClose={() => setIsTooltipVisible(false)}
          />
        </View>
        <View className="flex-row flex-wrap justify-end">
          {isGlutenFree && (
            <View className="bg-green-100 px-3 py-1 rounded-full ml-1 mb-1">
              <Text className="text-xs text-green-700 font-medium">GF</Text>
            </View>
          )}
          {isVegan && (
            <View className="bg-green-100 px-3 py-1 rounded-full ml-1 mb-1">
              <Text className="text-xs text-green-700 font-medium">V</Text>
            </View>
          )}
          {isVegetarian && (
            <View className="bg-green-100 px-3 py-1 rounded-full ml-1 mb-1">
              <Text className="text-xs text-green-700 font-medium">VG</Text>
            </View>
          )}
          {isLactoseFree && (
            <View className="bg-green-100 px-3 py-1 rounded-full ml-1 mb-1">
              <Text className="text-xs text-green-700 font-medium">LF</Text>
            </View>
          )}
          {!isGlutenFree && !isVegan && !isVegetarian && !isLactoseFree && (
            <View className="bg-gray-100 px-3 py-1 rounded-full ml-1 mb-1">
              <Text className="text-xs text-gray-500 font-medium">No restrictions</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
