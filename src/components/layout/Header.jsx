import React from 'react';
import { HiBell, HiSearch, HiUserCircle } from 'react-icons/hi';
import { authService } from '../../services/auth';

const Header = () => {
  const user = authService.getCurrentUser();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
            <HiBell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-3">
            <HiUserCircle className="w-8 h-8 text-gray-400" />
            <div>
              <p className="text-sm font-medium">{user?.name || 'Admin'}</p>
              <p className="text-xs text-gray-500">{user?.role || 'Super Admin'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;