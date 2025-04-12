
import React from "react";
import { Shield, Lock, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container flex items-center justify-between p-4 mx-auto max-w-7xl">
        <div className="flex items-center space-x-2">
          <Shield className="w-6 h-6 text-jwt-blue" />
          <span className="text-xl font-bold text-jwt-blue">JWT Genesis</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-jwt-gray hover:text-jwt-blue transition-colors">
            Documentation
          </a>
          <a href="#" className="text-jwt-gray hover:text-jwt-blue transition-colors">
            Resources
          </a>
          <a href="#" className="text-jwt-gray hover:text-jwt-blue transition-colors">
            About
          </a>
        </nav>
        
        <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
          <Github className="w-4 h-4" />
          <span>GitHub</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
