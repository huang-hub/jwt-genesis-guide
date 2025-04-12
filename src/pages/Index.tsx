
import React from "react";
import Header from "@/components/Header";
import JwtGenerator from "@/components/JwtGenerator";
import SecurityGuidelines from "@/components/SecurityGuidelines";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Header />
      
      <main className="container px-4 py-8 mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-center text-jwt-blue mb-2 md:text-4xl">JWT Genesis Guide</h1>
        <p className="text-center text-jwt-gray mb-8 max-w-2xl mx-auto">
          Step-by-step guide to creating secure JSON Web Tokens (JWT) for your applications
        </p>
        
        <Tabs defaultValue="generator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="generator">JWT Generator</TabsTrigger>
            <TabsTrigger value="security">Security Guidelines</TabsTrigger>
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
