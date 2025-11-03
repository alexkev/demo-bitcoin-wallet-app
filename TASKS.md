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

### **Hour 1: Core Infrastructure & Transaction List (Priority 1)**
- [x] Create Zustand store with mmkv persistence (initial data: MockTransactions.ts)
- [x] Build FlashList component for transaction display
- [x] Integrate transaction list into home screen with balance at top
- [x] Update wallet home icon to bitcoin symbol

### **Hour 2: Send Form Validation (Priority 2)**
- [-] Implement Bitcoin address validation
- [ ] Add BTC amount validation with decimal handling
- [ ] Create MAX button functionality (balance - network fee)
- [ ] Use `canSendAmount` validation logic in zustand store
- [ ] Use `getNetworkFee` utils for fee calculation

### **Hour 3: Transaction Creation & Flow (Priority 3)**  
- [ ] Connect send form to create new transactions
- [ ] Ensure new transactions appear at top of list
- [ ] Update wallet balance when transactions created
- [ ] Use zustand store's `addTransaction` method

### **Hour 4: Transaction Details & Polish (Priority 4)**
- [ ] Create transaction detail modal for tap interactions
- [ ] Improve styling and user feedback
- [ ] Add proper error states and validation messages
- [ ] Add coin animations (success/failure states)

### **Hour 5: Reusable Components & Final Touch (Priority 5)**
- [ ] Extract common button and input components
- [ ] Test complete flow and fix bugs
- [ ] Optimize FlashList performance

## Bonus Graph of Current bitcoin prices
- [ ] Implement a line graph showing bitcoin price trends using react-native-svg-charts
## Bonus Dark mode and light mode support
- [ ] Implement dark mode and light mode themes using react-native-paper's theming system

TODO
- implement MMKV persistence for zustand store