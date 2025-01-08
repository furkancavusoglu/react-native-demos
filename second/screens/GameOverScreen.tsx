import { View, Text, StyleSheet, Image } from 'react-native';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Colors } from '../constants/colors';

interface GameOverScreenProps {
  setGameIsOver: (value: boolean) => void;
  setUserNumber: (value: number | null) => void;
  guessRounds: number;
  userNumber: number;
}

export default function GameOverScreen({
  setGameIsOver,
  setUserNumber,
  guessRounds,
  userNumber,
}: GameOverScreenProps) {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Game Over!</Text>
        <Image source={require('../assets/images/success.png')} style={styles.image} />
        <Text style={styles.summaryText}>
          Your phone needed <Text style={styles.highlight}>{guessRounds}</Text> rounds to guess the
          number <Text style={styles.highlight}>{userNumber}</Text>.
        </Text>
        <Button
          onPress={() => {
            setGameIsOver(false);
            setUserNumber(null);
          }}
        >
          Start New Game
        </Button>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 24,
    color: Colors.accent500,
    marginBottom: 16,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  card: {
    gap: 20,
    alignItems: 'center',
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    color: Colors.accent500,
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500,
  },
});
