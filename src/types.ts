export interface Lead {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  plan: 'monthly' | 'yearly';
  timestamp: string;
  status: 'PENDING_CONTACT' | 'ONBOARDED';
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SimulatorAlert {
  id: string;
  time: string;
  table: string;
  rating: number;
  tags: string[];
  comment?: string;
  type: 'positive' | 'negative';
  status: 'active' | 'resolved';
}
