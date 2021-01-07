import React from 'react';
import './Header.css';
import { removeUserSession } from 'utils/Common';
import { useHistory } from 'react-router-dom';

const Header = ({ handlePanel }) => {
  const history = useHistory();

  const handleLogout = () => {
    removeUserSession();
    history.push('/');
    window.location.reload();
  };

  return (
    <div className='flex justify-between w-full bg-dark-blue text-light-gray px-4 py-4'>
      <button className='text-xl md:text-2xl'>
        <span onClick={() => handlePanel()}>
          <i className='fas fa-bars'></i>
        </span>
      </button>
      <button
        className='text-base font-bold uppercase ml-2 mr-0'
        onClick={() => handleLogout()}
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default Header;
