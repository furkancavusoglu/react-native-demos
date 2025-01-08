import { Text, StyleSheet, TextStyle } from 'react-native';
import { Colors } from '../../constants/colors';

interface InstructionTextProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export default function InstructionText({ children, style }: InstructionTextProps) {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: 'open-sans-bold',
    color: Colors.accent500,
    fontSize: 24,
  },
});
