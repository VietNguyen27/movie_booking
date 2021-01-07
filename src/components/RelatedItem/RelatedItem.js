import React from 'react';
import { convertTitle } from 'utils/Convert';

const RelateItem = ({ relateItem, category }) => {
  const { id, title, image_url } = relateItem;

  return (
    <div>
      <div style={styleImage}>
        <a href={`/${category}/${id}/${convertTitle(title)}`}>
          <img src={image_url} alt='' />
        </a>
      </div>
      <a
        href={`/${category}/${id}/${convertTitle(title)}`}
        className='text-sm sm:text-base'
      >
        {title}
      </a>
    </div>
  );
};

const styleImage = {
  maxHeight: '150px',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '1px 0 10px rgba(0, 0, 0, 0.33)',
  marginBottom: '8px',
};

export default RelateItem;
