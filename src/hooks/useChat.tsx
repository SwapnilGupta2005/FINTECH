
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { analyzeStockRisk, analyzeSentiment } from '@/services/api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('finGuardChatMessages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // Convert string timestamps back to Date objects
        const messagesWithDateObjects = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDateObjects);
      } catch (error) {
        console.error('Error parsing saved messages:', error);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('finGuardChatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = async (content: string) => {
    try {
      // Add user message
      const userMessage: Message = {
        id: uuidv4(),
        role: 'user',
        content,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);

      // Check if message is about a specific stock
      const stockSymbolMatch = content.match(/\b([A-Z]{1,5})\b/);
      let botResponse = '';
      
      if (stockSymbolMatch) {
        const stockSymbol = stockSymbolMatch[0];
        // We have a potential stock symbol, fetch data
        try {
          const [riskData, sentimentData] = await Promise.all([
            analyzeStockRisk(stockSymbol),
            analyzeSentiment(stockSymbol)
          ]);
          
          // Format response with stock data
          botResponse = generateStockResponse(stockSymbol, riskData, sentimentData, content);
        } catch (error) {
          console.error('Error analyzing stock:', error);
          // Fall back to basic response
          botResponse = await processWithGeminiAPI(content);
        }
      } else {
        // No stock detected, use regular Gemini API processing
        botResponse = await processWithGeminiAPI(content);
      }
      
      // Add assistant message
      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: botResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to process your message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const processWithGeminiAPI = async (userMessage: string): Promise<string> => {
    // This is a simplified mock of what would be an actual API call to Gemini
    // In a real implementation, this would call the Gemini API with proper API key
    
    // For demo purposes, we'll use mock responses
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
    
    // Mock response generator based on user input
    if (userMessage.toLowerCase().includes('mutual fund')) {
      return "A mutual fund's Net Asset Value (NAV) is the value of one share of the fund. It's calculated by taking the total value of all the investments in the fund, subtracting any liabilities, and dividing by the number of outstanding shares. The NAV changes daily based on the performance of the investments within the fund. Unlike stocks, mutual funds trade only once per day, after market close.";
    }
    
    if (userMessage.toLowerCase().includes('investment scam') || userMessage.toLowerCase().includes('fraud')) {
      return "To identify potential investment scams: \n\n1. Watch for unrealistic promises of high returns with no risk\n2. Be suspicious of pressure to act quickly\n3. Research the investment and the person selling it thoroughly\n4. Verify credentials with regulatory authorities like SEBI\n5. Be wary of unsolicited investment opportunities\n6. Check for proper documentation and transparency\n\nRemember: If something sounds too good to be true, it probably is.";
    }
    
    if (userMessage.toLowerCase().includes('small-cap')) {
      return "Small-cap investments carry several risks:\n\n1. Higher volatility compared to large-caps\n2. Less liquidity, making them harder to sell in market downturns\n3. Limited public information and analyst coverage\n4. Often more vulnerable to economic downturns\n5. Can face challenges accessing capital\n\nHowever, they also offer higher growth potential for long-term investors who can tolerate higher risk.";
    }
    
    // Default response for other queries
    return "I apologize, but I don't have specific information on that topic. As FinGuard's AI assistant, I can help with stock analysis, investment strategies, financial education, and fraud prevention. Is there something specific about investments or financial markets you'd like to know?";
  };

  const generateStockResponse = (
    symbol: string, 
    riskData: any, 
    sentimentData: any,
    userMessage: string
  ): string => {
    let response = `Here's my analysis for ${symbol}:\n\n`;
    
    // Risk assessment
    response += `📊 **Risk Assessment**: ${riskData.riskLevel}\n`;
    response += `• CAGR: ${riskData.cagr.toFixed(2)}%\n`;
    response += `• Volatility: ${riskData.volatility.toFixed(2)}\n\n`;
    
    // Sentiment analysis
    response += `🧠 **Market Sentiment**: ${sentimentData.classification}\n`;
    response += `• Sentiment Score: ${sentimentData.sentimentScore.toFixed(2)}\n\n`;
    
    // Generate recommendation based on risk level and sentiment
    response += "💡 **Recommendation**:\n";
    
    if (riskData.riskLevel === "Low" && sentimentData.classification === "Normal") {
      response += "This appears to be a stable investment with balanced market sentiment. Suitable for conservative investors looking for steady growth.";
    } else if (riskData.riskLevel === "Low" && sentimentData.classification === "Overhype") {
      response += "While this stock has historically been stable, current market sentiment shows signs of overhype. Consider waiting for a potential correction before investing.";
    } else if (riskData.riskLevel === "Moderate" && sentimentData.sentimentScore > 0) {
      response += "This moderate-risk investment is currently viewed positively in the market. It might offer a good balance of growth potential and manageable risk for balanced portfolios.";
    } else if (riskData.riskLevel === "High") {
      response += "This is a high-risk investment that may experience significant price fluctuations. Only suitable for investors with high risk tolerance and as a small portion of a diversified portfolio.";
    } else if (sentimentData.classification === "Manipulation") {
      response += "⚠️ WARNING: Our AI has detected potential market manipulation signals for this stock. Exercise extreme caution and consider avoiding this investment until market conditions normalize.";
    } else {
      response += "Consider how this investment fits with your overall financial goals and risk tolerance. Diversification remains key to managing investment risk.";
    }
    
    return response;
  };

  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem('finGuardChatMessages');
  };

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages
  };
}
