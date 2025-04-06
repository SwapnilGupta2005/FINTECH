
// This is a mock Firebase service for the demo
// In a real app, this would be connected to actual Firebase services

// Mock user data storage
const userDataStore: Record<string, any[]> = {};

// Firebase authentication mock
export const auth = {
  currentUser: {
    uid: "mock-user-id-123",
    email: "demo@fintech.com",
  },
  signIn: async (email: string, password: string) => {
    console.log(`Mock sign in with ${email}`);
    return { user: { uid: "mock-user-id-123", email } };
  },
  signOut: async () => {
    console.log("Mock sign out");
    return true;
  },
  onAuthStateChanged: (callback: (user: any) => void) => {
    // Simulate already logged in user
    callback(auth.currentUser);
    return () => {}; // Unsubscribe function
  }
};

// Firebase Firestore mock
export const firestore = {
  // Save data to our mock store
  saveUserData: async (userId: string, stockData: any) => {
    console.log(`Saving data for user ${userId}`);
    if (!userDataStore[userId]) {
      userDataStore[userId] = [];
    }
    
    // Add timestamp
    const dataWithTimestamp = {
      ...stockData,
      timestamp: new Date().toISOString(),
    };
    
    userDataStore[userId].push(dataWithTimestamp);
    return { id: `mock-doc-${Date.now()}` };
  },
  
  // Get user data from our mock store
  getUserData: async (userId: string) => {
    console.log(`Getting data for user ${userId}`);
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return userDataStore[userId] || [];
  }
};

// Initialize mock data for demo
(async () => {
  const mockUserId = "mock-user-id-123";
  const mockStocks = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      riskLevel: "Low",
      cagr: 15.23,
      volatility: 0.23,
      sentimentScore: 0.2,
      marketSentiment: "Normal",
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation", 
      riskLevel: "Low",
      cagr: 17.89,
      volatility: 0.21,
      sentimentScore: 0.8,
      marketSentiment: "Overhype",
    }
  ];
  
  for (const stock of mockStocks) {
    await firestore.saveUserData(mockUserId, stock);
  }
})();
