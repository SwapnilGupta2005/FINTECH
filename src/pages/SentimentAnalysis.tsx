
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { SearchBar } from '@/components/SearchBar';
import { SentimentAnalysis as SentimentAnalysisComponent } from '@/components/SentimentAnalysis';
import { analyzeSentiment } from '@/services/api';
import { toast } from 'sonner';

const SentimentAnalysis = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sentimentData, setSentimentData] = useState<any | null>(null);
  
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    
    try {
      const data = await analyzeSentiment(query.toUpperCase());
      setSentimentData(data);
      
      // Show different toast messages based on sentiment
      if (data.classification === 'Overhype') {
        toast.warning(`${data.stock} may be overhyped. Research thoroughly before investing.`);
      } else if (data.classification === 'Manipulation') {
        toast.error(`Warning: ${data.stock} shows signs of potential market manipulation.`);
      } else {
        toast.success(`${data.stock} sentiment analysis complete!`);
      }
    } catch (error) {
      console.error("Error searching for stock:", error);
      toast.error("Failed to analyze stock sentiment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="space-y-8 max-w-3xl mx-auto">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold tracking-tight animate-fade-in">AI Sentiment Analysis</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Analyze market sentiment and detect potential stock manipulation using AI.
          </p>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
        
        {sentimentData ? (
          <div className="animate-fade-in-up">
            <SentimentAnalysisComponent 
              stockSymbol={sentimentData.stock}
              sentimentScore={sentimentData.sentimentScore}
              classification={sentimentData.classification}
              isLoading={isLoading}
            />
            <div className="mt-8 p-6 rounded-lg bg-secondary/30 border border-border/50 glass-card">
              <h3 className="text-xl font-semibold mb-4">About Market Sentiment Analysis</h3>
              <p className="text-muted-foreground mb-4">
                Our AI-powered sentiment analysis uses Google's Gemini API to analyze financial news and social media discussions, 
                detecting potential market manipulation or overhyped stocks before you invest.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium mb-2">Normal Market Sentiment</h4>
                  <p className="text-sm text-muted-foreground">Score between -0.3 and 0.3. Balanced market perception without significant hype or manipulation.</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium mb-2">Potential Overhype</h4>
                  <p className="text-sm text-muted-foreground">Score above 0.7. Stock may be experiencing excessive optimism. Proceed with caution.</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium mb-2">Possible Manipulation</h4>
                  <p className="text-sm text-muted-foreground">Score below -0.3. Stock may be subject to negative manipulation campaigns. Investigate further.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 animate-fade-in">
            <div className="mb-4 opacity-60">
              <svg className="w-16 h-16 mx-auto text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Search for a Stock</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Enter a stock symbol above to analyze its market sentiment and detect potential manipulation.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SentimentAnalysis;
