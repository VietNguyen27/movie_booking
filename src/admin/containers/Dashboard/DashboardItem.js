import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const DashboardItem = ({ dashboardItem }) => {
  const { title, link, color, icon } = dashboardItem;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios.get(`http://localhost:5000/${link}`).then((res) => {
        const data = res.data;
        setData(data);
      });
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className={`bg-${color} text-light-gray`}>
        <div className='flex justify-between px-4 py-6'>
          <div>
            <p className='text-4xl font-bold pb-2'>{data.length}</p>
            <p className='text-lg capitalize'>{title}</p>
          </div>
          <span className='text-dark-blue text-6xl opacity-75'>
            <i className={`fas fa-${icon}`}></i>
          </span>
        </div>
        <NavLink
          to={`/${link}`}
          className='dashboard-link block text-lg text-center py-2  '
        >
          Xem thêm
        </NavLink>
      </div>
    </div>
  );
};

export default DashboardItem;
