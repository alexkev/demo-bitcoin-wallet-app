import axios from 'axios';
import useSWR from 'swr';

interface MempoolFeeRecommendation {
  fastestFee: number;
  halfHourFee: number;
  hourFee: number;
  economyFee: number;
  minimumFee: number;
}

interface NetworkFeeData {
  fastestFee: number;
  halfHourFee: number;
  hourFee: number;
  economyFee: number;
  minimumFee: number;
}

const fetcher = async (url: string): Promise<NetworkFeeData> => {
  try {
    const response = await axios.get<MempoolFeeRecommendation>(url, {
      timeout: 10000, // 10 second timeout
    });
    return response.data;
  } catch (error) {
    console.warn('Failed to fetch network fees:', error);
    throw error;
  }
};

// Convert sat/vB to BTC for a typical transaction size
const convertSatPerVbToBtc = (satPerVb: number, txSizeVb: number = 225): number => {
  const satoshis = satPerVb * txSizeVb;
  return satoshis / 100000000; // Convert satoshis to BTC
};

export const useNetworkFee = (feeType: 'fastest' | 'halfHour' | 'hour' | 'economy' = 'halfHour') => {
  const { data, error, isLoading, mutate } = useSWR(
    'https://mempool.space/api/v1/fees/recommended',
    fetcher,
    {
      // refreshInterval: 120000, // Refresh every 2 minutes
      revalidateOnFocus: true,
      fallbackData: {
        fastestFee: 20,
        halfHourFee: 15,
        hourFee: 10,
        economyFee: 5,
        minimumFee: 1,
      },
      dedupingInterval: 60000, // Cache for 1 minute
      onError: (error) => {
        console.warn('SWR Network fee fetch error:', error);
      },
    }
  );

  const getFeeInBtc = (type: 'fastest' | 'halfHour' | 'hour' | 'economy') => {
    if (!data) return 0.00001; // Fallback fee
    
    let satPerVb: number;
    switch (type) {
      case 'fastest':
        satPerVb = data.fastestFee;
        break;
      case 'halfHour':
        satPerVb = data.halfHourFee;
        break;
      case 'hour':
        satPerVb = data.hourFee;
        break;
      case 'economy':
        satPerVb = data.economyFee;
        break;
      default:
        satPerVb = data.halfHourFee;
    }
    
    return convertSatPerVbToBtc(satPerVb);
  };

  return {
    fees: data,
    selectedFee: getFeeInBtc(feeType),
    getFeeInBtc,
    isLoading,
    isError: !!error,
    refresh: mutate,
  };
};