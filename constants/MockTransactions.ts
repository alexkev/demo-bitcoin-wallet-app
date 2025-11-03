export const MOCK_TRANSACTIONS = [
    {
      id: "1",
      type: "receive",
      amount: 0.05,
      timestamp: new Date(Date.now() - 3600000),
      address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      status: "completed",
    },
    {
      id: "2",
      type: "send",
      amount: 0.025,
      timestamp: new Date(Date.now() - 7200000),
      address: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
      status: "completed",
    },
    {
      id: "3",
      type: "receive",
      amount: 0.1,
      timestamp: new Date(Date.now() - 86400000),
      address: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
      status: "completed",
    },
  ];