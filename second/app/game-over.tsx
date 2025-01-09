import { View, Text, StyleSheet, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Button from '../src/components/ui/Button';
import Card from '../src/components/ui/Card';
import { theme } from '../src/theme';

type Params = {
  rounds: string;
  number: string;
};

export default function GameOverScreen() {
  const { rounds, number } = useLocalSearchParams<Params>();
  const guessRounds = parseInt(rounds);
  const userNumber = parseInt(number);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Game Over!</Text>
        <Image source={require('../assets/images/success.png')} style={styles.image} />
        <Text style={styles.summaryText}>
          Your phone needed <Text style={styles.highlight}>{guessRounds}</Text> rounds to guess the
          number <Text style={styles.highlight}>{userNumber}</Text>.
        </Text>
        <View style={styles.buttonContainer}>
          <Button onPress={() => router.replace('/')}>Start New Game</Button>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  card: {
    gap: theme.spacing.lg,
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  title: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.xl,
    color: theme.colors.accent[400],
    marginBottom: theme.spacing.md,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: theme.borderRadius.full,
  },
  summaryText: {
    fontFamily: theme.typography.fonts.regular,
    fontSize: theme.typography.sizes.lg,
    textAlign: 'center',
    color: theme.colors.accent[400],
  },
  highlight: {
    fontFamily: theme.typography.fonts.bold,
    color: theme.colors.primary[500],
  },
  buttonContainer: {
    marginTop: theme.spacing.md,
  },
});
