import { View, Text, Pressable, StyleSheet, type PressableProps } from 'react-native';
import type { ReactNode } from 'react';
import { theme } from '../../theme';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  children: ReactNode;
  style?: View['props']['style'];
}

export default function Button({ children, style, ...pressableProps }: ButtonProps) {
  return (
    <View style={[styles.buttonOuterContainer, style]}>
      <Pressable
        style={({ pressed }) => [styles.buttonInnerContainer, pressed && styles.pressed]}
        android_ripple={{ color: theme.colors.primary[600] }}
        {...pressableProps}
      >
        {typeof children === 'string' ? (
          <Text style={styles.buttonText}>{children}</Text>
        ) : (
          <View style={styles.iconContainer}>{children}</View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: theme.borderRadius.sm,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    backgroundColor: theme.colors.primary[600],
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    elevation: 2,
  },
  buttonText: {
    color: theme.colors.white,
    textAlign: 'center',
    fontFamily: theme.typography.fonts.regular,
    fontSize: theme.typography.sizes.md,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xs,
  },
  pressed: {
    opacity: 0.75,
  },
});
