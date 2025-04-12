
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ExternalLink, Server, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DeploymentGuide = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Deploy Your JWT Implementation</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="vercel">
          <TabsList className="w-full">
            <TabsTrigger value="vercel">Vercel</TabsTrigger>
            <TabsTrigger value="netlify">Netlify</TabsTrigger>
            <TabsTrigger value="aws">AWS</TabsTrigger>
          </TabsList>
          
          <TabsContent value="vercel" className="pt-4 space-y-4">
            <div>
              <h3 className="text-lg font-medium text-jwt-blue mb-2">Deploying to Vercel</h3>
              <ol className="space-y-3 list-decimal pl-6">
                <li>Push your code to a GitHub, GitLab, or Bitbucket repository</li>
                <li>Create a new project on Vercel and connect your repository</li>
                <li>Configure your build settings if needed (typically auto-detected)</li>
                <li>Add your JWT environment variables:
                  <ul className="mt-2 space-y-1 list-disc pl-6">
                    <li>JWT_SECRET_KEY (for symmetric algorithms)</li>
                    <li>JWT_ALGORITHM</li>
                    <li>JWT_EXPIRES_IN</li>
                  </ul>
                </li>
                <li>Deploy your application</li>
              </ol>

              <Alert className="bg-blue-50 mt-4">
                <Server className="h-4 w-4 text-blue-600" />
                <AlertDescription>
                  For asymmetric algorithms, you'll need to add your private key as a Vercel environment variable,
                  making sure to replace newlines with \n in the key.
                </AlertDescription>
              </Alert>
              
              <div className="mt-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Vercel Documentation
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="netlify" className="pt-4 space-y-4">
            <div>
              <h3 className="text-lg font-medium text-jwt-blue mb-2">Deploying to Netlify</h3>
              <ol className="space-y-3 list-decimal pl-6">
                <li>Push your code to a GitHub, GitLab, or Bitbucket repository</li>
                <li>Create a new site on Netlify and connect your repository</li>
                <li>Configure your build settings (Build command, Publish directory)</li>
                <li>Add your JWT environment variables in Site settings &gt; Build &amp; deploy &gt; Environment:
                  <ul className="mt-2 space-y-1 list-disc pl-6">
                    <li>JWT_SECRET_KEY (for symmetric algorithms)</li>
                    <li>JWT_ALGORITHM</li>
                    <li>JWT_EXPIRES_IN</li>
                  </ul>
                </li>
                <li>Deploy your application</li>
              </ol>

              <Alert className="bg-blue-50 mt-4">
                <Server className="h-4 w-4 text-blue-600" />
                <AlertDescription>
                  For backend functionality with JWT authentication, consider using Netlify Functions
                  which provide serverless capabilities.
                </AlertDescription>
              </Alert>
              
              <div className="mt-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Netlify Documentation
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="aws" className="pt-4 space-y-4">
            <div>
              <h3 className="text-lg font-medium text-jwt-blue mb-2">Deploying to AWS</h3>
              <ol className="space-y-3 list-decimal pl-6">
                <li>Build your application for production</li>
                <li>For frontend deployment:
                  <ul className="mt-2 space-y-1 list-disc pl-6">
                    <li>Upload to an S3 bucket configured for static website hosting</li>
                    <li>Set up CloudFront distribution for HTTPS and caching</li>
                  </ul>
                </li>
                <li>For backend JWT implementation:
                  <ul className="mt-2 space-y-1 list-disc pl-6">
                    <li>Deploy API to AWS Lambda with API Gateway, or EC2/ECS</li>
                    <li>Store JWT secrets in AWS Secrets Manager</li>
                    <li>Configure environment variables to access secrets</li>
                  </ul>
                </li>
              </ol>

              <Alert className="bg-blue-50 mt-4">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription>
                  For production applications, consider using AWS Cognito which has built-in JWT support
                  and handles many security concerns automatically.
                </AlertDescription>
              </Alert>
              
              <div className="mt-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  AWS Amplify Documentation
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DeploymentGuide;
