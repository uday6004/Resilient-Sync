import React, { useState, useEffect } from 'react';
import { Layout, Smartphone, Monitor, CheckCircle, Cloud, CloudOff } from 'lucide-react';

const TaskSyncApp = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Simulate Cross-Platform Sync via LocalStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('sync_tasks')) || [];
    setTasks(savedTasks);

    const handleStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);
    return () => {
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
    };
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTask = {
      id: Date.now(),
      text: inputValue,
      status: 'synced',
      timestamp: new Date().toISOString()
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('sync_tasks', JSON.stringify(updatedTasks));
    setInputValue('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header Section: Scalable Architecture Info */}
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Resilient Sync Engine</h1>
            <p className="text-sm text-gray-500">Cross-platform state parity demonstration</p>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${isOnline ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
            {isOnline ? <Cloud size={16} /> : <CloudOff size={16} />}
            {isOnline ? 'Cloud Synchronized' : 'Local Persistence Mode'}
          </div>
        </header>

        {/* Responsive Grid: Changes density based on screen size */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <form onSubmit={addTask} className="md:col-span-1 space-y-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="font-semibold flex items-center gap-2 text-gray-700">
              <Smartphone size={18} /> Input Module
            </h2>
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter new task..."
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors">
              Commit Local State
            </button>
          </form>

          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="font-semibold mb-4 flex items-center gap-2 text-gray-700">
              <Monitor size={18} /> Scalable Output Density
            </h2>
            {tasks.length === 0 ? (
              <div className="text-center py-10 text-gray-400 border-2 border-dashed border-gray-100 rounded-lg">
                No active states detected in local store.
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.map(task => (
                  <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-all">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-blue-500" size={20} />
                      <span className="text-gray-700">{task.text}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">
                      {task.timestamp.split('T')[1].slice(0, 8)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskSyncApp;
