import { View, StyleSheet, type ViewProps } from 'react-native';
import type { ReactNode } from 'react';
import { theme } from '../../theme';

interface CardProps extends Omit<ViewProps, 'style'> {
  children: ReactNode;
  style?: View['props']['style'];
}

export default function Card({ children, style, ...viewProps }: CardProps) {
  return (
    <View style={[styles.card, style]} {...viewProps}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
    marginHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.primary[800],
    borderRadius: theme.borderRadius.lg,
    elevation: 4,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
