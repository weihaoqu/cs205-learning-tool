'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Plus } from 'lucide-react';
import { LoadFactorMeter } from './LoadFactorMeter';
import {
  createInitialState,
  putGenerator,
  hashString,
  getBucketIndex,
  type HashMapState,
  type HashMapStep,
} from '@/lib/algorithms/maps';

const sampleKeys = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon'];

export function RehashingDemo() {
  const [state, setState] = useState<HashMapState>(() => createInitialState(8));
  const [oldState, setOldState] = useState<HashMapState | null>(null);
  const [isRehashing, setIsRehashing] = useState(false);
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState('Click "Add Entry" to start adding items');
  const [rehashStep, setRehashStep] = useState(0);
  const [movingEntries, setMovingEntries] = useState<{ key: string; oldIdx: number; newIdx: number }[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const addEntry = () => {
    if (currentKeyIndex >= sampleKeys.length) {
      setMessage('All sample keys added!');
      return;
    }

    const key = sampleKeys[currentKeyIndex];
    const value = currentKeyIndex + 1;
    const allSteps: HashMapStep[] = [];

    for (const step of putGenerator(state, key, value)) {
      allSteps.push(step);
    }

    // Check if rehashing occurred
    const rehashStartStep = allSteps.find(s => s.type === 'rehash-start');

    if (rehashStartStep && rehashStartStep.oldState) {
      // Start rehashing animation
      setOldState(rehashStartStep.oldState);
      setIsRehashing(true);

      // Collect all entries that need to move
      const entries: { key: string; oldIdx: number; newIdx: number }[] = [];
      const rehashMoveSteps = allSteps.filter(s => s.type === 'rehash-move');

      for (const step of rehashMoveSteps) {
        if (step.key && step.bucketIndex !== undefined) {
          const hash = hashString(step.key);
          const oldIdx = getBucketIndex(hash, rehashStartStep.oldState!.capacity);
          entries.push({
            key: step.key,
            oldIdx,
            newIdx: step.bucketIndex,
          });
        }
      }

      setMovingEntries(entries);
      setRehashStep(0);
      setMessage(`Rehashing triggered! Size (${rehashStartStep.oldState.size + 1}) exceeded threshold (${rehashStartStep.oldState.threshold})`);

      // Animate entries moving one by one
      let step = 0;
      intervalRef.current = setInterval(() => {
        if (step < entries.length) {
          setRehashStep(step + 1);
          setMessage(`Moving "${entries[step].key}": bucket ${entries[step].oldIdx} → bucket ${entries[step].newIdx}`);
          step++;
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setTimeout(() => {
            setIsRehashing(false);
            setOldState(null);
            const lastStep = allSteps[allSteps.length - 1];
            setState(lastStep.state);
            setCurrentKeyIndex(currentKeyIndex + 1);
            setMessage(`Rehashing complete! New capacity: ${lastStep.state.capacity}`);
          }, 1000);
        }
      }, 800);
    } else {
      // Normal insert
      const lastStep = allSteps[allSteps.length - 1];
      setState(lastStep.state);
      setCurrentKeyIndex(currentKeyIndex + 1);
      setMessage(`Added "${key}" → ${value}`);
    }
  };

  const autoPlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      setIsPlaying(true);
      intervalRef.current = setInterval(() => {
        if (currentKeyIndex < sampleKeys.length && !isRehashing) {
          addEntry();
        } else if (currentKeyIndex >= sampleKeys.length) {
          setIsPlaying(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }, 1500);
    }
  };

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setState(createInitialState(8));
    setOldState(null);
    setIsRehashing(false);
    setCurrentKeyIndex(0);
    setIsPlaying(false);
    setMessage('Click "Add Entry" to start adding items');
    setRehashStep(0);
    setMovingEntries([]);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const renderTable = (tableState: HashMapState, isOld: boolean = false) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Badge variant={isOld ? 'secondary' : 'default'}>
          {isOld ? 'Old Table' : 'New Table'}
        </Badge>
        <span className="text-sm text-muted-foreground">
          Capacity: {tableState.capacity}
        </span>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-2 text-left w-16">Index</th>
              <th className="p-2 text-left">Entries</th>
            </tr>
          </thead>
          <tbody>
            {tableState.buckets.map((bucket, idx) => {
              const movedFromHere = isOld && movingEntries.slice(0, rehashStep).some(e => e.oldIdx === idx);
              const movedToHere = !isOld && movingEntries.slice(0, rehashStep).some(e => e.newIdx === idx);

              return (
                <tr
                  key={idx}
                  className={`border-t ${
                    movedToHere ? 'bg-green-500/10' : movedFromHere ? 'bg-red-500/10' : ''
                  }`}
                >
                  <td className="p-2 font-mono">{idx}</td>
                  <td className="p-2">
                    <AnimatePresence mode="popLayout">
                      {bucket.entries.length === 0 ? (
                        <span className="text-muted-foreground italic text-xs">(empty)</span>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {bucket.entries.map((entry, i) => {
                            const isMoving = isOld &&
                              movingEntries.slice(0, rehashStep).some(e => e.key === entry.key);

                            return (
                              <motion.span
                                key={entry.key}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{
                                  opacity: isMoving ? 0.3 : 1,
                                  scale: 1
                                }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className={`px-2 py-0.5 rounded text-xs ${
                                  isMoving ? 'bg-red-200 line-through' : 'bg-blue-100'
                                }`}
                              >
                                {entry.key}
                              </motion.span>
                            );
                          })}
                        </div>
                      )}
                    </AnimatePresence>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Build the new state during rehashing
  const newStateForDisplay: HashMapState | null = isRehashing && oldState ? {
    ...state,
    buckets: Array.from({ length: state.capacity }, (_, idx) => ({
      entries: movingEntries
        .slice(0, rehashStep)
        .filter(e => e.newIdx === idx)
        .map(e => {
          const originalEntry = oldState.buckets
            .flatMap(b => b.entries)
            .find(entry => entry.key === e.key);
          return originalEntry!;
        }),
    })),
  } : null;

  return (
    <div className="space-y-4">
      {/* Controls */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Rehashing Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button onClick={addEntry} disabled={isRehashing || currentKeyIndex >= sampleKeys.length}>
              <Plus className="w-4 h-4 mr-1" />
              Add Entry
            </Button>
            <Button onClick={autoPlay} variant="outline" disabled={isRehashing}>
              {isPlaying ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
              {isPlaying ? 'Pause' : 'Auto Play'}
            </Button>
            <Button onClick={handleReset} variant="ghost">
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          </div>

          {/* Upcoming keys */}
          <div className="flex flex-wrap gap-1 text-xs">
            <span className="text-muted-foreground">Next keys:</span>
            {sampleKeys.slice(currentKeyIndex, currentKeyIndex + 5).map((key, i) => (
              <Badge key={key} variant={i === 0 ? 'default' : 'outline'} className="text-xs">
                {key}
              </Badge>
            ))}
            {currentKeyIndex + 5 < sampleKeys.length && (
              <span className="text-muted-foreground">...</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Message */}
      <div className={`p-3 rounded-lg text-center ${
        isRehashing ? 'bg-orange-500/10 border border-orange-500/30' : 'bg-muted'
      }`}>
        <p className="text-sm">{message}</p>
      </div>

      {/* Load Factor Meter */}
      <Card>
        <CardContent className="p-4">
          <LoadFactorMeter
            size={isRehashing && oldState ? oldState.size : state.size}
            capacity={isRehashing && oldState ? oldState.capacity : state.capacity}
          />
        </CardContent>
      </Card>

      {/* Tables */}
      {isRehashing && oldState && newStateForDisplay ? (
        <div className="grid md:grid-cols-2 gap-4">
          {renderTable(oldState, true)}
          {renderTable(newStateForDisplay, false)}
        </div>
      ) : (
        renderTable(state)
      )}
    </div>
  );
}
