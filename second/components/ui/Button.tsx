import { View, Text, StyleSheet, Pressable } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
}

export default function Button({ children, onPress }: ButtonProps) {
  return (
    <View style={styles.outerContainer}>
      <Pressable
        style={styles.innerContainer}
        android_ripple={{ color: '#640233' }}
        onPress={onPress}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  innerContainer: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: '#72063c',
    elevation: 4,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});
