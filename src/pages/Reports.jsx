import React from 'react';
import Button from '../components/common/Button';
import { HiDownload, HiCalendar } from 'react-icons/hi';

const Reports = () => {
  const reports = [
    { name: 'Monthly Scan Report', date: 'Dec 2025', size: '2.4 MB', type: 'PDF' },
    { name: 'Fraud Analysis', date: 'Dec 2025', size: '1.8 MB', type: 'Excel' },
    { name: 'User Activity', date: 'Nov 2025', size: '3.1 MB', type: 'PDF' },
    { name: 'QR Code Usage', date: 'Nov 2025', size: '1.5 MB', type: 'Excel' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-gray-600">Generate and download system reports</p>
        </div>
        <Button>
          <HiCalendar className="inline mr-2" />
          Generate New Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Quick Reports</h2>
          <div className="space-y-4">
            <Button variant="secondary" className="w-full justify-between">
              <span>Today's Scans</span>
              <HiDownload />
            </Button>
            <Button variant="secondary" className="w-full justify-between">
              <span>Weekly Summary</span>
              <HiDownload />
            </Button>
            <Button variant="secondary" className="w-full justify-between">
              <span>Monthly Performance</span>
              <HiDownload />
            </Button>
            <Button variant="secondary" className="w-full justify-between">
              <span>Fraud Logs</span>
              <HiDownload />
            </Button>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Recent Reports</h2>
          <div className="space-y-4">
            {reports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{report.name}</p>
                  <p className="text-sm text-gray-600">{report.date} • {report.size} • {report.type}</p>
                </div>
                <Button size="sm" variant="secondary">
                  <HiDownload className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Custom Report Generator</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Report Type</label>
            <select className="input-field">
              <option>Scan Activity</option>
              <option>User Statistics</option>
              <option>Fraud Analysis</option>
              <option>Revenue Report</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Date Range</label>
            <select className="input-field">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last quarter</option>
              <option>Custom range</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Format</label>
            <select className="input-field">
              <option>PDF</option>
              <option>Excel</option>
              <option>CSV</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button className="w-full">Generate Report</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;