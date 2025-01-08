import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StartGameScreen from './screens/StartGameScreen';
import { useState } from 'react';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [userNumber, setUserNumber] = useState<number | null>(null);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  function pickedNumberHandler(pickedNumber: number) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setGameIsOver(false);
    setGuessRounds(0);
  }

  function gameIsOverHandler() {
    setGameIsOver(true);
  }

  function guessRoundHandler(rounds: number) {
    setGuessRounds(rounds);
  }

  const screen = () => {
    if (gameIsOver && userNumber !== null) {
      return (
        <GameOverScreen
          setGameIsOver={startNewGameHandler}
          setUserNumber={setUserNumber}
          guessRounds={guessRounds}
          userNumber={userNumber}
        />
      );
    } else if (userNumber) {
      return (
        <GameScreen
          userNumber={userNumber}
          onGameOver={gameIsOverHandler}
          onGuessRound={guessRoundHandler}
        />
      );
    }

    return <StartGameScreen onPickNumber={pickedNumberHandler} />;
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <LinearGradient style={styles.container} colors={['#4e0329', '#ddb52f']}>
      <ImageBackground
        source={require('./assets/images/background.png')}
        style={styles.container}
        imageStyle={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.container}>{screen()}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
