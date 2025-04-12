
import React, { useState } from "react";
import { Shield, Globe, Github, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container flex items-center justify-between p-4 mx-auto max-w-7xl">
        <div className="flex items-center space-x-2">
          <Shield className="w-6 h-6 text-jwt-blue" />
          <Link to="/" className="text-xl font-bold text-jwt-blue">JWT Genesis</Link>
        </div>
        
        <div className="flex items-center md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        
        <nav className={`${
          isMenuOpen 
            ? "absolute top-full left-0 right-0 flex flex-col bg-white border-b border-gray-200 p-4 shadow-lg animate-fade-in" 
            : "hidden"
        } md:static md:flex md:flex-row md:items-center md:space-x-6 md:p-0 md:shadow-none md:border-none`}>
          <Link to="/documentation" className="py-2 text-jwt-gray hover:text-jwt-blue transition-colors">
            Documentation
          </Link>
          <Link to="/resources" className="py-2 text-jwt-gray hover:text-jwt-blue transition-colors">
            Resources
          </Link>
          <Link to="/about" className="py-2 text-jwt-gray hover:text-jwt-blue transition-colors">
            About
          </Link>
          <div className="md:hidden flex flex-col space-y-2 mt-4">
            <Link to="/login">
              <Button variant="outline" className="w-full">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="w-full">Register</Button>
            </Link>
          </div>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>中文</DropdownMenuItem>
              <DropdownMenuItem>Español</DropdownMenuItem>
              <DropdownMenuItem>Русский</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" size="sm" className="items-center gap-2" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </Button>
          
          <div className="hidden md:flex items-center gap-2">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
