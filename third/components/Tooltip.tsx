import { View, Text, Pressable } from 'react-native';

interface TooltipProps {
  isVisible: boolean;
  text: string;
  onClose: () => void;
}

export default function Tooltip({ isVisible, text }: TooltipProps) {
  if (!isVisible) return null;

  return (
    <View className="absolute -top-24 right-0 z-50">
      <Pressable onPress={e => e.stopPropagation()}>
        <View className="bg-gray-800 rounded-lg px-3 py-2 max-w-[200px]">
          <Text className="text-white text-xs leading-5">{text}</Text>
        </View>
        <View className="absolute bottom-[-4px] right-1 w-4 h-4 bg-gray-800 rotate-45" />
      </Pressable>
    </View>
  );
}
