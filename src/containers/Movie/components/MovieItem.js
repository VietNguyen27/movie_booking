import React, { Fragment } from 'react';
import './MovieItem.css';
import { convertTitle, convertList, convertDate } from 'utils/Convert';
import ModalVideo from 'components/Modal/ModalVideo/ModalVideo';
import useModal from 'components/Modal/useModal';

const MovieItem = ({ movieItem }) => {
  const {
    id,
    title,
    genres,
    duration,
    release_date,
    poster_url,
    trailer_url,
  } = movieItem;
  const { isShowing, toggle } = useModal();

  return (
    <Fragment>
      <div className='movie-item bg-white flex flex-col rounded-lg overflow-hidden mb-2'>
        <div className='relative mb-2'>
          <img src={poster_url} alt='' />
          <a className='btn btn-primary btn-trailer' onClick={() => toggle()}>
            Trailer
          </a>
          <a
            href={`movies/${id}/${convertTitle(title)}`}
            className='btn btn-secondary btn-booking'
          >
            Mua vé
          </a>
        </div>
        <div className='px-3 py-2'>
          <p>
            <span className='font-semibold'>Tên phim:</span> {title}
          </p>
          <p>
            <span className='font-semibold'>Thể loại:</span>{' '}
            {convertList(genres)}
          </p>
          <p>
            <span className='font-semibold'>Thời lượng:</span> {duration}
          </p>
          <p>
            <span className='font-semibold'>Khởi chiếu:</span>{' '}
            {convertDate(release_date)}
          </p>
        </div>
      </div>
      <ModalVideo
        isShowing={isShowing}
        toggle={toggle}
        trailer_url={trailer_url}
      />
    </Fragment>
  );
};

export default MovieItem;
