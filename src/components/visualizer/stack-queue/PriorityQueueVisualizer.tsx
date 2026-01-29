'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createQueue, enqueue, dequeue, enqueuePriority, isQueueEmpty } from '@/lib/algorithms/stack-queue/queue';
import type { QueueState } from '@/lib/algorithms/stack-queue/types';

interface PatientItem {
  name: string;
  priority: number;
}

export function PriorityQueueVisualizer() {
  const [regularQueue, setRegularQueue] = useState<QueueState>(createQueue());
  const [priorityQueue, setPriorityQueue] = useState<QueueState>(createQueue());
  const [patientName, setPatientName] = useState('');
  const [severity, setSeverity] = useState(5);
  const [regularDequeued, setRegularDequeued] = useState<PatientItem[]>([]);
  const [priorityDequeued, setPriorityDequeued] = useState<PatientItem[]>([]);

  const samplePatients: PatientItem[] = [
    { name: 'Alice', priority: 3 },
    { name: 'Bob', priority: 8 },
    { name: 'Carol', priority: 5 },
    { name: 'David', priority: 2 },
    { name: 'Eve', priority: 9 },
  ];

  const handleAddPatient = useCallback((name: string, priority: number) => {
    // Add to regular queue (FIFO)
    const { queue: newRegular } = enqueue(regularQueue, name, priority);
    setRegularQueue(newRegular);

    // Add to priority queue (by severity)
    const { queue: newPriority } = enqueuePriority(priorityQueue, name, priority);
    setPriorityQueue(newPriority);

    setPatientName('');
    setSeverity(5);
  }, [regularQueue, priorityQueue]);

  const handleDequeueRegular = useCallback(() => {
    if (regularQueue.items.length > 0) {
      const item = regularQueue.items[0];
      const { queue: newQueue } = dequeue(regularQueue);
      setRegularQueue(newQueue);
      setRegularDequeued(prev => [...prev, { name: String(item.value), priority: item.priority || 0 }]);
    }
  }, [regularQueue]);

  const handleDequeuePriority = useCallback(() => {
    if (priorityQueue.items.length > 0) {
      const item = priorityQueue.items[0];
      const { queue: newQueue } = dequeue(priorityQueue);
      setPriorityQueue(newQueue);
      setPriorityDequeued(prev => [...prev, { name: String(item.value), priority: item.priority || 0 }]);
    }
  }, [priorityQueue]);

  const handleReset = useCallback(() => {
    setRegularQueue(createQueue());
    setPriorityQueue(createQueue());
    setRegularDequeued([]);
    setPriorityDequeued([]);
  }, []);

  const handleLoadSample = useCallback(() => {
    handleReset();
    let regQ = createQueue();
    let priQ = createQueue();

    for (const patient of samplePatients) {
      const { queue: newReg } = enqueue(regQ, patient.name, patient.priority);
      regQ = newReg;
      const { queue: newPri } = enqueuePriority(priQ, patient.name, patient.priority);
      priQ = newPri;
    }

    setRegularQueue(regQ);
    setPriorityQueue(priQ);
  }, []);

  const getPriorityColor = (priority: number) => {
    if (priority >= 8) return 'bg-red-500 text-white';
    if (priority >= 5) return 'bg-orange-400 text-white';
    if (priority >= 3) return 'bg-yellow-400 text-black';
    return 'bg-green-400 text-black';
  };

  const getPriorityLabel = (priority: number) => {
    if (priority >= 8) return 'Critical';
    if (priority >= 5) return 'Urgent';
    if (priority >= 3) return 'Moderate';
    return 'Minor';
  };

  return (
    <div className="space-y-6">
      {/* Scenario explanation */}
      <Card className="bg-purple-50 border-purple-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-purple-800">Hospital ER Triage Scenario</CardTitle>
        </CardHeader>
        <CardContent className="text-purple-700">
          <p>
            In an emergency room, patients are not served in arrival order. Instead, those with
            <strong> higher severity</strong> are treated first. This is a <strong>Priority Queue</strong>!
          </p>
          <p className="mt-2 text-sm">
            Compare: Regular Queue (FIFO - first come, first served) vs Priority Queue (highest priority first)
          </p>
        </CardContent>
      </Card>

      {/* Add Patient */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Add Patient</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="text-sm text-muted-foreground block mb-1">Patient Name</label>
              <Input
                type="text"
                placeholder="Name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-32"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground block mb-1">Severity (1-10)</label>
              <Input
                type="number"
                min={1}
                max={10}
                value={severity}
                onChange={(e) => setSeverity(Number(e.target.value))}
                className="w-20"
              />
            </div>
            <Button
              onClick={() => patientName && handleAddPatient(patientName, severity)}
              disabled={!patientName.trim()}
            >
              Add Patient
            </Button>
            <Button variant="outline" onClick={handleLoadSample}>
              Load Sample Data
            </Button>
            <Button variant="ghost" onClick={handleReset}>
              Reset
            </Button>
          </div>

          {/* Quick add buttons */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground mr-2">Quick add:</span>
            {samplePatients.map((patient, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleAddPatient(patient.name, patient.priority)}
                className="text-xs"
              >
                {patient.name} (severity: {patient.priority})
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Side by side comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Regular Queue */}
        <Card>
          <CardHeader className="pb-3 bg-green-50">
            <CardTitle className="text-lg text-green-800">Regular Queue (FIFO)</CardTitle>
            <p className="text-sm text-green-600">First come, first served</p>
          </CardHeader>
          <CardContent className="pt-4">
            {/* Queue visualization */}
            <div className="border-2 border-green-200 rounded-lg p-4 min-h-[150px]">
              <div className="flex gap-2 flex-wrap">
                {isQueueEmpty(regularQueue) ? (
                  <div className="text-muted-foreground w-full text-center py-8">
                    Queue is empty
                  </div>
                ) : (
                  regularQueue.items.map((item, index) => (
                    <div
                      key={item.id}
                      className={`
                        p-3 rounded-lg text-center min-w-[80px]
                        ${index === 0 ? 'ring-2 ring-green-500' : ''}
                        ${getPriorityColor(item.priority || 0)}
                      `}
                    >
                      <div className="font-bold">{item.value}</div>
                      <div className="text-xs opacity-80">
                        Sev: {item.priority}
                      </div>
                      {index === 0 && (
                        <div className="text-xs mt-1 opacity-80">← Next</div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            <Button
              onClick={handleDequeueRegular}
              disabled={isQueueEmpty(regularQueue)}
              className="mt-4 w-full bg-green-600 hover:bg-green-700"
            >
              Serve Next Patient
            </Button>

            {/* Served patients */}
            {regularDequeued.length > 0 && (
              <div className="mt-4">
                <div className="text-sm text-muted-foreground mb-2">Served (in order):</div>
                <div className="flex gap-2 flex-wrap">
                  {regularDequeued.map((patient, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-200 rounded text-sm">
                      {index + 1}. {patient.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Priority Queue */}
        <Card>
          <CardHeader className="pb-3 bg-purple-50">
            <CardTitle className="text-lg text-purple-800">Priority Queue</CardTitle>
            <p className="text-sm text-purple-600">Highest severity first</p>
          </CardHeader>
          <CardContent className="pt-4">
            {/* Queue visualization */}
            <div className="border-2 border-purple-200 rounded-lg p-4 min-h-[150px]">
              <div className="flex gap-2 flex-wrap">
                {isQueueEmpty(priorityQueue) ? (
                  <div className="text-muted-foreground w-full text-center py-8">
                    Queue is empty
                  </div>
                ) : (
                  priorityQueue.items.map((item, index) => (
                    <div
                      key={item.id}
                      className={`
                        p-3 rounded-lg text-center min-w-[80px]
                        ${index === 0 ? 'ring-2 ring-purple-500' : ''}
                        ${getPriorityColor(item.priority || 0)}
                      `}
                    >
                      <div className="font-bold">{item.value}</div>
                      <div className="text-xs opacity-80">
                        Sev: {item.priority}
                      </div>
                      {index === 0 && (
                        <div className="text-xs mt-1 opacity-80">← Next</div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            <Button
              onClick={handleDequeuePriority}
              disabled={isQueueEmpty(priorityQueue)}
              className="mt-4 w-full bg-purple-600 hover:bg-purple-700"
            >
              Serve Next Patient
            </Button>

            {/* Served patients */}
            {priorityDequeued.length > 0 && (
              <div className="mt-4">
                <div className="text-sm text-muted-foreground mb-2">Served (by priority):</div>
                <div className="flex gap-2 flex-wrap">
                  {priorityDequeued.map((patient, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-200 rounded text-sm">
                      {index + 1}. {patient.name} (sev: {patient.priority})
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Priority legend */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Severity Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {[
              { range: '8-10', label: 'Critical', color: 'bg-red-500' },
              { range: '5-7', label: 'Urgent', color: 'bg-orange-400' },
              { range: '3-4', label: 'Moderate', color: 'bg-yellow-400' },
              { range: '1-2', label: 'Minor', color: 'bg-green-400' },
            ].map((level) => (
              <div key={level.label} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded ${level.color}`}></div>
                <span className="text-sm">
                  <strong>{level.label}</strong> ({level.range})
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key insight */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-blue-800">Key Insight</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700">
          <p>
            Notice how the <strong>Regular Queue</strong> serves patients in arrival order,
            while the <strong>Priority Queue</strong> always serves the most critical patient first,
            regardless of when they arrived.
          </p>
          <p className="mt-2 text-sm">
            In Java, use <code className="bg-blue-100 px-1 rounded">PriorityQueue</code> with a custom
            <code className="bg-blue-100 px-1 rounded">Comparator</code> to control the priority ordering.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
