import { View, StyleSheet, FlatList, Text, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import Title from '../src/components/ui/Title';
import NumberContainer from '../src/components/game/NumberContainer';
import Button from '../src/components/ui/Button';
import Card from '../src/components/ui/Card';
import InstructionText from '../src/components/ui/InstructionText';
import { theme } from '../src/theme';
import { useGameStore } from '../src/store/game';
import { GuessDirection } from '../src/types/game';
import { useResponsive } from '../src/hooks/useResponsive';

type RouteParams = {
  number: string;
};

export default function GameScreen() {
  const { number } = useLocalSearchParams<RouteParams>();
  const userNumber = parseInt(number);
  const { moderateScale, horizontalScale, isLargeDevice } = useResponsive();

  const { currentGuess, guessRounds, isGameOver, initializeGame, makeGuess } = useGameStore();

  useEffect(() => {
    initializeGame(userNumber);
  }, [userNumber]);

  useEffect(() => {
    if (isGameOver) {
      router.replace({
        pathname: '/game-over',
        params: { rounds: guessRounds.length.toString(), number: userNumber.toString() },
      });
    }
  }, [isGameOver, guessRounds.length, userNumber]);

  const handleGuess = (direction: GuessDirection) => {
    const result = makeGuess(direction);
    if (!result.isValid && result.message) {
      Alert.alert('Invalid Move', result.message, [{ text: 'Sorry!', style: 'cancel' }]);
    }
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: horizontalScale(theme.spacing.md),
      paddingTop: moderateScale(theme.spacing.lg),
      alignItems: isLargeDevice ? 'center' : undefined,
    },
    card: {
      marginTop: moderateScale(theme.spacing.sm),
      gap: moderateScale(theme.spacing.sm),
      maxWidth: isLargeDevice ? 500 : '100%',
    },
    instructionText: {
      marginBottom: moderateScale(theme.spacing.sm),
      fontSize: moderateScale(theme.typography.sizes.xl),
      textAlign: 'center',
    },
    buttonsContainer: {
      flexDirection: 'row',
      gap: horizontalScale(theme.spacing.sm),
    },
    buttonContainer: {
      flex: 1,
    },
    listContainer: {
      flex: 1,
      marginTop: moderateScale(theme.spacing.md),
      maxWidth: isLargeDevice ? 500 : '100%',
    },
    guessLogCard: {
      flex: 1,
      padding: moderateScale(theme.spacing.md),
    },
    guessLogTitle: {
      textAlign: 'center',
      marginBottom: moderateScale(theme.spacing.sm),
    },
    guessLogItem: {
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: theme.colors.primary[700],
      padding: moderateScale(theme.spacing.sm),
      marginVertical: moderateScale(theme.spacing.xs),
      borderRadius: theme.borderRadius.lg,
      ...theme.shadows.sm,
    },
    guessLogText: {
      fontFamily: theme.typography.fonts.regular,
      fontSize: moderateScale(theme.typography.sizes.md),
      color: theme.colors.accent[400],
    },
  });

  return (
    <View style={dynamicStyles.container}>
      <Title title="Opponent's Guess" />
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={dynamicStyles.card}>
        <InstructionText style={dynamicStyles.instructionText}>Higher or lower?</InstructionText>
        <View style={dynamicStyles.buttonsContainer}>
          <View style={dynamicStyles.buttonContainer}>
            <Button onPress={() => handleGuess('higher')}>
              <Ionicons name="add" size={moderateScale(20)} color={theme.colors.accent[400]} />
            </Button>
          </View>
          <View style={dynamicStyles.buttonContainer}>
            <Button onPress={() => handleGuess('lower')}>
              <Ionicons name="remove" size={moderateScale(20)} color={theme.colors.accent[400]} />
            </Button>
          </View>
        </View>
      </Card>
      <View style={dynamicStyles.listContainer}>
        <Card style={dynamicStyles.guessLogCard}>
          <InstructionText style={dynamicStyles.guessLogTitle}>Guess Log</InstructionText>
          <FlatList
            data={guessRounds}
            renderItem={({ item, index }) => (
              <View style={dynamicStyles.guessLogItem}>
                <Text style={dynamicStyles.guessLogText}>
                  Guess {guessRounds.length - index}: {item.number}
                </Text>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </Card>
      </View>
    </View>
  );
}
