# Fold Frontend Take-Home Challenge

Welcome to the Fold Frontend Take-Home Challenge.

For this project, you will create a basic bitcoin wallet app. This app will allow a user to view and send transactions. See details below for what we are expecting in terms of implementation.

## Requirements
- I should be able to enter a recipient's **Bitcoin address**, a **BTC amount**, and see the USD equivalent.
- The app should provide input validation where necessary
- When I submit the form, a **new transaction** should be added to a transaction list.
- Consider how this would work in a real app scenario.
- Make sure inputs and amounts are formatted correctly.

## Running the App

You can run the app with:

```bash
npm install -g expo-cli
npm install
npm run ios
```

## Task
1. Create a way to show all transactions in a list. 
    - You can find the mock transactions in the constants/MockTransactions.ts file.
    - Keep performance in mind when implementing this. 

2. Use an input to create the recipient address and amount inputs in the SendBitcoin component.
    - Please use validation for bitcoin amounts.
        - Amounts input should have a max value button that will set the input to the maximum sendable value.
    - Please use validation for recipient addresses. We expect to only accept a valid bitcoin address.

3. A user can not send more bitcoin than they have in their wallet minus the network fee.
    - The network fee can be found in the constants/NetorkFee.ts file.
    - A user should see the network fee in the UI.

4. When a user submits the form, a new transaction should be added to the transaction list.
    - The transaction should be added to the top of the list.
    - The transaction should be added to the list with the correct type, amount, timestamp, address, and status or any other data that you think is relevant.

5. Now that the transaction is added to the list, the user should be able to click on a transaction to view the details.
    - Show all relevant data for the transaction.

## Notes
- All visual design is up to you. We have intentionally degraded the design to allow you to have free reign over the design and layout.
- How do you think of success or failure of the transaction?
- The user should be able to see their balance on the Wallet Homescreen.
- The user should be able to see their balance in the SendBitcoin component.
- At Fold we think about reusability, scalability, and performance. Please keep this in mind when implementing the solution.
- Use any packages that you think are relevant to the solution.
- Please feel free to rearrange, reorganize, or refactor any filestructure, code, or anything else that you think is relevant to the solution.
- All buttons and inputs should be reusable and used throughout the app for consistent styling and behavior.


## Bonus
* Integrate a real bitcoin coversion rate and update the ui with current exchange rate.
    - Can use [this API](https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd) to get the current exchange rate.
* Integrate realtime network fee estimation.
    - Can use [this API](https://mempool.space/docs/api/rest#get-recommended-fees) to get the recommended network fee.
* Animations? Anything you think is relevant to make the app more engaging.
* Dark mode and light mode support.

## Time Expectation
This challenge is designed to take around 6 hours. Focus on your best judgment, clean code, and a thoughtful implementation.

## Implementation Summary

### ✅ Completed Features

#### Core Infrastructure
- **State Management**: Implemented Zustand store for transaction data
- **Transaction List**: Built performant transaction display using FlatList component
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
- **Theme Implementation**: Added yellow Fold theme throughout the app
- **Styling Improvements**: Enhanced Home and Send screen styling
- **Error States**: Proper validation messages and user feedback
- **Reusable Components**: Extracted common Button and StyledTextInput components

#### Bonus Features
- **APIs** for real-time bitcoin conversion rates and network fee estimation integrated
- **Dark/Light Mode**: Implemented theme switching support

### 🔄 In Progress / Planned
- **Animations**: Coin animations for success/failure states
- **Bitcoin Price Graph**: Line graph showing bitcoin price trends using react-native-svg-charts
- Keyboard handling improvements for better UX on SendBitcoin screen

### 🛠 Technical Stack Used
- React Native with Expo
- TypeScript
- Zustand for state management
- MMKV for persistence
- React Native Reanimated for animations
- Custom UI components with theme support

### 📱 App Features
1. **Wallet Balance Display**: Real-time balance shown on home screen
2. **Transaction History**: Complete list of all transactions with details
3. **Send Bitcoin**: Full send functionality with validation and fee calculation
4. **Transaction Details**: Tap any transaction to view complete details
5. **Theme Support**: Light and dark mode switching
6. **Input Validation**: Comprehensive validation for addresses and amounts
7. **Network Fee Display**: Users can see network fees before sending 