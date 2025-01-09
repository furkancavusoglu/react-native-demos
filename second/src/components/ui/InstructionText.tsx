import { Text, StyleSheet, type TextProps } from 'react-native';
import type { ReactNode } from 'react';
import { theme } from '../../theme';

interface InstructionTextProps extends Omit<TextProps, 'style'> {
  children: ReactNode;
  style?: Text['props']['style'];
}

export default function InstructionText({ children, style, ...textProps }: InstructionTextProps) {
  return (
    <Text style={[styles.instructionText, style]} {...textProps}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  instructionText: {
    color: theme.colors.accent[400],
    fontSize: theme.typography.sizes.lg,
    fontFamily: theme.typography.fonts.regular,
  },
});
