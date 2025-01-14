import { Text, StyleSheet, type TextProps } from 'react-native';
import { theme } from '../../theme';
import { useResponsive } from '../../hooks/useResponsive';

interface TitleProps extends Omit<TextProps, 'style'> {
  title: string;
  style?: Text['props']['style'];
}

export default function Title({ title, style, ...textProps }: TitleProps) {
  const { moderateScale, horizontalScale } = useResponsive();

  const dynamicStyles = StyleSheet.create({
    title: {
      fontFamily: theme.typography.fonts.bold,
      fontSize: moderateScale(theme.typography.sizes.xl),
      color: theme.colors.white,
      textAlign: 'center',
      borderWidth: moderateScale(2),
      borderColor: theme.colors.white,
      padding: horizontalScale(theme.spacing.sm),
      maxWidth: '80%',
      width: horizontalScale(300),
      marginHorizontal: 'auto',
    },
  });

  return (
    <Text style={[dynamicStyles.title, style]} {...textProps}>
      {title}
    </Text>
  );
}
