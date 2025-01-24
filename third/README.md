# React Native Meals App

A beautiful recipe browsing application built with React Native and Expo Router. Features a modern UI, favorites system, and smooth navigation.

## Features

- Browse meal categories
- View detailed recipes
- Add/remove favorites
- Tab-based navigation
- Modal recipe details
- Responsive design
- State management with Zustand
- Beautiful UI with animations

## Tech Stack

- React Native
- Expo
- TypeScript
- NativeWind (TailwindCSS for React Native)
- Expo Router
- Zustand (State Management)
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
cd third
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
third/
├── app/              # App routes and navigation
│   ├── (tabs)/      # Tab-based routes
│   ├── meals/       # Meal category routes
│   └── meal-details/ # Meal detail routes
├── components/       # Reusable components
├── store/           # Zustand state management
├── utils/           # Utility functions
├── data/           # Mock data
└── package.json     # Project dependencies
```

## Navigation Structure

- Root Stack Navigator
  - Tab Navigator
    - Categories Tab
    - Favorites Tab
  - Meals Stack Screen
  - Meal Details Modal Screen

## State Management

Using Zustand for state management with the following features:

- Favorites management
- Loading states
- Error handling
- Automatic error clearing
- Optimized re-renders

## Development

- Use `npm start` to start the development server
- Use `npm run ios` or `npm run android` to run on specific platforms
- Use `npm run build` to create a production build

## Features in Detail

### UI Components

- Category grid tiles
- Meal list items
- Detailed meal view
- Custom headers
- Loading indicators
- Error messages

### Navigation Features

- Tab navigation
- Stack navigation
- Modal presentations
- Dynamic routing
- Deep linking support

### State Features

- Add/remove favorites
- Persistent favorites
- Loading states
- Error handling
- Optimized performance

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
