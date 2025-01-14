import { View, Text, StyleSheet, type ViewProps } from 'react-native';
import type { ReactNode } from 'react';
import { theme } from '../../theme';
import { useResponsive } from '../../hooks/useResponsive';

interface NumberContainerProps extends Omit<ViewProps, 'style'> {
  children: ReactNode;
  style?: View['props']['style'];
}

export default function NumberContainer({ children, style, ...viewProps }: NumberContainerProps) {
  const { moderateScale, horizontalScale } = useResponsive();

  const dynamicStyles = StyleSheet.create({
    container: {
      borderWidth: moderateScale(4),
      borderColor: theme.colors.accent[400],
      padding: horizontalScale(theme.spacing.lg),
      margin: horizontalScale(theme.spacing.lg),
      borderRadius: theme.borderRadius.lg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    numberText: {
      color: theme.colors.accent[400],
      fontFamily: theme.typography.fonts.bold,
      fontSize: moderateScale(theme.typography.sizes.xxl),
    },
  });

  return (
    <View style={[dynamicStyles.container, style]} {...viewProps}>
      <Text style={dynamicStyles.numberText}>{children}</Text>
    </View>
  );
}
