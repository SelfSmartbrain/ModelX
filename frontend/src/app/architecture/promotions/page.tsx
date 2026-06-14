"use client";

import React from 'react';

const mockPromotions = [
  { date: '2026-06-14T10:00:00Z', variant: 'gen-8-a1b2', baselineReplaced: 'gen-7-c3d4', fitnessGain: '+0.01', reason: 'Better generalized throughput' },
  { date: '2026-06-12T14:30:00Z', variant: 'gen-7-c3d4', baselineReplaced: 'gen-6-a1b2', fitnessGain: '+0.02', reason: 'Lower latency under load' },
  { date: '2026-06-10T09:15:00Z', variant: 'gen-6-a1b2', baselineReplaced: 'gen-5-x9y0', fitnessGain: '+0.03', reason: 'Higher accuracy on eval set' },
];

export default function PromotionsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Variant Promotions</h1>
      <p className="text-gray-600 mb-6">History of candidate variants successfully replacing the active baseline.</p>

      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Promoted Variant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Baseline Replaced</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fitness Gain</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockPromotions.map((promo, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(promo.date).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{promo.variant}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">{promo.baselineReplaced}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">{promo.fitnessGain}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{promo.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
