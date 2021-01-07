import React from 'react';
import './PostItem.css';
import { convertTitle, convertDate } from 'utils/Convert';

const PostItem = ({ postItem, category }) => {
  const { id, title, date, description, image_url } = postItem;

  return (
    <div className='post-item w-full flex flex-wrap gap-3 sm:flex-nowrap'>
      <div className='w-full sm:w-1/2'>
        <a href={`${category}/${id}/${convertTitle(title)}`}>
          <img src={image_url} alt='' className='rounded-lg' />
        </a>
      </div>
      <div className='w-full sm:w-1/2'>
        <div className='pb-0 sm:pb-2'>
          <a
            href={`${category}/${id}/${convertTitle(title)}`}
            className='block text-base font-semibold sm:text-lg'
          >
            {title}
          </a>
          <small className='text-sm font-semibold sm:text-base'>
            <span className='pr-1'>
              <i className='far fa-clock'></i>
            </span>{' '}
            {convertDate(date)}
          </small>
        </div>
        <p className='text-sm text-justify sm:text-base'>{description}</p>
      </div>
    </div>
  );
};

export default PostItem;
