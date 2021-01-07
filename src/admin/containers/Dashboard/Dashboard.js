import React from 'react';
import './Dashboard.css';
import Title from 'components/PageTitle/Title';
import DashboardItem from './DashboardItem';

const Dashboard = () => {
  const navLink = [
    { title: 'Rạp', link: 'cinemas', color: 'orange', icon: 'door-open' },
    { title: 'Phim', link: 'movies', color: 'blue', icon: 'film' },
    { title: 'Người dùng', link: 'users', color: 'green', icon: 'user' },
    { title: 'Vé đã đặt', link: 'tickets', color: 'red', icon: 'ticket-alt' },
  ];

  return (
    <div className='px-4 py-3'>
      <Title title='Trang chủ' />
      <div className='grid grid-cols-2 gap-4 py-4 xl:grid-cols-4'>
        {navLink.map((dashboardItem, index) => {
          return <DashboardItem key={index} dashboardItem={dashboardItem} />;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
