"use client";

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const mockProjects = [
  { id: '1', name: 'Alpha Migration', status: 'Active', progress: 75, resourceUsage: 80 },
  { id: '2', name: 'Beta Optimization', status: 'Active', progress: 40, resourceUsage: 60 },
  { id: '3', name: 'Gamma Release', status: 'Completed', progress: 100, resourceUsage: 90 },
  { id: '4', name: 'Delta Research', status: 'Active', progress: 15, resourceUsage: 30 },
];

const mockMilestones = [
  { name: 'Q1 Goals', completed: 10, pending: 2 },
  { name: 'Q2 Goals', completed: 5, pending: 8 },
  { name: 'Q3 Goals', completed: 0, pending: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function ProjectsOverview() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen text-gray-900">
      <h1 className="text-3xl font-bold">Projects Overview Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Active Projects</h2>
          <p className="text-4xl font-bold text-blue-600">
            {mockProjects.filter(p => p.status === 'Active').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Completed Projects</h2>
          <p className="text-4xl font-bold text-green-600">
            {mockProjects.filter(p => p.status === 'Completed').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Avg Progress</h2>
          <p className="text-4xl font-bold text-purple-600">
            {Math.round(mockProjects.reduce((acc, p) => acc + p.progress, 0) / mockProjects.length)}%
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Resources</h2>
          <p className="text-4xl font-bold text-orange-600">85% Utilized</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow h-96">
          <h2 className="text-xl font-semibold mb-4">Milestones Tracker</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockMilestones}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" stackId="a" fill="#82ca9d" name="Completed" />
              <Bar dataKey="pending" stackId="a" fill="#8884d8" name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow h-96">
          <h2 className="text-xl font-semibold mb-4">Resource Allocation</h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockProjects}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="resourceUsage"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {mockProjects.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Project Name</th>
              <th className="py-2">Status</th>
              <th className="py-2">Progress</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockProjects.map(project => (
              <tr key={project.id} className="border-b">
                <td className="py-3">{project.name}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded text-sm ${project.status === 'Active' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                    {project.status}
                  </span>
                </td>
                <td className="py-3">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 max-w-xs">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                  </div>
                </td>
                <td className="py-3">
                  <a href={`/projects/${project.id}`} className="text-blue-600 hover:underline">View Details</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
