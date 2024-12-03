import React, { useCallback, useEffect, useRef } from 'react';
import { Phone, Star, Hash } from 'lucide-react';
import { motion } from 'framer-motion';
import { TonePlayer } from '../utils/tonePlayer';

interface KeypadProps {
  onKeyPress: (key: string) => void;
  unlockedKeys: Set<string>;
}

const keys = [
  { key: '1', icon: '🚀', label: 'Innovation' },
  { key: '2', icon: '🌐', label: 'Community' },
  { key: '3', icon: '💡', label: 'Strategy' },
  { key: '4', icon: '🎨', label: 'Design' },
  { key: '5', icon: '📈', label: 'Growth' },
  { key: '6', icon: '🔗', label: 'Web3' },
  { key: '7', icon: '🛠️', label: 'Building' },
  { key: '8', icon: '🤝', label: 'Leadership' },
  { key: '9', icon: '🎯', label: 'Vision' },
  { key: '*', icon: <Star className="w-4 h-4" />, label: 'Special' },
  { key: '0', icon: '💫', label: 'Journey' },
  { key: '#', icon: <Hash className="w-4 h-4" />, label: 'Projects' },
];

export default function Keypad({ onKeyPress, unlockedKeys }: KeypadProps) {
  const tonePlayerRef = useRef<TonePlayer | null>(null);

  useEffect(() => {
    tonePlayerRef.current = new TonePlayer();
  }, []);

  const handleKeyPress = useCallback((key: string) => {
    tonePlayerRef.current?.playTone(key);
    onKeyPress(key);
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  }, [onKeyPress]);

  return (
    <div className="grid grid-cols-3 gap-4 p-4 max-w-xs mx-auto">
      {keys.map(({ key, icon, label }) => (
        <motion.button
          key={key}
          onClick={() => handleKeyPress(key)}
          whileTap={{ scale: 0.95 }}
          className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 
            ${
              unlockedKeys.has(key)
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-300'
                : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700'
            }
            transition-all duration-300 transform hover:scale-105`}
        >
          <div className="text-2xl mb-1">{typeof icon === 'string' ? icon : icon}</div>
          <div className="text-sm font-medium">{label}</div>
          <div className="text-xs opacity-50 mt-1">{key}</div>
        </motion.button>
      ))}
    </div>
  );
}