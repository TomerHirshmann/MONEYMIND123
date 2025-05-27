import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, ArrowDownRight, TrendingDown, Receipt, AlertCircle } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext';
import { useAuth } from '../contexts/AuthContext';
import TransactionModal from '../components/TransactionModal';
import { addTransaction, updateTransaction, deleteTransaction, getTransactions } from '../lib/supabase';

const Expenses: React.FC = () => {
  const { t } = useTranslation();
  const { formatAmount } = useCurrency();
  const { user } = useAuth();
  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadTransactions();
    }
  }, [user]);

  const loadTransactions = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await getTransactions(user.uid, 'expense');
      setTransactions(data);
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewExpense = async (transaction: any) => {
    if (!user) return;
    try {
      if (transaction.id) {
        await updateTransaction(transaction.id, transaction);
      } else {
        await addTransaction(user.uid, transaction);
      }
      await loadTransactions();
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  const handleEdit = (transaction: any) => {
    setEditingTransaction(transaction);
    setShowNewTransactionModal(true);
  };

  const handleDelete = async (transactionId: string) => {
    if (!window.confirm(t('transactions.deleteConfirm'))) return;
    try {
      await deleteTransaction(transactionId);
      await loadTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const currentMonthExpenses = transactions.reduce((sum, t) => {
    if (new Date(t.date).getMonth() === new Date().getMonth()) {
      return sum + (t.amount || 0);
    }
    return sum;
  }, 0);

  const previousMonthExpenses = transactions.reduce((sum, t) => {
    if (new Date(t.date).getMonth() === new Date().getMonth() - 1) {
      return sum + (t.amount || 0);
    }
    return sum;
  }, 0);

  const percentageChange = previousMonthExpenses ? 
    ((currentMonthExpenses - previousMonthExpenses) / previousMonthExpenses) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">הוצאות</h1>
        <button
          onClick={() => {
            setEditingTransaction(null);
            setShowNewTransactionModal(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          הוסף הוצאה
        </button>
      </div>

      {/* Monthly Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">סה״כ החודש</h2>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {formatAmount(currentMonthExpenses)}
              </p>
            </div>
            <div className="p-3 bg-error-100 dark:bg-error-900/20 rounded-full">
              <Receipt className="w-6 h-6 text-error-600 dark:text-error-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-error-500" />
            <span className="text-error-600 dark:text-error-400">
              {percentageChange.toFixed(1)}% מהחודש שעבר
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">השוואה לחודש קודם</h2>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">החודש</span>
              <span className="font-medium text-gray-900 dark:text-white">{formatAmount(currentMonthExpenses)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">חודש קודם</span>
              <span className="font-medium text-gray-900 dark:text-white">{formatAmount(previousMonthExpenses)}</span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full mt-2">
              <div
                className="h-full bg-error-500 rounded-full"
                style={{ width: `${(currentMonthExpenses / Math.max(currentMonthExpenses, previousMonthExpenses)) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Expenses List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  תאריך
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  קטגוריה
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  סכום
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  סטטוס
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  הערות
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  פעולות
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {new Date(transaction.date).toLocaleDateString('he-IL')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {t(`transactions.categories.${transaction.category}`)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <ArrowDownRight className="w-4 h-4 text-error-500" />
                      <span className="text-sm text-error-600 dark:text-error-400">
                        {formatAmount(transaction.amount, transaction.currency)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.isPaid ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-400">
                        שולם
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-400">
                        לא שולם
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {transaction.notes}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2 space-x-reverse">
                    <button
                      onClick={() => handleEdit(transaction)}
                      className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                    >
                      ערוך
                    </button>
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="text-error-600 hover:text-error-700 dark:text-error-400 dark:hover:text-error-300"
                    >
                      מחק
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TransactionModal
        isOpen={showNewTransactionModal}
        onClose={() => {
          setShowNewTransactionModal(false);
          setEditingTransaction(null);
        }}
        onSubmit={handleNewExpense}
        initialData={editingTransaction}
        type="expense"
      />
    </div>
  );
};

export default Expenses;