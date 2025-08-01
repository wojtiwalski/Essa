import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Package } from 'lucide-react';
import { ControllerVariant } from '../utils/dataLoader';

interface VariantsSectionProps {
  variants?: ControllerVariant[];
  colorOptions: string[];
  modelNumbers: string[];
  regionDifferences: string[];
}

const VariantsSection: React.FC<VariantsSectionProps> = ({
  variants,
  colorOptions,
  modelNumbers,
  regionDifferences
}) => {
  return (
    <div className="space-y-8">
      {/* Enhanced Variants with Images */}
      {variants && variants.length > 0 && (
        <div>
          <h3 className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white mb-6">
            <Palette className="h-6 w-6" />
            <span>Warianty kolorystyczne</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {variants.map((variant, index) => (
              <motion.div
                key={variant.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-square mb-4">
                  <img
                    src={variant.image}
                    alt={variant.name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                    {variant.name}
                  </h4>
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <div 
                      className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                      style={{ 
                        backgroundColor: variant.color.toLowerCase() === 'black' ? '#000000' :
                                        variant.color.toLowerCase() === 'white' ? '#ffffff' :
                                        variant.color.toLowerCase() === 'red' ? '#dc2626' :
                                        variant.color.toLowerCase() === 'blue' ? '#2563eb' :
                                        variant.color.toLowerCase() === 'green' ? '#16a34a' :
                                        variant.color.toLowerCase() === 'purple' ? '#9333ea' :
                                        variant.color.toLowerCase() === 'orange' ? '#ea580c' :
                                        '#6b7280'
                      }}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {variant.color}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {variant.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Traditional Color Options */}
      {(!variants || variants.length === 0) && colorOptions.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Opcje kolorystyczne</h3>
          <div className="space-y-3">
            {colorOptions.map((colorOption, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <p className="text-gray-700 dark:text-gray-300">{colorOption}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Model Numbers */}
      <div>
        <h3 className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white mb-4">
          <Package className="h-6 w-6" />
          <span>Numery modeli</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {modelNumbers.map((model) => (
            <span
              key={model}
              className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-sm rounded-xl font-mono"
            >
              {model}
            </span>
          ))}
        </div>
      </div>

      {/* Regional Differences */}
      {regionDifferences.length > 0 && (
        <div>
          <h3 className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="text-2xl">🌍</span>
            <span>Różnice regionalne</span>
          </h3>
          <div className="space-y-3">
            {regionDifferences.map((difference, index) => (
              <div key={index} className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                <p className="text-blue-800 dark:text-blue-300">{difference}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VariantsSection;