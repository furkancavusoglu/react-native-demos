# Design System

## Colors

- Primary: `#5e0acc` (Purple - Main action buttons, interactive elements)
- Primary Dark: `#4a0599` (Darker Purple - Selected states)
- Secondary: `#f31282` (Pink - Cancel/Delete actions)
- Background Dark: `#311b6b` (Dark Purple - Modal backgrounds)
- Input Background: `#e4d0ff` (Light Purple - Input fields)
- Input Text: `#120438` (Dark Purple - Input text)
- Text Light: `#ffffff` (White - Button text, titles on dark backgrounds)

## Typography

### Text Sizes

- Large Title: 24px (Modal titles)
- Section Title: 18px (Section headers)
- Body Text: 16px (Button text, regular content)

### Text Styles

- Title: Bold, white
- Button Text: Bold, white
- Input Text: Regular, dark purple

## Layout

### Spacing

- Container Padding: 16px
- Gap between elements: 8px (small), 12px (medium), 16px (large)
- Button Padding: 12px
- Input Padding: 16px

### Borders

- Border Radius: 6px (Consistent across buttons, inputs, cards)
- Border Width: 1px (For inputs)

## Components

### Buttons

- Height: Determined by 12px padding + text size
- Width: 100px for paired buttons, full width for standalone
- Border Radius: 6px
- Text: Bold, 16px, white
- Press Feedback: opacity 0.7

### Text Inputs

- Padding: 16px
- Border Radius: 6px
- Border: 1px solid #e4d0ff
- Background: #e4d0ff
- Text Color: #120438

### Modal

- Background: #311b6b
- Padding: 16px
- Full screen width
- Animation: slide (bottom to top for input modals, right to left for options)

### Icons

- Size: 24px for navigation/header
- Size: 18px for inline/list items
- Color: Matches parent context (usually white or primary)

## Interactions

### Touch Feedback

- Opacity reduction to 0.7 on press
- Ripple effect on Android where appropriate

### Animations

- Duration: 300ms
- Timing Function: Default ease
- Native Driver: Enabled for performance

## Accessibility

- Minimum touch target size: 44x44 points
- Clear contrast ratios
- Proper accessibility labels and hints
- Support for screen readers
