
import React from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card/80 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4 animate-fade-in">
        {children}
      </main>
      <footer className="py-6 border-t border-primary/10 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center gap-4">
              <a href="/dashboard" className="hover:text-primary transition-colors">Dashboard</a>
              <a href="/sentiment" className="hover:text-primary transition-colors">Sentiment</a>
              <a href="/risk" className="hover:text-primary transition-colors">Risk</a>
              <a href="/history" className="hover:text-primary transition-colors">History</a>
              <a href="/assistant" className="hover:text-primary transition-colors">AI Assistant</a>
            </div>
            <p>© 2023 FinGuard. <span className="text-primary">AI-Powered Financial Security</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
};
