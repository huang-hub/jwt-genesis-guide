
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface CodeDisplayProps {
  code: string;
  title: string;
  language?: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ code, title, language = "typescript" }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "The code has been copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute top-2 right-2">
            <Button variant="ghost" size="icon" onClick={copyToClipboard}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <Textarea
            className="font-mono h-80 whitespace-pre overflow-auto bg-gray-50"
            readOnly
            value={code}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeDisplay;
