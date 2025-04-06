
import React, { useState, useRef, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { ChatInterface } from '@/components/ChatInterface';
import { toast } from 'sonner';

const AIAssistant = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    toast.info("Ask me anything about stocks, investments, or financial concepts!", {
      duration: 5000,
    });
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold tracking-tight tech-gradient">FinGuard AI Assistant</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your AI-powered financial advisor. Ask about stocks, investment strategies, or financial concepts.
          </p>
        </div>

        <ChatInterface />

        <div className="mt-8 p-6 rounded-xl glass-card">
          <h3 className="text-xl font-semibold mb-4">What can I help you with?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={() => toast.info("Type your question in the chat box above")}
              className="p-4 rounded-lg bg-secondary/50 border border-primary/20 hover:border-primary/40 transition-all text-left"
            >
              <h4 className="font-medium mb-2">Stock Analysis</h4>
              <p className="text-sm text-muted-foreground">
                "Is AAPL a good investment right now?"
              </p>
            </button>
            <button 
              onClick={() => toast.info("Type your question in the chat box above")}
              className="p-4 rounded-lg bg-secondary/50 border border-primary/20 hover:border-primary/40 transition-all text-left"
            >
              <h4 className="font-medium mb-2">Market Education</h4>
              <p className="text-sm text-muted-foreground">
                "Explain mutual fund NAV in simple terms"
              </p>
            </button>
            <button 
              onClick={() => toast.info("Type your question in the chat box above")}
              className="p-4 rounded-lg bg-secondary/50 border border-primary/20 hover:border-primary/40 transition-all text-left"
            >
              <h4 className="font-medium mb-2">Risk Assessment</h4>
              <p className="text-sm text-muted-foreground">
                "What are the risks of small-cap investments?"
              </p>
            </button>
            <button 
              onClick={() => toast.info("Type your question in the chat box above")}
              className="p-4 rounded-lg bg-secondary/50 border border-primary/20 hover:border-primary/40 transition-all text-left"
            >
              <h4 className="font-medium mb-2">Fraud Detection</h4>
              <p className="text-sm text-muted-foreground">
                "How do I identify potential investment scams?"
              </p>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AIAssistant;
