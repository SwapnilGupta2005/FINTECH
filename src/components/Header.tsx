
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, BarChart3, Clock, Home, User, Settings, LogOut } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-full bg-primary p-1 shadow-[0_0_10px_rgba(50,205,50,0.5)]">
            <BarChart3 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold tracking-tight text-xl">
            <span className="text-primary">Fin</span>Guard
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
          <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">Dashboard</Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
              Analysis <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 glass-card">
              <DropdownMenuItem className="cursor-pointer hover:bg-primary/10">
                <Link to="/sentiment" className="flex w-full">Sentiment Analysis</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-primary/10">
                <Link to="/risk" className="flex w-full">Risk Assessment</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-primary/10">
                <Link to="/history" className="flex w-full">Investment History</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full h-8 w-8 bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors border border-primary/20">
              <User className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 glass-card animate-scale-in">
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium">User Profile</p>
                <p className="text-xs text-muted-foreground">example@fintech.com</p>
              </div>
              <DropdownMenuItem className="cursor-pointer hover:bg-primary/10">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-primary/10">
                <Clock className="mr-2 h-4 w-4" />
                <span>History</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-primary/10">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive hover:bg-destructive/10">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
