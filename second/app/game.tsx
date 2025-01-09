import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Title from '../src/components/ui/Title';
import NumberContainer from '../src/components/game/NumberContainer';
import Button from '../src/components/ui/Button';
import Card from '../src/components/ui/Card';
import InstructionText from '../src/components/ui/InstructionText';
import { theme } from '../src/theme';
import { useGame } from '../src/hooks/useGame';

type Params = {
  number: string;
};

export default function GameScreen() {
  const { number } = useLocalSearchParams<Params>();
  const userNumber = parseInt(number);
  const { currentGuess, guessRounds, nextGuessHandler } = useGame({ userNumber });

  return (
    <View style={styles.container}>
      <Title title="Opponent's Guess" />
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.card}>
        <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <Button onPress={() => nextGuessHandler('higher')}>
              <Ionicons name="add" size={20} color={theme.colors.accent[400]} />
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={() => nextGuessHandler('lower')}>
              <Ionicons name="remove" size={20} color={theme.colors.accent[400]} />
            </Button>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <Card style={styles.guessLogCard}>
          <InstructionText style={styles.guessLogTitle}>Guess Log</InstructionText>
          <FlatList
            data={guessRounds}
            renderItem={({ item, index }) => (
              <View style={styles.guessLogItem}>
                <Text style={styles.guessLogText}>
                  Guess {guessRounds.length - index}: {item}
                </Text>
              </View>
            )}
            keyExtractor={item => item.toString()}
          />
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    paddingTop: theme.spacing.lg,
  },
  card: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  instructionText: {
    marginBottom: theme.spacing.sm,
    fontSize: theme.typography.sizes.xl,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    marginTop: theme.spacing.md,
  },
  guessLogCard: {
    flex: 1,
    padding: theme.spacing.md,
  },
  guessLogTitle: {
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  guessLogItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary[700],
    padding: theme.spacing.sm,
    marginVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  guessLogText: {
    fontFamily: theme.typography.fonts.regular,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.accent[400],
  },
});
