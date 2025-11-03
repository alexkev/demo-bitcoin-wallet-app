# Bitcoin Wallet Implementation Tasks

## 5-Hour Implementation Plan

# Stack
- React Native with Expo
- TypeScript
- Zustand for state management with mmkv persistence
- Shopify's FlashList for performant transaction list rendering
- useSWR for data fetching
- react-native-reanimated for smooth animations
- react-native-svg-charts for bonus bitcoin price graph
- react-native-paper for UI components in ./components/ui 

### Core Infrastructure & Transaction List**
- [x] Create Zustand store with mmkv persistence (initial data: MockTransactions.ts)
- [x] Build FlashList component for transaction display
- [x] Integrate transaction list into home screen with balance at top
- [x] Update wallet home icon to bitcoin symbol

### Send Form Validation
- [x] Implement Bitcoin address validation
- [x] Add BTC amount validation with decimal handling
- [x] Use `canSendAmount` validation logic in zustand store
- [x] Use `getNetworkFee` utils for fee calculation
- [x] Connect send form to create new transactions
- [x] Ensure new transactions appear at top of list
- [x] Update wallet balance when transactions created
- [x] Use zustand store's `addTransaction` method

### Transaction Details & Polish
- [x] Create transaction detail modal for tap interactions
- [x] Improve styling and user feedback
  - Update Home screen styling
  - Add yellow fold theme
  - Update Send screen styling
- [x] Add proper error states and validation messages
- [ ] Add coin animations (success/failure states)

### Reusable Components & Final Touch
- [x] Extract common button and input components
- [x] Test complete flow and fix bugs
- [ ] add FlashList by shopify for transaction list

## Bonus Graph of Current bitcoin prices
- [ ] Implement a line graph showing bitcoin price trends using react-native-svg-charts
## Bonus Dark mode and light mode support
- [x] Implement dark mode and light mode 

TODO
- implement MMKV persistence for zustand store
-   - Update transaction detail modal styling
-     - Implement smooth transitions and animations
