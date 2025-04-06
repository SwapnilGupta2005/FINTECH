
import React from 'react';
import { 
  ArrowUpCircle, 
  ArrowDownCircle, 
  AlertTriangle,
  Percent,
  BarChart,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StockData {
  symbol: string;
  name?: string;
  riskLevel: 'Low' | 'Moderate' | 'High';
  cagr?: number;
  volatility?: number;
  sentimentScore?: number;
  marketSentiment?: 'Normal' | 'Overhype' | 'Manipulation';
  historySaved?: boolean;
}

interface StockCardProps {
  data: StockData;
  className?: string;
}

export const StockCard: React.FC<StockCardProps> = ({ data, className }) => {
  const getRiskIcon = () => {
    switch (data.riskLevel) {
      case 'Low':
        return <ArrowDownCircle className="h-5 w-5 text-fin-green" />;
      case 'Moderate':
        return <AlertTriangle className="h-5 w-5 text-fin-yellow" />;
      case 'High':
        return <ArrowUpCircle className="h-5 w-5 text-fin-red" />;
      default:
        return null;
    }
  };

  const getSentimentIcon = () => {
    if (!data.marketSentiment) return null;
    
    switch (data.marketSentiment) {
      case 'Normal':
        return <BarChart className="h-5 w-5 text-fin-blue" />;
      case 'Overhype':
        return <TrendingUp className="h-5 w-5 text-fin-purple" />;
      case 'Manipulation':
        return <AlertCircle className="h-5 w-5 text-fin-red" />;
      default:
        return null;
    }
  };

  const getSentimentScoreColor = () => {
    if (data.sentimentScore === undefined) return "text-muted-foreground";
    if (data.sentimentScore > 0.7) return "text-fin-purple";
    if (data.sentimentScore < -0.3) return "text-fin-red";
    return "text-fin-blue";
  };

  return (
    <div className={cn(
      "dashboard-card glass-card border border-primary/10 animate-fade-in", 
      className
    )}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-xl font-semibold tracking-tight tech-gradient">{data.symbol}</h3>
          {data.name && <p className="text-sm text-muted-foreground">{data.name}</p>}
        </div>
        <div className="flex items-center gap-2">
          {getRiskIcon()}
          <span className="text-sm font-medium">{data.riskLevel} Risk</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {(data.cagr !== undefined || data.volatility !== undefined) && (
          <div className="space-y-3 p-3 bg-secondary/50 rounded-lg border border-primary/10">
            <h4 className="text-sm font-medium">Risk Analysis</h4>
            {data.cagr !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">CAGR</span>
                <div className="flex items-center">
                  <Percent className="h-3 w-3 mr-1 text-fin-green" />
                  <span className="font-medium">{data.cagr.toFixed(2)}</span>
                </div>
              </div>
            )}
            {data.volatility !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Volatility</span>
                <span className="font-medium">{data.volatility.toFixed(2)}</span>
              </div>
            )}
          </div>
        )}
        
        {data.sentimentScore !== undefined && (
          <div className="space-y-3 p-3 bg-secondary/50 rounded-lg border border-primary/10">
            <h4 className="text-sm font-medium">Sentiment Analysis</h4>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Score</span>
              <span className={`font-medium ${getSentimentScoreColor()}`}>
                {data.sentimentScore.toFixed(2)}
              </span>
            </div>
            {data.marketSentiment && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Classification</span>
                <div className="flex items-center gap-1">
                  {getSentimentIcon()}
                  <span className="text-sm">{data.marketSentiment}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {data.historySaved && (
        <div className="mt-4 text-xs text-right text-primary/70">
          Analysis saved to your history
        </div>
      )}
    </div>
  );
};
