"use client";

import React, { useState, useEffect } from 'react';

const mockProjectDetails = {
  id: '1',
  name: 'Alpha Migration',
  description: 'Migrating legacy systems to the new autonomous infrastructure.',
  status: 'Active',
  progress: 75,
  tasks: [
    { id: 't1', name: 'Requirement Analysis', start: 0, duration: 10, status: 'Completed' },
    { id: 't2', name: 'Architecture Design', start: 10, duration: 15, status: 'Completed' },
    { id: 't3', name: 'Implementation', start: 25, duration: 40, status: 'In Progress' },
    { id: 't4', name: 'Testing & QA', start: 65, duration: 20, status: 'Pending' },
    { id: 't5', name: 'Deployment', start: 85, duration: 15, status: 'Pending' }
  ]
};

export default function ProjectDetails({ params }: { params: { id: string } }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen text-gray-900">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{mockProjectDetails.name}</h1>
          <p className="text-gray-600 mt-2">{mockProjectDetails.description}</p>
        </div>
        <div className="text-right">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {mockProjectDetails.status}
          </span>
          <p className="text-2xl font-bold mt-2">{mockProjectDetails.progress}%</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-6">Task Breakdown (Gantt View)</h2>
        <div className="space-y-4">
          <div className="flex text-sm text-gray-500 mb-2 border-b pb-2">
            <div className="w-1/4">Task Name</div>
            <div className="w-3/4 flex justify-between px-2">
              <span>Start</span>
              <span>Midpoint</span>
              <span>End</span>
            </div>
          </div>
          {mockProjectDetails.tasks.map(task => (
            <div key={task.id} className="flex items-center">
              <div className="w-1/4 pr-4 truncate font-medium text-sm">
                {task.name}
              </div>
              <div className="w-3/4 relative h-6 bg-gray-100 rounded">
                <div 
                  className={`absolute h-full rounded flex items-center px-2 text-xs text-white ${
                    task.status === 'Completed' ? 'bg-green-500' :
                    task.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-400'
                  }`}
                  style={{ left: `${task.start}%`, width: `${task.duration}%` }}
                >
                  <span className="truncate">{task.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Detailed Tasks</h2>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2">ID</th>
              <th className="py-2">Task</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockProjectDetails.tasks.map(task => (
              <tr key={task.id} className="border-b">
                <td className="py-2 text-gray-500">{task.id}</td>
                <td className="py-2">{task.name}</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {task.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
