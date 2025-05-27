import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { askAIQuestion } from '../lib/openai';
import { MessageSquare, Send } from 'lucide-react';

const AIChat: React.FC = () => {
  const { t } = useTranslation();
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    try {
      // TODO: Pass actual transactions data
      const answer = await askAIQuestion(question, []);
      setResponse(answer);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Sorry, there was an error processing your question.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          <MessageSquare className="w-6 h-6" />
          {t('common.aiChat')}
        </h1>
        <p className="text-gray-600 mt-2">
          Ask any question about your business finances and get AI-powered insights.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="question" className="sr-only">
              Your question
            </label>
            <div className="relative">
              <input
                type="text"
                id="question"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ask about your finances..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-primary-500"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </form>

        {loading && (
          <div className="mt-4 text-gray-600">
            Thinking...
          </div>
        )}

        {response && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-800 whitespace-pre-wrap">{response}</p>
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Example questions:</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>"What were my total expenses last month?"</li>
            <li>"Which category had the highest spending?"</li>
            <li>"How does my current profit compare to last month?"</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AIChat;