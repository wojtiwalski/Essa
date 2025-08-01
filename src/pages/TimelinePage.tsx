import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Filter, Calendar, Building, Wifi, WifiOff } from 'lucide-react';
import Navigation from '../components/Navigation';
import { loadAllControllers, loadAllManufacturers, loadAllGenerations } from '../utils/dataLoader';

interface TimelineController {
  id: string;
  name: string;
  manufacturer: string;
  year: number;
  slug: string;
  generation: string;
  wireless: boolean;
  image: string;
  description: string;
}

interface Manufacturer {
  id: string;
  name: string;
  slug: string;
  description: string;
  founded: number;
  country: string;
  website: string;
  logo: string;
  color: string;
  isActive: boolean;
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

const TimelinePage: React.FC = () => {
  const [selectedManufacturer, setSelectedManufacturer] = useState<string | null>(null);
  const [selectedGeneration, setSelectedGeneration] = useState<string | null>(null);
  const [selectedConnection, setSelectedConnection] = useState<string | null>(null);
  const [controllers, setControllers] = useState<TimelineController[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load all data
        const [controllersData, manufacturersData, generationsData] = await Promise.all([
          loadAllControllers(),
          loadAllManufacturers(),
          loadAllGenerations()
        ]);

        // Transform controllers data to timeline format
        const timelineControllers: TimelineController[] = controllersData.map(controller => ({
          id: controller.id,
          name: controller.name,
          manufacturer: controller.manufacturer,
          year: controller.releaseYear,
          slug: controller.slug,
          generation: controller.generation,
          wireless: controller.wireless,
          image: controller.image,
          description: controller.descriptionShort
        }));

        setControllers(timelineControllers);
        setManufacturers(manufacturersData);
        setGenerations(generationsData);
      } catch (err) {
        setError('Wystąpił błąd podczas ładowania danych');
        console.error('Error loading timeline data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Helper function to map generation name to ID
  const getGenerationId = (generationName: string): string | null => {
    const generation = generations.find(gen => gen.name === generationName);
    return generation ? generation.id : null;
  };

  // Helper function to map generation ID to name
  const getGenerationName = (generationId: string): string | null => {
    const generation = generations.find(gen => gen.id === generationId);
    return generation ? generation.name : null;
  };

  const connections = ['Wszystkie', 'Przewodowe', 'Bezprzewodowe'];

  const filteredControllers = controllers.filter(controller => {
    const matchesManufacturer = !selectedManufacturer || controller.manufacturer === selectedManufacturer;
    
    // Fix generation filtering logic
    let matchesGeneration = true;
    if (selectedGeneration) {
      const selectedGenerationName = getGenerationName(selectedGeneration);
      matchesGeneration = selectedGenerationName === controller.generation;
    }
    
    const matchesConnection = !selectedConnection || selectedConnection === 'Wszystkie' ||
      (selectedConnection === 'Przewodowe' && !controller.wireless) ||
      (selectedConnection === 'Bezprzewodowe' && controller.wireless);
    
    return matchesManufacturer && matchesGeneration && matchesConnection;
  });

  // Group controllers by decade
  const groupedByDecade = filteredControllers.reduce((acc, controller) => {
    const decade = Math.floor(controller.year / 10) * 10;
    if (!acc[decade]) {
      acc[decade] = [];
    }
    acc[decade].push(controller);
    return acc;
  }, {} as Record<number, TimelineController[]>);

  const decades = Object.keys(groupedByDecade).map(Number).sort();

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Ładowanie...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {error}
            </h1>
            <Link to="/" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
              Powrót do strony głównej
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
              Oś czasu kontrolerów
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Podróż przez historię kontrolerów do gier - od pierwszych joysticków po nowoczesne pady
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Filtry
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Manufacturer Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Producent
                </label>
                <select
                  value={selectedManufacturer || ''}
                  onChange={(e) => setSelectedManufacturer(e.target.value || null)}
                  className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                >
                  <option value="">Wszyscy producenci</option>
                  {manufacturers.map(manufacturer => (
                    <option key={manufacturer.id} value={manufacturer.name}>
                      {manufacturer.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Generation Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Generacja
                </label>
                <select
                  value={selectedGeneration || ''}
                  onChange={(e) => setSelectedGeneration(e.target.value || null)}
                  className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                >
                  <option value="">Wszystkie generacje</option>
                  {generations.map(gen => (
                    <option key={gen.id} value={gen.id}>
                      {gen.displayName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Connection Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Połączenie
                </label>
                <select
                  value={selectedConnection || 'Wszystkie'}
                  onChange={(e) => setSelectedConnection(e.target.value === 'Wszystkie' ? null : e.target.value)}
                  className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                >
                  {connections.map(connection => (
                    <option key={connection} value={connection}>
                      {connection}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="space-y-12">
            {decades.map((decade, decadeIndex) => (
              <motion.div
                key={decade}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + decadeIndex * 0.1 }}
                className="relative"
              >
                {/* Decade Header */}
                <div className="flex items-center mb-8">
                  <div className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold text-xl">
                    {decade}s
                  </div>
                  <div className="flex-1 h-1 bg-gradient-to-r from-blue-600 to-transparent ml-4 rounded-full"></div>
                </div>

                {/* Controllers in this decade */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-8">
                  {groupedByDecade[decade]
                    .sort((a, b) => a.year - b.year)
                    .map((controller, index) => (
                      <motion.div
                        key={controller.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + decadeIndex * 0.1 + index * 0.05 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="relative"
                      >
                        {/* Timeline connector */}
                        <div className="absolute -left-8 top-6 w-6 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
                        <div className="absolute -left-10 top-5 w-2 h-2 bg-blue-600 rounded-full"></div>

                        <Link
                          to={`/controller/${controller.slug}`}
                          className="block bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex items-start space-x-4">
                            <img
                              src={controller.image}
                              alt={controller.name}
                              className="w-16 h-16 object-cover rounded-2xl flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-2">
                                <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                  {controller.year}
                                </span>
                                {controller.wireless ? (
                                  <Wifi className="h-4 w-4 text-green-600 dark:text-green-400" />
                                ) : (
                                  <WifiOff className="h-4 w-4 text-gray-400" />
                                )}
                              </div>
                              <h3 className="font-bold text-gray-900 dark:text-white mb-1 truncate">
                                {controller.name}
                              </h3>
                              <div className="flex items-center space-x-2 mb-2">
                                <Building className="h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {controller.manufacturer}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                {controller.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredControllers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Brak kontrolerów spełniających wybrane kryteria
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TimelinePage;