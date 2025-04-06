
import React from 'react';
import { 
  ShieldAlert, 
  TrendingUp, 
  Activity, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  AlertTriangle 
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

interface StockRiskAnalysisProps {
  stockSymbol: string;
  riskLevel: 'Low' | 'Moderate' | 'High';
  cagr: number;
  volatility: number;
  isLoading?: boolean;
}

export const StockRiskAnalysis: React.FC<StockRiskAnalysisProps> = ({
  stockSymbol,
  riskLevel,
  cagr,
  volatility,
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

  const getRiskIcon = () => {
    switch (riskLevel) {
      case 'Low':
        return <ArrowDownCircle className="h-6 w-6 text-fin-green" />;
      case 'Moderate':
        return <AlertTriangle className="h-6 w-6 text-fin-yellow" />;
      case 'High':
        return <ArrowUpCircle className="h-6 w-6 text-fin-red" />;
      default:
        return <ShieldAlert className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const getRiskColor = () => {
    switch (riskLevel) {
      case 'Low':
        return 'text-fin-green';
      case 'Moderate':
        return 'text-fin-yellow';
      case 'High':
        return 'text-fin-red';
      default:
        return 'text-muted-foreground';
    }
  };

  const getRiskDescription = () => {
    switch (riskLevel) {
      case 'Low':
        return 'This stock has historically shown lower volatility and stable returns.';
      case 'Moderate':
        return 'This stock has a balanced risk profile with moderate volatility.';
      case 'High':
        return 'This stock has high volatility and should be approached with caution.';
      default:
        return 'No risk data available.';
    }
  };

  return (
    <Card className="glass-card w-full animate-fade-in border border-primary/20 shadow-[0_0_15px_rgba(50,205,50,0.05)]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl font-semibold">Risk Assessment</CardTitle>
          <CardDescription>
            {stockSymbol ? `Analysis for ${stockSymbol}` : 'Stock risk insights'}
          </CardDescription>
        </div>
        {getRiskIcon()}
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Risk Classification</span>
            <span className={`text-lg font-bold ${getRiskColor()}`}>{riskLevel}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col space-y-2 p-4 rounded-lg bg-secondary/50 border border-primary/10">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-fin-blue" />
                <span className="text-sm font-medium">CAGR</span>
              </div>
              <span className="text-2xl font-bold">{cagr.toFixed(2)}%</span>
              <span className="text-xs text-muted-foreground">Compound Annual Growth Rate</span>
            </div>
            
            <div className="flex flex-col space-y-2 p-4 rounded-lg bg-secondary/50 border border-primary/10">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-fin-electric" />
                <span className="text-sm font-medium">Volatility</span>
              </div>
              <span className="text-2xl font-bold">{volatility.toFixed(2)}</span>
              <span className="text-xs text-muted-foreground">Price fluctuation intensity</span>
            </div>
          </div>
          
          <div className="mt-4 p-4 rounded-lg bg-secondary/50 border border-primary/10">
            <p className="text-sm text-muted-foreground">{getRiskDescription()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
