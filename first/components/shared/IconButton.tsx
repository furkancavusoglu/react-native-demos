import { StyleSheet, Pressable, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, hitSlop } from '../../constants/theme';

interface IconButtonProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  onPress: () => void;
  style?: ViewStyle;
}

export function IconButton({
  name,
  size = 24,
  color = colors.primary,
  onPress,
  style,
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, style, pressed && styles.pressed]}
      hitSlop={hitSlop.small}
    >
      <Ionicons name={name} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: borderRadius.circle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
