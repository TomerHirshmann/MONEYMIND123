import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Search, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext';
import TransactionModal from '../components/TransactionModal';

const Transactions: React.FC = () => {
  const { t } = useTranslation();
  const { formatAmount } = useCurrency();
  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);

  // Mock data - will be replaced with real data from Firebase
  const transactions = [
    {
      id: '1',
      type: 'income',
      category: 'consulting',
      amount: 2500,
      currency: 'ILS',
      date: '2024-02-20',
      notes: 'Website development project'
    },
    {
      id: '2',
      type: 'expense',
      category: 'advertising',
      amount: 500,
      currency: 'USD',
      date: '2024-02-19',
      notes: 'Facebook Ads'
    }
  ];

  const handleNewTransaction = (transaction: any) => {
    console.log('New transaction:', transaction);
    // TODO: Implement transaction creation
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{t('common.transactions')}</h1>
        <button
          onClick={() => setShowNewTransactionModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {t('transactions.add')}
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={t('transactions.searchPlaceholder')}
            className="input pl-10"
          />
        </div>
        <button className="btn-secondary flex items-center gap-2">
          <Filter className="w-5 h-5" />
          {t('common.filter')}
        </button>
      </div>

      {/* Transactions List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('transactions.fields.date')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('transactions.fields.category')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('transactions.fields.amount')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('transactions.fields.notes')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('common.actions')}
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
                      {transaction.type === 'income' ? (
                        <ArrowUpRight className="w-4 h-4 text-success-500" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-error-500" />
                      )}
                      <span className={`text-sm ${
                        transaction.type === 'income' ? 'text-success-600 dark:text-success-400' : 'text-error-600 dark:text-error-400'
                      }`}>
                        {formatAmount(transaction.amount, transaction.currency)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {transaction.notes}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                      {t('common.edit')}
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
        onClose={() => setShowNewTransactionModal(false)}
        onSubmit={handleNewTransaction}
      />
    </div>
  );
};

export default Transactions;