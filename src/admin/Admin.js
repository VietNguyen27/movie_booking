import React, { useState } from 'react';
import SidePanel from './components/SidePanel/SidePanel';
import AdminHeader from './components/Header/Header';
import Routes from 'Routes.js';

const Admin = () => {
  const [showPanel, setShowPanel] = useState(true);

  const handlePanel = () => {
    setShowPanel(!showPanel);
  };

  return (
    <div className='admin'>
      <SidePanel showPanel={showPanel} />
      <div
        className='main-content'
        style={{
          marginLeft: showPanel ? '280px' : '0px',
        }}
      >
        <AdminHeader handlePanel={handlePanel} />
        <Routes />
      </div>
    </div>
  );
};
export default Admin;
