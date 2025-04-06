
import React from 'react';
import { ArrowRight, ShieldCheck, BarChart3, History, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';

const Index = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <section className="w-full py-12 md:py-24 lg:py-32 flex flex-col items-center text-center animate-fade-in">
          <div className="container px-4 md:px-6">
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm animate-slide-right">
                <span className="font-medium">Introducing FinGuard</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter animate-typing">
                AI-Powered Investment <span className="text-primary">Protection</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-[700px] mx-auto animate-slide-up">
                Analyze sentiment, detect market manipulation, and assess risk with our advanced AI technology.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="button-hover animate-pulse-glow">
                  <Link to="/dashboard">
                    Try FinGuard <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 bg-secondary/50 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 highlight-card rounded-xl animate-fade-in-up hover-scale transition-transform hover-glow" style={{ animationDelay: '0.1s' }}>
                <div className="rounded-full p-3 bg-primary/10 mb-4 animate-float animate-delay-100">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Risk Analysis</h3>
                <p className="text-muted-foreground">
                  Comprehensive risk assessment based on volatility and historical performance.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 highlight-card rounded-xl animate-fade-in-up hover-scale transition-transform hover-glow" style={{ animationDelay: '0.2s' }}>
                <div className="rounded-full p-3 bg-primary/10 mb-4 animate-float animate-delay-200">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Sentiment Analysis</h3>
                <p className="text-muted-foreground">
                  AI-powered analysis of market sentiment to detect hype or manipulation.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 highlight-card rounded-xl animate-fade-in-up hover-scale transition-transform hover-glow" style={{ animationDelay: '0.3s' }}>
                <div className="rounded-full p-3 bg-primary/10 mb-4 animate-float animate-delay-300">
                  <History className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Investment History</h3>
                <p className="text-muted-foreground">
                  Track your investment research and analysis over time for better decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-4 animate-fade-in-up">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm animate-slide-right">
                  <span className="font-medium">About FinGuard</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Make Smarter Investment Decisions
                </h2>
                <p className="text-muted-foreground">
                  FinGuard combines advanced AI sentiment analysis with traditional risk assessment to give you a comprehensive view of potential investments.
                </p>
                <ul className="space-y-2">
                  {[
                    "Detect potential market manipulation",
                    "Identify overhyped stocks before investing",
                    "Assess risk based on volatility and growth",
                    "Keep track of your research and analysis",
                    "Make data-driven investment decisions"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 animate-slide-right" style={{ animationDelay: `${i * 100}ms` }}>
                      <Lightbulb className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="mt-4 button-hover hover-scale transition-transform">
                  <Link to="/dashboard">Start Analysis</Link>
                </Button>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10 p-8 animate-fade-in-up hover-scale transition-transform">
                <div className="aspect-video relative bg-white rounded-lg overflow-hidden shadow-xl glass-card animate-pulse-glow">
                  <div className="p-4">
                    <div className="h-6 w-1/4 bg-muted rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-muted/70 rounded"></div>
                      <div className="h-4 w-5/6 bg-muted/70 rounded"></div>
                      <div className="h-4 w-4/6 bg-muted/70 rounded"></div>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-2xl font-bold text-primary/40">FinGuard Demo</div>
                  </div>
                </div>
                <div className="mt-8 text-center text-sm text-muted-foreground">
                  Visualize risk and sentiment data in an intuitive interface
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-secondary/50 backdrop-blur-sm">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-8 animate-fade-in">
              Ready to Protect Your Investments?
            </h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto mb-8 animate-fade-in-up">
              Get started with FinGuard today and make more informed investment decisions with the power of AI.
            </p>
            <Button asChild size="lg" className="button-hover animate-pulse-glow hover-scale transition-transform">
              <Link to="/dashboard">
                Try FinGuard Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
