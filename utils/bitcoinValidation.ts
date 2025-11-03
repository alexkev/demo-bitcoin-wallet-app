/**
 * Bitcoin address validation utilities
 */

// Bitcoin address patterns
const BITCOIN_ADDRESS_PATTERNS = {
  // Legacy P2PKH addresses (start with 1)
  legacy: /^[1][a-km-zA-HJ-NP-Z1-9]{25,34}$/,
  // P2SH addresses (start with 3)
  p2sh: /^[3][a-km-zA-HJ-NP-Z1-9]{25,34}$/,
  // Bech32 addresses (start with bc1)
  bech32: /^bc1[a-z0-9]{39,59}$/,
  // Testnet addresses
  testnetLegacy: /^[mn][a-km-zA-HJ-NP-Z1-9]{25,34}$/,
  testnetP2SH: /^[2][a-km-zA-HJ-NP-Z1-9]{25,34}$/,
  testnetBech32: /^tb1[a-z0-9]{39,59}$/,
};

/**
 * Validates if a string is a valid Bitcoin address
 * @param address - The Bitcoin address to validate
 * @param includeTestnet - Whether to include testnet addresses (default: true for development)
 * @returns boolean indicating if the address is valid
 */
export const isValidBitcoinAddress = (address: string, includeTestnet: boolean = true): boolean => {
  if (!address || typeof address !== 'string') {
    return false;
  }

  const trimmedAddress = address.trim();
  
  // Check mainnet patterns
  const isMainnetValid = 
    BITCOIN_ADDRESS_PATTERNS.legacy.test(trimmedAddress) ||
    BITCOIN_ADDRESS_PATTERNS.p2sh.test(trimmedAddress) ||
    BITCOIN_ADDRESS_PATTERNS.bech32.test(trimmedAddress);

  if (isMainnetValid) {
    return true;
  }

  // Check testnet patterns if enabled
  if (includeTestnet) {
    const isTestnetValid = 
      BITCOIN_ADDRESS_PATTERNS.testnetLegacy.test(trimmedAddress) ||
      BITCOIN_ADDRESS_PATTERNS.testnetP2SH.test(trimmedAddress) ||
      BITCOIN_ADDRESS_PATTERNS.testnetBech32.test(trimmedAddress);
    
    return isTestnetValid;
  }

  return false;
};

/**
 * Gets the type of Bitcoin address
 * @param address - The Bitcoin address
 * @returns The address type or 'invalid'
 */
export const getBitcoinAddressType = (address: string): string => {
  if (!address) return 'invalid';
  
  const trimmedAddress = address.trim();
  
  if (BITCOIN_ADDRESS_PATTERNS.legacy.test(trimmedAddress)) return 'Legacy (P2PKH)';
  if (BITCOIN_ADDRESS_PATTERNS.p2sh.test(trimmedAddress)) return 'P2SH';
  if (BITCOIN_ADDRESS_PATTERNS.bech32.test(trimmedAddress)) return 'Bech32 (P2WPKH/P2WSH)';
  if (BITCOIN_ADDRESS_PATTERNS.testnetLegacy.test(trimmedAddress)) return 'Testnet Legacy';
  if (BITCOIN_ADDRESS_PATTERNS.testnetP2SH.test(trimmedAddress)) return 'Testnet P2SH';
  if (BITCOIN_ADDRESS_PATTERNS.testnetBech32.test(trimmedAddress)) return 'Testnet Bech32';
  
  return 'invalid';
};

/**
 * Validates and formats a BTC amount
 * @param amount - The amount string to validate
 * @returns object with validation result and formatted amount
 */
export const validateBitcoinAmount = (amount: string): {
  isValid: boolean;
  value: number;
  error?: string;
} => {
  if (!amount || amount.trim() === '') {
    return { isValid: false, value: 0, error: 'Amount is required' };
  }

  // Remove any whitespace
  const cleanAmount = amount.trim();
  
  // Check if it's a valid number
  const numericValue = parseFloat(cleanAmount);
  
  if (isNaN(numericValue)) {
    return { isValid: false, value: 0, error: 'Invalid number format' };
  }

  // Check if it's positive
  if (numericValue <= 0) {
    return { isValid: false, value: 0, error: 'Amount must be greater than 0' };
  }

  // Check decimal places (Bitcoin has max 8 decimal places)
  const decimalParts = cleanAmount.split('.');
  if (decimalParts.length > 1 && decimalParts[1].length > 8) {
    return { isValid: false, value: 0, error: 'Maximum 8 decimal places allowed' };
  }

  // Check maximum amount (21 million BTC)
  if (numericValue > 21000000) {
    return { isValid: false, value: 0, error: 'Amount exceeds maximum possible Bitcoin supply' };
  }

  return { isValid: true, value: numericValue };
};

/**
 * Formats a BTC amount to display with proper decimal places
 * @param amount - The amount to format
 * @param maxDecimals - Maximum decimal places (default: 8)
 * @returns Formatted amount string
 */
export const formatBitcoinAmount = (amount: number, maxDecimals: number = 8): string => {
  if (isNaN(amount) || amount === 0) return '0';
  
  // Convert to fixed decimal places and remove trailing zeros
  return parseFloat(amount.toFixed(maxDecimals)).toString();
};