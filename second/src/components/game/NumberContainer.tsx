import { View, Text, StyleSheet, type ViewProps } from 'react-native';
import type { ReactNode } from 'react';
import { theme } from '../../theme';

interface NumberContainerProps extends Omit<ViewProps, 'style'> {
  children: ReactNode;
  style?: View['props']['style'];
}

export default function NumberContainer({ children, style, ...viewProps }: NumberContainerProps) {
  return (
    <View style={[styles.container, style]} {...viewProps}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: theme.colors.accent[400],
    padding: theme.spacing.lg,
    margin: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    color: theme.colors.accent[400],
    fontSize: theme.typography.sizes.xxl,
    fontFamily: theme.typography.fonts.bold,
  },
});
