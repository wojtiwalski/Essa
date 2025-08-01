import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Moon, Sun, Gamepad2, Globe, ChevronDown, Building, Clock, BarChart3, Newspaper, Info, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { loadAllManufacturers, Manufacturer } from '../utils/dataLoader';
import { matchesSearchQuery } from '../utils/searchAliases';

interface NavigationProps {
  onSearch?: (query: string) => void;
}

const quickLinks = [
  { name: 'Oś czasu', icon: Clock, path: '/timeline', color: 'text-blue-600 dark:text-blue-400' },
  { name: 'Porównywarka', icon: BarChart3, path: '/compare', color: 'text-purple-600 dark:text-purple-400' },
  { name: 'Aktualności', icon: Newspaper, path: '/news', color: 'text-green-600 dark:text-green-400' },
  { name: 'O Padpedii', icon: Info, path: '/about', color: 'text-gray-600 dark:text-gray-400' },
  { name: 'Zgłoś pad', icon: Plus, path: '/submit', color: 'text-yellow-600 dark:text-yellow-400' },
];

const Navigation: React.FC<NavigationProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('PL');
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [manufacturerDropdownOpen, setManufacturerDropdownOpen] = useState(false);
  const [manufacturerSearch, setManufacturerSearch] = useState('');
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  
  const manufacturerDropdownRef = useRef<HTMLDivElement>(null);
  const quickLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const data = await loadAllManufacturers();
        setManufacturers(data.filter(m => m.isActive)); // Only show active manufacturers
      } catch (error) {
        console.error('Error loading manufacturers:', error);
      }
    };

    fetchManufacturers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (manufacturerDropdownRef.current && !manufacturerDropdownRef.current.contains(event.target as Node)) {
        setManufacturerDropdownOpen(false);
        setManufacturerSearch('');
      }
      if (quickLinksRef.current && !quickLinksRef.current.contains(event.target as Node)) {
        setQuickLinksOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  const filteredManufacturers = manufacturers.filter(manufacturer =>
    manufacturer.name.toLowerCase().includes(manufacturerSearch.toLowerCase())
  );

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Gamepad2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Padpedia
            </span>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Manufacturers Dropdown */}
            <div className="relative" ref={manufacturerDropdownRef}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setManufacturerDropdownOpen(!manufacturerDropdownOpen);
                  setManufacturerSearch('');
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-2xl text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Building className="h-4 w-4" />
                <span className="font-medium">Producenci</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${manufacturerDropdownOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {manufacturerDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    {/* Search in dropdown */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="text"
                          value={manufacturerSearch}
                          onChange={(e) => setManufacturerSearch(e.target.value)}
                          placeholder="Szukaj producenta..."
                          className="w-full pl-9 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>

                    {/* Manufacturers list */}
                    <div className="max-h-64 overflow-y-auto">
                      {filteredManufacturers.map((manufacturer) => (
                        <Link
                          key={manufacturer.slug}
                          to={`/manufacturer/${manufacturer.slug}`}
                          onClick={() => {
                            setManufacturerDropdownOpen(false);
                            setManufacturerSearch('');
                          }}
                          className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <div className={`w-3 h-3 rounded-full ${manufacturer.color}`} />
                          <span className="text-gray-900 dark:text-white font-medium">
                            {manufacturer.name}
                          </span>
                        </Link>
                      ))}
                      {filteredManufacturers.length === 0 && (
                        <div className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm">
                          Brak wyników
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Links Dropdown */}
            <div className="relative" ref={quickLinksRef}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setQuickLinksOpen(!quickLinksOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-2xl text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <span className="font-medium">Menu</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${quickLinksOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {quickLinksOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    {quickLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setQuickLinksOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <link.icon className={`h-5 w-5 ${link.color}`} />
                        <span className="text-gray-900 dark:text-white font-medium">
                          {link.name}
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Szukaj kontrolera (np. DualShock II, Xbox 360)..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-200"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-3">
            {/* Language Switcher */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLanguage(language === 'PL' ? 'EN' : 'PL')}
              className="flex items-center space-x-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span>{language}</span>
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 bg-gray-100 dark:bg-gray-700 rounded-2xl text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden pb-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setManufacturerDropdownOpen(!manufacturerDropdownOpen)}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-300"
            >
              <Building className="h-4 w-4" />
              <span>Producenci</span>
            </button>
            {quickLinks.slice(0, 3).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-300"
              >
                <link.icon className="h-4 w-4" />
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;