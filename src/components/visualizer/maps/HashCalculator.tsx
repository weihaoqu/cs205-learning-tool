'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { hashString, getBucketIndex } from '@/lib/algorithms/maps';

export function HashCalculator() {
  const [input, setInput] = useState('apple');
  const [capacity, setCapacity] = useState(8);
  const [hashCode, setHashCode] = useState(0);
  const [bucketIndex, setBucketIndex] = useState(0);
  const [showSteps, setShowSteps] = useState(false);

  useEffect(() => {
    if (input) {
      const hash = hashString(input);
      setHashCode(hash);
      setBucketIndex(getBucketIndex(hash, capacity));
      setShowSteps(true);
    } else {
      setShowSteps(false);
    }
  }, [input, capacity]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Hash Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input */}
        <div className="space-y-2">
          <Label htmlFor="hash-input">Enter a key (string)</Label>
          <Input
            id="hash-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type any string..."
            className="text-lg font-mono"
          />
        </div>

        {/* Capacity Slider */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Array Capacity</Label>
            <span className="font-mono text-sm">{capacity}</span>
          </div>
          <Slider
            value={[capacity]}
            onValueChange={([val]) => setCapacity(val)}
            min={4}
            max={16}
            step={1}
          />
        </div>

        {/* Calculation Steps */}
        {showSteps && (
          <div className="space-y-4">
            {/* Step 1: Hash Code */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-muted rounded-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <Badge>Step 1</Badge>
                <span className="font-medium">Calculate hashCode()</span>
              </div>
              <div className="font-mono text-lg">
                hashCode("<span className="text-blue-600">{input}</span>") ={' '}
                <motion.span
                  key={hashCode}
                  initial={{ scale: 1.2, color: '#22c55e' }}
                  animate={{ scale: 1, color: '#000' }}
                  className="font-bold"
                >
                  {hashCode}
                </motion.span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Java's String.hashCode() computes a hash based on character values
              </p>
            </motion.div>

            {/* Step 2: Bucket Index */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 bg-muted rounded-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <Badge>Step 2</Badge>
                <span className="font-medium">Calculate bucket index</span>
              </div>
              <div className="font-mono text-lg">
                <span className="text-purple-600">{hashCode}</span> %{' '}
                <span className="text-orange-600">{capacity}</span> ={' '}
                <motion.span
                  key={bucketIndex}
                  initial={{ scale: 1.2, color: '#22c55e' }}
                  animate={{ scale: 1, color: '#000' }}
                  className="font-bold text-green-600"
                >
                  {bucketIndex}
                </motion.span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                The modulo operation ensures the index is within [0, capacity-1]
              </p>
            </motion.div>

            {/* Result */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
            >
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Result</p>
                <p className="text-lg font-medium">
                  "<span className="text-blue-600">{input}</span>" goes to{' '}
                  <span className="text-green-600 font-bold">bucket {bucketIndex}</span>
                </p>
              </div>
            </motion.div>

            {/* Visual Bucket Display */}
            <div className="space-y-2">
              <Label>Bucket Array (capacity = {capacity})</Label>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: capacity }, (_, i) => (
                  <motion.div
                    key={i}
                    initial={false}
                    animate={{
                      scale: i === bucketIndex ? 1.1 : 1,
                      backgroundColor:
                        i === bucketIndex
                          ? 'rgb(34, 197, 94)'
                          : 'rgb(229, 231, 235)',
                    }}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-mono text-sm ${
                      i === bucketIndex ? 'text-white font-bold' : ''
                    }`}
                  >
                    {i}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Try Different Keys */}
        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground mb-2">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {['apple', 'banana', 'cherry', 'date', 'elderberry'].map((key) => (
              <button
                key={key}
                onClick={() => setInput(key)}
                className="px-3 py-1 text-sm bg-muted hover:bg-muted/80 rounded-full transition-colors"
              >
                {key}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
