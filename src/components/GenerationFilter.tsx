import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { loadAllGenerations, Generation } from '../utils/dataLoader';

interface GenerationFilterProps {
  selectedGeneration: string | null;
  onGenerationSelect: (generation: string | null) => void;
}

const GenerationFilter: React.FC<GenerationFilterProps> = ({
  selectedGeneration,
  onGenerationSelect,
}) => {
  const { t } = useLanguage();
  const [generations, setGenerations] = useState<Generation[]>([]);

  useEffect(() => {
    const fetchGenerations = async () => {
      try {
        const data = await loadAllGenerations();
        setGenerations(data);
      } catch (error) {
        console.error('Error loading generations:', error);
      }
    };

    fetchGenerations();
  }, []);

  const allGenerations = [
    { id: 'all', displayName: t('generation_filter.all'), startYear: 0, endYear: null, description: 'Wszystkie generacje' },
    ...generations
  ];

  return (
    <motion.div 
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-8"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {t('generation_filter.title')}
      </h3>
      <div className="flex flex-wrap gap-3">
        {allGenerations.map((gen, index) => (
          <motion.button
            key={gen.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onGenerationSelect(gen.id === 'all' ? null : gen.id)}
            className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 ${
              selectedGeneration === (gen.id === 'all' ? null : gen.id)
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <div className="flex flex-col items-center">
              <span>{gen.displayName}</span>
              {gen.id !== 'all' && (
                <span className="text-xs opacity-75">
                  {gen.startYear}-{gen.endYear || 'teraz'}
                </span>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default GenerationFilter;