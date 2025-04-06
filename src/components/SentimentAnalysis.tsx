
import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle,
  Info 
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SentimentAnalysisProps {
  stockSymbol: string;
  sentimentScore: number;
  classification: string;
  isLoading?: boolean;
}

export const SentimentAnalysis: React.FC<SentimentAnalysisProps> = ({
  stockSymbol,
  sentimentScore,
  classification,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <Card className="glass-card w-full animate-pulse">
        <CardHeader>
          <div className="h-6 w-1/3 bg-muted rounded"></div>
          <div className="h-4 w-1/2 bg-muted rounded"></div>
        </CardHeader>
        <CardContent>
          <div className="h-20 w-full bg-muted rounded"></div>
        </CardContent>
      </Card>
    );
  }

  const getIcon = () => {
    switch (classification) {
      case 'Normal':
        return <BarChart3 className="h-6 w-6 text-fin-blue" />;
      case 'Overhype':
        return <TrendingUp className="h-6 w-6 text-fin-purple" />;
      case 'Manipulation':
        return <AlertCircle className="h-6 w-6 text-fin-red" />;
      default:
        return <TrendingDown className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const getClassificationColor = () => {
    switch (classification) {
      case 'Normal':
        return 'text-fin-blue';
      case 'Overhype':
        return 'text-fin-purple';
      case 'Manipulation':
        return 'text-fin-red';
      default:
        return 'text-muted-foreground';
    }
  };

  const getDescription = () => {
    switch (classification) {
      case 'Normal':
        return 'The stock has normal market sentiment without significant hype or manipulation.';
      case 'Overhype':
        return 'This stock may be overhyped. Consider extra research before investing.';
      case 'Manipulation':
        return 'Warning: Potential market manipulation detected. Proceed with caution.';
      default:
        return 'No sentiment data available.';
    }
  };

  return (
    <Card className="glass-card w-full animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl font-semibold">AI Sentiment Analysis</CardTitle>
          <CardDescription>
            {stockSymbol ? `Analysis for ${stockSymbol}` : 'Market sentiment insights'}
          </CardDescription>
        </div>
        {getIcon()}
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Sentiment Score</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Score ranges from -1 (highly negative) to +1 (highly positive). A score between -0.3 and 0.3 is considered normal.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="text-lg font-bold">{sentimentScore.toFixed(2)}</div>
          </div>
          
          <div className="h-2 w-full bg-secondary rounded-full">
            <div 
              className={`h-full rounded-full ${sentimentScore > 0.7 ? 'bg-fin-purple' : sentimentScore < -0.3 ? 'bg-fin-red' : 'bg-fin-blue'}`}
              style={{ width: `${Math.min(Math.max((sentimentScore + 1) / 2 * 100, 0), 100)}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Highly Negative (-1.0)</span>
            <span>Neutral (0.0)</span>
            <span>Highly Positive (+1.0)</span>
          </div>
          
          <div className="mt-6 p-4 rounded-lg bg-secondary/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Classification</span>
              <span className={`text-sm font-bold ${getClassificationColor()}`}>{classification}</span>
            </div>
            <p className="text-sm text-muted-foreground">{getDescription()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
