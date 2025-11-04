# A demo Bitcoin wallet app

You can run the app with:

### 🛠 Technical Stack Used
- React Native with Expo
- TypeScript
- Zustand for state management
- MMKV for persistence
- React Native Reanimated for animations
- Custom UI components with theme support

<img src="./Simulator Screenshot - iPhone 15 Pro Max - 2025-11-03 at 16.56.25.png" alt="App Screenshot 1" width="300"/>

### 📱 App Features
1. **Wallet Balance Display**: Real-time balance shown on home screen
2. **Transaction History**: Complete list of all transactions with details
3. **Send Bitcoin**: Full send functionality with validation and fee calculation
4. **Transaction Details**: Tap any transaction to view complete details
5. **Theme Support**: Light and dark mode switching
6. **Input Validation**: Comprehensive validation for addresses and amounts
7. **Network Fee Display**: Users can see network fees before sending 

```bash
npm install -g expo-cli
npm install
npm run ios
```

#### Core Infrastructure
- **State Management**: Implemented Zustand store for transaction data
- **Transaction List**: Built performant transaction display using FlashList component
- **Home Screen Integration**: Added transaction list to home screen with balance display at top
- **UI Enhancement**: Updated wallet home icon to bitcoin symbol

#### Send Bitcoin Functionality
- **Address Validation**: Implemented Bitcoin address validation with proper error handling
- **Amount Validation**: Added BTC amount validation with decimal handling and max value button
- **Network Fee Integration**: Connected network fee calculation from API
- **Transaction Creation**: Fully functional send form that creates new transactions
- **Balance Updates**: Real-time wallet balance updates when transactions are created
- **Transaction Ordering**: New transactions appear at the top of the list

#### User Experience
- **Transaction Details**: Interactive transaction detail modal for viewing transaction information
- **Theme Implementation**: Added theme throughout the app with light and dark modes
- **Styling Improvements**: Enhanced Home and Send screen styling
- **Error States**: Proper validation messages and user feedback
- **Reusable Components**: Extracted common Button and StyledTextInput components
- **APIs** for real-time bitcoin conversion rates and network fee estimation integrated

### 🔄 In Progress / Planned
- **Animations**: Coin animations for success/failure states
- **Bitcoin Price Graph**: Line graph showing bitcoin price trends using react-native-svg-charts
- Keyboard handling improvements for better UX on SendBitcoin screen


