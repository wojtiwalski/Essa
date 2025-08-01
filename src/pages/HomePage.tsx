import React, { useState } from 'react';
import { useEffect } from 'react';
import Navigation from '../components/Navigation';
import CategoryBar from '../components/CategoryBar';
import GenerationFilter from '../components/GenerationFilter';
import RandomController from '../components/RandomController';
import ControllerGrid from '../components/ControllerGrid';
import { loadAllControllers, Controller } from '../utils/dataLoader';
import { matchesSearchQuery } from '../utils/searchAliases';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGeneration, setSelectedGeneration] = useState<string | null>(null);
  const [controllers, setControllers] = useState<Controller[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchControllers = async () => {
      try {
        const data = await loadAllControllers();
        setControllers(data);
      } catch (error) {
        console.error('Error loading controllers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchControllers();
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation onSearch={setSearchQuery} />
      <CategoryBar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <GenerationFilter
          selectedGeneration={selectedGeneration}
          onGenerationSelect={setSelectedGeneration}
        />
        
        <RandomController />
        
        {loading ? (
          <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-200 dark:bg-gray-700 h-64 rounded-2xl"></div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <ControllerGrid
            controllers={controllers}
            searchQuery={searchQuery}
            selectedGeneration={selectedGeneration}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;