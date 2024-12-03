import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Keypad from './components/Keypad';
import Display from './components/Display';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { TonePlayer } from './utils/tonePlayer';
import { useWindowSize } from './hooks/useWindowSize';

const skillsData: Record<string, { title: string; description: string; icon: string }> = {
  '1': {
    title: 'Innovation Pioneer',
    description: 'Pushing boundaries in web3 with groundbreaking solutions and forward-thinking approaches.',
    icon: '🚀'
  },
  '2': {
    title: 'Community Builder',
    description: 'Fostering vibrant, engaged communities through authentic leadership and shared vision.',
    icon: '🌐'
  },
  '3': {
    title: 'Strategic Vision',
    description: 'Crafting comprehensive strategies that bridge technology with real-world impact.',
    icon: '💡'
  },
  '4': {
    title: 'Design Thinking',
    description: 'Creating intuitive, user-centric experiences that delight and inspire.',
    icon: '🎨'
  },
  '5': {
    title: 'Growth Catalyst',
    description: 'Driving sustainable growth through data-driven decisions and strategic partnerships.',
    icon: '📈'
  },
  '6': {
    title: 'Web3 Expert',
    description: 'Deep expertise in blockchain technology, DeFi, and decentralized systems.',
    icon: '🔗'
  },
  '7': {
    title: 'Builder Mindset',
    description: 'Turning innovative ideas into tangible solutions with rapid iteration and execution.',
    icon: '🛠️'
  },
  '8': {
    title: 'Team Leadership',
    description: 'Empowering teams to achieve excellence through collaboration and shared purpose.',
    icon: '🤝'
  },
  '9': {
    title: 'Visionary Goals',
    description: 'Setting ambitious targets and inspiring others to reach new heights.',
    icon: '🎯'
  },
  '0': {
    title: 'Personal Journey',
    description: 'A path of continuous learning, growth, and dedication to positive impact.',
    icon: '💫'
  },
  '*': {
    title: 'Special Projects',
    description: 'Exclusive initiatives and breakthrough innovations shaping the future.',
    icon: '⭐'
  },
  '#': {
    title: 'Project Portfolio',
    description: 'A showcase of successful ventures and transformative achievements.',
    icon: '📂'
  }
};

function App() {
  const [activeContent, setActiveContent] = useState<typeof skillsData[keyof typeof skillsData] | null>(null);
  const [unlockedKeys, setUnlockedKeys] = useState<Set<string>>(new Set());
  const [achievements, setAchievements] = useState<Set<string>>(new Set());
  const [showSpecial, setShowSpecial] = useState(false);
  const [isVibrating, setIsVibrating] = useState(false);
  const [toasts, setToasts] = useState<Array<{ id: string; content: typeof skillsData[keyof typeof skillsData] }>>([]);
  const tonePlayerRef = useRef<TonePlayer | null>(null);
  const { width } = useWindowSize();
  const isMobile = width <= 640;

  useEffect(() => {
    tonePlayerRef.current = new TonePlayer();
  }, []);

  const handleKeyPress = (key: string) => {
    const newUnlockedKeys = new Set(unlockedKeys);
    const content = skillsData[key];
    
    if (!achievements.has(key)) {
      const newAchievements = new Set(achievements);
      newAchievements.add(key);
      setAchievements(newAchievements);
      
      if (newAchievements.size === 12 && !showSpecial) {
        setShowSpecial(true);
        tonePlayerRef.current?.playRingtone();
      }
    }

    if (newUnlockedKeys.has(key)) {
      newUnlockedKeys.delete(key);
      setActiveContent(null);
    } else {
      newUnlockedKeys.add(key);
      if (isMobile) {
        setToasts(prev => {
          const newToasts = [...prev];
          if (newToasts.length >= 3) {
            newToasts.shift();
          }
          return [...newToasts, { id: Math.random().toString(), content }];
        });
      }
      setActiveContent(content);
    }
    setUnlockedKeys(newUnlockedKeys);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const phoneScale = width < 400 ? 0.8 : width < 640 ? 0.9 : 1;

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          x: isVibrating ? [0, -2, 2, -2, 2, -2, 2, -2, 2, -2, 2, 0] : 0,
          scale: phoneScale
        }}
        transition={{
          duration: isVibrating ? 0.3 : 0.5,
          repeat: isVibrating ? 10 : 0,
          repeatType: "mirror"
        }}
        className="w-full max-w-md relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/20 to-transparent blur-xl"></div>
        <div className="relative bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 rounded-[3rem] p-6 pb-8 border-4 border-purple-500/30 shadow-2xl shadow-purple-500/20">
          <header className="text-center mb-12 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl mb-8"></div>
            <div className="pt-12">
              <motion.h1 
                className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 text-transparent bg-clip-text"
                animate={{ 
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  backgroundSize: '200% auto',
                }}
              >
                Better Call Kirr0yal
              </motion.h1>
              <p className="text-gray-300">Unlock the journey, one key at a time</p>
            </div>
          </header>

          {!isMobile && <Display content={activeContent} unlockedCount={achievements.size} />}
          
          {showSpecial && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-4 bg-purple-600/20 rounded-xl text-center"
            >
              <h3 className="text-xl font-bold mb-2">🎉 Achievement Unlocked!</h3>
              <p className="text-sm text-purple-200">
                You've discovered all of Kirr0yal's key attributes. Ready to collaborate?
              </p>
            </motion.div>
          )}

          <Keypad onKeyPress={handleKeyPress} unlockedKeys={unlockedKeys} />
          <Footer setIsVibrating={setIsVibrating} />
        </div>
      </motion.div>

      <AnimatePresence>
        {toasts.map(({ id, content }, index) => (
          <Toast
            key={id}
            content={content}
            onClose={() => removeToast(id)}
            index={index}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default App;