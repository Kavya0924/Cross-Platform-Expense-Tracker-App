import { useState, useEffect } from 'react';
import { Expense, BudgetInfo } from '@/types/expense';
import { loadExpenses, saveExpenses, addExpense as saveExpense, deleteExpense as removeExpense } from '@/utils/storage';
import { BUDGET_LIMIT } from '@/constants/categories';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpensesData();
  }, []);

  const loadExpensesData = async () => {
    try {
      const loadedExpenses = await loadExpenses();
      setExpenses(loadedExpenses);
    } catch (error) {
      console.error('Error loading expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense: Expense) => {
    try {
      await saveExpense(expense);
      setExpenses(prev => [expense, ...prev]);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const deleteExpense = async (expenseId: string) => {
    try {
      await removeExpense(expenseId);
      setExpenses(prev => prev.filter(expense => expense.id !== expenseId));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const getBudgetInfo = (): BudgetInfo => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });

    const spent = monthlyExpenses.reduce((total, expense) => total + expense.amount, 0);
    const remaining = Math.max(0, BUDGET_LIMIT - spent);
    const percentage = Math.min(100, (spent / BUDGET_LIMIT) * 100);

    return {
      limit: BUDGET_LIMIT,
      spent,
      remaining,
      percentage,
    };
  };

  const getExpensesByCategory = () => {
    return expenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = 0;
      }
      acc[expense.category] += expense.amount;
      return acc;
    }, {} as Record<string, number>);
  };

  return {
    expenses,
    loading,
    addExpense,
    deleteExpense,
    getBudgetInfo,
    getExpensesByCategory,
    refreshExpenses: loadExpensesData,
  };
};