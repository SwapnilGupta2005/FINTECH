
import React from 'react';
import { Clock, Search, Calendar } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { StockData, StockCard } from './StockCard';

interface InvestmentHistoryProps {
  history: StockData[];
  isLoading?: boolean;
}

export const InvestmentHistory: React.FC<InvestmentHistoryProps> = ({
  history,
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
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 w-full bg-muted rounded mb-4"></div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card w-full animate-fade-in border border-primary/20 shadow-[0_0_15px_rgba(50,205,50,0.05)]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl font-semibold">Investment History</CardTitle>
          <CardDescription>Your recent stock analyses</CardDescription>
        </div>
        <Clock className="h-6 w-6 text-primary/80" />
      </CardHeader>
      <CardContent className="pt-4">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">You haven't analyzed any stocks yet.</p>
            <p className="text-sm text-muted-foreground/70">Search for stocks to see your history here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((stock, index) => (
              <div key={index} className="border-b border-primary/10 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary/80" />
                    <span className="text-xs text-muted-foreground">
                      Analyzed on {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <StockCard data={stock} className="border-0 shadow-none p-0" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
