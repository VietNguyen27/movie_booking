import React, { useState } from 'react';
import NavItem from './NavItem';

const Navbar = ({ searchMovie, onClick }) => {
  const navLinks = [
    {
      title: 'Trang chủ',
      link: '',
    },
    {
      title: 'Phim',
      link: 'movies',
    },
    {
      title: 'Khuyến mãi - Sự kiện',
      link: 'events',
    },
    {
      title: 'Tin tức',
      link: 'review',
    },
    {
      title: 'Hệ thống Rạp',
      link: 'cinemas',
    },
    {
      title: 'Liên hệ',
      link: 'contact',
    },
  ];
  const [value, setValue] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    searchMovie(value);
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <ul className='w-full flex flex-wrap justify-end items-center'>
      <li className='w-full block sm:hidden'>
        <form
          className='input-group w-full block px-4'
          onSubmit={(e) => onSubmit(e)}
        >
          <input
            type='text'
            value={value}
            placeholder='Tìm kiếm phim...'
            autoComplete='off'
            onChange={(e) => onChange(e)}
          />
          <button className='text-dark-blue'>
            <i className='fas fa-search'></i>
          </button>
        </form>
      </li>
      {navLinks.map((navLink, index) => {
        return <NavItem key={index} navLink={navLink} onClick={onClick} />;
      })}
    </ul>
  );
};

export default Navbar;
