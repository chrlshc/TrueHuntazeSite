'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface StockData {
  available: number;
  claimed: number;
  lastUpdate: Date;
}

interface LiveStockIndicatorProps {
  plan: string;
  initialStock?: number;
  updateInterval?: number;
}

export default function LiveStockIndicator({ 
  plan, 
  initialStock = 10,
  updateInterval = 10000 
}: LiveStockIndicatorProps) {
  const [stock, setStock] = useState<StockData>({
    available: initialStock,
    claimed: 0,
    lastUpdate: new Date()
  });

  useEffect(() => {
    // Simulate stock updates
    const interval = setInterval(() => {
      setStock(prev => {
        const shouldDecrease = Math.random() > 0.7;
        const newAvailable = shouldDecrease 
          ? Math.max(3, prev.available - 1)
          : prev.available;
        
        return {
          available: newAvailable,
          claimed: shouldDecrease ? prev.claimed + 1 : prev.claimed,
          lastUpdate: new Date()
        };
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval]);

  // Only show indicator when stock is low
  if (stock.available > 5) return null;

  const urgencyLevel = stock.available <= 3 ? 'critical' : 'warning';
  const pulseIntensity = urgencyLevel === 'critical' ? 'animate-pulse' : '';

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`absolute -top-3 -right-3 z-10 ${pulseIntensity}`}
    >
      <div className={`
        relative px-3 py-1.5 rounded-full text-xs font-bold
        ${urgencyLevel === 'critical' 
          ? 'bg-gradient-to-br from-red-500 to-orange-500 text-white' 
          : 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white'
        }
      `}>
        {/* Glow effect */}
        <div className={`
          absolute inset-0 rounded-full blur-md opacity-50
          ${urgencyLevel === 'critical' 
            ? 'bg-gradient-to-br from-red-500 to-orange-500' 
            : 'bg-gradient-to-br from-yellow-500 to-orange-500'
          }
        `} />
        
        {/* Content */}
        <span className="relative z-10">
          {stock.available} left
        </span>
      </div>
      
      {/* Additional urgency indicator for critical stock */}
      {urgencyLevel === 'critical' && (
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-1">
            <span className="block h-1 w-1 rounded-full bg-red-500 animate-pulse" />
            <span className="block h-1 w-1 rounded-full bg-red-500 animate-pulse animation-delay-200" />
            <span className="block h-1 w-1 rounded-full bg-red-500 animate-pulse animation-delay-400" />
          </div>
        </div>
      )}
    </motion.div>
  );
}