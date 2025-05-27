import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { ArrowRight } from 'lucide-react';

const Blog: React.FC = () => {
  const articles = [
    {
      id: 1,
      title: 'איך לבנות תקציב שיווק חכם לעסק קטן',
      excerpt: 'למדו איך לבנות תקציב שיווק אפקטיבי שיביא לכם תוצאות אמיתיות, בלי לבזבז כסף מיותר',
      image: 'https://images.pexels.com/photos/7681098/pexels-photo-7681098.jpeg',
      category: 'שיווק',
      readTime: '5 דקות'
    },
    {
      id: 2,
      title: '3 דרכים לחסוך בהוצאות בלי לוותר על איכות',
      excerpt: 'גלו איך לצמצם הוצאות בצורה חכמה, תוך שמירה על איכות השירות והמוצרים שלכם',
      image: 'https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg',
      category: 'ניהול פיננסי',
      readTime: '7 דקות'
    },
    {
      id: 3,
      title: 'טעויות תמחור שכל בעל עסק עושה',
      excerpt: 'הכירו את הטעויות הנפוצות בתמחור והבינו איך להימנע מהן כדי להגדיל את הרווחיות',
      image: 'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg',
      category: 'תמחור',
      readTime: '6 דקות'
    },
    {
      id: 4,
      title: 'למה אתה לא באמת יודע כמה אתה מרוויח',
      excerpt: 'גלו את הסיבות האמיתיות לכך שאתם לא מודעים לרווח האמיתי שלכם ואיך לפתור את זה',
      image: 'https://images.pexels.com/photos/5483064/pexels-photo-5483064.jpeg',
      category: 'ניהול פיננסי',
      readTime: '8 דקות'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-900 dark:to-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 dark:text-white mb-6">
            כלים עסקיים
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            מאמרים, טיפים וכלים שיעזרו לך לנהל את העסק שלך טוב יותר
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <Link
              key={article.id}
              to={`/blog/${article.id}`}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full text-sm">
                    {article.category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {article.readTime}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-emerald-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {article.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
                  קרא עוד
                  <ArrowRight className="mr-2 w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Blog;