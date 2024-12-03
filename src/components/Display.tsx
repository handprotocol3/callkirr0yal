import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';

interface DisplayProps {
  content: {
    title: string;
    description: string;
    icon: string;
  } | null;
  unlockedCount: number;
}

export default function Display({ content, unlockedCount }: DisplayProps) {
  return (
    <div className="bg-gray-900/90 rounded-3xl p-6 mb-8 h-[200px] relative overflow-hidden">
      <AnimatePresence mode="wait">
        {content ? (
          <motion.div
            key={content.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-full flex flex-col justify-center"
          >
            <div className="text-4xl mb-2">{content.icon}</div>
            <h2 className="text-xl font-bold text-white mb-2">{content.title}</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              {content.description}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full flex flex-col items-center justify-center text-gray-400"
          >
            <Phone className="w-12 h-12 mb-4 animate-pulse" />
            <p className="text-center text-sm">
              Press any key to discover Kirr0yal's journey
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-0 left-0 right-0 flex justify-center"
      >
        <div className="bg-purple-600/30 backdrop-blur-sm px-4 py-1 rounded-t-xl text-xs font-medium text-purple-200">
          {unlockedCount}/12 Achievements Unlocked
        </div>
      </motion.div>
    </div>
  );
}