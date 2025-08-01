import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft } from 'lucide-react';
import Navigation from '../components/Navigation';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-2xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="text-8xl">
              🎮🛑
            </div>
          </motion.div>

          {/* Error Code */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-2">
              404
            </h1>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
              Strona nie istnieje
            </h2>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              Nie możemy znaleźć kontrolera, którego szukasz.
            </p>
            <p className="text-gray-500 dark:text-gray-500">
              Strona mogła zostać przeniesiona, usunięta lub podałeś nieprawidłowy adres.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link
              to="/"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition-colors shadow-lg shadow-blue-600/25"
            >
              <Home className="h-5 w-5" />
              <span>Wróć na stronę główną</span>
            </Link>
            
            <Link
              to="/news"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-2xl transition-colors"
            >
              <Search className="h-5 w-5" />
              <span>Przeglądaj aktualności</span>
            </Link>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Może Cię zainteresuje:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to="/timeline"
                className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400">📅</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Oś czasu</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Historia kontrolerów</p>
                </div>
              </Link>
              
              <Link
                to="/compare"
                className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400">⚖️</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Porównywarka</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Porównaj pady</p>
                </div>
              </Link>
              
              <Link
                to="/submit"
                className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400">➕</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Zgłoś pad</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Dodaj do bazy</p>
                </div>
              </Link>
              
              <Link
                to="/contact"
                className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 dark:text-orange-400">📧</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Kontakt</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Napisz do nas</p>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Back to Previous Page */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8"
          >
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Wróć do poprzedniej strony</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;