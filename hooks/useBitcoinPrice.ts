import axios from 'axios';
import useSWR from 'swr';

interface CoinGeckoResponse {
  bitcoin: {
    usd: number;
  };
}

const fetcher = async (url: string): Promise<number> => {
  try {
    const response = await axios.get<CoinGeckoResponse>(url, {
      timeout: 10000, // 10 second timeout
    });
    return response.data.bitcoin.usd;
  } catch (error) {
    console.warn('Failed to fetch Bitcoin price:', error);
    throw error;
  }
};

export const useBitcoinPrice = () => {
  const { data, error, isLoading, mutate } = useSWR(
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
    fetcher,
    {
      refreshInterval: 60000, // Refresh every minute
      revalidateOnFocus: true,
      fallbackData: 30000, // Default fallback price
      dedupingInterval: 30000, // Cache for 30 seconds
      onError: (error) => {
        console.warn('SWR Bitcoin price fetch error:', error);
      },
    }
  );

  return {
    price: data ?? 30000,
    isLoading,
    isError: !!error,
    refresh: mutate,
  };
};