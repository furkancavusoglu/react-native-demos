# React Native Game App

A number guessing game built with React Native and Expo. Features a beautiful UI and engaging gameplay mechanics.

## Features

- Number guessing gameplay
- Animated feedback
- Game log with round history
- Responsive design for all screen sizes
- Portrait and landscape orientation support
- Custom UI components
- Sound effects and haptic feedback

## Tech Stack

- React Native
- Expo
- TypeScript
- NativeWind (TailwindCSS for React Native)
- Expo Linear Gradient
- React Native Reanimated

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Studio (for Android development)

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd second
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm start
# or
yarn start
```

4. Run on your preferred platform

- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app for physical device

## Project Structure

```
second/
├── app/              # Main application code
├── components/       # Reusable UI components
├── screens/         # Screen components
├── constants/       # App constants and theme
├── assets/          # Static assets (images, fonts)
└── package.json     # Project dependencies
```

## Game Rules

1. App generates a random number between 1 and 99
2. Player tries to guess the number
3. App provides "higher" or "lower" hints
4. Game tracks number of rounds until correct guess
5. Final screen shows game summary

## Development

- Use `npm start` to start the development server
- Use `npm run ios` or `npm run android` to run on specific platforms
- Use `npm run build` to create a production build

## Features in Detail

### UI Components

- Custom buttons with animations
- Gradient backgrounds
- Card layouts with shadows
- Responsive text sizing
- Custom number input

### Game Logic

- Random number generation
- Input validation
- Round tracking
- Game state management
- Score calculation

### Animations

- Button press feedback
- Screen transitions
- Number reveal animation
- Victory celebration effects

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
