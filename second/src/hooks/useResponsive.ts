import { useWindowDimensions } from 'react-native';

const baseWidth = 375; // iPhone SE width as base
const baseHeight = 667; // iPhone SE height as base

export function useResponsive() {
  const { width, height } = useWindowDimensions();

  const horizontalScale = (size: number) => (width / baseWidth) * size;
  const verticalScale = (size: number) => (height / baseHeight) * size;
  const moderateScale = (size: number, factor = 0.5) => {
    return size + (horizontalScale(size) - size) * factor;
  };

  return {
    width,
    height,
    horizontalScale,
    verticalScale,
    moderateScale,
    isSmallDevice: width < 375,
    isMediumDevice: width >= 375 && width < 768,
    isLargeDevice: width >= 768,
  };
}
