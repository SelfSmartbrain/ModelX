"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const regressions = [
  { id: 'REG-101', metric: 'Translation BLEU Score', previous: 45.2, current: 42.1, delta: -3.1, severity: 'High', date: '2026-06-13', status: 'Investigating' },
  { id: 'REG-102', metric: 'SQL Query Syntax Acc', previous: 98.5, current: 97.2, delta: -1.3, severity: 'Medium', date: '2026-06-12', status: 'Resolved' },
  { id: 'REG-103', metric: 'Factuality Recall', previous: 89.4, current: 89.0, delta: -0.4, severity: 'Low', date: '2026-06-14', status: 'Open' },
];

export default function RegressionsTable() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Capability Regressions</h1>
        <p className="text-muted-foreground mt-2">Tracking negative deltas in capability metrics between evaluations.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Regressions</CardTitle>
          <CardDescription>Issues identified during continuous evaluation.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="p-4 font-medium">ID</th>
                  <th className="p-4 font-medium">Metric</th>
                  <th className="p-4 font-medium">Delta</th>
                  <th className="p-4 font-medium">Severity</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Date Detected</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {regressions.map((reg) => (
                  <tr key={reg.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">{reg.id}</td>
                    <td className="p-4">{reg.metric}</td>
                    <td className="p-4 text-red-500 font-semibold">{reg.delta}</td>
                    <td className="p-4">
                      <Badge variant={reg.severity === 'High' ? 'destructive' : reg.severity === 'Medium' ? 'default' : 'secondary'}>
                        {reg.severity}
                      </Badge>
                    </td>
                    <td className="p-4">{reg.status}</td>
                    <td className="p-4 text-muted-foreground">{reg.date}</td>
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
