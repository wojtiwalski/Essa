import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shuffle, ExternalLink } from 'lucide-react';
import { loadAllControllers, Controller } from '../utils/dataLoader';
import { getMainImageUrl, getMainImageAlt } from '../utils/imageHelpers';

const RandomController: React.FC = () => {
  const [randomController, setRandomController] = useState<Controller | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRandomController = async () => {
      try {
        setLoading(true);
        const controllers = await loadAllControllers();
        
        if (controllers.length > 0) {
          const randomIndex = Math.floor(Math.random() * controllers.length);
          setRandomController(controllers[randomIndex]);
        }
      } catch (error) {
        console.error('Error loading random controller:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRandomController();
  }, []);

  if (loading) {
    return (
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold flex items-center space-x-2">
            <Shuffle className="h-6 w-6" />
            <span>Losowy pad dnia</span>
          </h3>
        </div>
        
        <div className="animate-pulse">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-white/20 rounded-2xl"></div>
            <div className="flex-1">
              <div className="h-8 bg-white/20 rounded mb-2"></div>
              <div className="h-4 bg-white/20 rounded mb-1"></div>
              <div className="h-4 bg-white/20 rounded mb-4"></div>
              <div className="h-8 bg-white/20 rounded w-32"></div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!randomController) {
    return null;
  }

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white mb-8"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold flex items-center space-x-2">
          <Shuffle className="h-6 w-6" />
          <span>Losowy pad dnia</span>
        </h3>
      </div>
      
      <div className="flex items-center space-x-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex-shrink-0"
        >
          <img
            src={getMainImageUrl(randomController)}
            alt={getMainImageAlt(randomController)}
            className="w-24 h-24 object-cover rounded-2xl shadow-lg"
          />
        </motion.div>
        
        <div className="flex-1">
          <h4 className="text-2xl font-bold mb-2">{randomController.name}</h4>
          <p className="text-blue-100 mb-1">
            <span className="font-medium">Producent:</span> {randomController.manufacturer}
          </p>
          <p className="text-blue-100 mb-4">
            <span className="font-medium">Rok premiery:</span> {randomController.releaseYear}
          </p>
          
          <Link
            to={`/controller/${randomController.slug}`}
            className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-2xl transition-colors"
          >
            <span>Zobacz szczegóły</span>
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default RandomController;