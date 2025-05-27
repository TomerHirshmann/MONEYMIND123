export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  category: string;
  amount: number;
  date: string;
  notes?: string;
}

export interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  category: string;
  deadline: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  language: 'en' | 'he';
  currency: string;
}