
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle2, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateSecurityGuidelines } from "@/lib/jwtUtils";

const SecurityGuidelines = () => {
  const guidelines = generateSecurityGuidelines();

  const downloadPDF = () => {
    alert("PDF download functionality would be implemented here");
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-jwt-blue to-blue-600 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">JWT Security Best Practices</h2>
        <p className="mb-4">
          Implementing secure JWT authentication requires attention to detail.
          Follow these guidelines to ensure your tokens are secure and your implementation robust.
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="secondary" size="sm" onClick={downloadPDF}>
            <Download className="mr-2 h-4 w-4" />
            Download Guidelines
          </Button>
        </div>
      </div>

      <Tabs defaultValue="implementation" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="attacks">Common Attacks</TabsTrigger>
          <TabsTrigger value="checklist">Security Checklist</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="implementation" className="space-y-4">
          {guidelines.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="attacks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Known JWT Attack Vectors</CardTitle>
              <CardDescription>
                Common attacks against JWT implementations and how to mitigate them
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-jwt-blue mb-2">Algorithm None Attack</h3>
                <p className="mb-2">
                  Some JWT libraries allow the "none" algorithm, which skips signature verification entirely.
                </p>
                <Alert className="bg-jwt-light border-jwt-blue">
                  <AlertDescription className="flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-2 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Mitigation:</strong> Always explicitly specify the expected algorithm when verifying tokens 
                      and ensure your library rejects the "none" algorithm.
                    </span>
                  </AlertDescription>
                </Alert>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-jwt-blue mb-2">Algorithm Substitution Attack</h3>
                <p className="mb-2">
                  Attackers can change the algorithm from RS256 to HS256 and use the public key as the secret.
                </p>
                <Alert className="bg-jwt-light border-jwt-blue">
                  <AlertDescription className="flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-2 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Mitigation:</strong> Always validate that the algorithm in the header matches the 
                      expected algorithm, and use a modern JWT library that prevents this attack.
                    </span>
                  </AlertDescription>
                </Alert>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-jwt-blue mb-2">Token Sidejacking</h3>
                <p className="mb-2">
                  JWTs stored in browser storage can be stolen via XSS attacks.
                </p>
                <Alert className="bg-jwt-light border-jwt-blue">
                  <AlertDescription className="flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-2 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Mitigation:</strong> Store JWTs in HttpOnly cookies with the Secure and SameSite flags,
                      and implement proper XSS protections.
                    </span>
                  </AlertDescription>
                </Alert>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-jwt-blue mb-2">Key Exfiltration</h3>
                <p className="mb-2">
                  Poor key management can lead to your signing keys being compromised.
                </p>
                <Alert className="bg-jwt-light border-jwt-blue">
                  <AlertDescription className="flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-2 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Mitigation:</strong> Use a secret manager, rotate keys regularly, and use different
                      keys for different environments and applications.
                    </span>
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="checklist" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>JWT Security Checklist</CardTitle>
              <CardDescription>
                Use this checklist to ensure your JWT implementation is secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium border-b pb-2">Token Generation</h3>
                  <ul className="mt-3 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Use a secure, randomly generated key of sufficient length (32+ bytes)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Set appropriate expiration times (shorter for sensitive operations)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Include standard claims: iss (issuer), aud (audience), exp (expiration)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Consider including jti (JWT ID) for token revocation support</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium border-b pb-2">Token Validation</h3>
                  <ul className="mt-3 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Explicitly specify the expected algorithm when verifying</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Validate all claims (issuer, audience, expiration, etc.)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Implement proper error handling without revealing sensitive details</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Check token against blacklist/revocation list if implemented</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium border-b pb-2">Key Management</h3>
                  <ul className="mt-3 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Store keys in environment variables or a secure key management system</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Rotate keys periodically (especially after personnel changes)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Use different keys for development, staging, and production</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>For asymmetric algorithms, properly secure private keys</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="deployment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Secure Deployment</CardTitle>
              <CardDescription>
                Best practices for deploying JWT authentication in production
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-jwt-blue mb-2">Vercel Deployment</h3>
                <p className="mb-4">
                  When deploying to Vercel, follow these steps to securely manage JWT secrets:
                </p>
                <ol className="space-y-3 list-decimal pl-6">
                  <li>Navigate to your project's dashboard on Vercel</li>
                  <li>Go to Settings &gt; Environment Variables</li>
                  <li>Add your JWT secret key and other variables securely</li>
                  <li>Specify which environments (Production, Preview, Development) should use these variables</li>
                  <li>Use separate keys for each environment</li>
                </ol>
                <div className="mt-4">
                  <Button variant="outline" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Vercel Documentation
                  </Button>
                </div>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-jwt-blue mb-2">Transport Security</h3>
                <p>Always use HTTPS to prevent token interception during transmission.</p>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Enable HTTPS for all API endpoints that use JWT authentication</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Set Strict-Transport-Security headers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Consider using HSTS preloading for added security</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-jwt-blue mb-2">Token Storage in Clients</h3>
                <p className="mb-2">
                  Secure client-side storage of JWTs is critical to prevent token theft.
                </p>
                <Alert className="bg-jwt-light border-jwt-blue mb-4">
                  <AlertDescription className="flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-2 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Warning:</strong> Never store JWTs in localStorage or sessionStorage 
                      as they are vulnerable to XSS attacks.
                    </span>
                  </AlertDescription>
                </Alert>
                <p className="mb-2">Recommended approach:</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Store tokens in HttpOnly cookies with Secure and SameSite flags</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Use short-lived tokens with a refresh token system</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Implement proper CSRF protection when using cookies</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            
            <CardFooter>
              <p className="text-sm text-gray-500">
                These deployment practices should be adapted to your specific infrastructure and security requirements.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityGuidelines;
