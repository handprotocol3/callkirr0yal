import React from 'react';
import { Github, Twitter, ExternalLink } from 'lucide-react';

interface FooterProps {
  setIsVibrating: (value: boolean) => void;
}

export default function Footer({ setIsVibrating }: FooterProps) {
  const handleSupportClick = () => {
    setIsVibrating(true);
    setTimeout(() => {
      setIsVibrating(false);
      window.open('https://explorer.gitcoin.co/#/projects/0xce5fc846b4c3875781d9b1193de7210cb411b321a7839d1ebf2e6fbb92222326', '_blank');
    }, 3000);
  };

  return (
    <footer className="mt-8 pb-8 px-4">
      <div className="max-w-xs mx-auto">
        <div className="flex justify-center gap-6 mb-6">
          <a
            href="https://twitter.com/kirr0yal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            <Twitter className="w-6 h-6" />
          </a>
          <a
            href="https://github.com/kirr0yal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://warpcast.com/kirr0yal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ExternalLink className="w-6 h-6" />
          </a>
        </div>
        
        <button
          onClick={handleSupportClick}
          className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-purple-800 
            rounded-xl text-white font-medium shadow-lg shadow-purple-900/20
            hover:shadow-purple-900/40 transition-all duration-300
            transform hover:scale-105 active:scale-95"
        >
          Support Kirr0yal's Vision
        </button>
      </div>
    </footer>
  );
}