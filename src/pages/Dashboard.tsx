
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { SearchBar } from '@/components/SearchBar';
import { StockRiskAnalysis } from '@/components/StockRiskAnalysis';
import { SentimentAnalysis } from '@/components/SentimentAnalysis';
import { InvestmentHistory } from '@/components/InvestmentHistory';
import { StockData } from '@/components/StockCard';
import { getFullAnalysis, getUserHistory } from '@/services/api';
import { toast } from 'sonner';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [stockData, setStockData] = useState<any | null>(null);
  const [history, setHistory] = useState<StockData[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  
  // Mock user ID - in a real app, this would come from authentication
  const userId = "mock-user-id-123";
  
  // Load user history on component mount
  useEffect(() => {
    fetchUserHistory();
  }, []);
  
  const fetchUserHistory = async () => {
    setIsHistoryLoading(true);
    try {
      const data = await getUserHistory(userId);
      setHistory(data);
    } catch (error) {
      console.error("Error fetching user history:", error);
    } finally {
      setIsHistoryLoading(false);
    }
  };
  
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    
    try {
      const data = await getFullAnalysis(query.toUpperCase(), userId);
      setStockData(data);
      
      // Add to history if not already in history
      if (!history.find(item => item.symbol === data.stock)) {
        setHistory(prev => [
          {
            symbol: data.stock,
            riskLevel: data.riskLevel,
            cagr: data.cagr,
            volatility: data.volatility,
            sentimentScore: data.sentimentScore,
            marketSentiment: data.marketSentiment,
          },
          ...prev
        ]);
      }
      
      // Show different toast messages based on sentiment
      if (data.marketSentiment === 'Overhype') {
        toast.warning(`${data.stock} may be overhyped. Research thoroughly before investing.`);
      } else if (data.marketSentiment === 'Manipulation') {
        toast.error(`Warning: ${data.stock} shows signs of potential market manipulation.`);
      } else {
        toast.success(`${data.stock} analysis complete!`);
      }
    } catch (error) {
      console.error("Error searching for stock:", error);
      toast.error("Failed to analyze stock. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="space-y-8 max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold tracking-tight animate-fade-in">FinGuard Dashboard</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Get AI-powered sentiment analysis and risk assessment for stocks.
          </p>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
        
        {stockData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
            <StockRiskAnalysis 
              stockSymbol={stockData.stock}
              riskLevel={stockData.riskLevel}
              cagr={stockData.cagr}
              volatility={stockData.volatility}
              isLoading={isLoading}
            />
            <SentimentAnalysis 
              stockSymbol={stockData.stock}
              sentimentScore={stockData.sentimentScore}
              classification={stockData.marketSentiment}
              isLoading={isLoading}
            />
          </div>
        )}
        
        <div className="animate-fade-in-up">
          <InvestmentHistory history={history} isLoading={isHistoryLoading} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
