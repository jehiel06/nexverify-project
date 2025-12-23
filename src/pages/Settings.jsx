import React, { useState } from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { HiSave, HiBell, HiShieldCheck, HiCog } from 'react-icons/hi';

const Settings = () => {
  const [settings, setSettings] = useState({
    companyName: 'NexVerify Inc.',
    adminEmail: 'admin@nexverify.com',
    pointsPerScan: 50,
    enableNotifications: true,
    fraudAlertEmail: true,
    autoGenerateReports: false,
  });

  const handleChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Save settings to backend
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-600">Configure your system preferences</p>
        </div>
        <Button onClick={handleSave}>
          <HiSave className="inline mr-2" />
          Save Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <HiCog className="text-gray-600" />
              General Settings
            </h2>
            <div className="space-y-4">
              <Input
                label="Company Name"
                value={settings.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
              />
              <Input
                label="Admin Email"
                type="email"
                value={settings.adminEmail}
                onChange={(e) => handleChange('adminEmail', e.target.value)}
              />
              <Input
                label="Points per Scan"
                type="number"
                value={settings.pointsPerScan}
                onChange={(e) => handleChange('pointsPerScan', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <HiBell className="text-gray-600" />
              Notifications
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-600">Receive email alerts for system events</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableNotifications}
                    onChange={(e) => handleChange('enableNotifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Fraud Alerts</p>
                  <p className="text-sm text-gray-600">Get notified about fraud attempts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.fraudAlertEmail}
                    onChange={(e) => handleChange('fraudAlertEmail', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <HiShieldCheck className="text-gray-600" />
              Security
            </h2>
            <div className="space-y-4">
              <Button variant="secondary" className="w-full">
                Change Password
              </Button>
              <Button variant="secondary" className="w-full">
                Two-Factor Auth
              </Button>
              <Button variant="secondary" className="w-full">
                API Keys
              </Button>
            </div>
          </div>

          <div className="card">
            <h3 className="font-bold mb-4">System Info</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Version</span>
                <span>1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Database</span>
                <span>PostgreSQL 15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Backup</span>
                <span>2025-12-22</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Uptime</span>
                <span>99.8%</span>
              </div>
            </div>
          </div>

          <div className="card bg-red-50 border-red-200">
            <h3 className="font-bold mb-2 text-red-700">Danger Zone</h3>
            <p className="text-sm text-red-600 mb-4">
              These actions are irreversible. Proceed with caution.
            </p>
            <div className="space-y-2">
              <Button variant="danger" className="w-full">
                Clear All Data
              </Button>
              <Button variant="danger" className="w-full">
                Reset System
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;