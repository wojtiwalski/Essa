import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Database, Users, Clock, Star } from 'lucide-react';
import { loadSiteConfig, loadAllControllers, loadAllManufacturers, SiteConfig } from '../utils/dataLoader';

const CategoryBar: React.FC = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState({
    totalControllers: 0,
    totalManufacturers: 0,
    yearsOfHistory: 0,
    lastUpdated: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [controllers, manufacturers] = await Promise.all([
          loadAllControllers(),
          loadAllManufacturers()
        ]);

        const currentYear = new Date().getFullYear();
        const oldestController = controllers.reduce((oldest, controller) => 
          controller.releaseYear < oldest ? controller.releaseYear : oldest, currentYear
        );

        setStats({
          totalControllers: controllers.length,
          totalManufacturers: manufacturers.length,
          yearsOfHistory: currentYear - oldestController,
          lastUpdated: new Date().toLocaleDateString('pl-PL')
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="animate-pulse flex space-x-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const statItems = [
    { 
      label: t('categories.controllers'), 
      value: stats.totalControllers, 
      icon: Database, 
      color: 'text-blue-600 dark:text-blue-400' 
    },
    { 
      label: t('categories.manufacturers'), 
      value: stats.totalManufacturers, 
      icon: Users, 
      color: 'text-green-600 dark:text-green-400' 
    },
    { 
      label: t('categories.years_history'), 
      value: stats.yearsOfHistory, 
      icon: Clock, 
      color: 'text-purple-600 dark:text-purple-400' 
    },
    { 
      label: t('categories.last_update'), 
      value: stats.lastUpdated, 
      icon: Star, 
      color: 'text-orange-600 dark:text-orange-400' 
    },
  ];

  return (
    <motion.div 
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-6 md:space-x-8">
            {statItems.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="flex items-center space-x-2"
              >
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                <div className="text-sm">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {stat.value}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 ml-1">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryBar;