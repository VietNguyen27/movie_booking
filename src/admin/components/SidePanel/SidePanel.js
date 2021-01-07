import React from 'react';
import './SidePanel.css';
import { NavLink } from 'react-router-dom';
import { getUser } from 'utils/Common';

const SidePanel = ({ showPanel }) => {
  const user = getUser();

  return (
    <div
      className='side-panel'
      style={{
        transform: showPanel ? 'translateX(0)' : 'translateX(-100%)',
      }}
    >
      <p className='bg-dark-blue text-light-gray text-xl font-medium text-center py-4 md:text-2xl'>
        Cinema Đà Nẵng
      </p>
      <div className='h-full bg-primary text-dark-blue'>
        <div className='flex items-center p-4'>
          <img
            src='https://static.thenounproject.com/png/363640-200.png'
            alt=''
            style={{ width: '50px', height: '50px' }}
          />
          <div className='pl-4'>
            <p>{user.name}</p>
            <p className='flex items-center'>
              <i
                className='fas fa-circle text-green pr-1'
                style={{ fontSize: '10px' }}
              ></i>{' '}
              Online
            </p>
          </div>
        </div>
        <div className='flex flex-col'>
          <NavLink
            exact={true}
            to='/'
            className='text-base px-4 py-2 md:text-lg'
          >
            <span className='inline-block w-8 text-center'>
              <i className='fas fa-home'></i>
            </span>{' '}
            Trang chủ
          </NavLink>
          <NavLink
            exact={true}
            to='/cinemas'
            className='text-base px-4 py-2 md:text-lg'
          >
            <span className='inline-block w-8 text-center'>
              <i className='fas fa-door-open'></i>
            </span>{' '}
            Rạp chiếu phim
          </NavLink>
          <NavLink
            exact={true}
            to='/movies'
            className='text-base px-4 py-2 md:text-lg'
          >
            <span className='inline-block w-8 text-center'>
              <i className='fas fa-film'></i>
            </span>{' '}
            Phim
          </NavLink>
          <NavLink
            exact={true}
            to='/users'
            className='text-base px-4 py-2 md:text-lg'
          >
            <span className='inline-block w-8 text-center'>
              <i className='fas fa-user'></i>
            </span>{' '}
            Người dùng
          </NavLink>
          <NavLink
            exact={true}
            to='/tickets'
            className='text-base px-4 py-2 md:text-lg'
          >
            <span className='inline-block w-8 text-center'>
              <i className='fas fa-ticket-alt'></i>
            </span>{' '}
            Danh sách vé
          </NavLink>
          <NavLink
            exact={true}
            to='/showings'
            className='text-base px-4 py-2 md:text-lg'
          >
            <span className='inline-block w-8 text-center'>
              <i className='far fa-clock'></i>
            </span>{' '}
            Lịch chiếu
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
