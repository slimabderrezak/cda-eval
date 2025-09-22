/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

// Couleurs basées sur la maquette
const tintColorLight = '#FF4757'; // Rouge corail principal
const tintColorDark = '#FF4757';

export const Colors = {
  light: {
    text: '#2C2C2C',
    background: '#FFE4E6',
    tint: tintColorLight,
    icon: '#8E8E8E',
    tabIconDefault: '#8E8E8E',
    tabIconSelected: tintColorLight,
    primary: '#FF4757',
    secondary: '#FF6B7D',
    accent: '#FFD6D9',
    card: '#FFF0F1',
    border: '#FFB3B8',
  },
  dark: {
    text: '#FFFFFF',
    background: '#2D1B1D',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: '#FF4757',
    secondary: '#FF6B7D',
    accent: '#3D2428',
    card: '#3A2327',
    border: '#4A2D32',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
