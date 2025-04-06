
import { toast } from "sonner";

// Store API keys in a more secure way in a production environment
const GEMINI_API_KEY = "AIzaSyC_ZrbzJEsvdK66IhcQa7ykSdbKzjuFHXY";

export interface SentimentAnalysisResponse {
  stock: string;
  sentimentScore: number;
  classification: "Normal" | "Overhype" | "Manipulation";
}

export interface StockRiskResponse {
  stock: string;
  riskLevel: "Low" | "Moderate" | "High";
  cagr: number;
  volatility: number;
}

export interface FullAnalysisResponse {
  stock: string;
  riskLevel: "Low" | "Moderate" | "High";
  cagr: number;
  volatility: number;
  sentimentScore: number;
  marketSentiment: "Normal" | "Overhype" | "Manipulation";
  historySaved: boolean;
}

// Mock data for development - will be replaced with actual API calls
const mockStockData: Record<string, any> = {
  AAPL: {
    name: "Apple Inc.",
    riskLevel: "Low",
    cagr: 15.23,
    volatility: 0.23,
    sentimentScore: 0.2,
    marketSentiment: "Normal",
  },
  MSFT: {
    name: "Microsoft Corporation",
    riskLevel: "Low",
    cagr: 17.89,
    volatility: 0.21,
    sentimentScore: 0.8,
    marketSentiment: "Overhype",
  },
  TSLA: {
    name: "Tesla, Inc.",
    riskLevel: "High",
    cagr: 42.32,
    volatility: 0.78,
    sentimentScore: -0.5,
    marketSentiment: "Manipulation",
  },
  AMZN: {
    name: "Amazon.com, Inc.",
    riskLevel: "Moderate",
    cagr: 22.45,
    volatility: 0.45,
    sentimentScore: 0.1,
    marketSentiment: "Normal",
  },
  GOOGL: {
    name: "Alphabet Inc.",
    riskLevel: "Low",
    cagr: 18.76,
    volatility: 0.28,
    sentimentScore: 0.3,
    marketSentiment: "Normal",
  },
};

// Function to analyze sentiment using Google Gemini API
export const analyzeSentiment = async (stockSymbol: string): Promise<SentimentAnalysisResponse> => {
  try {
    console.log(`Analyzing sentiment for ${stockSymbol}...`);
    
    // In a production app, this would call an actual API endpoint
    // For now, let's return mock data
    if (mockStockData[stockSymbol]) {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        stock: stockSymbol,
        sentimentScore: mockStockData[stockSymbol].sentimentScore,
        classification: mockStockData[stockSymbol].marketSentiment,
      };
    }
    
    // If the stock is not in our mock data, return default values
    return {
      stock: stockSymbol,
      sentimentScore: 0.1,
      classification: "Normal",
    };
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    toast.error("Failed to analyze sentiment. Please try again.");
    throw new Error("Failed to analyze sentiment");
  }
};

// Function to analyze stock risk
export const analyzeStockRisk = async (stockSymbol: string): Promise<StockRiskResponse> => {
  try {
    console.log(`Analyzing risk for ${stockSymbol}...`);
    
    // In a production app, this would call an actual API endpoint
    // For now, let's return mock data
    if (mockStockData[stockSymbol]) {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        stock: stockSymbol,
        riskLevel: mockStockData[stockSymbol].riskLevel,
        cagr: mockStockData[stockSymbol].cagr,
        volatility: mockStockData[stockSymbol].volatility,
      };
    }
    
    // If the stock is not in our mock data, return default values
    return {
      stock: stockSymbol,
      riskLevel: "Moderate",
      cagr: 10.5,
      volatility: 0.35,
    };
  } catch (error) {
    console.error("Error analyzing stock risk:", error);
    toast.error("Failed to analyze stock risk. Please try again.");
    throw new Error("Failed to analyze stock risk");
  }
};

// Function to get full stock analysis
export const getFullAnalysis = async (stockSymbol: string, userId?: string): Promise<FullAnalysisResponse> => {
  try {
    console.log(`Getting full analysis for ${stockSymbol}...`);
    
    // In a production app, this would call an actual API endpoint
    // with userId for authentication
    // For now, let's return mock data
    
    // Simulate parallel API calls
    const [sentimentData, riskData] = await Promise.all([
      analyzeSentiment(stockSymbol),
      analyzeStockRisk(stockSymbol),
    ]);
    
    // Simulate saving to Firebase
    await saveUserData(userId || "anonymous", stockSymbol, {
      ...sentimentData,
      ...riskData,
    });
    
    return {
      stock: stockSymbol,
      riskLevel: riskData.riskLevel,
      cagr: riskData.cagr,
      volatility: riskData.volatility,
      sentimentScore: sentimentData.sentimentScore,
      marketSentiment: sentimentData.classification,
      historySaved: true,
    };
  } catch (error) {
    console.error("Error getting full analysis:", error);
    toast.error("Failed to get full analysis. Please try again.");
    throw new Error("Failed to get full analysis");
  }
};

// Function to save user data
export const saveUserData = async (userId: string, stockSymbol: string, data: any): Promise<boolean> => {
  try {
    console.log(`Saving data for user ${userId}, stock ${stockSymbol}...`);
    
    // In a production app, this would call a Firebase function
    // For now, let's simulate success
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return true;
  } catch (error) {
    console.error("Error saving user data:", error);
    toast.error("Failed to save your analysis history.");
    return false;
  }
};

// Function to get user history
export const getUserHistory = async (userId: string): Promise<any[]> => {
  try {
    console.log(`Getting history for user ${userId}...`);
    
    // In a production app, this would call a Firebase function
    // For now, let's return mock data
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return sample history with 3 stocks from our mock data
    return Object.keys(mockStockData)
      .slice(0, 3)
      .map(symbol => ({
        symbol,
        name: mockStockData[symbol].name,
        riskLevel: mockStockData[symbol].riskLevel,
        cagr: mockStockData[symbol].cagr,
        volatility: mockStockData[symbol].volatility,
        sentimentScore: mockStockData[symbol].sentimentScore,
        marketSentiment: mockStockData[symbol].marketSentiment,
      }));
  } catch (error) {
    console.error("Error getting user history:", error);
    toast.error("Failed to retrieve your analysis history.");
    return [];
  }
};
