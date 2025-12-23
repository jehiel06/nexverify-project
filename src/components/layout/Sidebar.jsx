import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HiHome, HiQrcode, HiClock, HiMap, HiChartBar, HiCog, HiLogout } from 'react-icons/hi';
import { authService } from '../../services/auth';

const Sidebar = () => {
  const navigate = useNavigate();
  
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <HiHome className="w-5 h-5" /> },
    { path: '/qrcodes', label: 'QR Codes', icon: <HiQrcode className="w-5 h-5" /> },
    { path: '/scans', label: 'Scan History', icon: <HiClock className="w-5 h-5" /> },
    { path: '/map', label: 'Scan Map', icon: <HiMap className="w-5 h-5" /> },
    { path: '/reports', label: 'Reports', icon: <HiChartBar className="w-5 h-5" /> },
    { path: '/settings', label: 'Settings', icon: <HiCog className="w-5 h-5" /> },
  ];

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col md:border-r md:border-gray-200 md:bg-white">
      <div className="flex flex-col flex-1 pt-5">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold text-blue-600">NexVerify</h1>
        </div>
        <nav className="mt-8 flex-1 space-y-1 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
          
          <button
            onClick={handleLogout}
            className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900 w-full mt-8"
          >
            <HiLogout className="mr-3 w-5 h-5" />
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;