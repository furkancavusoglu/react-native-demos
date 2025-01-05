import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StartGameScreen from './screens/StartGameScreen';
import { useState } from 'react';
import GameScreen from './screens/GameScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState<number | null>(null);

  function pickedNumberHandler(pickedNumber: number) {
    setUserNumber(pickedNumber);
  }

  const screen = () => {
    if (userNumber) {
      return <GameScreen userNumber={userNumber} />;
    }
    return <StartGameScreen onPickNumber={pickedNumberHandler} />;
  };

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
