import { useState } from 'react';
import { MapPin, Search, Navigation, Info, ExternalLink, Phone, Clock, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function PollingFinder() {
  const [zipCode, setZipCode] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const mockLocations = [
    {
      id: 1,
      name: 'Central High School Auditorium',
      address: '123 Education Way, Downtown',
      distance: '0.8 miles',
      status: 'Ready',
      queue: 'Light',
      hours: '7:00 AM - 7:00 PM'
    },
    {
      id: 2,
      name: 'North City Community Center',
      address: '456 Parkway Ave, North Hill',
      distance: '1.2 miles',
      status: 'Ready',
      queue: 'Moderate',
      hours: '7:00 AM - 8:00 PM'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-xl">
           <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200 mb-3 px-3">Location Services</Badge>
           <h2 className="text-3xl font-extrabold mb-2">Find Your Polling Station</h2>
           <p className="text-slate-500 font-medium leading-relaxed">Enter your ZIP code to find where you are registered to vote and see live queue updates.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Enter ZIP Code" 
              className="pl-10 h-12 rounded-xl bg-white dark:bg-slate-800"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
          <Button 
            className="h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold"
            onClick={() => {
               setIsSearching(true);
               setTimeout(() => setIsSearching(false), 1500);
            }}
          >
            Search
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-4">
           {mockLocations.map((loc) => (
             <Card key={loc.id} className="border-none shadow-md bg-white dark:bg-slate-900 cursor-pointer group hover:ring-2 hover:ring-indigo-500 transition-all duration-300 overflow-hidden rounded-2xl">
                <CardContent className="p-5">
                   <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
                         <MapPin className="w-4 h-4" />
                         <span className="text-xs font-bold uppercase tracking-wider">{loc.distance} Away</span>
                      </div>
                      <Badge variant={loc.queue === 'Light' ? 'success' : 'warning'} className={`${loc.queue === 'Light' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'} border-0`}>
                         {loc.queue} Queue
                      </Badge>
                   </div>
                   <h4 className="font-extrabold text-lg group-hover:text-indigo-600 transition-colors">{loc.name}</h4>
                   <p className="text-sm text-slate-500 mb-4">{loc.address}</p>
                   
                   <div className="flex items-center justify-between pt-3 border-t dark:border-slate-800 font-medium text-xs">
                      <div className="flex items-center text-slate-400">
                         <Clock className="w-3 h-3 mr-1" />
                         {loc.hours}
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 text-indigo-600 font-bold p-0 group-hover:translate-x-1 transition-transform">
                         Directions <Navigation className="w-3 h-3 ml-1" />
                      </Button>
                   </div>
                </CardContent>
             </Card>
           ))}

           <div className="p-6 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl border border-indigo-100 dark:border-indigo-900">
              <div className="flex items-center space-x-3 mb-2 text-indigo-700 dark:text-indigo-300 font-bold">
                 <AlertTriangle className="w-5 h-5" />
                 <h4>Know Before You Go</h4>
              </div>
              <p className="text-sm text-indigo-600/80 dark:text-indigo-400/80 leading-relaxed">
                 Double check your status on the official portal even if you've voted here before. Polling boundaries can change.
              </p>
           </div>
        </div>

        <div className="lg:col-span-3">
          <Card className="h-full rounded-3xl border-none shadow-xl overflow-hidden bg-slate-100 dark:bg-slate-800 relative min-h-[400px]">
             {/* Mock Map View */}
             <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-74.006,40.7128,12/800x600?access_token=none')] bg-cover opacity-50 grayscale"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center relative z-10 p-8">
                   <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-2xl mx-auto mb-4 animate-bounce">
                      <MapPin className="w-8 h-8 text-indigo-600" />
                   </div>
                   <h3 className="text-xl font-bold mb-2">Interactive Map</h3>
                   <p className="text-slate-500 max-w-xs font-medium">To view the live interactive map with real-time locations, please grant location access.</p>
                   <Button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-8 font-bold">
                      Enable Location
                   </Button>
                </div>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
