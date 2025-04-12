
import React from "react";
import Header from "@/components/Header";
import JwtGenerator from "@/components/JwtGenerator";
import SecurityGuidelines from "@/components/SecurityGuidelines";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, UserCircle } from "lucide-react";

const Index = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Header />
      
      <main className="container px-4 py-8 mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-center text-jwt-blue mb-2 md:text-4xl">JWT Genesis Guide</h1>
        <p className="text-center text-jwt-gray mb-4 max-w-2xl mx-auto">
          Step-by-step guide to creating secure JSON Web Tokens (JWT) for your applications
        </p>
        
        {isAuthenticated && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <UserCircle className="h-6 w-6 text-jwt-blue" />
              <span>Welcome, <strong>{user?.name}</strong></span>
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        )}
        
        <Tabs defaultValue="generator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="generator" className="data-[state=active]:bg-jwt-blue data-[state=active]:text-white">JWT Generator</TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-jwt-blue data-[state=active]:text-white">Security Guidelines</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generator" className="animate-fade-in">
            <JwtGenerator />
          </TabsContent>
          
          <TabsContent value="security" className="animate-fade-in">
            <SecurityGuidelines />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="py-6 border-t bg-white">
        <div className="container text-center text-sm text-jwt-gray">
          <p>© 2025 JWT Genesis Guide - Built with Lovable</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
