import { View, StyleSheet, type ViewProps } from 'react-native';
import type { ReactNode } from 'react';
import { theme } from '../../theme';
import { useResponsive } from '../../hooks/useResponsive';

interface CardProps extends Omit<ViewProps, 'style'> {
  children: ReactNode;
  style?: View['props']['style'];
}

export default function Card({ children, style, ...viewProps }: CardProps) {
  const { moderateScale, horizontalScale } = useResponsive();

  const dynamicStyles = StyleSheet.create({
    card: {
      padding: horizontalScale(theme.spacing.md),
      marginHorizontal: horizontalScale(theme.spacing.md),
      backgroundColor: theme.colors.primary[800],
      borderRadius: moderateScale(theme.borderRadius.lg),
      elevation: 4,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: moderateScale(2) },
      shadowRadius: moderateScale(6),
      shadowOpacity: 0.25,
      alignItems: 'center',
    },
  });

  return (
    <View style={[dynamicStyles.card, style]} {...viewProps}>
      {children}
    </View>
  );
}
