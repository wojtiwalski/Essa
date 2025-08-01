import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, Database, Code, Users, Github, Mail, Heart, ExternalLink } from 'lucide-react';
import Navigation from '../components/Navigation';

const technologies = [
  {
    name: 'React',
    description: 'Biblioteka do budowy interfejsów użytkownika',
    icon: '⚛️',
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
  },
  {
    name: 'TypeScript',
    description: 'Typowany JavaScript dla lepszej jakości kodu',
    icon: '📘',
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
  },
  {
    name: 'Tailwind CSS',
    description: 'Framework CSS do szybkiego stylowania',
    icon: '🎨',
    color: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300',
  },
  {
    name: 'Framer Motion',
    description: 'Biblioteka do animacji i przejść',
    icon: '✨',
    color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
  },
  {
    name: 'Vite',
    description: 'Szybki bundler i dev server',
    icon: '⚡',
    color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
  },
  {
    name: 'Supabase',
    description: 'Backend-as-a-Service dla bazy danych',
    icon: '🗄️',
    color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
  },
];

const features = [
  {
    icon: Database,
    title: 'Kompleksowa baza danych',
    description: 'Szczegółowe informacje o kontrolerach z całej historii gier - od Atari 2600 po najnowsze pady PlayStation 5 i Xbox Series.',
  },
  {
    icon: Code,
    title: 'Dane techniczne',
    description: 'Specyfikacje techniczne, wymiary, waga, rodzaj połączenia, kompatybilność z platformami i wszystkie istotne parametry.',
  },
  {
    icon: Users,
    title: 'Historia i projektanci',
    description: 'Informacje o procesie projektowania, twórcach, ciekawostki historyczne i wpływ na branży gier.',
  },
  {
    icon: Target,
    title: 'Porównywarka',
    description: 'Zaawansowane narzędzie do porównywania kontrolerów pod kątem specyfikacji, funkcji i kompatybilności.',
  },
];

const AboutPage: React.FC = () => {
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
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-8"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                O Padpedii
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Największa encyklopedia kontrolerów do gier w Polsce
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Czym jest Padpedia?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Padpedia to kompleksowa encyklopedia kontrolerów do gier, która gromadzi 
                  szczegółowe informacje o wszystkich padach w historii gier wideo. Od kultowych 
                  joysticków z lat 70. po najnowocześniejsze kontrolery obecnej generacji.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Naszym celem jest stworzenie najpełniejszego źródła wiedzy o kontrolerach, 
                  które będzie przydatne zarówno dla kolekcjonerów, historyków gier, 
                  jak i zwykłych graczy szukających informacji o swoich ulubionych padach.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-6xl">
                  🎮
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Nasza misja
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Technologie
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Padpedia została zbudowana z wykorzystaniem nowoczesnych technologii webowych, 
              zapewniających szybkość, responsywność i doskonałe doświadczenie użytkownika.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  className={`p-4 rounded-2xl ${tech.color}`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{tech.icon}</span>
                    <h3 className="font-semibold">{tech.name}</h3>
                  </div>
                  <p className="text-sm opacity-80">{tech.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Zespół i kontakt
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  O twórcach
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Padpedia została stworzona przez zespół pasjonatów gier i technologii, 
                  którzy chcieli podzielić się swoją wiedzą o kontrolerach z całą społecznością graczy.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Jesteśmy otwarci na współpracę, sugestie i wszelkie uwagi, które pomogą 
                  nam rozwijać projekt i czynić go jeszcze lepszym źródłem informacji.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Skontaktuj się z nami
                </h3>
                <div className="space-y-3">
                  <a
                    href="https://github.com/padpedia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Github className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-900 dark:text-white">GitHub Repository</span>
                    <ExternalLink className="h-4 w-4 text-gray-500 ml-auto" />
                  </a>
                  <a
                    href="mailto:kontakt@padpedia.pl"
                    className="flex items-center space-x-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-900 dark:text-white">kontakt@padpedia.pl</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
          >
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Heart className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">
                Wspieraj rozwój Padpedii
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Padpedia to projekt non-profit tworzony w wolnym czasie. Jeśli podoba Ci się 
                nasza praca i chcesz wesprzeć rozwój encyklopedii, będziemy bardzo wdzięczni 
                za każdą formę pomocy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-2xl transition-colors">
                  ☕ Postaw nam kawę
                </button>
                <button className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-2xl transition-colors">
                  💡 Zaproponuj ulepszenie
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;