
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, KeyRound, Copy, Check, Key, Code, Server } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import StepWizard from "./StepWizard";
import { useToast } from "@/components/ui/use-toast";
import {
  JwtConfig,
  defaultJwtConfig,
  algorithmOptions,
  expirationOptions,
  languageOptions,
  generateNodeJsCode,
  generatePythonCode,
  generateJavaCode,
  generateEnvironmentVariables,
  generateKeyPairInstructions
} from "@/lib/jwtUtils";

const JwtGenerator = () => {
  const [jwtConfig, setJwtConfig] = useState<JwtConfig>(defaultJwtConfig);
  const [selectedLanguage, setSelectedLanguage] = useState("node");
  const [customClaim, setCustomClaim] = useState({ key: "", value: "" });
  const [copied, setCopied] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  const { toast } = useToast();

  const handleConfigChange = (field: keyof JwtConfig, value: any) => {
    setJwtConfig({ ...jwtConfig, [field]: value });
  };

  const addCustomClaim = () => {
    if (customClaim.key.trim() && customClaim.value.trim()) {
      setJwtConfig({
        ...jwtConfig,
        customClaims: [...jwtConfig.customClaims, { ...customClaim }]
      });
      setCustomClaim({ key: "", value: "" });
    }
  };

  const removeCustomClaim = (index: number) => {
    const updatedClaims = [...jwtConfig.customClaims];
    updatedClaims.splice(index, 1);
    setJwtConfig({ ...jwtConfig, customClaims: updatedClaims });
  };

  const getGeneratedCode = () => {
    switch (selectedLanguage) {
      case "node":
        return generateNodeJsCode(jwtConfig);
      case "python":
        return generatePythonCode(jwtConfig);
      case "java":
        return generateJavaCode(jwtConfig);
      default:
        return generateNodeJsCode(jwtConfig);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "The code has been copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const isAsymmetricAlgorithm = !["HS256", "HS384", "HS512"].includes(jwtConfig.algorithm);

  const steps = [
    {
      title: "Algorithm",
      content: (
        <div>
          <h3 className="text-xl font-semibold mb-4">Choose JWT Algorithm</h3>
          <p className="mb-4 text-gray-600">
            Select the algorithm used to sign your JWT tokens. HMAC algorithms use a shared secret,
            while RSA and ECDSA use public/private key pairs.
          </p>
          
          <div className="mb-6">
            <Label htmlFor="algorithm" className="mb-2 block">Algorithm</Label>
            <Select
              value={jwtConfig.algorithm}
              onValueChange={(value) => handleConfigChange("algorithm", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select algorithm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HS256">HS256 (HMAC with SHA-256)</SelectItem>
                <SelectItem value="HS384">HS384 (HMAC with SHA-384)</SelectItem>
                <SelectItem value="HS512">HS512 (HMAC with SHA-512)</SelectItem>
                <SelectItem value="RS256">RS256 (RSA Signature with SHA-256)</SelectItem>
                <SelectItem value="RS384">RS384 (RSA Signature with SHA-384)</SelectItem>
                <SelectItem value="RS512">RS512 (RSA Signature with SHA-512)</SelectItem>
                <SelectItem value="ES256">ES256 (ECDSA using P-256 curve)</SelectItem>
                <SelectItem value="ES384">ES384 (ECDSA using P-384 curve)</SelectItem>
                <SelectItem value="ES512">ES512 (ECDSA using P-521 curve)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {isAsymmetricAlgorithm ? (
            <Alert className="bg-blue-50 border-blue-200">
              <KeyRound className="h-4 w-4 text-blue-600" />
              <AlertDescription>
                You've selected an asymmetric algorithm that uses public/private key pairs.
                You'll need to generate these keys separately.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="bg-blue-50 border-blue-200">
              <Key className="h-4 w-4 text-blue-600" />
              <AlertDescription>
                You've selected a symmetric algorithm that uses a shared secret key.
                Make sure to use a strong random key of at least 32 characters.
              </AlertDescription>
            </Alert>
          )}
        </div>
      )
    },
    {
      title: "Expiration",
      content: (
        <div>
          <h3 className="text-xl font-semibold mb-4">Set Token Expiration</h3>
          <p className="mb-4 text-gray-600">
            Choose how long your JWT tokens remain valid. Shorter expiration times
            increase security but require more frequent re-authentication.
          </p>
          
          <div className="mb-6">
            <Label htmlFor="expiresIn" className="mb-2 block">Token Expiration</Label>
            <Select
              value={jwtConfig.expiresIn}
              onValueChange={(value) => handleConfigChange("expiresIn", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select expiration time" />
              </SelectTrigger>
              <SelectContent>
                {expirationOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Alert className="bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription>
              Security best practice: Use shorter expirations (15-60 minutes) for sensitive operations.
              Consider using refresh tokens for longer sessions.
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    {
      title: "Claims",
      content: (
        <div>
          <h3 className="text-xl font-semibold mb-4">Configure Token Claims</h3>
          <p className="mb-4 text-gray-600">
            JWT claims are pieces of information asserted about a subject. Standard claims
            help improve security and interoperability.
          </p>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="issuer" className="mb-2 block">Issuer (iss)</Label>
                <Input
                  id="issuer"
                  placeholder="e.g., your-app-name"
                  value={jwtConfig.issuer}
                  onChange={(e) => handleConfigChange("issuer", e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">Identifies the principal that issued the token</p>
              </div>
              
              <div>
                <Label htmlFor="audience" className="mb-2 block">Audience (aud)</Label>
                <Input
                  id="audience"
                  placeholder="e.g., your-api"
                  value={jwtConfig.audience}
                  onChange={(e) => handleConfigChange("audience", e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">Identifies the recipients the token is intended for</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 mb-2 mt-4">
              <Switch
                id="includeJti"
                checked={jwtConfig.includeJti}
                onCheckedChange={(checked) => handleConfigChange("includeJti", checked)}
              />
              <Label htmlFor="includeJti">Include JWT ID (jti) claim</Label>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              A unique identifier for the token, which can help with token revocation
            </p>
            
            <div className="border-t pt-4 mt-4">
              <h4 className="font-medium mb-3">Custom Claims</h4>
              <div className="flex gap-2 mb-4">
                <div className="flex-1">
                  <Input
                    placeholder="Claim key"
                    value={customClaim.key}
                    onChange={(e) => setCustomClaim({ ...customClaim, key: e.target.value })}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="Claim value"
                    value={customClaim.value}
                    onChange={(e) => setCustomClaim({ ...customClaim, value: e.target.value })}
                  />
                </div>
                <Button onClick={addCustomClaim} type="button">Add</Button>
              </div>
              
              {jwtConfig.customClaims.length > 0 && (
                <div className="bg-gray-50 p-3 rounded border">
                  <h5 className="text-sm font-medium mb-2">Added Custom Claims:</h5>
                  <ul className="space-y-2">
                    {jwtConfig.customClaims.map((claim, index) => (
                      <li key={index} className="flex justify-between text-sm items-center">
                        <span>
                          <code className="bg-gray-100 px-1 py-0.5 rounded">{claim.key}</code>: {claim.value}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeCustomClaim(index)}
                        >
                          Remove
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleStepComplete = () => {
    setGenerationComplete(true);
  };

  return (
    <div className="space-y-6">
      {!generationComplete ? (
        <StepWizard steps={steps} onComplete={handleStepComplete} />
      ) : (
        <div className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Your JWT Configuration</CardTitle>
              <CardDescription>
                Generated code and configuration based on your selections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="code" className="w-full">
                <TabsList>
                  <TabsTrigger value="code" className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Code
                  </TabsTrigger>
                  <TabsTrigger value="env" className="flex items-center gap-2">
                    <Server className="h-4 w-4" />
                    Environment Variables
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="code" className="pt-4">
                  <div className="mb-4">
                    <Label htmlFor="language">Select Language:</Label>
                    <Select
                      value={selectedLanguage}
                      onValueChange={setSelectedLanguage}
                    >
                      <SelectTrigger className="w-full max-w-xs">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languageOptions.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="relative">
                    <div className="absolute top-2 right-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => copyToClipboard(getGeneratedCode())}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <Textarea
                      className="font-mono h-96 whitespace-pre overflow-auto bg-gray-50"
                      readOnly
                      value={getGeneratedCode()}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="env" className="space-y-4 pt-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Environment Variables</h3>
                    <p className="text-gray-600 mb-4">
                      Add these variables to your .env file or environment configuration:
                    </p>
                    
                    <div className="relative">
                      <div className="absolute top-2 right-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => copyToClipboard(generateEnvironmentVariables(jwtConfig))}
                        >
                          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                      <Textarea
                        className="font-mono h-32 whitespace-pre overflow-auto bg-gray-50"
                        readOnly
                        value={generateEnvironmentVariables(jwtConfig)}
                      />
                    </div>
                  </div>
                  
                  {isAsymmetricAlgorithm && (
                    <div className="mt-4">
                      <h3 className="text-lg font-medium mb-2">Generate Key Pair</h3>
                      <p className="text-gray-600 mb-4">
                        For {jwtConfig.algorithm}, you'll need to generate a key pair. Run these commands:
                      </p>
                      
                      <div className="relative">
                        <div className="absolute top-2 right-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => copyToClipboard(generateKeyPairInstructions(jwtConfig.algorithm))}
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                        <Textarea
                          className="font-mono h-24 whitespace-pre overflow-auto bg-gray-50"
                          readOnly
                          value={generateKeyPairInstructions(jwtConfig.algorithm)}
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-6">
                    <Alert className="bg-blue-50 border-blue-200">
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                      <AlertDescription>
                        <strong>Security tip:</strong> Never commit environment variables or keys to version control.
                        Use a secrets manager like AWS Secrets Manager, HashiCorp Vault, or Vercel's Environment Variables.
                      </AlertDescription>
                    </Alert>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => setGenerationComplete(false)}
                >
                  Edit Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default JwtGenerator;
