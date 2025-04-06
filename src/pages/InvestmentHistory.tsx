
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { InvestmentHistory as InvestmentHistoryComponent } from '@/components/InvestmentHistory';
import { StockData } from '@/components/StockCard';
import { getUserHistory } from '@/services/api';
import { Clock, RefreshCw, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const InvestmentHistory = () => {
  const [history, setHistory] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock user ID - in a real app, this would come from authentication
  const userId = "mock-user-id-123";
  
  const fetchUserHistory = async () => {
    setIsLoading(true);
    try {
      const data = await getUserHistory(userId);
      setHistory(data);
      toast.success("Investment history loaded successfully");
    } catch (error) {
      console.error("Error fetching user history:", error);
      toast.error("Failed to load investment history");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load user history on component mount
  useEffect(() => {
    fetchUserHistory();
  }, []);
  
  return (
    <Layout>
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight animate-fade-in">Investment History</h1>
            <p className="text-muted-foreground mt-2 animate-fade-in">
              Your past stock analyses and risk assessments
            </p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={fetchUserHistory}
              disabled={isLoading}
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
        </div>
        
        <div className="rounded-lg bg-secondary/10 border border-border/50 p-6 glass-card">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Recent Analyses</h2>
          </div>
          
          <InvestmentHistoryComponent history={history} isLoading={isLoading} />
          
          {history.length > 0 && (
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Showing your {history.length} most recent stock analyses</p>
            </div>
          )}
        </div>
        
        <div className="rounded-lg bg-secondary/30 border border-border/50 p-6 glass-card mt-8">
          <h3 className="text-xl font-semibold mb-4">About Investment History</h3>
          <p className="text-muted-foreground mb-4">
            FinGuard automatically saves your stock analyses so you can track your investment research over time.
            This helps you identify patterns and improve your investment decisions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 rounded-lg bg-secondary/50">
              <h4 className="font-medium mb-2">Risk Tracking</h4>
              <p className="text-sm text-muted-foreground">
                Monitor how your risk assessment of different stocks changes over time as market conditions evolve.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50">
              <h4 className="font-medium mb-2">Sentiment History</h4>
              <p className="text-sm text-muted-foreground">
                Track market sentiment trends for the stocks you've researched to identify potential investment opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InvestmentHistory;
