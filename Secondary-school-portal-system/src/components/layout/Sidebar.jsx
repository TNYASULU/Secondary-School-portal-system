import React from 'react';
import { NavLink } from 'react-router-dom';
import { GraduationCap, FileText, DollarSign, Calendar, Book, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', path: '/dashboard', icon: GraduationCap },
    { name: 'Results', path: '/results', icon: FileText },
    { name: 'Fees', path: '/fees', icon: DollarSign },
    { name: 'Calendar', path: '/calendar', icon: Calendar },
    { name: 'School Rules', path: '/rules', icon: Book }
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <>
      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-30 h-screen w-64 bg-white shadow-lg 
        transform transition-transform duration-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <nav className="h-full flex flex-col p-4 space-y-2 mt-20 lg:mt-4">
          {/* Navigation items */}
          <div className="space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-blue-50 text-blue-600 font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
          
          {/* Logout button at the bottom */}
          <div className="mt-auto pt-4 border-t border-gray-200">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}