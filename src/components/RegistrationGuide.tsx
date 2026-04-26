import { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  HelpCircle, 
  ExternalLink,
  ShieldCheck,
  UserCheck,
  ClipboardList
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function RegistrationGuide({ language }: { language: 'en' | 'bn' | 'hi' }) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Eligibility Check',
      desc: 'Are you 18 or older?',
      items: ['Citizen of the country', '18 years of age or above', 'Resident of the polling area'],
      icon: UserCheck
    },
    {
      title: 'Required Documents',
      desc: 'Keep these digital or physical copies ready.',
      items: ['Proof of Identity (Aadhar/Voter ID/Passport)', 'Proof of Address', 'Passport size photograph'],
      icon: ClipboardList
    },
    {
      title: 'Apply Online',
      desc: 'Fill Form 6 on the Voter Portal.',
      items: ['Visit official website', 'Upload required documents', 'Submit and note Reference ID'],
      icon: ExternalLink
    },
    {
      title: 'Verification',
      desc: 'Field verification by Booth Level Officer (BLO).',
      items: ['Officer visit to address', 'Verify original documents', 'Approval of application'],
      icon: ShieldCheck
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-4 px-4 py-1 text-indigo-600 border-indigo-200 bg-indigo-50">Voter Education</Badge>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">How to Register to Vote</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          A step-by-step guide to help you get your Voter ID card and become an active participant in our democracy.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center space-x-4 ${
                currentStep === index 
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg scale-[1.02]' 
                : 'bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-700'
              }`}
            >
              <div className={`p-2 rounded-xl ${currentStep === index ? 'bg-white/20' : 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600'}`}>
                <step.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${currentStep === index ? 'text-indigo-100' : 'text-slate-400'}`}>
                  Step 0{index + 1}
                </p>
                <h4 className="font-bold">{step.title}</h4>
              </div>
              {currentStep > index ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <ChevronRight className={`w-4 h-4 ${currentStep === index ? 'text-white' : 'text-slate-300'}`} />}
            </button>
          ))}
        </div>

        <Card className="lg:col-span-2 rounded-3xl border-none shadow-xl bg-white dark:bg-slate-900 overflow-hidden">
          <CardHeader className="bg-slate-50 dark:bg-slate-800/50 p-8">
             <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-200 dark:shadow-none">
                  {currentStep + 1}
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">{steps[currentStep].title}</CardTitle>
                  <CardDescription className="text-indigo-600 dark:text-indigo-400 font-medium">{steps[currentStep].desc}</CardDescription>
                </div>
             </div>
          </CardHeader>
          <CardContent className="p-8">
             <div className="space-y-6">
                {steps[currentStep].items.map((item, i) => (
                  <div key={i} className="flex items-start space-x-4 border-b dark:border-slate-800 pb-4 last:border-0 last:pb-0">
                    <div className="mt-1 bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
                      <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-lg text-slate-700 dark:text-slate-300">{item}</p>
                  </div>
                ))}
                
                <div className="pt-6">
                   <Button size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-14 font-bold shadow-lg shadow-indigo-200 dark:shadow-none">
                      {currentStep === 2 ? 'Visit National Voter Portal' : 'Learn More Details'}
                      <ExternalLink className="ml-2 w-5 h-5" />
                   </Button>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>

      <div className="p-8 bg-amber-50 dark:bg-amber-900/20 rounded-3xl border border-amber-100 dark:border-amber-900/50 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
         <div className="bg-amber-100 dark:bg-amber-800 p-3 rounded-2xl text-amber-600 dark:text-amber-400">
            <HelpCircle className="w-8 h-8" />
         </div>
         <div>
            <h4 className="text-xl font-bold text-amber-900 dark:text-amber-200 mb-2">Need help with registration?</h4>
            <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
              If you lack the required documents or face technical issues, call the Voter Helpline at **1950** (Toll-Free) or talk to our AI Assistant for instant help.
            </p>
         </div>
      </div>
    </div>
  );
}
