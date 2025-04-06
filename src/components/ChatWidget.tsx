
import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatInterface } from '@/components/ChatInterface';
import { cn } from '@/lib/utils';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div 
          className="flex flex-col w-80 sm:w-96 h-[600px] max-h-[80vh] rounded-xl border border-neon-green/30 bg-black/90 backdrop-blur-lg shadow-lg shadow-neon-green/20 animate-scale-in overflow-hidden"
        >
          <div className="flex items-center justify-between p-3 border-b border-neon-green/20 bg-black/60">
            <div className="flex items-center gap-2 animate-slide-right">
              <div className="h-8 w-8 rounded-full bg-neon-green/20 flex items-center justify-center animate-float">
                <MessageSquare className="h-4 w-4 text-neon-green" />
              </div>
              <h3 className="font-semibold">
                <span className="text-neon-green">Fin</span>Guard AI
              </h3>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleChat}
              className="hover:bg-neon-green/10 text-muted-foreground hover:text-neon-green hover-scale transition-transform"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <ChatInterface />
          </div>
        </div>
      ) : (
        <Button
          onClick={toggleChat}
          className={cn(
            "rounded-full h-14 w-14 shadow-lg bg-neon-green hover:bg-neon-green/90",
            "flex items-center justify-center transition-all duration-300",
            "hover:scale-110 animate-pulse-glow"
          )}
        >
          <MessageSquare className="h-6 w-6 text-black" />
        </Button>
      )}
    </div>
  );
};
