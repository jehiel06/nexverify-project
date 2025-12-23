import React from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const QRCodeManager = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">QR Code Manager</h1>
          <p className="text-gray-600">Manage and generate QR codes</p>
        </div>
        <Button>Generate QR Codes</Button>
      </div>
      
      <div className="card">
        <div className="space-y-4">
          <Input label="Product Name" placeholder="Enter product name" />
          <Input label="Batch Number" placeholder="Enter batch number" />
          <Input label="Quantity" type="number" placeholder="Number of QR codes" />
          <Button className="w-full">Generate QR Codes</Button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeManager;