import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Clock, User, Tag, BookOpen } from 'lucide-react';
import { Tutorial, TutorialSection as TutorialSectionType } from '../utils/dataLoader';

interface TutorialSectionProps {
  tutorials: Tutorial[];
}

const TutorialSection: React.FC<TutorialSectionProps> = ({ tutorials }) => {
  if (tutorials.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Brak dostępnych tutoriali dla tego kontrolera
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
          Sprawdź ponownie później lub skontaktuj się z nami, aby zaproponować tutorial
        </p>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'intermediate':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      case 'advanced':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'Początkujący';
      case 'intermediate':
        return 'Średniozaawansowany';
      case 'advanced':
        return 'Zaawansowany';
      default:
        return difficulty;
    }
  };

  const renderSectionContent = (section: TutorialSectionType) => {
    switch (section.type) {
      case 'html':
        return (
          <div 
            className="prose prose-sm dark:prose-invert max-w-none
              prose-headings:text-gray-900 dark:prose-headings:text-white
              prose-p:text-gray-700 dark:prose-p:text-gray-300
              prose-li:text-gray-700 dark:prose-li:text-gray-300
              prose-strong:text-gray-900 dark:prose-strong:text-white"
            dangerouslySetInnerHTML={{ __html: section.content as string }}
          />
        );
      
      case 'images':
        const images = section.content as Array<{ url: string; caption: string }>;
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div key={index} className="space-y-2">
                <img
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-48 object-cover rounded-2xl shadow-sm"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  {image.caption}
                </p>
              </div>
            ))}
          </div>
        );
      
      case 'links':
        const links = section.content as Array<{ title: string; url: string; description: string }>;
        return (
          <div className="space-y-3">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
              >
                <ExternalLink className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 group-hover:text-blue-700 dark:group-hover:text-blue-300" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {link.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {link.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {tutorials.map((tutorial, tutorialIndex) => (
        <motion.div
          key={tutorial.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: tutorialIndex * 0.1 }}
          className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600"
        >
          {/* Tutorial Header */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {tutorial.title}
              </h3>
              <span className={`px-3 py-1 rounded-2xl text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                {getDifficultyLabel(tutorial.difficulty)}
              </span>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {tutorial.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{tutorial.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{tutorial.estimatedTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4" />
                <div className="flex flex-wrap gap-1">
                  {tutorial.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tutorial Sections */}
          <div className="space-y-6">
            {tutorial.sections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: tutorialIndex * 0.1 + sectionIndex * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6"
              >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {section.title}
                </h4>
                {renderSectionContent(section)}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TutorialSection;