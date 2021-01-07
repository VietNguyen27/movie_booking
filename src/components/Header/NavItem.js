import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ navLink, onClick }) => {
  const { title, link } = navLink;

  return (
    <li className='block w-full px-2 md:inline-block md:w-auto'>
      <NavLink
        to={`/${link}`}
        exact={true}
        className='font-semibold block md:inline-block'
        isActive={(match, location) => {
          const pathStrings = location.pathname.split('/');
          if (match) {
            return true;
          } else if (pathStrings[1] === link) {
            return true;
          } else if (
            (link === 'review' && pathStrings[1] === 'news') ||
            (link === 'review' && pathStrings[1] === 'video')
          ) {
            return true;
          } else {
            return false;
          }
        }}
        onClick={() => onClick()}
      >
        {title}
      </NavLink>
    </li>
  );
};

export default NavItem;
