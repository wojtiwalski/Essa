@@ .. @@
 import { Shuffle, ExternalLink } from 'lucide-react';
 import { motion } from 'framer-motion';
 import { controllers } from '../data/controllers';
+import { useLanguage } from '../contexts/LanguageContext';

 const RandomPadOfTheDay: React.FC = () => {
 }
+  const { t } = useLanguage();
   const [randomController, setRandomController] = useState(controllers[0]);
@@ .. @@
         <h3 className="text-xl font-bold flex items-center space-x-2">
           <Shuffle className="h-6 w-6" />
-          <span>Losowy pad dnia</span>
+          <span>{t('random_controller.title')}</span>
         </h3>
       </div>
@@ .. @@
           <h4 className="text-2xl font-bold mb-2">{randomController.name}</h4>
           <p className="text-blue-100 mb-1">
-            <span className="font-medium">Producent:</span> {randomController.manufacturer}
+            <span className="font-medium">{t('random_controller.manufacturer')}:</span> {randomController.manufacturer}
           </p>
           <p className="text-blue-100 mb-4">
-            <span className="font-medium">Rok premiery:</span> {randomController.year}
+            <span className="font-medium">{t('random_controller.release_year')}:</span> {randomController.year}
           </p>
           
           <button className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-2xl transition-colors">
-            <span>Zobacz szczegóły</span>
+            <span>{t('random_controller.view_details')}</span>
             <ExternalLink className="h-4 w-4" />
           </button>