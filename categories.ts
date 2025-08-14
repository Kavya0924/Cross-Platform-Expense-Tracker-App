import { Category } from '@/types/expense';

export const CATEGORIES: Category[] = [
  { id: 'shopping', name: 'Shopping', icon: 'shopping-bag', color: '#f59e0b' },
  { id: 'transport', name: 'Transport', icon: 'car', color: '#3b82f6' },
  { id: 'food', name: 'Food & Dining', icon: 'utensils', color: '#ef4444' },
  { id: 'entertainment', name: 'Entertainment', icon: 'film', color: '#8b5cf6' },
  { id: 'bills', name: 'Bills & Utilities', icon: 'receipt', color: '#06b6d4' },
  { id: 'healthcare', name: 'Healthcare', icon: 'heart-pulse', color: '#ec4899' },
  { id: 'education', name: 'Education', icon: 'graduation-cap', color: '#10b981' },
  { id: 'others', name: 'Others', icon: 'more-horizontal', color: '#6b7280' },
];

export const BUDGET_LIMIT = 5000;