import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Calendar, Building, ExternalLink, Tag, Users, History, 
  Lightbulb, Cpu, Gamepad2, Wifi, WifiOff, Battery, Weight, Ruler,
  Palette, Globe, Award, AlertTriangle, Info, BookOpen, Camera
} from 'lucide-react';
import Navigation from '../components/Navigation';
import { loadController, Controller } from '../utils/dataLoader';
import { loadTutorialsByControllerId, Tutorial } from '../utils/dataLoader';
import ImageGallery from '../components/ImageGallery';
import TutorialSection from '../components/TutorialSection';
import VariantsSection from '../components/VariantsSection';
import GallerySection from '../components/GallerySection';

const ControllerPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [controller, setController] = useState<Controller | null>(null);
  const [loading, setLoading] = useState(true);
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchController = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        const data = await loadController(slug);
        setController(data);
        
        if (data) {
          const tutorialsData = await loadTutorialsByControllerId(data.id);
          setTutorials(tutorialsData);
        }
      } catch (error) {
        console.error('Error loading controller:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchController();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!controller) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Kontroler nie został znaleziony
            </h1>
            <Link to="/" className="text-blue-600 hover:text-blue-700 transition-colors">
              Powrót do strony głównej
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Przegląd', icon: Info },
    { id: 'specs', name: 'Specyfikacja', icon: Cpu },
    { id: 'history', name: 'Historia', icon: History },
    { id: 'variants', name: 'Warianty', icon: Palette },
    { id: 'tutorials', name: 'Tutorials', icon: BookOpen },
    { id: 'gallery', name: 'Galeria', icon: Camera },
  ];

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
            <span>Powrót do listy</span>
          </Link>

          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                {controller.images && controller.images.length > 0 ? (
                  <ImageGallery images={controller.images} />
                ) : (
                  <motion.img
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    src={controller.image}
                    alt={controller.name}
                    className="w-full h-64 object-cover rounded-2xl shadow-lg"
                  />
                )}
              </div>
              <div>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
                >
                  {controller.name}
                </motion.h1>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                    <Building className="h-5 w-5" />
                    <span className="font-medium">Producent:</span>
                    <span>{controller.manufacturer}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                    <Calendar className="h-5 w-5" />
                    <span className="font-medium">Rok premiery:</span>
                    <span>{controller.releaseYear}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                    <Gamepad2 className="h-5 w-5" />
                    <span className="font-medium">Generacja:</span>
                    <span>{controller.generation}</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      {controller.wireless ? <Wifi className="h-4 w-4 text-green-600" /> : <WifiOff className="h-4 w-4 text-gray-400" />}
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Połączenie</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {controller.wireless && controller.wired ? 'Bezprzewodowy/Przewodowy' : 
                       controller.wireless ? 'Bezprzewodowy' : 'Przewodowy'}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Weight className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Waga</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{controller.weightGrams}g</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {controller.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-2xl"
                    >
                      <Tag className="h-3 w-3" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-8">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Opis</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {controller.descriptionLong}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Kluczowe funkcje</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Sterowanie</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• {controller.analogSticks} analogi</li>
                          <li>• {controller.buttonsTotal} przycisków</li>
                          <li>• {controller.dpadType}</li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Funkcje specjalne</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          {controller.vibrationFeedback && <li>• Wibracje</li>}
                          {controller.touchpad && <li>• Touchpad</li>}
                          {controller.motionSensors.length > 0 && <li>• Czujniki ruchu</li>}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {controller.notableGames.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Znane gry</h3>
                      <div className="flex flex-wrap gap-2">
                        {controller.notableGames.map((game) => (
                          <span
                            key={game}
                            className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm rounded-xl"
                          >
                            {game}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Specs Tab */}
              {activeTab === 'specs' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Dane techniczne</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Interfejs:</span>
                          <span className="text-gray-900 dark:text-white">{controller.interface}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Bateria:</span>
                          <span className="text-gray-900 dark:text-white">{controller.batteryType}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Czas pracy:</span>
                          <span className="text-gray-900 dark:text-white">{controller.estimatedBatteryLifeHours}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Wymiary:</span>
                          <span className="text-gray-900 dark:text-white">
                            {controller.dimensions_mm.width} × {controller.dimensions_mm.height} × {controller.dimensions_mm.depth} mm
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Przyciski i sterowanie</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Przyciski główne</h4>
                          <div className="flex flex-wrap gap-2">
                            {controller.faceButtons.map((button) => (
                              <span key={button} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded">
                                {button}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Triggery</h4>
                          <div className="flex flex-wrap gap-2">
                            {controller.triggers.map((trigger) => (
                              <span key={trigger} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs rounded">
                                {trigger}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Funkcje analogów</h4>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {controller.stickFeatures.map((feature, index) => (
                              <li key={index}>• {feature}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Platformy</h3>
                    <div className="flex flex-wrap gap-2">
                      {controller.platforms.map((platform) => (
                        <span
                          key={platform}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-sm rounded-xl"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* History Tab */}
              {activeTab === 'history' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white mb-4">
                      <History className="h-6 w-6" />
                      <span>Historia rozwoju</span>
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {controller.history}
                    </p>
                  </div>

                  <div>
                    <h3 className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white mb-4">
                      <Users className="h-6 w-6" />
                      <span>Projektanci</span>
                    </h3>
                    <ul className="space-y-2">
                      {controller.designers.map((designer) => (
                        <li key={designer} className="text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                          <span>{designer}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Notatki projektowe</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {controller.designNotes}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Odbiór i dziedzictwo</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Odbiór</h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          {controller.reception}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Dziedzictwo</h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          {controller.legacy}
                        </p>
                      </div>
                    </div>
                  </div>

                  {controller.technicalChallenges.length > 0 && (
                    <div>
                      <h3 className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white mb-4">
                        <AlertTriangle className="h-6 w-6 text-yellow-600" />
                        <span>Wyzwania techniczne</span>
                      </h3>
                      <ul className="space-y-2">
                        {controller.technicalChallenges.map((challenge, index) => (
                          <li key={index} className="text-gray-700 dark:text-gray-300 flex items-start space-x-2">
                            <span className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Variants Tab */}
              {activeTab === 'variants' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Warianty</h3>
                    <div className="space-y-3">
                      {controller.variants.map((variant, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                          <p className="text-gray-700 dark:text-gray-300">{variant}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Opcje kolorystyczne</h3>
                    <div className="space-y-3">
                      {controller.colorOptions.map((colorOption, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                          <p className="text-gray-700 dark:text-gray-300">{colorOption}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Numery modeli</h3>
                    <div className="flex flex-wrap gap-2">
                      {controller.modelNumbers.map((model) => (
                        <span
                          key={model}
                          className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-sm rounded-xl font-mono"
                        >
                          {model}
                        </span>
                      ))}
                    </div>
                  </div>

                  {controller.regionDifferences.length > 0 && (
                    <div>
                      <h3 className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white mb-4">
                        <Globe className="h-6 w-6" />
                        <span>Różnice regionalne</span>
                      </h3>
                      <div className="space-y-3">
                        {controller.regionDifferences.map((difference, index) => (
                          <div key={index} className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                            <p className="text-blue-800 dark:text-blue-300">{difference}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          {/* External Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Linki zewnętrzne
            </h2>
            <div className="flex flex-wrap gap-4">
              {Object.entries(controller.externalLinks).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition-colors"
                >
                  <span className="capitalize">{key === 'supportPage' ? 'Wsparcie' : key === 'manual' ? 'Instrukcja' : key}</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ControllerPage;