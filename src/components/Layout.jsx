import React from 'react';
import Sidebar from './Sidebar';
// import Header from './Header';
// Correct the import statement
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <div>
        <Sidebar />
        <div className='ml-16 md:ml-56'>
          {/* <Header /> */}
          <Outlet /> {/* Correctly imported Outlet component */}
        </div>
      </div>
    </div>
  );
}

export default Layout;
