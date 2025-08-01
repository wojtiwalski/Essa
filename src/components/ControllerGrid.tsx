import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Building, Wifi, WifiOff, Gamepad2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Controller, loadAllGenerations } from '../utils/dataLoader';
import { getMainImageUrl, getMainImageAlt } from '../utils/imageHelpers';
import { matchesSearchQuery } from '../utils/searchAliases';

interface ControllerGridProps {
  controllers: Controller[];
  searchQuery: string;
  selectedGeneration: string | null;
}

interface Generation {
  id: string;
  name: string;
  displayName: string;
  startYear: number;
  endYear: number | null;
  description: string;
  keyFeatures: string[];
}

const ControllerGrid: React.FC<ControllerGridProps> = ({
  controllers,
  searchQuery,
  selectedGeneration,
}) => {
  const { t } = useLanguage();

  const [generations, setGenerations] = useState<Generation[]>([]);

  useEffect(() => {
    const loadGenerations = async () => {
      try {
        const generationsData = await loadAllGenerations();
        setGenerations(generationsData);
      } catch (error) {
        console.error('Error loading generations:', error);
      }
    };

    loadGenerations();
  }, []);

  // Helper function to map generation ID to name
  const getGenerationName = (generationId: string): string | null => {
    const generation = generations.find(gen => gen.id === generationId);
    return generation ? generation.name : null;
  };

  const filteredControllers = controllers.filter(controller => {
    const matchesSearch = matchesSearchQuery(controller, searchQuery);
    
    // Fix generation filtering logic
    let matchesGeneration = true;
    if (selectedGeneration) {
      const selectedGenerationName = getGenerationName(selectedGeneration);
      matchesGeneration = selectedGenerationName === controller.generation;
    }
    
    return matchesSearch && matchesGeneration;
  });

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {t('controller_grid.title')}
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {filteredControllers.length} {filteredControllers.length === 1 ? t('controller_grid.controller_count') : t('controller_grid.controllers_count')}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredControllers.map((controller, index) => (
          <motion.div
            key={controller.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            whileHover={{ y: -5 }}
            className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <img
                  src={getMainImageUrl(controller)}
                  alt={getMainImageAlt(controller)}
                  className="w-full h-32 object-cover rounded-2xl"
                />
              </div>
              
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {controller.name}
                </h4>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Building className="h-4 w-4" />
                    <span>{controller.manufacturer}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>{controller.releaseYear}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Gamepad2 className="h-4 w-4" />
                    <span>{controller.generation} generacja</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    {controller.wireless ? <Wifi className="h-4 w-4 text-green-600" /> : <WifiOff className="h-4 w-4 text-gray-400" />}
                    <span>{controller.wireless ? t('common.wireless') : t('common.wired')}</span>
                  </div>
                </div>
              </div>
              
              <Link
                to={`/controller/${controller.slug}`}
                className="inline-flex items-center justify-center space-x-2 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl transition-colors"
              >
                <span>{t('controller_grid.details')}</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredControllers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {t('controller_grid.no_results')}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ControllerGrid;