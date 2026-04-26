import { Users, Search, Download, ExternalLink, Info, Award, Target, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Candidate } from '../types';

export default function CandidateDashboard({ compact = false }: { compact?: boolean }) {
  const candidates: Candidate[] = [
    {
      id: '1',
      name: 'Elena Rodriguez',
      party: 'Democratic Reform Party',
      position: 'City Mayor',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&h=256&auto=format&fit=crop',
      bio: 'Former council member with 15 years of experience in urban planning and sustainable development.',
      vision: ['Zero Carbon Transit', 'Inclusive Housing', 'Education Reform']
    },
    {
      id: '2',
      name: 'Marcus Chen',
      party: 'National Progress Alliance',
      position: 'City Mayor',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&auto=format&fit=crop',
      bio: 'Tech entrepreneur focusing on bringing digital transformation to municipal services.',
      vision: ['Smart City Infrastructure', 'Tech Jobs Initiative', 'Transparency in Admin']
    }
  ];

  if (compact) {
    return (
      <Card className="h-full border-none shadow-lg bg-white dark:bg-slate-900">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-bold flex items-center">
            <Users className="w-5 h-5 mr-2 text-indigo-600" />
            Top Candidates
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-indigo-600 font-bold hover:bg-indigo-50">View All</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="flex items-center space-x-4 p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <img src={candidate.image} alt={candidate.name} className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100" />
              <div className="flex-1 min-w-0">
                <p className="font-bold truncate">{candidate.name}</p>
                <div className="flex items-center space-x-2">
                   <Badge variant="secondary" className="text-[10px] h-4 px-1.5 bg-slate-100 dark:bg-slate-700">{candidate.party}</Badge>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-3xl font-extrabold flex items-center">
              <Users className="w-8 h-8 mr-3 text-indigo-600" />
              Candidate Dashboard
           </h2>
           <p className="text-slate-500 mt-1 font-medium">Browse and compare candidates for the upcoming Mayoral Election.</p>
        </div>
        <div className="flex space-x-3">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Search name, party..." className="pl-10 rounded-xl bg-white dark:bg-slate-800" />
           </div>
           <Button variant="outline" className="rounded-xl border-indigo-200 font-medium">
              Filter By Party
           </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {candidates.map((candidate) => (
          <Card key={candidate.id} className="rounded-3xl border-none shadow-xl overflow-hidden bg-white dark:bg-slate-900 group hover:shadow-2xl transition-all duration-300">
            <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
               <div className="absolute -bottom-12 left-8 border-4 border-white dark:border-slate-900 rounded-full overflow-hidden shadow-lg w-24 h-24">
                  <img src={candidate.image} alt={candidate.name} className="w-full h-full object-cover" />
               </div>
               <div className="absolute top-4 right-6">
                  <Badge className="bg-white/20 backdrop-blur-md text-white border-0 text-xs py-1 px-3">
                     {candidate.position}
                  </Badge>
               </div>
            </div>
            <CardHeader className="pt-16 px-8">
              <div className="flex justify-between items-start">
                 <div>
                    <CardTitle className="text-2xl font-bold">{candidate.name}</CardTitle>
                    <CardDescription className="text-indigo-600 dark:text-indigo-400 font-bold mt-1 uppercase text-xs tracking-widest">{candidate.party}</CardDescription>
                 </div>
                 <Button variant="ghost" size="icon" className="rounded-full hover:bg-indigo-50">
                    <ExternalLink className="w-5 h-5 text-indigo-600" />
                 </Button>
              </div>
            </CardHeader>
            <CardContent className="px-8 space-y-6 pb-8">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic">{candidate.bio}</p>
              
              <div className="space-y-4">
                 <h4 className="font-bold flex items-center text-sm uppercase tracking-wider text-slate-400">
                    <Target className="w-4 h-4 mr-2" /> Key Vision & Roadmap
                 </h4>
                 <div className="grid grid-cols-1 gap-3">
                    {candidate.vision.map((vision, idx) => (
                      <div key={idx} className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 group-hover:border-indigo-100 transition-colors">
                         <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 flex items-center justify-center text-indigo-600 shadow-sm">
                            <Award className="w-4 h-4" />
                         </div>
                         <span className="font-bold text-sm">{vision}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="flex gap-4 pt-4">
                 <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 font-bold transition-all hover:scale-[1.02]">
                    Full Manifesto
                 </Button>
                 <Button variant="outline" className="flex-1 border-indigo-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 rounded-xl h-12 font-bold hover:bg-indigo-50 dark:hover:bg-slate-800 transition-all">
                    Candidate FAQ
                 </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center pt-8">
         <Button variant="ghost" className="text-slate-400 hover:text-indigo-600 font-bold group">
            Load More Candidates
            <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
         </Button>
      </div>
    </div>
  );
}
