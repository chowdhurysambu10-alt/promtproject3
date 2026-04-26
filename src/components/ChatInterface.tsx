import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Mic, Volume2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getChatResponse } from '../lib/gemini';
import ReactMarkdown from 'react-markdown';
import { ChatMessage } from '../types';

export default function ChatInterface({ language }: { language: 'en' | 'bn' | 'hi' }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: language === 'en' 
        ? "Hello! I'm VoteGuide AI. How can I help you today with election information?" 
        : language === 'bn' 
        ? "নমস্কার! আমি আপনাকে নির্বাচনের তথ্য দিয়ে কীভাবে সাহায্য করতে পারি?" 
        : "नमस्ते! मैं चुनाव संबंधी जानकारी के साथ आपकी क्या मदद कर सकता हूँ?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Map history to Gemini format
      const history = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const responseText = await getChatResponse(input, history);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText || "I'm sorry, I couldn't process that request.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please check your internet connection and try again.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[70vh] max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border">
      {/* Chat header */}
      <div className="px-6 py-4 border-b bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10 border-2 border-indigo-500">
            <AvatarImage src="/bot-avatar.png" />
            <AvatarFallback className="bg-indigo-600 text-white"><Bot /></AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold">VoteGuide AI</h3>
            <div className="flex items-center text-xs text-green-500 font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
              Online Assistant
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
           <Globe className="w-3 h-3" />
           <span>{language === 'en' ? 'English' : language === 'bn' ? 'Bengali' : 'Hindi'}</span>
        </div>
      </div>

      {/* Messages area */}
      <ScrollArea className="flex-1 p-6" viewportRef={scrollRef}>
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'} space-x-3`}>
                <Avatar className={`w-8 h-8 mt-1 border ${message.role === 'user' ? 'bg-indigo-100' : 'bg-slate-100'}`}>
                  <AvatarFallback className={message.role === 'user' ? 'text-indigo-600' : 'text-slate-600'}>
                    {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </AvatarFallback>
                </Avatar>
                <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                  message.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none border'
                }`}>
                  <div className="text-sm prose dark:prose-invert max-w-none">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                  <div className={`text-[10px] mt-2 opacity-50 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex space-x-3">
                 <Avatar className="w-8 h-8 border bg-slate-100">
                    <AvatarFallback className="text-slate-600"><Bot className="w-4 h-4" /></AvatarFallback>
                 </Avatar>
                 <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-none px-4 py-3 border shadow-sm flex items-center">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-600 mr-2" />
                    <span className="text-sm text-slate-500 animate-pulse font-medium">Assistant is thinking...</span>
                 </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t">
        <div className="relative flex items-center space-x-2 max-w-4xl mx-auto">
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600 rounded-full">
            <Mic className="w-5 h-5" />
          </Button>
          <Input
            placeholder="Type your question about elections..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 rounded-full border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus-visible:ring-indigo-500 h-11 pr-12"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-1 w-9 h-9 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-all"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-2">
          AI can make mistakes. Always verify critical info on the Official Election Commission portal.
        </p>
      </div>
    </div>
  );
}
