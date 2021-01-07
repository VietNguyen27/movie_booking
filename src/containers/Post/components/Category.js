import React from 'react';
import './Category.css';
import { NavLink } from 'react-router-dom';

const Category = () => {
  return (
    <div className='category w-full order-1 rounded-lg overflow-hidden md:w-1/3 md:order-2'>
      <h2 className='bg-primary text-secondary text-lg font-semibold px-3 py-2'>
        Chuyên mục
      </h2>
      <div className='category-item bg-white px-3 py-2'>
        <NavLink
          exact={true}
          to='/review'
          className='inline-block text-dark-blue text-md font-semibold pb-2'
        >
          Đánh giá phim
        </NavLink>
        <p className='text-dark-blue text-sm'>
          Góc nhìn chân thật, đánh giá chi tiết, khách quan nhất về các bộ phim.
        </p>
      </div>
      <div className='category-item bg-white px-3 py-2'>
        <NavLink
          to='/news'
          className='inline-block text-dark-blue text-md font-semibold pb-2'
        >
          Tin điện ảnh
        </NavLink>
        <p className='text-dark-blue text-sm'>
          Tin tức điện ảnh về Việt Nam & Thế giới.
        </p>
      </div>
      <div className='category-item bg-white px-3 py-2'>
        <NavLink
          to='/video'
          className='inline-block text-dark-blue text-md font-semibold pb-2'
        >
          Video - Trailer
        </NavLink>
        <p className='text-dark-blue text-sm'>
          Video, trailer những phim chiếu rạp hot nhất.
        </p>
      </div>
    </div>
  );
};

export default Category;
