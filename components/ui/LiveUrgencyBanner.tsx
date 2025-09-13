'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface LiveMetrics {
  activeUsers: number;
  spotsRemaining: number;
  recentSignups: string[];
  conversionRate: number;
}

export default function LiveUrgencyBanner() {
  const [metrics, setMetrics] = useState<LiveMetrics>({
    activeUsers: 187,
    spotsRemaining: 7,
    recentSignups: ['Stripe', 'Notion', 'Linear'],
    conversionRate: 12.4
  });
  const [isVisible, setIsVisible] = useState(true);
  const [currentSignupIndex, setCurrentSignupIndex] = useState(0);

  useEffect(() => {
    // Simulate real-time updates (replace with actual WebSocket connection)
    const interval = setInterval(() => {
      setMetrics(prev => ({
        activeUsers: Math.max(150, prev.activeUsers + Math.floor(Math.random() * 20) - 10),
        spotsRemaining: Math.max(3, prev.spotsRemaining - (Math.random() > 0.8 ? 1 : 0)),
        recentSignups: prev.recentSignups,
        conversionRate: Math.max(10, Math.min(15, prev.conversionRate + (Math.random() - 0.5)))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Rotate through recent signups
    const signupInterval = setInterval(() => {
      setCurrentSignupIndex((prev) => (prev + 1) % metrics.recentSignups.length);
    }, 3000);

    return () => clearInterval(signupInterval);
  }, [metrics.recentSignups.length]);

  if (!isVisible || metrics.spotsRemaining > 10) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-16 left-0 right-0 z-40 px-4 sm:px-6"
      >
        <div className="mx-auto max-w-7xl">
          <div className="relative bg-gradient-to-r from-[#FF6B6B]/10 to-[#FF9F40]/10 backdrop-blur-xl border border-[#FF6B6B]/20 rounded-full px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-6">
                {/* Pulsing indicator */}
                <div className="relative flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-[#FF6B6B] opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF6B6B]" />
                </div>
                
                {/* Metrics */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-6 text-sm">
                  <span className="text-[#111213] dark:text-[#E3E3E3] font-medium whitespace-nowrap">
                    Only {metrics.spotsRemaining} spots left
                  </span>
                  <span className="text-[#6D7175] dark:text-[#A5A7AB] hidden sm:inline whitespace-nowrap">
                    {metrics.activeUsers} viewing now
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentSignupIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-[#2C6ECB] dark:text-[#6DAFFF] hidden md:inline whitespace-nowrap"
                    >
                      {metrics.recentSignups[currentSignupIndex]} just joined
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-2">
                <button className="bg-[#111213] dark:bg-[#E3E3E3] hover:bg-[#000000] dark:hover:bg-[#FFFFFF] text-white dark:text-[#111213] px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap">
                  Claim Your Spot
                </button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                  aria-label="Dismiss banner"
                >
                  <X className="h-4 w-4 text-[#6D7175] dark:text-[#A5A7AB]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}