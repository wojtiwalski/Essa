@@ .. @@
 import { Search, Moon, Sun, Gamepad2, Globe } from 'lucide-react';
 import { motion } from 'framer-motion';
 import { useTheme } from '../contexts/ThemeContext';
+import { useLanguage } from '../contexts/LanguageContext';

 interface HeaderProps {
 }
@@ .. @@
 const Header: React.FC<HeaderProps> = ({ onSearch }) => {
   const [searchQuery, setSearchQuery] = useState('');
 }
-  const [language, setLanguage] = useState('PL');
   const { isDark, toggleTheme } = useTheme();
+  const { language, setLanguage, t } = useLanguage();

   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   }
@@ .. @@
             <input
               type="text"
               value={searchQuery}
               onChange={handleSearchChange}
-              placeholder="Szukaj kontrolera..."
+              placeholder={t('navigation.search_placeholder')}
               className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-200"
             />
           </div>
@@ -45,7 +46,7 @@ const Header: React.FC<HeaderProps> = ({ onSearch }) => {
             <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
}
-              onClick={() => setLanguage(language === 'PL' ? 'EN' : 'PL')}
+              onClick={() => setLanguage(language === 'pl' ? 'en' : 'pl')}
               className="flex items-center space-x-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
             >
               <Globe className="h-4 w-4" />
-              <span>{language}</span>
+              <span>{language.toUpperCase()}</span>
             </motion.button>