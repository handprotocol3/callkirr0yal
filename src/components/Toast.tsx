import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { X, Bell } from 'lucide-react';

interface ToastProps {
  content: {
    title: string;
    description: string;
    icon: string;
  };
  onClose: () => void;
  index: number;
}

export default function Toast({ content, onClose, index }: ToastProps) {
  const controls = useAnimation();

  const handleDragEnd = async (_: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > 100 || velocity > 500) {
      await controls.start({ x: 500, opacity: 0 });
      onClose();
    } else {
      controls.start({ x: 0, opacity: 1 });
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 100 }}
      dragElastic={0.7}
      initial={{ opacity: 0, x: 100 }}
      animate={controls}
      exit={{ opacity: 0, x: 100 }}
      style={{
        position: 'fixed',
        right: '1rem',
        top: `${4 + index * 4}rem`,
        zIndex: 50 - index,
      }}
      onDragEnd={handleDragEnd}
      className="w-80 bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg border border-purple-500/30 p-4 cursor-grab active:cursor-grabbing"
    >
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.5
        }}
        className="absolute -left-3 -top-3 bg-purple-500 rounded-full p-1.5"
      >
        <Bell className="w-4 h-4 text-white" />
      </motion.div>
      
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-white"
      >
        <X size={16} />
      </button>
      <div className="flex items-start gap-3">
        <div className="text-2xl">{content.icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold mb-1">{content.title}</h3>
          <p className="text-gray-300 text-sm">{content.description}</p>
        </div>
      </div>
      <div className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
    </motion.div>
  );
}