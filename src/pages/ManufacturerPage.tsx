import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Calendar, ExternalLink } from 'lucide-react';
import Navigation from '../components/Navigation';
import GenerationFilter from '../components/GenerationFilter';
import { loadAllControllers, loadManufacturer, loadAllGenerations } from '../utils/dataLoader';

interface Controller {
  id: string;
  name: string;
  slug: string;
  manufacturer: string;
  releaseYear: number;
  generation: string;
  image: string;
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

const ManufacturerPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGeneration, setSelectedGeneration] = useState<string | null>(null);
  const [manufacturer, setManufacturer] = useState<any>(null);
  const [controllers, setControllers] = useState<Controller[]>([]);
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!name) return;
      
      try {
        setLoading(true);
        
        // Load manufacturer data
        const manufacturerData = await loadManufacturer(name);
        if (!manufacturerData) {
          setError('Producent nie został znaleziony');
          setLoading(false);
          return;
        }
        
        setManufacturer(manufacturerData);
        
        // Load all controllers and filter by manufacturer
        const allControllers = await loadAllControllers();
        const manufacturerControllers = allControllers
          .filter(controller => controller.manufacturer.toLowerCase() === manufacturerData.name.toLowerCase())
          .map(controller => ({
            id: controller.id,
            name: controller.name,
            slug: controller.slug,
            manufacturer: controller.manufacturer,
            releaseYear: controller.releaseYear,
            generation: controller.generation,
            image: controller.image
          }));
        
        setControllers(manufacturerControllers);

        // Load generations for filtering
        const generationsData = await loadAllGenerations();
        setGenerations(generationsData);
      } catch (err) {
        setError('Wystąpił błąd podczas ładowania danych');
        console.error('Error loading manufacturer data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [name]);

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

  if (error || !manufacturer) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {error || 'Producent nie został znaleziony'}
            </h1>
            <Link to="/" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
              Powrót do strony głównej
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const filteredControllers = controllers.filter(controller => {
    const matchesSearch = controller.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Fix generation filtering logic
    let matchesGeneration = true;
    if (selectedGeneration) {
      // Map the selected generation ID to generation name
      const selectedGenerationName = getGenerationName(selectedGeneration);
      matchesGeneration = selectedGenerationName === controller.generation;
    }
    
    return matchesSearch && matchesGeneration;
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
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
              {manufacturer.name}
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
              {manufacturer.description}
            </p>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <Calendar className="h-5 w-5" />
              <span>Założona w {manufacturer.founded} roku</span>
            </div>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Kontrolery {manufacturer.name}
              </h2>
              
              {/* Local Search */}
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Szukaj w kontrolerach..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <GenerationFilter
              selectedGeneration={selectedGeneration}
              onGenerationSelect={setSelectedGeneration}
            />
          </motion.div>

          {/* Controllers Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredControllers.map((controller, index) => (
              <motion.div
                key={controller.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <img
                      src={controller.image}
                      alt={controller.name}
                      className="w-full h-32 object-cover rounded-2xl"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {controller.name}
                    </h3>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <Calendar className="h-4 w-4" />
                      <span>{controller.releaseYear}</span>
                      <span className="text-gray-400">•</span>
                      <span>{controller.generation}</span>
                    </div>
                  </div>
                  
                  <Link
                    to={`/controller/${controller.slug}`}
                    className="inline-flex items-center justify-center space-x-2 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl transition-colors"
                  >
                    <span>Szczegóły</span>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredControllers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Brak kontrolerów spełniających kryteria wyszukiwania
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ManufacturerPage;