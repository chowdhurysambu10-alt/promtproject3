import { useState, useEffect } from 'react';
import { Timer, Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ElectionCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Mock target date - 60 days from now
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 64);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds },
  ];

  return (
    <Card className="overflow-hidden border-none shadow-lg bg-white dark:bg-slate-900">
      <CardHeader className="bg-indigo-50 dark:bg-indigo-900/20 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
            <Timer className="w-5 h-5" />
            <CardTitle className="text-lg font-bold">Upcoming Election</CardTitle>
          </div>
          <div className="bg-white dark:bg-slate-800 px-3 py-1 rounded-full text-xs font-bold text-slate-500 border border-indigo-100 dark:border-indigo-900">
             General Election 2026
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-4 gap-3 mb-6">
          {timeUnits.map((unit) => (
            <div key={unit.label} className="text-center">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 mb-1 border shadow-sm border-indigo-50 dark:border-indigo-900/50">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {unit.value.toString().padStart(2, '0')}
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
        
        <div className="flex items-center space-x-3 mb-6 text-sm">
           <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg text-indigo-600">
              <CalendarIcon className="w-5 h-5" />
           </div>
           <div>
              <p className="font-bold">June 15, 2026</p>
              <p className="text-xs text-slate-500">Multi-phase polling begins</p>
           </div>
        </div>

        <Button className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white rounded-xl">
           Add to Calendar
           <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
