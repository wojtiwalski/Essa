import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Gamepad2, Building, Calendar, Cpu, Wifi, WifiOff, Vibrate, CheckCircle, Send } from 'lucide-react';
import Navigation from '../components/Navigation';

interface ControllerSubmission {
  // Basic Info
  name: string;
  manufacturer: string;
  year: string;
  
  // Technical Specs
  platforms: string[];
  interface: string;
  buttons: string;
  analogSticks: string;
  triggers: string;
  
  // Text Fields
  description: string;
  history: string;
  trivia: string;
  
  // Features
  features: {
    wireless: boolean;
    wired: boolean;
    vibration: boolean;
    motionControl: boolean;
    touchpad: boolean;
    speaker: boolean;
    lightBar: boolean;
    rechargeable: boolean;
  };
  
  // Contact
  submitterName: string;
  submitterEmail: string;
}

const SubmitPage: React.FC = () => {
  const [formData, setFormData] = useState<ControllerSubmission>({
    name: '',
    manufacturer: '',
    year: '',
    platforms: [],
    interface: '',
    buttons: '',
    analogSticks: '',
    triggers: '',
    description: '',
    history: '',
    trivia: '',
    features: {
      wireless: false,
      wired: false,
      vibration: false,
      motionControl: false,
      touchpad: false,
      speaker: false,
      lightBar: false,
      rechargeable: false,
    },
    submitterName: '',
    submitterEmail: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const platformOptions = [
    'PlayStation', 'PlayStation 2', 'PlayStation 3', 'PlayStation 4', 'PlayStation 5',
    'Xbox', 'Xbox 360', 'Xbox One', 'Xbox Series X/S',
    'Nintendo Switch', 'Nintendo Wii', 'Nintendo Wii U', 'Nintendo GameCube',
    'PC', 'Mac', 'Mobile', 'Retro Consoles'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlatformChange = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const handleFeatureChange = (feature: keyof typeof formData.features) => {
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: !prev.features[feature]
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const isFormValid = formData.name && formData.manufacturer && formData.year && 
                     formData.description && formData.submitterName && formData.submitterEmail;

  if (isSubmitted) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="max-w-2xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Dziękujemy za zgłoszenie!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
              Twoje zgłoszenie kontrolera zostało przesłane do moderacji. 
              Sprawdzimy wszystkie informacje i dodamy kontroler do bazy Padpedii.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 mb-8">
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                Co dzieje się dalej?
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1 text-left">
                <li>• Moderatorzy sprawdzą przesłane informacje</li>
                <li>• W razie potrzeby skontaktujemy się z Tobą</li>
                <li>• Po zatwierdzeniu kontroler pojawi się w bazie</li>
                <li>• Otrzymasz powiadomienie o publikacji</li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition-colors"
              >
                Wróć na stronę główną
              </Link>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '', manufacturer: '', year: '', platforms: [], interface: '',
                    buttons: '', analogSticks: '', triggers: '', description: '', history: '',
                    trivia: '', features: { wireless: false, wired: false, vibration: false,
                    motionControl: false, touchpad: false, speaker: false, lightBar: false,
                    rechargeable: false }, submitterName: '', submitterEmail: ''
                  });
                }}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-2xl transition-colors"
              >
                Zgłoś kolejny kontroler
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
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
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Gamepad2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Zgłoś nowy kontroler
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Pomóż nam rozbudować bazę Padpedii! Zgłoś kontroler, którego nie ma w naszej encyklopedii.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                <Building className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <span>Podstawowe informacje</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nazwa kontrolera *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    placeholder="np. DualShock 4"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Producent *
                  </label>
                  <input
                    type="text"
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    placeholder="np. Sony"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Rok premiery *
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                    min="1970"
                    max="2030"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    placeholder="2013"
                  />
                </div>
              </div>
            </motion.div>

            {/* Technical Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                <Cpu className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <span>Specyfikacja techniczna</span>
              </h2>
              
              {/* Platforms */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Platformy
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {platformOptions.map((platform) => (
                    <label key={platform} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.platforms.includes(platform)}
                        onChange={() => handlePlatformChange(platform)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{platform}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Interfejs połączenia
                  </label>
                  <input
                    type="text"
                    name="interface"
                    value={formData.interface}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    placeholder="np. Bluetooth 4.0, USB"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Liczba przycisków
                  </label>
                  <input
                    type="text"
                    name="buttons"
                    value={formData.buttons}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    placeholder="np. 14"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Analogi
                  </label>
                  <input
                    type="text"
                    name="analogSticks"
                    value={formData.analogSticks}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    placeholder="np. 2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Triggery
                  </label>
                  <input
                    type="text"
                    name="triggers"
                    value={formData.triggers}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    placeholder="np. 2"
                  />
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Funkcje i możliwości
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(formData.features).map(([key, value]) => {
                  const featureLabels: Record<string, { label: string; icon: React.ReactNode }> = {
                    wireless: { label: 'Bezprzewodowy', icon: <Wifi className="h-4 w-4" /> },
                    wired: { label: 'Przewodowy', icon: <WifiOff className="h-4 w-4" /> },
                    vibration: { label: 'Wibracje', icon: <Vibrate className="h-4 w-4" /> },
                    motionControl: { label: 'Sterowanie ruchem', icon: <Gamepad2 className="h-4 w-4" /> },
                    touchpad: { label: 'Touchpad', icon: <Cpu className="h-4 w-4" /> },
                    speaker: { label: 'Głośnik', icon: <Cpu className="h-4 w-4" /> },
                    lightBar: { label: 'Pasek LED', icon: <Cpu className="h-4 w-4" /> },
                    rechargeable: { label: 'Akumulator', icon: <Cpu className="h-4 w-4" /> },
                  };
                  
                  return (
                    <label key={key} className="flex items-center space-x-3 cursor-pointer p-3 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => handleFeatureChange(key as keyof typeof formData.features)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex items-center space-x-2">
                        {featureLabels[key]?.icon}
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {featureLabels[key]?.label}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </motion.div>

            {/* Descriptions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Opisy i informacje
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Opis kontrolera *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white resize-none"
                    placeholder="Opisz kontroler, jego główne cechy i zastosowanie..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Historia i rozwój
                  </label>
                  <textarea
                    name="history"
                    value={formData.history}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white resize-none"
                    placeholder="Historia powstania, proces projektowania..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ciekawostki
                  </label>
                  <textarea
                    name="trivia"
                    value={formData.trivia}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white resize-none"
                    placeholder="Interesujące fakty, rekordy, anegdoty..."
                  />
                </div>
              </div>
            </motion.div>

            {/* Submitter Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Dane kontaktowe
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Twoje imię *
                  </label>
                  <input
                    type="text"
                    name="submitterName"
                    value={formData.submitterName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    placeholder="Imię lub pseudonim"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="submitterEmail"
                    value={formData.submitterEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    placeholder="twoj@email.com"
                  />
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                Twoje dane będą używane wyłącznie do kontaktu w sprawie zgłoszenia.
              </p>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <motion.button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                whileHover={{ scale: isFormValid ? 1.02 : 1 }}
                whileTap={{ scale: isFormValid ? 0.98 : 1 }}
                className={`inline-flex items-center space-x-2 px-8 py-4 rounded-2xl font-medium text-lg transition-all duration-200 ${
                  isFormValid && !isSubmitting
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Wysyłanie...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-6 w-6" />
                    <span>Zgłoś kontroler</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SubmitPage;