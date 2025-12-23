import React from 'react';
import { HiQrcode, HiClock, HiCheckCircle, HiXCircle } from 'react-icons/hi';
import Button from '../components/common/Button';

const Dashboard = () => {
  const stats = [
    { label: 'Total QR Codes', value: '1,245', icon: <HiQrcode />, change: '+12%', color: 'bg-blue-500' },
    { label: 'Total Scans', value: '8,567', icon: <HiClock />, change: '+8%', color: 'bg-green-500' },
    { label: 'Successful Scans', value: '7,892', icon: <HiCheckCircle />, change: '+5%', color: 'bg-green-500' },
    { label: 'Fraud Attempts', value: '45', icon: <HiXCircle />, change: '-2%', color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your system.</p>
        </div>
        <Button>Generate Report</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
                <p className="text-sm mt-1">
                  <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                    {stat.change}
                  </span>{' '}
                  from last month
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                <div className="w-6 h-6">{stat.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Recent Scans</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">QR Code #{1000 + item}</p>
                  <p className="text-sm text-gray-600">User {item} • {item === 2 ? 'Fraud' : 'Success'}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item === 2 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {item === 2 ? 'Fraud' : 'Success'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>API Service</span>
              <span className="text-green-600 font-medium">✓ Operational</span>
            </div>
            <div className="flex justify-between">
              <span>Database</span>
              <span className="text-green-600 font-medium">✓ Operational</span>
            </div>
            <div className="flex justify-between">
              <span>QR Generation</span>
              <span className="text-green-600 font-medium">✓ Operational</span>
            </div>
            <div className="flex justify-between">
              <span>Email Service</span>
              <span className="text-green-600 font-medium">✓ Operational</span>
            </div>
          </div>
          <Button className="w-full mt-6">View System Logs</Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;