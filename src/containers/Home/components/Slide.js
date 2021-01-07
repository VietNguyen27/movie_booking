import React, { Fragment } from 'react';
import './styles/Slide.css';
import { convertTitle, convertList, convertDate } from 'utils/Convert';
import ModalVideo from 'components/Modal/ModalVideo/ModalVideo';
import useModal from 'components/Modal/useModal';

const Slide = ({ movieItem, x }) => {
  const {
    id,
    title,
    genres,
    actors,
    duration,
    storyline,
    release_date,
    poster_url,
    trailer_url,
  } = movieItem;
  const { isShowing, toggle } = useModal();

  return (
    <Fragment>
      <div
        className='slide px-2'
        style={{
          minWidth: '100%',
          transform: `translateX(${x}%)`,
        }}
      >
        <div className='slide-container'>
          <div className='slide-content'>
            <div className='slide-left'>
              <img src={poster_url} alt='' />
              <a
                className='btn btn-primary btn-trailer'
                onClick={() => toggle()}
              >
                Trailer
              </a>
              <a
                href={`movies/${id}/${convertTitle(title)}`}
                className='btn btn-secondary btn-booking'
              >
                Mua vé
              </a>
            </div>
            <div className='slide-right'>
              <h1 className='text-xl text-secondary font-medium tracking-wide uppercase pb-2 md:text-2xl'>
                {title}
              </h1>
              <p className='storyline text-base md:text-lg'>{storyline}</p>
              <p className='text-lg text-secondary font-medium pt-2 md:text-xl sm:pt-5'>
                {convertList(genres)}
              </p>
              <p className='text-base font-medium md:text-lg'>
                {convertList(actors)}
              </p>
              <div className='flex pt-2 sm:pt-3'>
                <div className='w-1/2'>
                  <p className='text-base font-medium md:text-lg'>
                    Ngày ra mắt:
                  </p>
                  <span className='text-lg text-secondary font-medium md:text-2xl'>
                    {convertDate(release_date)}
                  </span>
                </div>
                <div className='w-1/2'>
                  <p className='text-base font-medium md:text-lg'>
                    Thời lượng:
                  </p>
                  <span className='text-lg text-secondary font-medium md:text-2xl'>
                    {duration}
                  </span>
                </div>
              </div>
            </div>
          </div>
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

export default Slide;
