import { Text, StyleSheet, type TextProps } from 'react-native';
import { theme } from '../../theme';

interface TitleProps extends Omit<TextProps, 'style'> {
  title: string;
  style?: Text['props']['style'];
}

export default function Title({ title, style, ...textProps }: TitleProps) {
  return (
    <Text style={[styles.title, style]} {...textProps}>
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.xl,
    color: theme.colors.white,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: theme.colors.white,
    padding: theme.spacing.sm,
  },
});
