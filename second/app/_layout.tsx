import { Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, SafeAreaView, StyleSheet, View, ActivityIndicator } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from '../src/hooks/useFonts';
import { theme } from '../src/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { fontsLoaded, onLayoutRootView } = useFonts();

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary[800]} />
      </View>
    );
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={[theme.colors.primary[900], theme.colors.accent[400]]}
      onLayout={onLayoutRootView}
    >
      <ImageBackground
        source={require('../assets/images/background.png')}
        style={styles.container}
        imageStyle={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.container}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: theme.colors.transparent },
              gestureEnabled: false,
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
                gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name="game"
              options={{
                headerShown: true,
                headerTransparent: true,
                headerTitle: '',
                headerBackVisible: true,
                gestureEnabled: true,
              }}
            />
            <Stack.Screen
              name="game-over"
              options={{
                headerShown: false,
                gestureEnabled: false,
              }}
            />
          </Stack>
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
