import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import Button from '../src/components/ui/Button';
import Title from '../src/components/ui/Title';
import Card from '../src/components/ui/Card';
import InstructionText from '../src/components/ui/InstructionText';
import { theme } from '../src/theme';
import { isValidGameNumber } from '../src/utils/game';
import { useState } from 'react';
import { useGameStore } from '../src/store/game';
import { useResponsive } from '../src/hooks/useResponsive';

export default function StartGameScreen() {
  const [enteredNumber, setEnteredNumber] = useState('');
  const resetGame = useGameStore(state => state.resetGame);
  const { width, height, moderateScale } = useResponsive();
  const isLandscape = width > height;

  const numberInputHandler = (input: string) => {
    setEnteredNumber(input);
  };

  const resetInputHandler = () => {
    setEnteredNumber('');
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredNumber);
    if (!isValidGameNumber(chosenNumber)) {
      Alert.alert('Invalid number!', 'Number has to be between 1 and 99.', [
        { text: 'Okay', style: 'destructive', onPress: resetInputHandler },
      ]);
      return;
    }
    resetGame();
    router.push({ pathname: '/game', params: { number: chosenNumber } });
    setEnteredNumber('');
  };

  const dynamicStyles = StyleSheet.create({
    rootContainer: {
      flex: 1,
      paddingTop: isLandscape
        ? moderateScale(theme.spacing.sm)
        : moderateScale(theme.spacing.xxl * 2),
      alignItems: 'center',
      gap: isLandscape ? moderateScale(theme.spacing.sm) : moderateScale(theme.spacing.xl),
    },
    inputContainer: {
      gap: isLandscape ? moderateScale(theme.spacing.sm) : moderateScale(theme.spacing.md),
      padding: isLandscape ? moderateScale(theme.spacing.sm) : moderateScale(theme.spacing.lg),
    },
    numberInput: {
      height: isLandscape ? moderateScale(40) : moderateScale(70),
      width: isLandscape ? moderateScale(40) : moderateScale(70),
      fontSize: isLandscape
        ? moderateScale(theme.typography.sizes.xl)
        : moderateScale(theme.typography.sizes.xxl),
      borderBottomColor: theme.colors.accent[400],
      borderBottomWidth: 2,
      color: theme.colors.accent[400],
      fontFamily: theme.typography.fonts.bold,
      textAlign: 'center',
    },
    buttonsContainer: {
      flexDirection: 'row',
      gap: moderateScale(theme.spacing.sm),
      maxWidth: isLandscape ? moderateScale(250) : undefined,
    },
    buttonContainer: {
      flex: 1,
    },
  });

  return (
    <View style={dynamicStyles.rootContainer}>
      <Title
        title="Guess The Number"
        style={isLandscape && { fontSize: moderateScale(theme.typography.sizes.lg) }}
      />
      <Card style={dynamicStyles.inputContainer}>
        <InstructionText
          style={isLandscape && { fontSize: moderateScale(theme.typography.sizes.lg) }}
        >
          Enter a number
        </InstructionText>
        <TextInput
          style={dynamicStyles.numberInput}
          keyboardType="number-pad"
          autoCorrect={false}
          autoCapitalize="none"
          maxLength={2}
          value={enteredNumber}
          onChangeText={numberInputHandler}
        />
        <View style={dynamicStyles.buttonsContainer}>
          <View style={dynamicStyles.buttonContainer}>
            <Button
              onPress={resetInputHandler}
              style={
                isLandscape && {
                  margin: moderateScale(theme.spacing.xs),
                  padding: moderateScale(theme.spacing.xs),
                }
              }
            >
              Reset
            </Button>
          </View>
          <View style={dynamicStyles.buttonContainer}>
            <Button
              onPress={confirmInputHandler}
              style={
                isLandscape && {
                  margin: moderateScale(theme.spacing.xs),
                  padding: moderateScale(theme.spacing.xs),
                }
              }
            >
              Confirm
            </Button>
          </View>
        </View>
      </Card>
    </View>
  );
}
