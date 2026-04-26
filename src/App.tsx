import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Vote, 
  MessageSquare, 
  Info, 
  MapPin, 
  Calendar, 
  Users, 
  CheckSquare, 
  Languages, 
  Moon, 
  Sun,
  ChevronRight,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

const ChatInterface = lazy(() => import('./components/ChatInterface'));
const ElectionCountdown = lazy(() => import('./components/ElectionCountdown'));
const RegistrationGuide = lazy(() => import('./components/RegistrationGuide'));
const PollingFinder = lazy(() => import('./components/PollingFinder'));
const CandidateDashboard = lazy(() => import('./components/CandidateDashboard'));
const ChecklistGenerator = lazy(() => import('./components/ChecklistGenerator'));

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<'en' | 'bn' | 'hi'>('en');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const navItems = [
    { id: 'home', label: 'Home', icon: Vote },
    { id: 'chat', label: 'AI Helper', icon: MessageSquare },
    { id: 'guide', label: 'Registration', icon: Info },
    { id: 'candidates', label: 'Candidates', icon: Users },
    { id: 'polls', label: 'Polling Booths', icon: MapPin },
    { id: 'checklist', label: 'Checklist', icon: CheckSquare },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Vote className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">VoteGuide<span className="text-indigo-600">AI</span></span>
          </div>

          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === item.id 
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-full"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            
            <div className="relative group">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Languages className="w-5 h-5" />
              </Button>
              <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-800 border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {(['en', 'bn', 'hi'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      toast.success(`Language set to ${lang.toUpperCase()}`);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 first:rounded-t-lg last:rounded-b-lg ${language === lang ? 'text-indigo-600 font-bold' : ''}`}
                  >
                    {lang === 'en' ? 'English' : lang === 'bn' ? 'বাংলা' : 'हिन्दी'}
                  </button>
                ))}
              </div>
            </div>

            <Button className="hidden sm:flex bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6">
              Sign In
            </Button>
            <Button variant="ghost" size="icon" className="sm:hidden rounded-full">
               <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'home' && (
              <div className="space-y-12">
                {/* Hero Section */}
                <section className="relative overflow-hidden rounded-3xl bg-indigo-600 px-6 py-16 sm:px-12 sm:py-24 text-white">
                  <div className="relative z-10 max-w-2xl">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                      Every Vote Shapes the <span className="text-indigo-200">Future.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-indigo-100 mb-8 leading-relaxed">
                      Your one-stop destination for election updates, registration guides, and AI-powered voter assistance. Stay informed, stay empowered.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button 
                        onClick={() => setActiveTab('chat')}
                        size="lg" 
                        className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold rounded-xl"
                      >
                        Ask VoteGuide AI
                        <ChevronRight className="ml-2 w-5 h-5" />
                      </Button>
                      <Button 
                       onClick={() => setActiveTab('guide')}
                        size="lg" 
                        variant="outline" 
                        className="border-white text-white hover:bg-white/10 font-bold rounded-xl"
                      >
                        Check Eligibility
                      </Button>
                    </div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                  <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                </section>

                {/* Quick Info Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <ElectionCountdown />
                  <div className="lg:col-span-2">
                     <CandidateDashboard compact />
                  </div>
                </div>

                {/* Features Highlights */}
                <section className="grid md:grid-cols-3 gap-8 text-center pt-8">
                  {[
                    { title: 'Secure & Private', desc: 'Your data is encrypted and never shared. We prioritize your privacy above all.', icon: Vote },
                    { title: 'Verified Sources', desc: 'All information is sourced from official election commission portals.', icon: Info },
                    { title: 'Accessible to All', desc: 'Built with accessibility in mind, supporting multiple regional languages.', icon: Languages },
                  ].map((feature, i) => (
                    <div key={i} className="p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mx-auto mb-4">
                        <feature.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
                    </div>
                  ))}
                </section>
              </div>
            )}

            <Suspense fallback={<div className="flex h-[50vh] items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>}>
              {activeTab === 'chat' && <ChatInterface language={language} />}
              {activeTab === 'guide' && <RegistrationGuide language={language} />}
              {activeTab === 'candidates' && <CandidateDashboard />}
              {activeTab === 'polls' && <PollingFinder />}
              {activeTab === 'checklist' && <ChecklistGenerator />}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t z-50 flex justify-around items-center h-16 px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
              activeTab === item.id 
              ? 'text-indigo-600' 
              : 'text-slate-500'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-1">{item.label}</span>
          </button>
        ))}
      </div>

      <Toaster position="top-center" />
    </div>
  );
}
