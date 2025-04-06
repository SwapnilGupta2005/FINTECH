
import React from 'react';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.role === 'assistant';
  
  return (
    <div 
      className={cn(
        "flex gap-2 py-2",
        isBot ? "animate-slide-up" : "animate-slide-right"
      )}
    >
      <div className={cn(
        "h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0",
        isBot ? "bg-neon-green/20 text-neon-green" : "bg-secondary/80 text-foreground",
        isBot ? "animate-float" : ""
      )}>
        {isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
      </div>
      
      <div className="flex-1 space-y-1">
        <div className="flex items-center">
          <h4 className="text-xs font-medium">
            {isBot ? "FinGuard AI" : "You"}
          </h4>
          <span className="ml-2 text-xs text-muted-foreground">
            {formatTime(message.timestamp)}
          </span>
        </div>
        
        <div className={cn(
          "p-2 rounded-lg max-w-full overflow-hidden text-sm transition-all duration-200",
          isBot 
            ? "bg-neon-green/10 border border-neon-green/20 hover-glow" 
            : "bg-muted/30",
          "hover-scale transition-transform"
        )}>
          <div className="prose prose-invert max-w-none prose-sm">
            {formatMessage(message.content)}
          </div>
        </div>
      </div>
    </div>
  );
};

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatMessage(content: string): React.ReactNode {
  // Simple markdown-like formatting for financial terms
  const formattedContent = content
    .split('\n')
    .map((line, i) => <p key={i}>{line}</p>);

  return formattedContent;
}
