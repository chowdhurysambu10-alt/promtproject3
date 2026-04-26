import { useState } from 'react';
import { 
  FileText, 
  Download, 
  CheckSquare, 
  Square, 
  Plus, 
  Trash2, 
  Printer,
  ChevronDown,
  Info,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { jsPDF } from 'jspdf';
import { toast } from 'sonner';

export default function ChecklistGenerator() {
  const [items, setItems] = useState([
    { id: '1', text: 'Confirm Voter Registration status', completed: true },
    { id: '2', text: 'Find assigned Polling Station', completed: false },
    { id: '3', text: 'Decide on your candidates', completed: false },
    { id: '4', text: 'Pack valid Identity Proof (e.g. Aadhar, Passport)', completed: false },
    { id: '5', text: 'Choose your voting time (avoid peak hours)', completed: false },
  ]);
  const [newItem, setNewItem] = useState('');

  const toggleItem = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const addItem = () => {
    if (!newItem.trim()) return;
    setItems([...items, { id: Date.now().toString(), text: newItem, completed: false }]);
    setNewItem('');
    toast.success('Checklist updated');
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(79, 70, 229); // Indigo-600
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('VoteGuide AI: Voter Checklist', 20, 25);
    
    // Content
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(16);
    doc.text('My Election Preparation List', 20, 55);
    
    doc.setFontSize(12);
    items.forEach((item, index) => {
      const y = 70 + (index * 10);
      const status = item.completed ? '[DONE]' : '[ ]';
      doc.text(`${status} ${item.text}`, 20, y);
    });
    
    doc.setTextColor(150, 150, 150);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 20, 280);
    
    doc.save('voter-checklist.pdf');
    toast.success('Your checklist PDF has been downloaded');
  };

  return (
    <div className="max-w-4xl mx-auto py-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0">
         <div>
            <h2 className="text-3xl font-extrabold flex items-center">
              <CheckSquare className="w-8 h-8 mr-3 text-indigo-600" />
              Voting Day Prep List
            </h2>
            <p className="text-slate-500 mt-1 font-medium italic">Make sure you have everything ready for the democratic process.</p>
         </div>
         <div className="flex space-x-3">
            <Button variant="outline" className="rounded-xl border-slate-200" onClick={() => window.print()}>
               <Printer className="w-4 h-4 mr-2" />
               Print
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold" onClick={downloadPDF}>
               <Download className="w-4 h-4 mr-2" />
               Download PDF
            </Button>
         </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 rounded-3xl border-none shadow-xl bg-white dark:bg-slate-900 border overflow-hidden">
          <CardHeader className="bg-indigo-50 dark:bg-indigo-900/10 p-6 flex flex-row items-center justify-between">
             <div>
                <CardTitle className="text-xl font-bold">Preparation Tasks</CardTitle>
                <CardDescription className="font-medium">{items.filter(i => i.completed).length} of {items.length} completed</CardDescription>
             </div>
             <div className="w-16 h-16 relative flex items-center justify-center">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle
                    className="text-slate-200 dark:text-slate-800"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="28"
                    cx="32"
                    cy="32"
                  />
                  <circle
                    className="text-indigo-600"
                    strokeWidth="8"
                    strokeDasharray={`${(items.filter(i => i.completed).length / items.length) * 176}, 176`}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="28"
                    cx="32"
                    cy="32"
                  />
                </svg>
                <span className="absolute text-xs font-bold">{Math.round((items.filter(i => i.completed).length / items.length) * 100)}%</span>
             </div>
          </CardHeader>
          <CardContent className="p-6">
             <div className="space-y-3">
                {items.map((item) => (
                  <div 
                    key={item.id} 
                    className={`flex items-center group p-4 rounded-2xl border border-slate-50 dark:border-slate-800 transition-all ${item.completed ? 'bg-slate-50/50 dark:bg-slate-800/30' : 'bg-white dark:bg-slate-900 shadow-sm'}`}
                  >
                    <div className="flex items-center flex-1 cursor-pointer" onClick={() => toggleItem(item.id)}>
                       <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors mr-4 ${item.completed ? 'bg-green-100 dark:bg-green-900/40' : 'bg-indigo-50 dark:bg-indigo-900/40'}`}>
                          {item.completed ? <CheckSquare className="w-4 h-4 text-green-600" /> : <Square className="w-4 h-4 text-indigo-400" />}
                       </div>
                       <span className={`text-slate-700 dark:text-slate-300 font-medium transition-all ${item.completed ? 'line-through opacity-50' : ''}`}>
                          {item.text}
                       </span>
                    </div>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 rounded-full" onClick={() => deleteItem(item.id)}>
                       <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
             </div>

             <div className="mt-8 relative">
                <Input 
                  placeholder="Add custom task..." 
                  className="rounded-2xl h-12 pr-12 bg-slate-50 dark:bg-slate-800 border-none px-6 font-medium"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addItem()}
                />
                <Button 
                  size="icon" 
                  className="absolute right-1 top-1 w-10 h-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none"
                  onClick={addItem}
                >
                  <Plus className="w-5 h-5" />
                </Button>
             </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-none shadow-xl bg-indigo-600 text-white p-8 space-y-6">
           <div className="p-3 bg-white/20 w-fit rounded-2xl">
              <Info className="w-8 h-8" />
           </div>
           <h3 className="text-2xl font-bold leading-tight">Pro-Tip for Election Day</h3>
           <p className="text-indigo-100 text-sm leading-relaxed">
             Wear comfortable shoes and bring a water bottle. Peak hours are usually between 10 AM and 2 PM. Try to go early in the morning for the shortest wait times!
           </p>
           <div className="pt-4 border-t border-white/20">
              <div className="flex items-center space-x-2 text-xs font-bold mb-3 uppercase tracking-wider text-indigo-200">
                 < Award className="w-4 h-4 text-white" />
                 Special Note
              </div>
              <p className="text-white font-medium italic">"Democracy is a muscle; it only stays strong if you use it."</p>
           </div>
        </Card>
      </div>
    </div>
  );
}
