import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, X, CheckCircle, XCircle } from 'lucide-react';
import Navigation from '../components/Navigation';
import { loadAllControllers, Controller as DataController } from '../utils/dataLoader';

interface Controller {
  id: string;
  name: string;
  manufacturer: string;
  year: number;
  specs: {
    buttons: number;
    analogSticks: number;
    triggers: number;
    connection: string;
    battery: string;
    weight: string;
    dimensions: string;
    platforms: string[];
    features: string[];
  };
  image: string;
}

const ComparePage: React.FC = () => {
  const [selectedControllers, setSelectedControllers] = useState<Controller[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [availableControllers, setAvailableControllers] = useState<Controller[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadControllers = async () => {
      try {
        setLoading(true);
        const controllersData = await loadAllControllers();
        
        // Transform controllers data to comparison format
        const transformedControllers: Controller[] = controllersData.map(controller => ({
          id: controller.id,
          name: controller.name,
          manufacturer: controller.manufacturer,
          year: controller.releaseYear,
          image: controller.image,
          specs: {
            buttons: controller.buttonsTotal,
            analogSticks: controller.analogSticks,
            triggers: controller.triggers.length,
            connection: controller.interface,
            battery: controller.batteryType === 'None (wired power)' ? 'N/A' : `${controller.batteryCapacity_mAh} mAh`,
            weight: `${controller.weightGrams}g`,
            dimensions: `${controller.dimensions_mm.width} × ${controller.dimensions_mm.height} × ${controller.dimensions_mm.depth} mm`,
            platforms: controller.platforms,
            features: [
              ...(controller.wireless ? ['Wireless'] : ['Wired']),
              ...(controller.vibrationFeedback ? ['Vibration'] : []),
              ...(controller.motionSensors.length > 0 ? ['Motion Control'] : []),
              ...(controller.touchpad ? ['Touchpad'] : []),
              ...(controller.lightFeatures.length > 0 ? ['Light Features'] : []),
              ...(controller.audioOutput !== 'None' ? ['Audio Output'] : []),
              ...(controller.audioInput !== 'None' ? ['Audio Input'] : [])
            ]
          }
        }));
        
        setAvailableControllers(transformedControllers);
      } catch (error) {
        console.error('Error loading controllers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadControllers();
  }, []);

  const filteredControllers = availableControllers.filter(controller =>
    !selectedControllers.find(selected => selected.id === controller.id) &&
    controller.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addController = (controller: Controller) => {
    if (selectedControllers.length < 3) {
      setSelectedControllers([...selectedControllers, controller]);
      setSearchQuery('');
    }
  };

  const removeController = (controllerId: string) => {
    setSelectedControllers(selectedControllers.filter(c => c.id !== controllerId));
  };

  const comparisonRows = [
    { key: 'name', label: 'Nazwa', type: 'text' },
    { key: 'manufacturer', label: 'Producent', type: 'text' },
    { key: 'year', label: 'Rok', type: 'number' },
    { key: 'buttons', label: 'Przyciski', type: 'number', path: 'specs.buttons' },
    { key: 'analogSticks', label: 'Analogi', type: 'number', path: 'specs.analogSticks' },
    { key: 'triggers', label: 'Triggery', type: 'number', path: 'specs.triggers' },
    { key: 'connection', label: 'Połączenie', type: 'text', path: 'specs.connection' },
    { key: 'battery', label: 'Bateria', type: 'text', path: 'specs.battery' },
    { key: 'weight', label: 'Waga', type: 'text', path: 'specs.weight' },
    { key: 'dimensions', label: 'Wymiary', type: 'text', path: 'specs.dimensions' },
    { key: 'platforms', label: 'Platformy', type: 'array', path: 'specs.platforms' },
    { key: 'features', label: 'Funkcje', type: 'array', path: 'specs.features' },
  ];

  const getValue = (controller: Controller, path: string) => {
    const keys = path.split('.');
    let value: any = controller;
    for (const key of keys) {
      value = value?.[key];
    }
    return value;
  };

  const getComparisonStatus = (values: any[], type: string) => {
    if (type === 'number') {
      const numValues = values.map(v => typeof v === 'number' ? v : parseInt(v) || 0);
      const max = Math.max(...numValues);
      const min = Math.min(...numValues);
      return numValues.map(v => v === max ? 'best' : v === min ? 'worst' : 'neutral');
    }
    return values.map(() => 'neutral');
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Powrót do strony głównej</span>
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Porównywarka kontrolerów
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              Porównaj specyfikacje i funkcje kontrolerów obok siebie
            </p>
          </motion.div>

          {/* Controller Selection */}
          {selectedControllers.length < 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Dodaj kontroler do porównania
              </h2>
              
              <div className="mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Szukaj kontrolera..."
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {loading ? (
                  <p className="text-center py-8">Ładowanie kontrolerów...</p>
                ) : filteredControllers.length === 0 ? (
                  <p className="text-center py-8">Brak dostępnych kontrolerów.</p>
                ) : (
                  filteredControllers.map((controller) => (
                    <motion.button
                      key={controller.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addController(controller)}
                      className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-left"
                    >
                      <img
                        src={controller.image}
                        alt={controller.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {controller.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {controller.manufacturer} ({controller.year})
                        </p>
                      </div>
                      <Plus className="h-5 w-5 text-blue-600 dark:text-blue-400 ml-auto" />
                    </motion.button>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {/* Comparison Table */}
          {selectedControllers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left p-6 bg-gray-50 dark:bg-gray-700 font-medium text-gray-900 dark:text-white">
                        Parametr
                      </th>
                      {selectedControllers.map((controller) => (
                        <th
                          key={controller.id}
                          className="text-center p-6 bg-gray-50 dark:bg-gray-700 min-w-64"
                        >
                          <div className="flex flex-col items-center space-y-2">
                            <button
                              onClick={() => removeController(controller.id)}
                              className="self-end text-red-500 hover:text-red-700 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                            <img
                              src={controller.image}
                              alt={controller.name}
                              className="w-16 h-16 object-cover rounded-2xl"
                            />
                            <div>
                              <h3 className="font-bold text-gray-900 dark:text-white">
                                {controller.name}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {controller.manufacturer}
                              </p>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => {
                      const values = selectedControllers.map((controller) =>
                        row.path ? getValue(controller, row.path) : (controller as any)[row.key]
                      );
                      const statuses = getComparisonStatus(values, row.type);

                      return (
                        <tr
                          key={row.key}
                          className="border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                        >
                          <td className="p-6 font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700">
                            {row.label}
                          </td>
                          {values.map((value, index) => (
                            <td
                              key={index}
                              className={`p-6 text-center ${
                                statuses[index] === 'best'
                                  ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                                  : statuses[index] === 'worst'
                                  ? 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300'
                                  : 'text-gray-900 dark:text-white'
                              }`}
                            >
                              <div className="flex items-center justify-center space-x-2">
                                {statuses[index] === 'best' && (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                )}
                                {statuses[index] === 'worst' && (
                                  <XCircle className="h-4 w-4 text-red-600" />
                                )}
                                <span>
                                  {Array.isArray(value) ? value.join(', ') : value?.toString() || 'N/A'}
                                </span>
                              </div>
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {selectedControllers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Wybierz kontrolery, aby rozpocząć porównanie
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ComparePage;