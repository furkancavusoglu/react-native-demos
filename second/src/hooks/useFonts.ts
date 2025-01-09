import { useCallback } from 'react';
import { useFonts as useExpoFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export function useFonts() {
  const [fontsLoaded] = useExpoFonts({
    'open-sans': require('../../assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return {
    fontsLoaded,
    onLayoutRootView,
  };
}
