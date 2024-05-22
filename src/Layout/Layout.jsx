import React from 'react';
import Sidebar from '../components/Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow bg-gray-100 p-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;