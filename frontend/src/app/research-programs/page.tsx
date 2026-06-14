"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const programs = [
  { id: 'RP-A', name: 'Universal Reasoning Substrate', progress: 65, status: 'Active', phase: 'Phase III', lead: 'Agent-Prime' },
  { id: 'RP-B', name: 'Self-Correction in Long Horizon Coding', progress: 40, status: 'Active', phase: 'Phase II', lead: 'Agent-Coder' },
  { id: 'RP-C', name: 'Zero-shot Physical Simulation', progress: 15, status: 'Planning', phase: 'Phase I', lead: 'Agent-Physics' },
  { id: 'RP-D', name: 'Automated Theorem Proving Engine', progress: 90, status: 'Nearing Completion', phase: 'Phase IV', lead: 'Agent-Math' },
];

export default function ResearchPrograms() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Long Horizon Research Programs</h1>
        <p className="text-muted-foreground mt-2">Autonomous multi-agent research initiatives spanning weeks/months.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programs.map((prog) => (
          <Card key={prog.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{prog.name}</CardTitle>
                  <CardDescription className="mt-1">{prog.id} • Lead: {prog.lead}</CardDescription>
                </div>
                <span className="text-sm px-2 py-1 bg-muted rounded-md">{prog.phase}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-end space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{prog.status}</span>
                  <span>{prog.progress}%</span>
                </div>
                <Progress value={prog.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
