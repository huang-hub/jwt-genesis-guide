
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Code } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface CodeDisplayProps {
  code: string;
  title: string;
  language?: string;
  showIcon?: boolean;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ 
  code, 
  title, 
  language = "typescript",
  showIcon = true
}) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "The code has been copied to your clipboard.",
      variant: "default",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="overflow-hidden border border-gray-200">
      <CardHeader className="bg-gray-50 pb-3 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          {showIcon && <Code className="h-4 w-4 text-jwt-blue" />}
          <CardTitle className="text-base font-medium">{title}</CardTitle>
        </div>
        <Button variant="ghost" size="icon" onClick={copyToClipboard}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Textarea
          className="font-mono text-sm h-80 whitespace-pre overflow-auto bg-gray-50 border-0 rounded-t-none focus-visible:ring-0"
          readOnly
          value={code}
        />
      </CardContent>
    </Card>
  );
};

export default CodeDisplay;
