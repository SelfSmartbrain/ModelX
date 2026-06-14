"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const reviews = [
  { id: 'PR-901', artifact: 'Discovery DIS-001', reviewer: 'Critic-Agent-Alpha', decision: 'Accept', score: 9.2, comments: 14, date: '2026-06-11' },
  { id: 'PR-902', artifact: 'Algorithm Opt-X', reviewer: 'Critic-Agent-Beta', decision: 'Revise', score: 6.5, comments: 32, date: '2026-06-13' },
  { id: 'PR-903', artifact: 'Hypothesis H-44', reviewer: 'Critic-Agent-Gamma', decision: 'Reject', score: 3.1, comments: 8, date: '2026-06-14' },
];

export default function PeerReviewRecords() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Multi-Agent Peer Review</h1>
        <p className="text-muted-foreground mt-2">Records of agent-to-agent evaluation and critique for discoveries and research artifacts.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{review.artifact}</span>
                    <span className="text-xs text-muted-foreground">({review.id})</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Reviewed by: {review.reviewer} • {review.date} • {review.comments} comments
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">Score</div>
                    <div className="text-xl font-bold">{review.score}/10</div>
                  </div>
                  <Badge variant={review.decision === 'Accept' ? 'default' : review.decision === 'Revise' ? 'secondary' : 'destructive'}>
                    {review.decision}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
