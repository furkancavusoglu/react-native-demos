import { View, Text, Pressable, StyleSheet, type PressableProps } from 'react-native';
import type { ReactNode } from 'react';
import { theme } from '../../theme';
import { useResponsive } from '../../hooks/useResponsive';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  children: ReactNode;
  style?: View['props']['style'];
}

export default function Button({ children, style, ...pressableProps }: ButtonProps) {
  const { moderateScale, horizontalScale } = useResponsive();

  const dynamicStyles = StyleSheet.create({
    buttonOuterContainer: {
      borderRadius: moderateScale(theme.borderRadius.xl),
      margin: horizontalScale(theme.spacing.xs),
      overflow: 'hidden',
    },
    buttonInnerContainer: {
      backgroundColor: theme.colors.primary[700],
      paddingVertical: moderateScale(theme.spacing.sm),
      paddingHorizontal: horizontalScale(theme.spacing.sm),
      elevation: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: theme.colors.white,
      textAlign: 'center',
      fontSize: moderateScale(theme.typography.sizes.md),
      fontFamily: theme.typography.fonts.regular,
    },
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: moderateScale(theme.spacing.xs),
      minWidth: moderateScale(44),
      minHeight: moderateScale(44),
    },
    pressed: {
      opacity: 0.75,
    },
  });

  return (
    <View style={[dynamicStyles.buttonOuterContainer, style]}>
      <Pressable
        style={({ pressed }) => [
          dynamicStyles.buttonInnerContainer,
          pressed && dynamicStyles.pressed,
        ]}
        android_ripple={{ color: theme.colors.primary[600] }}
        {...pressableProps}
      >
        {typeof children === 'string' ? (
          <Text style={dynamicStyles.buttonText}>{children}</Text>
        ) : (
          <View style={dynamicStyles.iconContainer}>{children}</View>
        )}
      </Pressable>
    </View>
  );
}
