import React, { Fragment, useState, useEffect } from 'react';
import './DetailMoviePage.css';
import Tabs from 'components/Tabs/Tabs';
import Title from 'components/PageTitle/Title';
import useModal from 'components/Modal/useModal';
import ModalVideo from 'components/Modal/ModalVideo/ModalVideo';
import {
  convertTitle,
  convertDate,
  convertList,
  formatDate,
  formatTime,
} from 'utils/Convert';
import axios from 'axios';

const DetailMoviePage = (props) => {
  const movieId = props.match.params.id;
  const todayDate = new Date().toISOString().slice(0, 10);
  const [movieDetail, setMovieDetail] = useState([]);
  const [dates, setDates] = useState([]);
  const [selectDate, setSelectDate] = useState(todayDate);
  const [cinemaData, setCinemaData] = useState([]);
  const [shows, setShows] = useState([]);
  const [activeIndex, setActiveIndex] = useState();
  const { isShowing, toggle } = useModal();

  const {
    title,
    genres,
    duration,
    release_date,
    storyline,
    actors,
    poster_url,
    poster_horizontal,
    trailer_url,
  } = movieDetail;

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`http://localhost:5000/movies/${movieId}`)
        .then((res) => {
          const movieData = res.data;
          setMovieDetail(movieData);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get('http://localhost:5000/cinemas')
        .then((res) => {
          const cinemaData = res.data;
          setCinemaData(cinemaData);
        })
        .catch((error) => console.log(error));

      const dates = [];
      for (let i = 0; i < 5; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        dates.push(date);
      }
      setDates(dates);
    };
    fetchData();
  }, []);

  const handleClick = (index) => {
    axios
      .get(
        `http://localhost:5000/cinemas/${
          index + 1
        }/showings?movieId=${movieId}&date=${selectDate}`
      )
      .then((res) => {
        const showsData = res.data;
        setShows(showsData);
      })
      .catch((error) => console.log(error));
    setActiveIndex(index);
  };

  const getDate = (date) => {
    handleClick();
    setSelectDate(date);
  };

  const checkReleaseDate = () => {
    return new Date(release_date) - new Date() > 0 ? true : false;
  };

  return (
    <Fragment>
      <div className='single-movie'>
        <div className='poster'>
          <img
            src={poster_horizontal}
            alt=''
            style={{ width: '100%', maxHeight: '400px' }}
          />
          <span className='poster-icon' onClick={() => toggle()}>
            <i className='far fa-play-circle'></i>
          </span>
        </div>

        <div className='movie-detail w-full flex gap-4 pt-4 pb-8'>
          <img
            src={poster_url}
            alt=''
            className='hidden md:block'
            style={{
              width: '300px',
              border: '5px solid var(--secondary-color)',
              borderRadius: '10px',
              padding: '0',
            }}
          />
          <div className='flex flex-col justify-between'>
            <h2 className='text-2xl text-secondary font-semibold tracking-wide pt-0 mb-0 sm:text-4xl sm:pt-24 sm:mb-8'>
              {title}
            </h2>
            <div>
              <p className='text-sm pt-1 sm:text-base'>
                <span className='inline-block w-20 text-secondary font-medium sm:w-24'>
                  Thời lượng:
                </span>{' '}
                {duration}
              </p>
              <p className='text-sm pt-1 sm:text-base'>
                <span className='inline-block w-20 text-secondary font-medium sm:w-24'>
                  Khởi chiếu:
                </span>{' '}
                {convertDate(release_date)}
              </p>
              <p className='text-sm pt-1 sm:text-base'>
                <span className='inline-block w-20 text-secondary font-medium sm:w-24'>
                  Thể loại:
                </span>{' '}
                {convertList(genres)}
              </p>
              <p className='text-sm pt-1 sm:text-base'>
                <span className='inline-block w-20 text-secondary font-medium sm:w-24'>
                  Diễn viên:
                </span>{' '}
                {convertList(actors)}
              </p>
              <p className='text-sm pt-1 sm:text-base'>
                <span className='inline-block w-20 text-secondary font-medium sm:w-24'>
                  Sơ lược:
                </span>{' '}
                {storyline}
              </p>
            </div>
          </div>
        </div>

        <div className='w-full flex gap-4'>
          <div className='showtimes w-full'>
            <Title title='Lịch chiếu' />
            {dates.length === 0 ? (
              <Tabs>
                <div label={formatDate(new Date())}></div>
                <div label='09/12'></div>
              </Tabs>
            ) : (
              <Tabs className='flex'>
                {dates.map((date, index) => {
                  return (
                    <div
                      key={index}
                      label={formatDate(date)}
                      date={date.toISOString().slice(0, 10)}
                      onClick={getDate}
                    >
                      <div className='w-full flex flex-col'>
                        <div className='w-full px-8 pb-4'>
                          <ul className='grid grid-cols-1 gap-2 text-center md:grid-cols-4 sm:grid-cols-2'>
                            {cinemaData.map((cinema, index) => {
                              return (
                                <li
                                  key={index}
                                  className={`font-medium text-base cursor-pointer sm:text-lg ${
                                    activeIndex === index ? 'active' : ''
                                  }`}
                                  onClick={() => handleClick(index)}
                                >
                                  {cinema.cinema_name}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        {checkReleaseDate() ? (
                          <h1 className='text-secondary text-center text-base font-medium py-4 md:text-xl sm:text-lg'>
                            Phim chưa công chiếu, vui lòng đặt vé vào ngày{' '}
                            {convertDate(release_date)}
                          </h1>
                        ) : activeIndex === undefined ? (
                          <h1 className='text-secondary text-center text-base font-medium py-4 md:text-xl sm:text-lg'>
                            Vui lòng chọn rạp và giờ chiếu
                          </h1>
                        ) : shows.length === 0 ? (
                          <h1 className='text-secondary text-center text-base font-medium py-4 md:text-xl sm:text-lg'>
                            Chưa có lịch chiếu cho ngày này. Vui lòng quay lại
                            sau. Xin cám ơn.
                          </h1>
                        ) : (
                          <div className='w-full m-auto py-8'>
                            <ul className='w-full flex flex-wrap justify-center gap-3 text-base font-medium px-4 sm:text-lg sm:justify-start'>
                              {shows.map((show) => {
                                return show.times.map((showtime, index) => {
                                  const { start_time } = showtime;
                                  return (
                                    <a
                                      href={`/movies/buy-ticket/${movieId}/${
                                        cinemaData[activeIndex].id
                                      }/${convertTitle(
                                        cinemaData[activeIndex].cinema_name
                                      )}/${selectDate}/${start_time}`}
                                      key={index}
                                      className='showing'
                                    >
                                      {formatTime(start_time)}
                                    </a>
                                  );
                                });
                              })}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </Tabs>
            )}
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

export default DetailMoviePage;
