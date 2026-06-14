"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const matrixData = [
  { source: 'Mathematics', targets: { 'Physics': 0.92, 'Economics': 0.85, 'Biology': 0.45, 'Coding': 0.88 } },
  { source: 'Coding', targets: { 'Mathematics': 0.75, 'Physics': 0.60, 'Economics': 0.55, 'Biology': 0.30 } },
  { source: 'Physics', targets: { 'Mathematics': 0.88, 'Economics': 0.40, 'Biology': 0.70, 'Coding': 0.65 } },
  { source: 'Biology', targets: { 'Mathematics': 0.35, 'Physics': 0.65, 'Economics': 0.50, 'Coding': 0.45 } },
];

const domains = ['Mathematics', 'Physics', 'Economics', 'Biology', 'Coding'];

export default function TransferLearningMatrix() {
  const getColor = (value: number) => {
    if (value > 0.8) return 'bg-green-500 text-white';
    if (value > 0.6) return 'bg-green-300 text-black';
    if (value > 0.4) return 'bg-yellow-200 text-black';
    return 'bg-red-200 text-black';
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Transfer Learning Matrix</h1>
        <p className="text-muted-foreground mt-2">Efficiency of knowledge transfer between different capability domains.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cross-Domain Transfer Efficiencies</CardTitle>
          <CardDescription>Rows: Source Domain, Columns: Target Domain. Values represent transfer efficiency (0-1).</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-4 border text-left bg-muted/50">Source \\ Target</th>
                  {domains.map(domain => (
                    <th key={domain} className="p-4 border text-center bg-muted/50 font-medium">{domain}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrixData.map((row) => (
                  <tr key={row.source}>
                    <td className="p-4 border font-medium bg-muted/20">{row.source}</td>
                    {domains.map(domain => {
                      const val = domain === row.source ? 1.0 : (row.targets[domain as keyof typeof row.targets] || 0);
                      return (
                        <td key={domain} className={`p-4 border text-center font-semibold ${domain === row.source ? 'bg-slate-800 text-white' : getColor(val)}`}>
                          {val.toFixed(2)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
