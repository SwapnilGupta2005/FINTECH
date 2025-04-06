
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { SearchBar } from '@/components/SearchBar';
import { StockRiskAnalysis } from '@/components/StockRiskAnalysis';
import { analyzeStockRisk } from '@/services/api';
import { toast } from 'sonner';
import { AlertTriangle, TrendingUp, Activity, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const RiskAssessment = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [riskData, setRiskData] = useState<any | null>(null);
  
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    
    try {
      const data = await analyzeStockRisk(query.toUpperCase());
      setRiskData(data);
      
      // Show different toast messages based on risk level
      if (data.riskLevel === 'High') {
        toast.warning(`${data.stock} has a high risk profile. Exercise caution.`);
      } else if (data.riskLevel === 'Low') {
        toast.success(`${data.stock} has a low risk profile.`);
      } else {
        toast.info(`${data.stock} risk analysis complete.`);
      }
    } catch (error) {
      console.error("Error analyzing stock risk:", error);
      toast.error("Failed to analyze stock risk. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="space-y-8 max-w-3xl mx-auto">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold tracking-tight animate-fade-in">
            <span className="bg-gradient-to-r from-fin-green to-fin-blue bg-clip-text text-transparent">
              Stock Risk Assessment
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Analyze volatility and historical performance to determine investment risk.
          </p>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
        
        {riskData ? (
          <div className="animate-fade-in-up">
            <StockRiskAnalysis 
              stockSymbol={riskData.stock}
              riskLevel={riskData.riskLevel}
              cagr={riskData.cagr}
              volatility={riskData.volatility}
              isLoading={isLoading}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <Card className="glass-card p-6 border border-white/5">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="h-5 w-5 text-fin-green" />
                    <h3 className="text-lg font-semibold">About CAGR</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Compound Annual Growth Rate (CAGR) measures the mean annual growth rate of an investment over a specified time period.
                  </p>
                  <div className="bg-muted/30 p-4 rounded-lg border border-white/5">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Below 5%</span>
                      <span className="text-sm text-fin-red">Low Return</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">5% - 15%</span>
                      <span className="text-sm text-fin-yellow">Average Return</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Above 15%</span>
                      <span className="text-sm text-fin-green">High Return</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card p-6 border border-white/5">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 mb-4">
                    <Activity className="h-5 w-5 text-fin-green" />
                    <h3 className="text-lg font-semibold">About Volatility</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Volatility measures how much the price of a stock fluctuates over time, indicating the level of risk.
                  </p>
                  <div className="bg-muted/30 p-4 rounded-lg border border-white/5">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Below 0.30</span>
                      <span className="text-sm text-fin-green">Low Volatility</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">0.30 - 0.60</span>
                      <span className="text-sm text-fin-yellow">Medium Volatility</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Above 0.60</span>
                      <span className="text-sm text-fin-red">High Volatility</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8 p-6 rounded-lg bg-muted/20 border border-white/5 glass-card">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-5 w-5 text-fin-green" />
                <h3 className="text-xl font-semibold">How We Calculate Risk</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                FinGuard uses a combination of historical data analysis, volatility measurement, and growth rate assessment 
                to determine the risk level of a stock.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-muted/30 border border-white/5">
                  <h4 className="font-medium mb-2">Low Risk</h4>
                  <p className="text-sm text-muted-foreground">Stocks with low volatility and stable returns. Suitable for conservative investors.</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30 border border-white/5">
                  <h4 className="font-medium mb-2">Moderate Risk</h4>
                  <p className="text-sm text-muted-foreground">Balanced risk-reward profile. Suitable for most investors with medium risk tolerance.</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30 border border-white/5">
                  <h4 className="font-medium mb-2">High Risk</h4>
                  <p className="text-sm text-muted-foreground">Volatile stocks with potential for high returns but also significant losses. For risk-tolerant investors.</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium">Data Source</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Stock analysis is powered by Alpha Vantage API, processing 5 years of historical data to provide accurate risk assessments.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 animate-fade-in">
            <div className="mb-4 opacity-60">
              <svg className="w-16 h-16 mx-auto text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Search for a Stock</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Enter a stock symbol above to assess its risk profile based on volatility and historical performance.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RiskAssessment;
