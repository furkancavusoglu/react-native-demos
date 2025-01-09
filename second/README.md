# Number Guessing Game

A React Native mobile game where players pick a number and the app tries to guess it through a series of higher/lower interactions. Built with Expo and TypeScript for a polished, type-safe gaming experience.

## Features

### Game Mechanics

- **Number Selection**: Players choose a number between 1 and 99
- **Intelligent Guessing**: App uses binary search algorithm to guess the player's number
- **Interactive Gameplay**: Players guide the app by indicating if the guess is too high or low
- **Guess History**: Real-time log of all guesses made during the game
- **Game Over Summary**: Displays total rounds taken to guess the correct number

### UI/UX Features

- **Modern Design**: Clean and intuitive user interface
- **Custom Fonts**: Uses OpenSans font family for enhanced typography
- **Gradient Backgrounds**: Beautiful linear gradients for visual appeal
- **Animated Components**: Smooth transitions and interactions
- **Responsive Layout**: Adapts to different screen sizes
- **Safe Area Handling**: Proper layout on devices with notches/cutouts

### Technical Features

- **Type Safety**: Full TypeScript implementation
- **URL-Based Routing**: Modern navigation using Expo Router
- **Deep Linking Support**: URL-based navigation and state management
- **Font Loading**: Efficient custom font handling with expo-font
- **Splash Screen**: Professional loading experience
- **Component Reusability**: Modular UI components
- **State Management**: Efficient React state and effect hooks

## Technologies Used

### Core Technologies

- **React Native**: ^0.76.5
- **Expo**: ~52.0.23
- **TypeScript**: ^5.3.3

### Navigation & Routing

- **Expo Router**: ~4.0.16
- **React Native Screens**: ~4.4.0
- **React Native Safe Area Context**: 4.12.0
- **Expo Linking**: ~7.0.3

### UI & Styling

- **Expo Linear Gradient**: ~14.0.1
- **Custom UI Components**:
  - Card
  - Button
  - Title
  - NumberContainer
  - InstructionText

### Development Tools

- **ESLint**: ^9.17.0
  - eslint-config-prettier
  - eslint-plugin-react
  - eslint-plugin-react-native
- **Prettier**: ^3.4.2
- **TypeScript ESLint**:
  - @typescript-eslint/eslint-plugin
  - @typescript-eslint/parser

## Project Structure

second/
├── app/ # Expo Router pages
│ ├── \_layout.tsx # Root layout with global UI structure
│ ├── index.tsx # Home/Start game screen
│ ├── game.tsx # Main game screen
│ └── game-over.tsx # Game over screen
├── components/
│ ├── game/ # Game-specific components
│ └── ui/ # Reusable UI components
├── assets/
│ ├── fonts/ # Custom fonts
│ └── images/ # Game images
├── constants/
│ └── colors.ts # Global color definitions
└── package.json # Project dependencies

## Getting Started

1. **Prerequisites**

   - Node.js (LTS version)
   - npm or yarn
   - Expo Go app on your mobile device

2. **Installation**

   ```bash
   # Clone the repository
   git clone <repository-url>

   # Navigate to project directory
   cd second

   # Install dependencies
   npm install

   ```

3. **Running the App**

   ```bash
   # Start the development server
   npm start

   # Run on iOS
   npm run ios

   # Run on Android
   npm run android
   ```

## Game Rules

1. Enter a number between 1 and 99
2. The app will make a guess
3. Indicate if the guess is too high or too low
4. Continue until the app guesses correctly
5. View your game summary showing total rounds taken

## Contributing

Feel free to submit issues and enhancement requests!
