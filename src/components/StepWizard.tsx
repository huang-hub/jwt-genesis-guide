
import React, { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";

interface Step {
  title: string;
  content: ReactNode;
}

interface StepWizardProps {
  steps: Step[];
  onComplete: () => void;
}

const StepWizard: React.FC<StepWizardProps> = ({ steps, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (index: number) => {
    if (completedSteps.includes(index - 1) || index <= Math.max(...completedSteps, 0)) {
      setCurrentStep(index);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        {steps.map((step, index) => (
          <div 
            key={index}
            className="flex flex-col items-center relative group"
          >
            <button
              className={`w-10 h-10 rounded-full flex items-center justify-center
              ${completedSteps.includes(index) 
                ? 'bg-jwt-green text-white' 
                : currentStep === index 
                  ? 'bg-jwt-blue text-white' 
                  : 'bg-gray-200 text-gray-500'
              } ${index <= Math.max(...completedSteps, 0) ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              onClick={() => handleStepClick(index)}
              disabled={!(completedSteps.includes(index - 1) || index <= Math.max(...completedSteps, 0))}
            >
              {completedSteps.includes(index) ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </button>
            
            <span className={`
              text-xs mt-2 font-medium
              ${currentStep === index ? 'text-jwt-blue' : 'text-gray-500'}
            `}>
              {step.title}
            </span>
            
            {index < steps.length - 1 && (
              <div className={`absolute top-5 left-10 w-[calc(100%-20px)] h-[2px]
                ${completedSteps.includes(index) ? 'bg-jwt-green' : 'bg-gray-200'}`}
              ></div>
            )}
          </div>
        ))}
      </div>
      
      <Card>
        <CardContent className="pt-6">
          {steps[currentStep].content}
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              className="flex items-center gap-2"
            >
              {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
              {currentStep < steps.length - 1 && <ArrowRight className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepWizard;
