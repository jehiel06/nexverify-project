import React from 'react';
import Button from '../components/common/Button';
import { HiRefresh, HiDownload } from 'react-icons/hi';

const ScanMap = () => {
  // Simple map visualization with boxes (replace with actual map library)
  const locations = [
    { city: 'Bangalore', scans: 245, color: 'bg-green-500' },
    { city: 'Mumbai', scans: 189, color: 'bg-blue-500' },
    { city: 'Delhi', scans: 167, color: 'bg-yellow-500' },
    { city: 'Chennai', scans: 98, color: 'bg-purple-500' },
    { city: 'Hyderabad', scans: 76, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Scan Map</h1>
          <p className="text-gray-600">Geographic view of scan activity</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">
            <HiRefresh className="inline mr-2" />
            Refresh
          </Button>
          <Button>
            <HiDownload className="inline mr-2" />
            Export Map
          </Button>
        </div>
      </div>

      <div className="card">
        <div className="h-96 bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
          {/* Placeholder for map - replace with Leaflet/Google Maps */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-gray-500">Map visualization would appear here</p>
            <p className="text-sm text-gray-400">Integrate with Leaflet or Google Maps API</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Scan Locations Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {locations.map((location, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{location.city}</span>
                  <div className={`w-3 h-3 rounded-full ${location.color}`}></div>
                </div>
                <p className="text-2xl font-bold">{location.scans}</p>
                <p className="text-sm text-gray-600">scans</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Recent Scan Locations</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">User</th>
                  <th className="text-left py-2">Location</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-2">John Doe</td>
                  <td className="py-2">Bangalore (12.9716, 77.5946)</td>
                  <td className="py-2"><span className="text-green-600">Success</span></td>
                  <td className="py-2">10:30 AM</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-2">Jane Smith</td>
                  <td className="py-2">Mumbai (19.0760, 72.8777)</td>
                  <td className="py-2"><span className="text-green-600">Success</span></td>
                  <td className="py-2">11:15 AM</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2">Bob Wilson</td>
                  <td className="py-2">Delhi (28.6139, 77.2090)</td>
                  <td className="py-2"><span className="text-red-600">Fraud</span></td>
                  <td className="py-2">12:00 PM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanMap;