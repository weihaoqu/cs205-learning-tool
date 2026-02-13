'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { generateCoinChangeSteps, type DPStep } from '@/lib/algorithms/dynamic-programming';

export function CoinChangeVisualizer() {
  const [coins, setCoins] = useState([1, 3, 4]);
  const [amount, setAmount] = useState(6);
  const [coinsInput, setCoinsInput] = useState('1, 3, 4');
  const [steps, setSteps] = useState<DPStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(400);

  useEffect(() => {
    const newSteps = generateCoinChangeSteps(coins, amount);
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [coins, amount]);

  useEffect(() => {
    if (!isPlaying) return;
    if (currentStep >= steps.length - 1) { setIsPlaying(false); return; }
    const timer = setTimeout(() => setCurrentStep(p => Math.min(p + 1, steps.length - 1)), speed);
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, speed]);

  const handleCoinsChange = useCallback(() => {
    const parsed = coinsInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n > 0);
    if (parsed.length > 0) setCoins(parsed);
  }, [coinsInput]);

  const handleReset = useCallback(() => { setCurrentStep(0); setIsPlaying(false); }, []);

  const step = steps[currentStep];
  const table = step?.table ?? [];
  const isAtStart = currentStep === 0;
  const isAtEnd = currentStep >= steps.length - 1;
  const progress = steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0;

  return (
    <Card>
      <CardHeader className="pb-2"><CardTitle className="text-lg">Coin Change DP Table</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[150px]">
            <label className="text-sm font-medium mb-1 block">Coins:</label>
            <Input value={coinsInput} onChange={e => setCoinsInput(e.target.value)} onBlur={handleCoinsChange} onKeyDown={e => e.key === 'Enter' && handleCoinsChange()} disabled={isPlaying} />
          </div>
          <div className="w-24">
            <label className="text-sm font-medium mb-1 block">Amount:</label>
            <Input type="number" value={amount} onChange={e => setAmount(Math.max(1, parseInt(e.target.value) || 1))} disabled={isPlaying} />
          </div>
        </div>

        {/* DP Table */}
        <div className="overflow-x-auto">
          <div className="flex gap-1">
            {table.map((val, i) => {
              const isCurrent = step?.currentIndex === i;
              const isHighlighted = step?.highlightIndices.includes(i);
              let bg = 'bg-muted';
              if (isCurrent) bg = 'bg-blue-400 text-white';
              else if (isHighlighted) bg = 'bg-yellow-300';
              else if (val <= amount) bg = 'bg-green-100 dark:bg-green-900';

              return (
                <div key={i} className="flex flex-col items-center gap-0.5">
                  <span className="text-[10px] text-muted-foreground">{i}</span>
                  <div className={`w-10 h-10 flex items-center justify-center rounded text-sm font-mono font-bold ${bg}`}>
                    {val > amount ? '∞' : val}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-sm text-muted-foreground text-center">
          Coins: [{coins.join(', ')}] | Recurrence: dp[i] = min(dp[i], dp[i - coin] + 1)
        </div>

        <div className="text-center text-sm text-muted-foreground h-6">{step?.message ?? 'Ready'}</div>

        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-200" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handleReset} disabled={isAtStart}>{'\u23EE'}</Button>
            <Button size="sm" variant="outline" onClick={() => setCurrentStep(p => Math.max(p - 1, 0))} disabled={isAtStart}>{'\u23EA'}</Button>
            <Button size="sm" onClick={() => isPlaying ? setIsPlaying(false) : setIsPlaying(true)} disabled={steps.length === 0} className="w-12">
              {isPlaying ? '\u23F8' : '\u25B6'}
            </Button>
            <Button size="sm" variant="outline" onClick={() => setCurrentStep(p => Math.min(p + 1, steps.length - 1))} disabled={isAtEnd}>{'\u23E9'}</Button>
          </div>
          <div className="text-sm text-muted-foreground">Step {steps.length > 0 ? currentStep + 1 : 0} of {steps.length}</div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Speed:</span>
            <Slider value={[2000 - speed]} onValueChange={([v]) => setSpeed(2000 - v)} min={0} max={1900} step={50} className="w-24" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
