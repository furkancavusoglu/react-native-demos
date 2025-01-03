import { StyleSheet, Pressable, Text, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, typography, spacing } from '../../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'primaryDark';
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  icon,
  style,
  textStyle,
}: ButtonProps) {
  const backgroundColor = {
    primary: colors.primary,
    secondary: colors.secondary,
    primaryDark: colors.primaryDark,
  }[variant];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor },
        style,
        pressed && styles.pressed,
      ]}
    >
      {icon && <Ionicons name={icon} size={24} color={colors.white} style={styles.icon} />}
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    borderRadius: borderRadius.sm,
    gap: spacing.sm,
  },
  text: {
    color: colors.white,
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.bold,
  },
  icon: {
    marginRight: spacing.xs,
  },
  pressed: {
    opacity: 0.7,
  },
});
