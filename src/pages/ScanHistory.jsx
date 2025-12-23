import React, { useState } from 'react';
import Table from '../components/common/Table';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { HiDownload, HiEye } from 'react-icons/hi';

const ScanHistory = () => {
  const [filter, setFilter] = useState('all');
  
  const scanData = [
    ['QR-001', 'John Doe', 'Success', '2025-12-23 10:30', 'Bangalore', '+50'],
    ['QR-002', 'Jane Smith', 'Success', '2025-12-23 11:15', 'Mumbai', '+50'],
    ['QR-003', 'Bob Wilson', 'Fraud', '2025-12-23 12:00', 'Delhi', '0'],
    ['QR-004', 'Alice Brown', 'Success', '2025-12-22 09:45', 'Chennai', '+50'],
    ['QR-005', 'Charlie Lee', 'Invalid', '2025-12-22 14:20', 'Hyderabad', '0'],
  ];

  const headers = ['QR Code', 'User', 'Status', 'Timestamp', 'Location', 'Points'];

  const filteredData = scanData.filter(row => {
    if (filter === 'all') return true;
    if (filter === 'success') return row[2] === 'Success';
    if (filter === 'fraud') return row[2] === 'Fraud';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Scan History</h1>
          <p className="text-gray-600">View all product scan attempts</p>
        </div>
        <Button>
          <HiDownload className="inline mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="card">
        <div className="flex gap-4 mb-6">
          <Button 
            variant={filter === 'all' ? 'primary' : 'secondary'}
            onClick={() => setFilter('all')}
          >
            All Scans
          </Button>
          <Button 
            variant={filter === 'success' ? 'primary' : 'secondary'}
            onClick={() => setFilter('success')}
          >
            Successful
          </Button>
          <Button 
            variant={filter === 'fraud' ? 'primary' : 'secondary'}
            onClick={() => setFilter('fraud')}
          >
            Fraud Attempts
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <Input 
            placeholder="Search by QR code or user..."
            className="flex-1"
          />
          <Input 
            type="date"
            placeholder="From date"
          />
          <Input 
            type="date"
            placeholder="To date"
          />
          <Button>Search</Button>
        </div>

        <Table headers={headers} data={filteredData} />

        <div className="mt-6 flex justify-between items-center">
          <p className="text-gray-600">
            Showing {filteredData.length} of {scanData.length} scans
          </p>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">Previous</Button>
            <Button variant="primary" size="sm">1</Button>
            <Button variant="secondary" size="sm">2</Button>
            <Button variant="secondary" size="sm">3</Button>
            <Button variant="secondary" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanHistory;