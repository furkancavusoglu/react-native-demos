# Goals App Features

## Overview
A React Native application for managing personal goals. The app allows users to add and view their goals in a simple, intuitive interface.

## Core Features

### Goal Management
- Add new goals through a text input interface
- View all goals in a scrollable list
- Delete goals by tapping on them
- Empty goal validation (prevents adding empty goals)
- Automatic clearing of input field after successful goal addition

## Component Structure

### App Component (`App.tsx`)
- **Main State Management**
  - Maintains list of goals using React's useState hook
  - Each goal has a unique key and text content
- **Features**
  - Add new goals
  - Delete existing goals
- **Layout**
  - Flexible container with proper padding and spacing
  - Split view between input section and goals list
  - Uses FlatList for efficient goal rendering

### GoalInput Component (`components/GoalInput.tsx`)
- **Features**
  - Text input field for entering new goals
  - Add button to submit goals
  - Input validation (prevents empty submissions)
  - Auto-clearing after submission
- **Props**
  - `onAddGoal`: Callback function to add new goals
- **State**
  - Local state management for input field value

### GoalItem Component (`components/GoalItem.tsx`)
- **Features**
  - Individual goal display
  - Tap to delete functionality
  - Consistent styling for each goal item
- **Props**
  - `text`: The goal text to display
  - `id`: Unique identifier for the goal
  - `onDelete`: Callback function to handle deletion
- **Styling**
  - Purple background color (#5e0acc)
  - Rounded corners
  - White text for contrast
  - Proper padding and margins
- **Interaction**
  - Pressable wrapper for tap detection
  - Immediate deletion on tap

## UI/UX Features

### Layout
- Responsive design using Flexbox
- Proper spacing between elements
- Clear visual hierarchy

### Input Section
- Clear input placeholder text
- Border-defined input field
- Standard button for adding goals
- Input takes 70% of container width

### Goals List
- Scrollable list of goals
- Interactive goal items (tap to delete)
- Consistent spacing between goals
- Clear visual distinction between goals
- Efficient rendering using FlatList

## Technical Implementation
- Written in TypeScript for type safety
- Functional components with React hooks
- Modular component architecture
- Styled using React Native's StyleSheet
- Proper type definitions for props and state
- Event handling for user interactions 