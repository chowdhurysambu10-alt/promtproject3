export interface Candidate {
  id: string;
  name: string;
  party: string;
  position: string;
  image: string;
  bio: string;
  vision: string[];
}

export interface ElectionEvent {
  id: string;
  title: string;
  date: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface VoterChecklist {
  id: string;
  item: string;
  completed: boolean;
}
