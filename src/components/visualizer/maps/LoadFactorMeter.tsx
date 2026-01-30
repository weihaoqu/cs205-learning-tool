'use client';

import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';

interface LoadFactorMeterProps {
  size: number;
  capacity: number;
  loadFactor?: number;
}

export function LoadFactorMeter({
  size,
  capacity,
  loadFactor = 0.75,
}: LoadFactorMeterProps) {
  const currentLoadFactor = size / capacity;
  const threshold = Math.floor(capacity * loadFactor);
  const percentFull = (size / capacity) * 100;
  const thresholdPercent = loadFactor * 100;
  const willRehash = size > threshold;

  return (
    <div className="space-y-3">
      {/* Stats Row */}
      <div className="flex justify-between text-sm">
        <div>
          <span className="text-muted-foreground">Size: </span>
          <span className="font-mono font-bold">{size}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Capacity: </span>
          <span className="font-mono font-bold">{capacity}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Load Factor: </span>
          <span className="font-mono font-bold">{currentLoadFactor.toFixed(2)}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(percentFull, 100)}%` }}
            transition={{ duration: 0.5 }}
            className={`h-full ${
              willRehash
                ? 'bg-red-500'
                : currentLoadFactor > 0.5
                ? 'bg-yellow-500'
                : 'bg-green-500'
            }`}
          />
        </div>

        {/* Threshold Marker */}
        <div
          className="absolute top-0 h-6 border-r-2 border-dashed border-orange-500"
          style={{ left: `${thresholdPercent}%` }}
        >
          <div className="absolute -top-6 -translate-x-1/2 text-xs text-orange-600 whitespace-nowrap">
            Threshold ({threshold})
          </div>
        </div>
      </div>

      {/* Warning/Info */}
      <div className="flex justify-between items-center">
        <div className="text-xs text-muted-foreground">
          {size} / {capacity} entries ({percentFull.toFixed(1)}% full)
        </div>
        {willRehash ? (
          <Badge variant="destructive" className="text-xs">
            Rehashing needed!
          </Badge>
        ) : size === threshold ? (
          <Badge variant="outline" className="text-xs text-orange-600 border-orange-300">
            At threshold
          </Badge>
        ) : (
          <Badge variant="outline" className="text-xs text-green-600 border-green-300">
            {threshold - size} until rehash
          </Badge>
        )}
      </div>

      {/* Formula */}
      <div className="text-xs text-muted-foreground text-center bg-muted p-2 rounded">
        <span className="font-mono">
          threshold = capacity × loadFactor = {capacity} × {loadFactor} = {threshold}
        </span>
      </div>
    </div>
  );
}
