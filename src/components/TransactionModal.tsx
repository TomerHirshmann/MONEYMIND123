import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transaction: any) => void;
  initialData?: any;
  type?: 'income' | 'expense';
}

const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, onSubmit, initialData, type = 'income' }) => {
  const { t } = useTranslation();
  const { currency } = useCurrency();
  const [form, setForm] = useState({
    type: type,
    category: '',
    amount: '',
    currency: currency,
    date: new Date().toISOString().split('T')[0],
    notes: '',
    isPaid: true
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        type: initialData.type || type,
        category: initialData.category || '',
        amount: initialData.amount?.toString() || '',
        currency: initialData.currency || currency,
        date: initialData.date || new Date().toISOString().split('T')[0],
        notes: initialData.notes || '',
        isPaid: initialData.isPaid ?? true
      });
    } else {
      // Reset form when opening a new transaction
      setForm({
        type: type,
        category: '',
        amount: '',
        currency: currency,
        date: new Date().toISOString().split('T')[0],
        notes: '',
        isPaid: true
      });
    }
  }, [initialData, type, currency, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form:', form);

    if (!form.category || !form.amount) {
      alert(t('transactions.validation.required'));
      return;
    }

    const transaction = {
      ...form,
      amount: parseFloat(form.amount),
      id: initialData?.id
    };

    console.log('Submitting transaction:', transaction);
    onSubmit(transaction);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {initialData ? t('transactions.edit') : t('transactions.add')}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('transactions.fields.type')}
            </label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as 'income' | 'expense' })}
              className="input"
              required
            >
              <option value="income">{t('transactions.type.income')}</option>
              <option value="expense">{t('transactions.type.expense')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('transactions.fields.category')}
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="input"
              required
            >
              <option value="">{t('common.select')}</option>
              <option value="advertising">{t('transactions.categories.advertising')}</option>
              <option value="rent">{t('transactions.categories.rent')}</option>
              <option value="services">{t('transactions.categories.services')}</option>
              <option value="software">{t('transactions.categories.software')}</option>
              <option value="salary">{t('transactions.categories.salary')}</option>
              <option value="consulting">{t('transactions.categories.consulting')}</option>
              <option value="other">{t('transactions.categories.other')}</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('transactions.fields.amount')}
              </label>
              <input
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="input"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('transactions.fields.currency')}
              </label>
              <select
                value={form.currency}
                onChange={(e) => setForm({ ...form, currency: e.target.value as 'ILS' | 'USD' })}
                className="input"
                required
              >
                <option value="ILS">₪ שקל</option>
                <option value="USD">$ דולר</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('transactions.fields.date')}
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('transactions.fields.notes')}
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="input"
              rows={3}
            />
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.isPaid}
                onChange={(e) => setForm({ ...form, isPaid: e.target.checked })}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {t('common.status.paid')}
              </span>
            </label>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {t('common.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;